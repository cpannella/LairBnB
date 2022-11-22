from .db import db, environment, SCHEMA
from datetime import datetime

class Spot(db.Model):
  __tablename__ = "spots"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(75), nullable=False)
  address = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(30), nullable=False)
  country = db.Column(db.String(30), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  description = db.Column(db.String(500), nullable=False)
  wishList_id = db.Column(db.Integer)
  created_at = db.Column(db.DateTime, default= datetime.utcnow)
  updated_at = db.Column(db.DateTime, default= datetime.utcnow)
  spotImages = db.relationship("spotIamges", cascade="all,delete", backref="spots")
  reviews = db.relationship("reviews", cascade="all,delete", backref="spots")
  bookings = db.relationship("bookings", cascade="all,delete", backref="spots")

  def to_dict(self):
    return{
      "id": self.id,
      "user_id": self.user_id,
      "name": self.name,
      "address": self.address,
      "state": self.state,
      "country": self.country,
      "price": self.price,
      "description": self.description,
      "wishList_id": self.wishList_id,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }
