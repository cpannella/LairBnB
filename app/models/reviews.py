from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
  __tablename__ = "reviews"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
  rating = db.Column(db.Integer)
  body = db.Column(db.String(500), nullable=False)
  created_at = db.Column(db.DateTime, default= datetime.utcnow)
  updated_at = db.Column(db.DateTime, default= datetime.utcnow)

  user = db.relationship("User", backref="reviews")

  def to_dict(self):
    return{
      "id": self.id,
      "user_id": self.user_id,
      "user": [self.user.to_dict()],
      "spot_id": self.spot_id,
      "rating": self.rating,
      "body": self.body,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }
