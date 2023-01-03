import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState} from 'react'
import "./bookings.css"
import { deleteBookingThunk, fetchBookings,  } from "../../store/bookings"


const AllBookings = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const bookings = useSelector(state  => state.bookings)
  const bookingArr = Object.values(bookings)
  console.log("THIS IS THE BOOKINGS STATE",bookingArr)

  useEffect(()=>{
    dispatch(fetchBookings())
  }, [dispatch])




  return (
    <div className="bookings-container">
      <h1>Bookings</h1>
      {bookingArr.map(booking => (
        <div className="booking-card">
          <img className="booking-img"src={booking?.spot[0]?.url}></img>
          <div>
            <p>{booking?.spot[0]?.name}</p>
            <p>Start date!  {booking.start_date}</p>
            <p>End Date!  {booking.end_date}</p>
            <button onClick={()=> dispatch(deleteBookingThunk(booking.id))}>Delete</button>
          </div>
        </div>
      ))}
    </div>

  )

}
export default AllBookings
