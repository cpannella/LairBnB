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


  if(!bookingArr.length){
    return (
      <div className="bookings-container">
        <h1>You don't have any trips booked yet.</h1>
      </div>
    )
  }

  return (
    <div className="bookings-container">
      <h1>Bookings</h1>
      {bookingArr.map(booking => (
        <div className="booking-card">
          <img className="booking-img"src={booking?.spot[0]?.url}></img>
          <div className="booking-details">
            <h4>{booking?.spot[0]?.name}</h4>
            <p>Start date:  {booking.start_date}</p>
            <p>End Date:  {booking.end_date}</p>
            <button onClick={()=> dispatch(deleteBookingThunk(booking.id))}>Delete</button>
          </div>
        </div>
      ))}
    </div>

  )

}
export default AllBookings
