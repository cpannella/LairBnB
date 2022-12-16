import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import './search.css'
import { NavLink, useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { fetchSpots, deleteSpotThunk } from "../store/spots";
import defaultPic from './spots/default.jpg'
import notFound from './notFound.jpg'
const SearchPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {searchTerm} = useParams()
  const search = searchTerm.toLowerCase()
  const spots = useSelector(state => state.spots)
  const spotsArr = Object.values(spots)
  const filteredSpots = spotsArr.filter(spot => spot.name.toLowerCase().includes(search) || spot.description.toLowerCase().includes(search) || spot.state.toLowerCase().includes(search))
  const sessionUser = useSelector(state => state.session)

  function avgcalculatr(arr){
    if(!arr.length) return 'No reviews'
    let sum = 0
    for(let i = 0; i < arr?.length; i++){
      sum += arr[i]
    }
    return sum.toFixed(2)
  }

  if(!filteredSpots.length){
    return (
      <div>
        <div className="notFound">
          <h1 className="errorMessage">404 Not Found </h1>
          <img className="errorImage"src={notFound}></img>
        </div>
      </div>
    )
  }

  else return (
    <div className="searchPage-container">
      <div className="searchSpots">
        {/* <h1 className="searchSomething">404 not found</h1> */}
        {filteredSpots?.map(spot => (
         <div className="spotCard">
         <div>
           <img onClick={()=> history.push(`/spots/${spot.id}`)}className="main-spot-img" src={spot.url}
           onError={e => {e.target.src=`${defaultPic}`}}></img>
         </div>
         <div className="spotCard-details-container">
           <div className="spotCard-details">
              <h3 className="spotCard-info">{spot.name}</h3>
             <div>
               <p className="spotCard-info">{spot.state}, {spot.country}</p>
             </div>
               <div className="price-detail"><h5 className="spotCard-info">${spot.price} night</h5></div>
             </div>
               {spot?.reviews.length > 0 &&
             <div className="star-rating-container">
             <div><i class="fa-sharp fa-solid fa-star"></i> {(avgcalculatr(spot.reviews.map(review=> review.rating))/spot.reviews.length).toFixed(2)} </div>
               {sessionUser.user && sessionUser.user.id === spot.user_id &&
               <button onClick={()=> dispatch(deleteSpotThunk(spot.id))}>Delete</button>
               }
               </div>
               }
             {spot?.reviews.length == 0 &&
             <div className="star-rating-container">
              <div><i class="fa-sharp fa-solid fa-star"></i> New</div>
               {sessionUser.user && sessionUser.user.id === spot.user_id &&
               <button onClick={()=> dispatch(deleteSpotThunk(spot.id))}>Delete</button>
               }
             </div>
             }
         </div>

       </div>
        ))}
      </div>

      <div className="map-container;">
        <h1>Page under construction</h1>
        <h1>Map goes here</h1>
      </div>


    </div>
  )
}
export default SearchPage
