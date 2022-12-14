const ONE_REVIEW = 'reviews/one'
const CREATE_REVIEW = 'reviews/new'
const EDIT_REVIEW = 'reviews/edit'
const DELETE_REVIEW = 'reviews/delete'
const ALL_REVIEWS = 'reviews/all'


const oneReview = payload => {
  return {
      type: ONE_REVIEW,
      payload
  }
}

const allReviews = payload => {
  return {
      type: ALL_REVIEWS,
      payload
  }
}

const createReview = (payload) => {
  return {
      type: CREATE_REVIEW,
      payload
  }
}

const editReview = (review) => {
  return {
      type: EDIT_REVIEW,
      review
  }
}

const deleteReview = (review) => {
  return {
      type: DELETE_REVIEW,
      review
  }
}


export const fetchReviews = () => async dispatch => {

  const response = await fetch('/api/spots/reviews')

  if(response.ok){
    const reviews = await response.json()
    console.log("THIS IS THE FETCH REVIEW THUNK", reviews)

    dispatch(allReviews(reviews))
    return reviews
  }
}

export const fetchOneReview = (id) => async dispatch => {
  const response = await fetch(`/api/spots/reviews/${id}`)

  if (response.ok){
    const singleReview = await response.json()
    dispatch(oneReview(singleReview))
    return singleReview
  }
}

export const createReviewThunk = (payload, id) => async dispatch => {
  console.log('CREATE REVIEW THUNK', payload, id)
  const response = await fetch(`/api/spots/${id}/new_review`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
});
  if(response.ok){
    const newReview = await response.json()
    dispatch(createReview(newReview))
    return newReview
  }
}

export const editReviewThunk = (review, id) => async dispatch => {
  console.log("PAYLOAD IN EDIT REVIEW THUNK", review, "ID:", id)
  const response = await fetch(`/api/spots/reviews/${id}/edit`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(review)
  })
  if(response.ok) {
    const review = await response.json()
    dispatch(editReview(review))
    return review
  }
}


export const deleteReviewThunk = (id) => async dispatch => {
  const response = await fetch(`/api/spots/reviews/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  })
  if(response.ok){
    const review = `${id}`
    dispatch(deleteReview(review))
  }
}

const initialState = {}
 function reviewReducer(state = initialState, action){
  let newState;


  switch(action.type){
    case ALL_REVIEWS:{
      newState = {...state}
      
      action.payload.reviews.forEach(review => {

        newState[review.id] = review
      })
      return newState
    }


  case ONE_REVIEW: {
    newState = {...state}
    newState[action.payload.id] = action.payload
    return newState
  }

  case CREATE_REVIEW: {
    newState = {...state}
    newState[action.payload.id] = action.payload
    return newState
  }
  case EDIT_REVIEW:{
    newState = {...state}
    console.log("EDIT REVIEW THUNK", newState)
    newState[action.review.id] = action.review
    console.log("EDIT REVIEW THUNK AFTER", newState)
    return newState
  }
  case DELETE_REVIEW:{
    newState = {...state}
    delete newState[action.review]
    return newState
  }

  default: {
    return state
    }
  }
}

export default reviewReducer
