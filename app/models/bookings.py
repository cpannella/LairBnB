from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Booking(db.Model):
  __tablename__ = "bookings"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
  start_date = db.Column(db.DateTime)
  end_date = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default= datetime.utcnow)
  updated_at = db.Column(db.DateTime, default= datetime.utcnow)


  def to_dict(self):
    return{
      "id": self.id,
      "user_id": self.user_id,
      "spot_id": self.spot_id,
      "start_date": self.start_date,
      "end_date": self.end_date,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }
