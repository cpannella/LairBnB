
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchSpots, deleteSpotThunk } from "../../store/spots";
import { fetchReviews } from "../../store/reviews";
import "./spotsIndex.css"



export default function AllSpots(){
  const dispatch = useDispatch()
  const history = useHistory()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const reviewsState = useSelector(state => state.reviews)

  console.log("THIS THAT REVIEW STATE DONT @ ME", reviewsState)
  // const spotReviews = reviewsState.filter(review => review.spot_id == )

  const spots = Object.values(spotsState)
  const reviews = Object.values(reviewsState)

  useEffect(()=>{
    dispatch(fetchSpots())
    dispatch(fetchReviews())

  },[dispatch])


  return (
    <div className="somediv">

          <h1>Browse Spots</h1>
          <div className="spotCard-container">
            {spots.map(spot =>
              <div className="spotCard">
                <div>
                  <img onClick={()=> history.push(`spots/${spot.id}`)}className="main-spot-img" src={spot.url}></img>
                </div>
                <div classname="spotCard-details-container">
                  <div className="spotCard-details">
                    <h3 className="spotCard-info">{spot.name}</h3>
                    <h4 className="spotCard-info">{spot.state}, {spot.country}</h4>
                    <h4 className="spotCard-info">${spot.price}</h4>
                    
                  </div>
                  {/* <div>
                    <p> Reviews</p>
                  </div> */}
                </div>

                <button onClick={()=> dispatch(deleteSpotThunk(spot.id))}>Delet</button>

              </div>
              )}
          </div>

    </div>
    )

}
