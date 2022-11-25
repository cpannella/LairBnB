import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { createSpotThunk, fetchSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import './spotForms.css'

export default function CreateSpotForm(){
  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [url, setUrl] = useState('')
  const [count, setCount] = useState(60)

  const handleSubmit= async (e) => {
    e.preventDefault()
    const payload={
      name,
      address,
      state,
      country,
      price,
      description,
      city,
      url
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
      setUrl('')

      history.push('/')
    }
  }


  return (

    <div className="spot-form-container">
      <form className="spot-forms" onSubmit={handleSubmit}>

        <input
        placeholder="Enter your lairs name"
        type="text"
        maxLength={60}
        value={name}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        onChange={(e)=> setName(e.target.value)}
        >
        </input>
        <div>{name.length}/60</div>

        <input
        placeholder="Enter your lair's address"
        type="text"
        maxLength={30}
        value={address}
        required pattern="[a-zA-Z, 0-9, '. ! ? + -]+" title="Alphanumeric character's only"
        onChange={(e)=> setAddress(e.target.value)}
        >
        </input>
        <div>{address.length}/30</div>


        <input
        placeholder="Enter your lair's city"
        type="text"
        maxLength={30}
        value={city}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        onChange={(e)=> setCity(e.target.value)}
        >
        </input>
        <div>{city.length}/30</div>

        <input
        placeholder="Enter your lair's state"
        type="text"
        maxLength={20}
        value={state}
        required
        onChange={(e)=> setState(e.target.value)}
        >
        </input>
        <div>{state.length}/20</div>

        <input
        placeholder="Enter your lair's country"
        type="text"
        maxLength={30}
        value={country}
        required
        onChange={(e)=> setCountry(e.target.value)}
        >
        </input>
        <div>{address.length}/30</div>

        <input
        placeholder="Enter your lair's price"
        type="text"
        maxLength={60}
        value={price}
        required
        onChange={(e)=> setPrice(e.target.value)}
        >
        </input>
        <div>{price.length}/10</div>

        <input
        placeholder="Enter your lair's description"
        type="text"
        maxLength={60}
        value={description}
        required
        onChange={(e)=> setDescription(e.target.value)}
        >
        </input>
        <div>{description.length}/60</div>

        <input
        placeholder="Enter an ImageUrl for your lair"
        type="text"
        maxLength={500}
        value={url}
        required
        onChange={(e)=> setUrl(e.target.value)}
        >
        </input>
        <div>{url.length}/500</div>

        <button type="submit">Submit</button>
        <button  onClick={()=> history.push('/')}> Cancel</button>

      </form>

    </div>

  )


}
