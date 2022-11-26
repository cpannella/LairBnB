from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Spot, Review, db, SpotImage
from app.forms.review_form import ReviewForm



review_routes = Blueprint("reviews", __name__)


@review_routes.route("/")
def get_all_reviews():
  reviews = Review.query.all()
  response = {"reviews": [review.to_dict() for review in reviews]}
  print("this is the response", response)
  return make_response(response, 200)


@review_routes.route("/<int:id>")
def get_one_review(id):
  review = Review.query.get(id)
  if not review:
    return make_response("Doesn't exist", 404)
  single_review = review.to_dict()

  return make_response(single_review, 200)


@review_routes.route("/new_review", methods=["POST"])
def new_review(id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit:
    review = Review(
      body=form.data['body'],
      user_id = current_user.id,
      spot_id = pass
    )
    db.session.add(review)
    db.session.commit()
    return make_response(review.to_dict(), 201)
  else: return make_response("Unauthorized", 401)



@review_routes.route('/<int:id>', methods=["DELETE"])

def delete_review(id):
  review = Review.query.get(id)
  if not review:
    return make_response("Not found", 404)

  if review.user_id == current_user.id:
    db.session.delete(review)
    db.session.commit()
    return make_response("Success", 200)
