
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { createBookingThunk } from "../../store/bookings";


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

  function CreateBookingForm(){
  const {id} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const bookings = useSelector(state  => state.bookings)
  const bookingArr = Object.values(bookings)
  const current = new Date();

  const otherdate = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`
  const [startDate, setStartDate] = useState(new Date(`${otherdate}`));
  const [endDate, setEndDate] = useState(new Date(`${otherdate}`));


  function dateParser(target){
    let str = target.toString()
    let arr = str.split(' ')
    let result = []
    for(let i = 1; i < 5; i++){
      console.log(arr[i])
      if(arr[i] == "Jan") arr[i] = '01'
      else if (arr[i] == 'Feb') arr[i] = '02'
      else if (arr[i] == 'Mar') arr[i] = '03'
      else if (arr[i] == 'Apr') arr[i] = '04'
      else if (arr[i] == 'May') arr[i] = '05'
      else if (arr[i] == 'Jun') arr[i] = '06'
      else if (arr[i] == 'Jul') arr[i] = '07'
      else if (arr[i] == 'Aug') arr[i] = '08'
      else if (arr[i] == 'Sep') arr[i] = '09'
      else if (arr[i] == 'Oct') arr[i] = '10'
      else if (arr[i] == 'Nov') arr[i] = '11'
      else if (arr[i] == 'Dec') arr[i] = '12'
    }

    for(let j = 1; j < 4;j++){
      result.push(arr[j])
    }
   let newDate = result.join('-')
   newDate += ` ${arr[4]}`
   return newDate
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    dateParser(startDate)
    const payload = {
      start_date: dateParser(startDate),
      end_date: dateParser(endDate)
    }
    console.log("THIS IS THE PAYLOAD",payload)
    let bookingCreated = await dispatch(createBookingThunk(payload, id))
    if(bookingCreated){
      history.push('/bookings')
    }
    setStartDate(new Date(`${otherdate}`))
    setEndDate(new Date(`${otherdate}`))
  }


  useEffect(()=> {

  },  [startDate,endDate])

  return (
  <form onSubmit={onSubmit}>
    <div className="calendar-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => [setStartDate(date), setEndDate(date)]}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={otherdate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <button type="submit">Submit</button>
  </div>
 </form>
  )
};

export default CreateBookingForm
