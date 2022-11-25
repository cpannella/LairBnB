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

  spot6 = Spot(
    name="Space Lair",
    user_id=2,
    address="421 Electric Avenue",
    state="Moon",
    city="New New York",
    price=1000,
    description="Ethereal space temple captures atmosphere of Blade Runner with Lord of The Rings",
    country="USA",
    url ="https://i.pinimg.com/originals/b9/e5/4d/b9e54daf08cff15a650c319f93c7623d.jpg"
    )

  spot7 = Spot(
    name="Sky Lair",
    user_id=2,
    address="420 Cloud Nine",
    state="Unaffiliated",
    city="None",
    price=1000,
    description="Float away in cozy sky castle, close to downtown.",
    country="USA",
    url ="https://c4.wallpaperflare.com/wallpaper/1023/713/129/fantasy-art-wallpaper-preview.jpg"
    )

  spot8 = Spot(
    name="Waterfall Lair",
    user_id=2,
    address="111 Water St",
    state="New York",
    city="Niagra Falls",
    price=1000,
    description="Hope you like water",
    country="USA",
    url ="https://i.pinimg.com/originals/b9/e5/4d/b9e54daf08cff15a650c319f93c7623d.jpg"
    )

  spot9 = Spot(
    name="Swamp Lair",
    user_id=2,
    address="111 Marshland",
    state="Swampville",
    city="Far Far Away",
    price=1000,
    description="Ogres have layers, and so does this lair.",
    country="Banana Republic",
    url ="https://images.squarespace-cdn.com/content/v1/56e0c6ac746fb92b0e77f4d4/1567556573339-40FP9W1U6IBPUU07SWC5/Shrek-2-1920x1080.jpg?format=2500w.jpg"
    )

  spot10 = Spot(
    name="Wall Maria",
    user_id=2,
    address="123 Giant St",
    state="Trost District",
    city="Shingashina",
    price=1000,
    description="Titan level defenses",
    country="Eldia",
    url ="https://i.pinimg.com/originals/b9/e5/4d/b9e54daf08cff15a650c319f93c7623d.jpg"
    )

  spot11 = Spot(
    name="Minas Tirith",
    user_id=2,
    address="Parts Unkown",
    state="Gondor",
    city="Minas Tirtih",
    price=1000,
    description="Man made their last stand here",
    country="Middle Earth",
    url ="https://static.wikia.nocookie.net/lotrfanon/images/e/e4/Minas_Tirith.jpg/revision/latest?cb=20121226070106.jpg"
    )

  spot11 = Spot(
    name="Helm's Deep",
    user_id=2,
    address="The Quarry",
    state="Middle Earth ",
    city="Rohan",
    price=1000,
    description="Sauron could not conjur enough",
    country="Eldia",
    url ="https://i.etsystatic.com/13886995/r/il/cd671b/2625608030/il_fullxfull.2625608030_9b6b.jpg"
    )

  spot12 = Spot(
    name="Dwelling of Spirit of Forest",
    user_id=2,
    address="Unknown",
    state="Mononoke ",
    city="Sacred Forest",
    price=1000,
    description="Lady Iboshi wishes she could",
    country="Japan",
    url ="https://orionmagazine.org/wp-content/uploads/2021/02/GHI_Mononoke_Select2-1-scaled.jpg"
    )



  db.session.add(spot1)
  db.session.add(spot2)
  db.session.add(spot3)
  db.session.add(spot4)
  db.session.add(spot5)
  db.session.add(spot6)
  db.session.add(spot7)
  db.session.add(spot8)
  db.session.add(spot9)
  db.session.add(spot10)
  db.session.add(spot11)
  db.session.add(spot12)

  db.session.commit()

def undo_spots():
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM spots")

  db.session.commit()
