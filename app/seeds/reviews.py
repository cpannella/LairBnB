from app.models import db, Review, environment, SCHEMA

def seed_reviews():
  review1 = Review(
    user_id = 1,
    spot_id = 1,
    rating=1,
    body="It was great"
  )

  review2 = Review(
  user_id = 1,
  spot_id = 1,
  rating=1,
  body="It was okay"
)

  review3 = Review(
  user_id = 1,
  spot_id = 1,
  rating=1,
  body="It was meh"
)

  review4 = Review(
    user_id = 2,
    spot_id = 1,
    rating=1,
    body="It was incredible"
  )

  review5 = Review(
  user_id = 2,
  spot_id = 2,
  rating=1,
  body="It was trash"
)

  review6 = Review(
  user_id = 3,
  spot_id = 3,
  rating=1,
  body="It was mids"
)

  review7 = Review(
    user_id = 1,
    spot_id = 3,
    rating=1,
    body="It was gorgeous"
  )

  review8 = Review(
  user_id = 3,
  spot_id = 1,
  rating=1,
  body="Nice escape route"
)

  review9 = Review(
  user_id = 1,
  spot_id = 2,
  rating=1,
  body="Staked out by feds"
)


  db.session.add(review1)
  db.session.add(review2)
  db.session.add(review3)
  db.session.add(review4)
  db.session.add(review5)
  db.session.add(review6)
  db.session.add(review7)
  db.session.add(review8)
  db.session.add(review9)
  db.session.commit()


def undo_reviews():
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM reviews")

  db.session.commit()
