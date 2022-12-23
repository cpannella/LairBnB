from app.models import db, Booking, environment, SCHEMA


def seed_bookings():
  booking1 = Booking(
    user_id = 1,
    spot_id = 1,
    start_date = "2022-12-25 04:20:00.000000",
    end_date = "2022-12-26 04:20:00.000000"
  )
