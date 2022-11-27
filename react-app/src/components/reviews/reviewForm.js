import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";

import { fetchOneSpot, fetchSpots } from "../../store/spots";


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
      rating,
      spot_id
    }
    setBody('')
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
      <button className="NoteButtonTaskDetails" type="submit">Add a note</button>
      </div>
    </form>
  </div>
)

}

export default ReviewForm
