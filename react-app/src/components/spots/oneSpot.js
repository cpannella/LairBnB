
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchOneSpot, fetchSpots } from "../../store/spots";


export default function OneSpot(){
  const dispatch = useDispatch()
  const {id} = useParams()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)


  const filteredSpot = spots?.filter(spot => spot.id == +id)[0]
  console.log("THIS IS THE FILTERED SPOT",filteredSpot)
  const reviews = filteredSpot?.reviews
  // const images = filteredSpot.
  const spotImages = filteredSpot?.spotImages


  useEffect(()=> {
    dispatch(fetchOneSpot(id))
  }, [dispatch])

  return (
    <div>
      <div className="details-container">
        <h1>{filteredSpot?.description}</h1> <button onClick={() => }>Edit</button>
        <p>{filteredSpot?.city}, {filteredSpot?.state}, {filteredSpot?.country}</p>
        <div className="spotImages-container">
          <p>Images placeholder div</p>
          {spotImages?.map(spotImage => (
            <div className="spotImage-container">
            <img src={spotImage?.url}></img>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-container">
        <h3>Reviews go here</h3>
        {reviews?.map(review => (
          <div>
            <p>{review.body}</p>
            <p>Rating: {review.rating}</p>
            <p>User: {review.user_id}</p>
          </div>
        ))}

      </div>

    </div>
  )
}
