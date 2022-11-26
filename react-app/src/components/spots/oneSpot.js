
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchOneSpot, fetchSpots } from "../../store/spots";
import EditSpotFormModal from "../spotForms/editSpotFormModal";


export default function OneSpot(){
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)


  const filteredSpot = spots?.filter(spot => spot.id == +id)[0]
  console.log("THIS IS THE FILTERED SPOT",filteredSpot?.url)
  const reviews = filteredSpot?.reviews

  const reviewsLength = reviews?.length
  // const images = filteredSpot.
  const spotImages = filteredSpot?.spotImages


  const avgRating = (arr) => {
    if(arr?.length == 0){
      return 'No reviews yet'
    }
    let sum = 0
    for(let i = 0; i < arr?.length; i++){
        let review = arr[i]
        sum += review.ratings
    }
    return sum/arr?.length
  }

  const spotAvgRating = avgRating(reviews)



  useEffect(()=> {
    dispatch(fetchOneSpot(id))
  }, [dispatch])

  return (
    <div className="oneSpot-details-container">
      <div className="details-container">
        <button onClick={()=> history.push(`/spots/${id}/edit`)}>Edit spot</button>
        <div>

          {/* <button onClick={() => history.push(`/spots/${filteredSpot.id}/edit`)}>Edit</button> */}

        </div>
        <div className="spotImages-container">
          <div className="spot-description-container">
            <h2 className="spot-description">{filteredSpot?.name}</h2>
          </div>
          {spotAvgRating > 0 &&
          <div>
            <p>{spotAvgRating} stars - {reviewsLength} Review(s) {filteredSpot?.city}, {filteredSpot?.state}, {filteredSpot?.country}</p>
          </div>
          }
          {!reviewsLength &&
          <div>
            <p>{spotAvgRating} {filteredSpot?.city}, {filteredSpot?.state}, {filteredSpot?.country}</p>
          </div>
          }

          <div className="spotImage-container">

               <div className="spotImage-container">
                  <img className="details-image"src={filteredSpot?.url}></img>

                    <div>
                      <h4>{filteredSpot?.description}</h4>
                      <h4>${filteredSpot?.price.toString()}</h4>
                    </div>
               </div>

           </div>
        </div>
      </div>

      <div className="reviews-container">
        <h3>Reviews:</h3>

        {reviews?.map(review => (
          <div className="single-review">
            <p>{review.body}</p>
            <p>Rating: {review.ratings}</p>
            <p>User: {review.user_id}</p>
          </div>
        ))}

      </div>

    </div>
  )
}
