from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Spot(db.Model):
  __tablename__ = "spots"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(75), nullable=False)
  address = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(30), nullable=False)
  country = db.Column(db.String(30), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  url = db.Column(db.String(1000), nullable=False)
  description = db.Column(db.String(500), nullable=False)
  city = db.Column(db.String(50), nullable=False)
  wishList_id = db.Column(db.Integer)
  created_at = db.Column(db.DateTime, default= datetime.utcnow)
  updated_at = db.Column(db.DateTime, default= datetime.utcnow)

  spot_images = db.relationship("SpotImage", cascade="all,delete", backref="spots")
  reviews = db.relationship("Review", cascade="all,delete", backref="spots")
  bookings = db.relationship("Booking", cascade="all,delete", backref="spots")
  user = db.relationship("User", backref="users")

  def to_dict(self):
    return{
      "id": self.id,
      "user_id": self.user_id,
      "user": [self.user.to_dict()],
      "name": self.name,
      "url" : self.url,
      "address": self.address,
      "state": self.state,
      "country": self.country,
      "city": self.city,
      "reviews": [review.to_dict() for review in self.reviews],
      "price": self.price,
      "description": self.description,
      "wishList_id": self.wishList_id,
      "created_at": self.created_at,
      "updated_at": self.updated_at

    }
