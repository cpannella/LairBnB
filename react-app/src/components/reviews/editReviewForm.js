import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";

import { fetchOneSpot, fetchSpots } from "../../store/spots";


function EditReviewForm({review}) {
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
    e.preventDefault()
    const payload = {
      body,
      rating: parseInt(rating),
      spot_id,
      reviewId
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
      <div className="">
      <label>
        <input
          placeholder="Share your experience here. "
          id="inputBoxnoteTaskDetails"
          type="text"
          value={body}
          maxLength={200}
          required
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        <input
        placeholder="Give a rating from 1-5"
        type="number"
        value={rating}
        maxLength={1}
        required
        onChange={(e)=> setRating(e.target.value)}
        >



        </input>
      </label>
      <button className="NoteButtonTaskDetails" type="submit">Submit</button>
      </div>
    </form>
  </div>
)

}

export default EditReviewForm
