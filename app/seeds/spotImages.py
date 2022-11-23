from app.models import db, SpotImage, environment, SCHEMA


def seed_spotImages():
  spotImage1= SpotImage(
    spot_id = 1,
    url = "https://www.eejournal.com/wp-content/uploads/converted/1493253567e8/refuge_du_gouter2.jpg"
  )

  spotImage2= SpotImage(
    spot_id = 2,
    url = "https://airows.com/.image/t_share/MTI5MDAwODgzMjg2NDkzMTk0/screen-shot-2014-10-01-at-113635-am.png"
  )

  spotImage3= SpotImage(
    spot_id = 3,
    url = "https://static.dw.com/image/62502683_101.jpg"
  )

  spotImage4 = SpotImage(
    spot_id = 4,
    url = "https://cdna.artstation.com/p/assets/images/images/032/937/114/large/anya-jo-elvidge-villainous-lair-final.jpg?1607940609.jpg"
  )

  spotImage5 = SpotImage(
    spot_id = 5,
    url = "https://i.ytimg.com/vi/8KDUnUG3_cs/maxresdefault.jpg"
  )

  db.session.add(spotImage1)
  db.session.add(spotImage2)
  db.session.add(spotImage3)
  db.session.add(spotImage4)
  db.session.add(spotImage5)
  db.session.commit()

def undo_spotImages():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM spots")
  db.session.commit()
