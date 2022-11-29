
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteReviewThunk, fetchReviews } from "../../store/reviews";
import { fetchOneSpot, fetchSpots } from "../../store/spots";
import EditReviewForm from "../reviews/editReviewForm";
import ReviewForm from "../reviews/reviewForm";
import EditSpotFormModal from "../spotForms/editSpotFormModal";


export default function OneSpot(){
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)
  const reviewsState = useSelector(state => state.reviews)
  const reviews = Object.values(reviewsState)
  const [showEditReviewForm, setShowEditReviewForm] = useState(false)
  const filteredSpot = spots?.filter(spot => spot.id == +id)[0]
  const sessionUser = useSelector(state => state.session)
  const filteredReviews = reviews.filter(review => review.spot_id == id)
  const reviewsLength = reviews?.length
  const spotImages = filteredSpot?.spotImages
  console.log("filtered reviews", filteredReviews)



  const avgRating = (arr) => {
    if(arr?.length == 0){
      return null
    }
    let sum = 0
    for(let i = 0; i < arr?.length; i++){
        let review = arr[i]
        sum += review.rating
    }
    return sum/arr?.length + ` star(s)`
  }

  const spotAvgRating = avgRating(filteredReviews)



  useEffect(()=> {
    dispatch(fetchOneSpot(id))
    dispatch(fetchReviews())
  }, [dispatch])

  return (
    <div className="oneSpot-details-container">
      <div className="details-container">

        <div>

          {/* <button onClick={() => history.push(`/spots/${filteredSpot.id}/edit`)}>Edit</button> */}

        </div>
        <div className="spotImages-container">
          <div className="spot-description-container">
            <h2 className="spot-description">{filteredSpot?.name}</h2>
            {sessionUser.user && sessionUser?.user.id !== filteredSpot?.user_id &&
            <div>
            {/* <button className="button-style"onClick={()=> history.push(`/spots/${id}/edit`)}>Edit spot</button> */}
            <EditSpotFormModal filteredSpot={filteredSpot}/>
            </div>
            }
          </div>

          <div>
            <p>{spotAvgRating} {filteredReviews.length} Review(s) {filteredSpot?.city}, {filteredSpot?.state}, {filteredSpot?.country}</p>
          </div>



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
        {filteredReviews?.length < 1 &&
        <div>
          <h3>No reviews yet</h3>
          {sessionUser.user &&
          <div>
          <ReviewForm />
          </div>
          }
        </div>
        }
        {filteredReviews?.length > 0 &&
        <div>
        <h3>Reviews:</h3>
        {sessionUser.user &&
        <div>
          <ReviewForm/>
        </div>
        }
        {filteredReviews?.map(review => (
          <div className="single-review">
            <div>
            <p>{review?.user[0]?.username} said :</p>
            <p>{review.body}</p>
            <p>Rating: {review.rating}</p>
            {console.log("THIS IS A CONSOLE LOG", review?.user[0]?.username)}
            </div>
            {sessionUser.user && sessionUser?.user.id === review?.user_id &&
            <div>
              <button  onClick={()=> setShowEditReviewForm(true)}>Edit</button>
            </div>
            }
            {showEditReviewForm &&
            <div className="edit-buttons">
              <EditReviewForm review={review}></EditReviewForm>
              <button onClick={()=> setShowEditReviewForm(false)}>Cancel</button>
            </div>
            }
            {sessionUser.user && sessionUser?.user.id === review?.user_id &&
            <div>
              <button onClick={()=> dispatch(deleteReviewThunk(review.id))}>Delet</button>
            </div>
            }
          </div>
        ))}
        </div>
      }
      </div>

    </div>
  )
}
