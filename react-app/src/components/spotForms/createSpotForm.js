import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { createSpotThunk } from "../../store/tasks";
import { useHistory } from "react-router-dom";


export default function SpotForm(){
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')


  const handleSubmit= async (e) => {
    e.preventDefault()
    const payload={
      name,
      address,
      state,
      country,
      price,
      description,
      city
    }

    let spotCreated = await dispatch(createSpotThunk(payload))
    if (spotCreated){
      setName('')
      setAddress('')
      setState('')
      setCountry('')
      setPrice('')
      setDescription('')
      setCity('')
    }
  }


  return (

    <div className="create-spot-form-container">
      <form>
        <input
        placeholder="Enter your lairs name"
        type="text"
        maxLength={60}
        value={name}
        required
        onChange={(e)=> setName(e.target.value)}
        >
        </input>

        <input
        placeholder="Enter your lair's address"
        type="text"
        maxLength={60}
        value={address}
        required
        onChange={(e)=> setAddress(e.target.value)}
        >
        </input>

        <input
        placeholder="Enter your lair's city"
        type="text"
        maxLength={60}
        value={city}
        required
        onChange={(e)=> setCity(e.target.value)}
        >
        </input>

        <input
        placeholder="Enter your lair's state"
        type="text"
        maxLength={60}
        value={state}
        required
        onChange={(e)=> setState(e.target.value)}
        >
        </input>




        <input
        placeholder="Enter your lair's country"
        type="text"
        maxLength={60}
        value={country}
        required
        onChange={(e)=> setCountry(e.target.value)}
        >
        </input>

        <input
        placeholder="Enter your lair's price"
        type="text"
        maxLength={60}
        value={price}
        required
        onChange={(e)=> setPrice(e.target.value)}
        >
        </input>

        <input
        placeholder="Enter your lair's description"
        type="text"
        maxLength={60}
        value={description}
        required
        onChange={(e)=> setDescription(e.target.value)}
        >
        </input>


      </form>

    </div>

  )


}
