from flask import Blueprint, jsonify, session, request, make_response
from app.models import User, db, Booking
from app.forms.booking_form import BookingForm
from flask_login import login_required,current_user


booking_routes = Blueprint("bookings", __name__)








@booking_routes.route('/bookings')
def get_all_bookings():
  bookings = Booking.query.all()

  response = {"bookings": [booking.to_dict() for booking in bookings]}
  return make_response(response, 200)


@booking_routes.route('/bookings/<int:id>')
def get_one_booking(id):
  booking = Booking.query.get(id)
  if not booking:
    return make_response("Doesn't exist", 404)
  single_booking = booking.to_dict()
  return make_response(single_booking, 200)


@booking_routes.route('/<int:id>/new_booking', methods=["POST"])
def new_booking(id):
  form = BookingForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit:
    booking = Booking(
      start_date=form.data['start_date'],
      end_date = form.data['end_date'],
      user_id = current_user.id,
      spot_id = id
    )
    db.session.add(booking)
    db.session.commit()
    return make_response(booking.to_dict(), 201)



@booking_routes.route('/bookings/<int:id>/edit', methods=["PUT"])
def edit_booking(id):
  form = BookingForm()
  booking = Booking.query.get(id)
  if not booking:
    return make_response("404 nout found", 404)

  if booking.user_id == current_user.id:
    booking.start_date = form.data["start_date"]
    booking.end_date = form.data["end_date"]
    db.session.commit()
  return make_response(booking.to_dict(), 200)




@booking_routes.route('/bookings/<int:id>', methods=["DELETE"])
def delete_booking(id):
  booking = Booking.query.get(id)
  if not booking:
    return make_response("Not Found", 404)


  if booking.user_id == current_user.id:
    db.session.delete(booking)
    db.session.commit()
    return make_response("Success", 200)
