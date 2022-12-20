from flask import Blueprint, jsonify, render_template, make_response, request
from flask_login import login_required,current_user
from app.models import Spot, Review, db, SpotImage
from app.forms.spots_form import SpotForm
from app.forms.review_form import ReviewForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


spot_routes = Blueprint("spots", __name__)



@spot_routes.route('/')
def get_all_spots():
  spots = Spot.query.all()
  reviews = Review.query.all()
  newReviews = [review.to_dict() for review in reviews]
  newSpots = [spot.to_dict() for spot in spots]
  # print("THESE ARE THE NEW SPOTS",newSpots)
  # print("THESE ARE THE REVIEWS", newReviews)
  newSpot = {}

  # for spot in newSpots:
  #   for review in newReviews:
  #       if review['spot_id'] == spot['id']:
  #         # print("spotname",spot['name'], 'review', review)
  #         newSpot['name'] = spot['name']
  #         newSpot['review'] = review
  #         # print(newSpot)
  # # print("NEW SPOTS AFTER FOR", newSpots)

  # print(newSpot)

  response = {"spots": [spot.to_dict() for spot in spots]}
  return make_response(response, 200)



@spot_routes.route('/<int:id>')
def get_one_spot(id):
  spot = Spot.query.get(id)
  if not spot:
    return make_response("Doesn't exist", 404)
  spotImages = SpotImage.query.filter(SpotImage.spot_id == id).all()

  images = [spotImage.to_dict() for spotImage in spotImages]

  single_spot = spot.to_dict()
  spot_reviews = Review.query.filter(Review.spot_id == id).all()
  data = [review.to_dict() for review in spot_reviews]

  single_spot["reviews"] = data
  single_spot['spotImages'] = images
  return make_response(single_spot, 200)

@spot_routes.route("/new_spot", methods=["POST"])
def new_spot():
  print('THIS IS THE ROUTE')
  form = SpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  print("THIS IS THE REQUEST", request.files)

  # if "url" not in request.files:
  #   return {"errors": "image requried"}, 400

  image = request.files["url"]

  print("THIS IS THE IMAGE",image)

  image.filename = get_unique_filename(image.filename)
  upload = upload_file_to_s3(image)

  if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

  if "url" not in upload:
          return upload, 400

  new_url = upload['url']

  data = form.data
  print("THIS IS THE FORM DATA ",data)
  spot = Spot(
    user_id = current_user.id,
    name = data["name"],
    address = data["address"],
    state = data["state"],
    country = data["country"],
    price = data["price"],
    description = data["description"],
    city = data["city"],
    url = new_url
  )



  print(spot.to_dict())
  db.session.add(spot)
  db.session.commit()
  return make_response(spot.to_dict(), 201)






@spot_routes.route('/<int:id>', methods=["PUT"])
def edit_spot(id):
  form = SpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    spot = Spot.query.get(id)
    data = form.data

    spot.name = data['name']
    spot.address = data['address']
    spot.state = data['state']
    spot.country = data['country']
    spot.price = data['price']
    spot.description = data['description']
    spot.city = data['city']
    spot.url = data['url']

    db.session.commit()
    return spot.to_dict()
  return make_response("Unauthorized", 401)






@spot_routes.route('/<int:id>', methods=["DELETE"])
def delete_spot(id):
  spot = Spot.query.get(id)
  if not spot:
    return make_response("Not found", 404)

  if spot.user_id == current_user.id:
    db.session.delete(spot)
    db.session.commit()
    return make_response("Successfully deleted", 200)
