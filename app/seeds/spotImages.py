from app.models import db, SpotImage, environment, SCHEMA


def seed_spot_images():
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

  spotImage6 = SpotImage(
    spot_id = 6,
    url = "https://i.pinimg.com/originals/b9/e5/4d/b9e54daf08cff15a650c319f93c7623d.jpg"
  )

  spotImage7 = SpotImage(
    spot_id = 7,
    url = "https://c4.wallpaperflare.com/wallpaper/1023/713/129/fantasy-art-wallpaper-preview.jpg"
  )

  spotImage8 = SpotImage(
    spot_id = 8,
    url = "https://i.pinimg.com/originals/b9/e5/4d/b9e54daf08cff15a650c319f93c7623d.jpg"
  )

  spotImage9 = SpotImage(
    spot_id = 9,
    url = "https://images.squarespace-cdn.com/content/v1/56e0c6ac746fb92b0e77f4d4/1567556573339-40FP9W1U6IBPUU07SWC5/Shrek-2-1920x1080.jpg?format=2500w.jpg"
  )

  spotImage10 = SpotImage(
    spot_id = 10,
    url = "https://i.pinimg.com/originals/b9/e5/4d/b9e54daf08cff15a650c319f93c7623d.jpg"
  )

  spotImage11 = SpotImage(
    spot_id = 11,
    url = "https://static.wikia.nocookie.net/lotrfanon/images/e/e4/Minas_Tirith.jpg/revision/latest?cb=20121226070106.jpg"
  )

  spotImage12 = SpotImage(
    spot_id = 12,
    url = "https://orionmagazine.org/wp-content/uploads/2021/02/GHI_Mononoke_Select2-1-scaled.jpg"
  )


  db.session.add(spotImage1)
  db.session.add(spotImage2)
  db.session.add(spotImage3)
  db.session.add(spotImage4)
  db.session.add(spotImage5)
  db.session.add(spotImage6)
  db.session.add(spotImage7)
  db.session.add(spotImage8)
  db.session.add(spotImage9)
  db.session.add(spotImage10)
  db.session.add(spotImage11)
  db.session.add(spotImage12)
  db.session.commit()

def undo_spot_images():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.spot_images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM spotimages")
  db.session.commit()
