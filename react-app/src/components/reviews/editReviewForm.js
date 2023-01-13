import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";

import { fetchOneSpot, fetchSpots } from "../../store/spots";


function EditReviewForm({review, setShowEditReviewForm}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()
  let spot_id = id
  const reviewId = review.id
  const [body, setBody] = useState(review?.body)
  const [rating, setRating] = useState(review?.rating)

  useEffect(()=> {
  }, [dispatch, body, rating])

  const handleSubmit = async (e) => {
    setShowEditReviewForm(false)
    e.preventDefault()

    if(!rating){
      rating = review?.rating
    }
    console.log("THIS IS THE RATING CONSOLE LOG", review.rating)
    const payload = {
      body,
      rating: rating[0] || rating,
      spot_id,
      reviewId,

    }
    setBody('')
    setRating('')
    console.log("PAYLOAD ON EDIT REVIEW FORM", payload)
    let reviewEdited = await dispatch(editReviewThunk(payload, reviewId))
    if(reviewEdited){
      await dispatch(fetchOneSpot(id))
    }
  }


  return (

      <div className="review-form-container">
        <form className="reviewForm" onSubmit={handleSubmit}>
        <div className="someDiv">
        <p className="counter">{body?.length}/250</p>
        <label className="review-input-field">
          <input
            className="review-input-field"
            placeholder="Share your experience here. "
            id="review-input-field"
            type="text"
            value={body}
            maxLength={250}
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label>
          <input
          placeholder="Rate from 1-5"
          className="review-rating-field"
          type="number"
          value={rating}
          maxLength={1}
          min="1"
          required pattern="[0-9]+"
          max="5"

          onChange={(e)=> setRating(e.target.value)}
          >



          </input>
        </label>
        <button className="review-submit" type="submit">Edit review</button>
        <button id="review-cancel"onClick={()=> setShowEditReviewForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
)

}

export default EditReviewForm
