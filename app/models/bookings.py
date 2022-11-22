from .db import db,environment, SCHEMA
from datetime import datetime

class Booking(db.Model):
  __tablename__ = "bookings"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  spot_id = db.Column(db.Integer, nullable=False)
  start_date = db.Column()
  created_at = db.Column(db.DateTime, default= datetime.utcnow)
  updated_at = db.Column(db.DateTime, default= datetime.utcnow)


  def to_dict(self):
    return{
      "id": self.id,
      "user_id": self.user_id,
      "spot_id": self.spot_id,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }

