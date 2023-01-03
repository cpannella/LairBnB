import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState} from 'react'
import "./bookings.css"
import { fetchBookings } from "../../store/bookings"


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
      <h1>THESE ARE THE AllBookings</h1>
      {bookingArr.map(booking => (
        <div>
          {booking.spot_id}
          <p>Start date!  {booking.start_date}</p>
          <p>End Date!  {booking.end_date}</p>

        </div>
      ))}
    </div>

  )

}
export default AllBookings
