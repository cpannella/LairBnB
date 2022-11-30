
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
  const sessionUser = useSelector(state => state.session)
  console.log('this is the session user',sessionUser,)

  const spots = Object.values(spotsState)
  const reviews = Object.values(reviewsState)



  // const spotReviews = reviewsState.filter(review => review.spot_id == )

  function avgcalculatr(arr){
    if(!arr.length) return 'No reviews'
    let sum = 0
    for(let i = 0; i < arr?.length; i++){
      sum += arr[i]
    }
    return sum.toFixed(2)
  }

  // const spotReviews = reviews.filter(review => review.spot_id == spot.id)

  useEffect(()=>{
    dispatch(fetchSpots())
    dispatch(fetchReviews())

  },[dispatch])


  return (
    <div className="somediv">

          <h1 className="main-header">Browse Spots</h1>
          <div className="spotCard-container">
            {spots.map(spot =>
              <div className="spotCard">
                <div>
                  <img onClick={()=> history.push(`spots/${spot.id}`)}className="main-spot-img" src={spot.url}></img>
                </div>
                <div classname="spotCard-details-container">
                  <div className="spotCard-details">
                    <h3 className="spotCard-info">{spot.name}</h3>
                    <h5 className="spotCard-info">{spot.state}, {spot.country}</h5>
                    <h5 className="spotCard-info">${spot.price}</h5>
                    {spot?.reviews.length > 0 &&
                    <div>
                    {(avgcalculatr(spot.reviews.map(review=> review.rating))/spot.reviews.length).toFixed(1)} Star(s)
                    </div>
                    }
                    {spot?.reviews.length == 0 &&
                    <div>
                      New
                    </div>
                    }
                  </div>
                </div>
                {sessionUser.user && sessionUser.user.id === spot.user_id &&
                <button onClick={()=> dispatch(deleteSpotThunk(spot.id))}>Delet</button>
                }
              </div>
              )}
          </div>

    </div>
    )

}
