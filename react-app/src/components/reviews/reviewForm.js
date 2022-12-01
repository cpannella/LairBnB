import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";

import { fetchOneSpot, fetchSpots } from "../../store/spots";
import './reviews.css'


function ReviewForm({filtered}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()
  let spot_id = id

  const [body, setBody] = useState('')
  const [rating, setRating] = useState('')

  useEffect(()=> {

  }, [dispatch, body, rating])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      body,
      rating: rating[0],
      spot_id
    }
    setBody('')
    setRating('')
    console.log("THIS IS THE PAYLOAD",payload)
    let reviewCreated = await dispatch(createReviewThunk(payload, id))
    if(reviewCreated){
      await dispatch(fetchOneSpot(id))

    }
  }


  return (
    <div className="review-form-container">
      <form className="reviewForm" onSubmit={handleSubmit}>
      <div className="">
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
        max="5"
        
        required pattern="[0-9]+"
        onChange={(e)=> setRating(e.target.value)}
        >



        </input>
      </label>
      <button className="review-submit" type="submit">Add review</button>
      </div>
    </form>
  </div>
)

}

export default ReviewForm
