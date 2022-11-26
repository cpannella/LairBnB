import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import './reviews.css'
import { fetchSpots } from "../../store/spots";


function ReviewForm({filtered}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = filtered
  let spot_id = id

  const [body, setBody] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      body,
      spot_id
    }
    setBody('')
    let reviewCreated = await dispatch(createReviewThunk(payload, id))
    if(reviewCreated){
      history.push(`/all/spots/${spot_id}`)
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
        <input>
          

        </input>
      </label>
      <button className="NoteButtonTaskDetails" type="submit">Add a note</button>
      </div>
    </form>
  </div>
)




}
