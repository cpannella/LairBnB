from flask import Blueprint, jsonify, session, request, make_response
from app.models import User, db, Booking
from app.forms.booking_form import BookingForm


booking_routes = Blueprint("bookings", __name__)


@booking_routes.route('/')

def get_all_bookings():
  bookings = Booking.query.all()

  response = {"bookings": [booking.to_dict() for booking in bookings]}
  return make_response(response, 200)



