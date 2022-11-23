
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchOneSpot, fetchSpots } from "../store/spots";


export default function OneSpot(){
  const dispatch = useDispatch()
  const {id} = useParams()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)
  console.log(spots)

  const filteredSpot = spots.filter(spot => spot.id == +id)[0]
  console.log(filteredSpot)
  const {reviews} = filteredSpot.reviews
  console.log(reviews)

  useEffect(()=> {
    dispatch(fetchOneSpot(id))
  }, [dispatch])

  return (
    <div>
      <div className="details-container">
        <h1>Description :  {filteredSpot.description}</h1>
        <p>{filteredSpot.city}, {filteredSpot.state}, {filteredSpot.country}</p>
        <div className="spotImages-container">
          <p>Images placeholder div</p>
        </div>
      </div>

      <div className="reviews-container">
        <h3>Reviews go here</h3>

      </div>

    </div>
  )
}
