from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Spot, Review, db, SpotImage
from app.forms.spots_form import SpotForm
from app.forms.review_form import ReviewForm


spot_routes = Blueprint("spots", __name__)



@spot_routes.route('/')

def get_all_spots():
  spots = Spot.query.all()

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
  form = SpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  data = form.data

  spot = Spot(
    user_id = current_user.id,
    name = data["name"],
    address = data["address"],
    state = data["state"],
    country = data["country"],
    price = data["price"],
    description = data["description"],
    city = data["city"],
    url = data['url']
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
