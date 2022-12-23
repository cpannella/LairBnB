from flask import Blueprint, jsonify, session, request, make_response
from app.models import User, db, Booking
from app.forms.booking_form import BookingForm
from flask_login import login_required,current_user


booking_routes = Blueprint("bookings", __name__)








@booking_routes.route('/')
def get_all_bookings():
  bookings = Booking.query.all()

  response = {"bookings": [booking.to_dict() for booking in bookings]}
  return make_response(response, 200)


@booking_routes.route('/<int:id>/new_booking', methods=["POST"])
def new_booking(id):
  print("SOMETHING")
  form = BookingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
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
