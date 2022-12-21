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

const allReviews = payload => {
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
