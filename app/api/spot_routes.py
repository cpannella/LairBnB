from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Spot, Review, db
from app.forms.spots_form import SpotForm


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
  single_spot = spot.to_dict()
  spot_reviews = Review.query.filter(Review.spot_id == id).all()
  data = [review.to_dict() for review in spot_reviews]
  single_spot["reviews"] = data

  return make_response(single_spot, 200)

@spot_routes.route("/new_spot", methods=["POST"])

def new_spot():
  form = SpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data

    print(data)

    spot = Spot(
      user_id = current_user.id,
      name=data['name'],
      address=data["address"],
      state=data["state"],
      country=data["country"],
      city=data["city"],
      price=data["price"],
      description=data["description"]
    )
    # form.populate_obj(spot)
    db.session.add(spot)
    db.session.commit()
    return make_response(spot.to_dict(), 201)
