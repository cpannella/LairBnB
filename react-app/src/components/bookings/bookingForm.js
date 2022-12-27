import { isFirstDayOfMonth } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { createBookingThunk } from "../../store/bookings";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

  function CreateBookingForm(){
  const {id} = useParams()
  console.log("THIS IS THE ID",id)
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date("2022-12-25"));
  const [endDate, setEndDate] = useState(new Date("2022-12-25"));

    //date needs to be "Year-Month-Day Hour:Minunte:Second"
    //starts as {startDate: Sat Feb 08 2014 00:00:00 GMT-0500 (Eastern Standard Time), endDate: Mon Feb 10 2014 00:00:00 GMT-0500 (Eastern Standard Time)}
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
      startDate: dateParser(startDate),
      endDate: dateParser(endDate)
    }
    console.log(payload)
    let bookingCreated = await dispatch(createBookingThunk(payload, id))
    setStartDate(new Date("2022-12-25"))
    setEndDate(new Date("2022-12-25"))
  }




  return (
  <form onSubmit={onSubmit}>
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
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
