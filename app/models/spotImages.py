from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class SpotImage(db.Model):
  __tablename__ = "spotImages"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
  url = db.Column(db.String(1000),nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow)

  def to_dict(self):
    return {
      "id":self.id,
      "spot_id":self.spot_id,
      "url": self.url,
      "created_at": self.created_at,
      "updated_at" : self.updated_at
    }
