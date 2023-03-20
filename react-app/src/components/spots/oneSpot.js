import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewThunk, fetchReviews } from "../../store/reviews";
import { fetchOneSpot } from "../../store/spots";
import profile from './profile.jpeg'
import EditReviewForm from "../reviews/editReviewForm";
import ReviewForm from "../reviews/reviewForm";
import EditSpotFormModal from "../spotForms/editSpotFormModal";
import defaultPic from './default.jpg'
import CreateBookingForm from "../bookings/bookingForm";
import "./spotsIndex.css"

export default function OneSpot(){
  const dispatch = useDispatch()
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)
  const reviewsState = useSelector(state => state.reviews)
  const reviews = Object.values(reviewsState)
  const [showEditReviewForm, setShowEditReviewForm] = useState(false)
  const [editReviewId, setEditReviewId] = useState('')
  const filteredSpot = spots?.filter(spot => spot.id == +id)[0]
  const sessionUser = useSelector(state => state.session)
  const filteredReviews = reviews.filter(review => review.spot_id == id)
  const user = filteredSpot?.user[0].username

  const avgRating = (arr) => {
    if(arr?.length == 0){
      return null
    }
    let sum = 0
    for(let i = 0; i < arr?.length; i++){
        let review = arr[i]
        sum += review.rating
    }
    return (sum/arr?.length).toFixed(2)
  }

  const monthParser = (s) => {
    if(s == 'Jan') s = 'January'
    if(s == 'Feb') s = 'February'
    if(s == 'Mar') s = 'March'
    if(s == 'Apr') s = 'April'
    if(s == 'May') s = 'May'
    if(s == 'Jun') s = 'June'
    if(s == 'Jul') s = 'July'
    if(s == 'Aug') s = 'August'
    if(s == 'Sep') s = 'September'
    if(s == 'Oct') s = 'October'
    if(s == 'Nov') s = 'November'
    if(s == 'Dec') s = 'December'

    return s
  }

  const spotAvgRating = avgRating(filteredReviews)

  useEffect(()=> {
    dispatch(fetchOneSpot(id))
    dispatch(fetchReviews())
  }, [dispatch])

  return (
    <div className="oneSpot-details-container">
      <div className="details-container">
        <div className="spotImages-container">
          <div className="spot-description-container">
            <div className="stuff">
              <h2 className="spot-description">{filteredSpot?.name}</h2>
                {sessionUser.user && sessionUser?.user.id === filteredSpot?.user_id &&
                <div className="button-div">
                <EditSpotFormModal id="edit-modal-button"filteredSpot={filteredSpot}/>
                </div>
                }
            </div>
          </div>
          <div className="rating-wrapper">
            <p>{spotAvgRating}<i id="upper-star" class="fa-sharp fa-solid fa-star"></i></p> <p className="details-span">{filteredReviews.length}  Review(s)</p> <p className="details-span-two">{filteredSpot?.city}, {filteredSpot?.state}, {filteredSpot?.country}</p>
          </div>
          <div className="spotImage-container">
               <div className="spotImage-container">
                <img className="details-image"src={filteredSpot?.url}
                onError={e => {e.target.src=`${defaultPic}`}}></img>
                <div className="someDiv">
                  <div className="description-container">
                    <h2 id="entire">Entire lair hosted by {user.charAt(0).toUpperCase() + user.slice(1)}</h2>
                    <div className="booking-form-container">
                        <CreateBookingForm filteredSpot={filteredSpot}/>
                    </div>
                  </div>
                  <div className="lair-cover">
                    <div className="inner-lair-cover">
                      <p id="cover-red" className="title">lair</p><p className="title">cover</p>
                    </div>
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                  </div>
                  <div className="description-cover">
                    <p>{filteredSpot?.description}</p>
                  </div>
                </div>
               </div>
           </div>
        </div>
        <div className="reviews-container">
          {filteredReviews?.length < 1 &&
          <div>
            <i id="lower-star" class="fa-sharp fa-solid fa-star"></i><h3>New 0 reviews</h3>
            {sessionUser.user && sessionUser.user.id !== filteredSpot?.user_id &&
            <div>
            <ReviewForm />
            </div>}
          </div>}
          {filteredReviews?.length > 0 &&
          <div>
            <div className="review-title">
              <h3><i id="lower-star" class="fa-sharp fa-solid fa-star"></i>{spotAvgRating}</h3> <h3 className="details-span">{filteredReviews.length}  Review(s)</h3>
            </div>
          <div className="all-reviews-container">

            {filteredReviews?.map(review => (
              <div className="single-review">
                <div className="review-details">
                  <div className="profile-container">
                    <img className="profile"src={profile}></img>
                    <div>
                      <h4 className="review-username">{review?.user[0]?.username.charAt(0).toUpperCase() + review?.user[0]?.username.slice(1)}</h4>
                      <p className="review-username">{monthParser(review.created_at.slice(8,11))} {review.created_at.substring(12, 16)}</p>
                    </div>
                  </div>
                  <p className="review-body">{review.body}</p>
                </div>
                <div className="fugazi">
                {sessionUser.user && sessionUser?.user.id === review?.user_id &&
                <div>
                  <button onClick={()=> [setShowEditReviewForm(true), setEditReviewId(review.id)]}>Edit</button>
                </div>
                }
                {sessionUser.user && sessionUser?.user.id === review?.user_id &&
                <div>
                  <button className="delete-button"onClick={()=> dispatch(deleteReviewThunk(review.id))}>Delete</button>
                </div>}
                </div>

                {showEditReviewForm  && review.id == editReviewId &&
                <div className="edit-buttons">
                <EditReviewForm review={review} setShowEditReviewForm={setShowEditReviewForm}></EditReviewForm>
                </div>}
              </div>
            ))}
             {sessionUser.user && sessionUser.user.id !== filteredSpot?.user_id &&
            <div>
              {/* <ReviewForm/> */}
            </div>
            }
          </div>
          </div>
        }
        </div>
      </div>
    </div>
  )
}
