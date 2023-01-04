const ONE_BOOKING = 'bookings/one'
const CREATE_BOOKING = 'bookings/new'
const EDIT_BOOKING = 'bookings/edit'
const DELETE_BOOKING = 'bookings/delete'
const ALL_BOOKINGS = 'bookings/all'


const oneBooking = payload => {
  return {
      type: ONE_BOOKING,
      payload
  }
}

const allBookings = payload => {
  return {
      type: ALL_BOOKINGS,
      payload
  }
}

const createBooking = (payload) => {
  return {
      type: CREATE_BOOKING,
      payload
  }
}

const editBooking = (booking) => {
  return {
      type: EDIT_BOOKING,
      booking
  }
}

const deleteBooking = (booking) => {
  return {
      type: DELETE_BOOKING,
      booking
  }
}



export const fetchBookings = () => async dispatch => {
  const response = await fetch('/api/spots/bookings')

  if(response.ok){
    const bookings = await response.json()
    dispatch(allBookings(bookings))
    return bookings
  }
}


export const fetchOneBooking = (id) => async dispatch => {
  const response = await fetch(`/api/spots/bookings/${id}`)
  if(response.ok){
    const singleBooking = await response.json()
    dispatch(oneBooking(singleBooking))
    return singleBooking
  }
}


export const createBookingThunk = (payload, id) => async dispatch => {
  console.log("PAYLOAD IN THUNK",payload)
  const response = await fetch(`/api/spots/${id}/new_booking`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if(response.ok){
    const newBooking = await response.json()
    console.log("NEWBOOKING RE")
    dispatch(createBooking(newBooking))
    return newBooking
  }
}



export const editBookingThunk = (booking, id) => async dispatch => {
  const response = await fetch(`/api/spots/bookings/${id}/edit`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(booking)
  })

  if(response.ok){
    const booking = await response.json()
    dispatch(editBooking(booking))
    return booking
  }
}

export const deleteBookingThunk = (id) => async dispatch => {
  const response = await fetch(`/api/spots/bookings/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  })

  if(response.ok){
    const booking = `${id}`
    dispatch(deleteBooking(booking))
  }
}


const initialState = {}

  function bookingReducer(state = initialState, action){
    let newState;

    switch(action.type){
      case ALL_BOOKINGS:{
        newState = {...state}
        action.payload.bookings.forEach(booking => {
          newState[booking.id] = booking
        })
        return newState
      }
      case ONE_BOOKING:{
        newState = {...state}
        newState[action.payload.id] = action.payload
        return newState
      }
      case CREATE_BOOKING: {
        newState = {...state}
        newState[action.payload.id] = action.payload
        return newState
      }

      case EDIT_BOOKING:{
        newState = {...state}
        newState[action.booking.id] = action.booking
        return newState
      }
      case DELETE_BOOKING: {
        newState = {...state}
        delete newState[action.booking]
        return newState
      }

      default: {
        return state
      }
    }
  }

  export default bookingReducer
