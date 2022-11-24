from app.models import db, Spot, environment, SCHEMA


def seed_spots():
  spot1 = Spot(
    name="Mountain Lair",
    user_id=1,
    address="42 N Pearl St",
    city="Aspen",
    state="Colorado",
    price=1000,
    description="Cozy mountain lair, to plot world take over. Great access to ski hills near by and underground cave system for escape",
    country="USA",
    url ="https://media.cntraveler.com/photos/5682a72ac2ebbef23e7dbb85/master/pass/snow-castles-castle-neuschwanstein-bavaria-germany-cr-getty.jpg"
    )

  spot2 = Spot(
    name="Ocean Lair",
    user_id=2,
    address="0420 Ocean Avenue",
    state="Florida",
    city="Miami",
    price=1000,
    description="Beachside fortress, close to downtown, great for escape by boat or sea plane",
    country="USA",
    url = "https://i2-prod.mirror.co.uk/incoming/article8146406.ece/ALTERNATES/s615/China-plans-underwater-base.jpg"
    )

  spot3= Spot(
    name="Forest Lair",
    user_id=3,
    address="2525 Chatanooga St",
    state="Tennessee",
    city="Chatanooga",
    price=1000,
    description="Cute forest complex, great for plotting with the whole family.",
    url = "https://cdnb.artstation.com/p/assets/images/images/010/160/323/large/jeremy-fenske-forewsttemple.jpg?1522886282.jpg",
    country="USA"
    )

  spot4 = Spot(
    name="Volcano Lair",
    user_id=1,
    address="42069 Volcano Blvd",
    city="Honolulu",
    state="Hawaii",
    price=1000,
    description="Explosive views surround this one of a kind fortress, complete with launchpad to escape into space. Serious inquires only",
    country="USA",
    url = "https://oyster.ignimgs.com/mediawiki/apis.ign.com/middle-earth-shadow-of-mordor/8/8e/Mount_Doom.jpg"
    )

  spot5 = Spot(
    name="Desert Lair",
    user_id=2,
    address="777 Desert Rd",
    state="Sahara",
    city="Benghazi",
    price=1000,
    description="Inspired by the works of Dune, this lair gives the conquest feel of House Atreides with, none of the headache",
    country="USA",
    url ="https://media.architecturaldigest.com/photos/56c3aa753968a11e07f333fc/master/pass/mad-max-fury-road-set-design-008.jpg"
    )

  db.session.add(spot1)
  db.session.add(spot2)
  db.session.add(spot3)
  db.session.add(spot4)
  db.session.add(spot5)
  db.session.commit()

def undo_spots():
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM spots")

  db.session.commit()
