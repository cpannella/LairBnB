import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { createSpotThunk, fetchSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './spotForms.css'

export default function CreateSpotForm({setShowModal}){
  const num = 0
  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [price, setPrice] = useState('')
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
      setShowModal(false)


    }
  }


  return (

    <div className="edit-spot-form-container">
      <form className="spot-forms" onSubmit={handleSubmit}>
        <div>Upload your spot</div>

        <div>
        <input
        placeholder="Enter your lair's name"
        type="text"
        maxLength={60}
        value={name}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        onChange={(e)=> setName(e.target.value)}
        >
        </input>
        <div><p className="counter">{name?.length}/60 </p></div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's address"
        type="text"
        maxLength={20}
        value={address}
        required pattern="[a-zA-Z, 0-9, '. ! ? + -]+" title="Alphanumeric character's only"
        onChange={(e)=> setAddress(e.target.value)}
        >
        </input>
        <div><p className="counter">{address?.length}/20</p></div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's city"
        type="text"
        maxLength={20}
        value={city}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        onChange={(e)=> setCity(e.target.value)}
        >
        </input>
        <p className="counter">{city?.length}/20</p>
        </div>

        <div>
        <input
        placeholder="Enter your lair's state"
        type="text"
        maxLength={20}
        value={state}
        required
        onChange={(e)=> setState(e.target.value)}
        >
        </input>
        <div className="counter">{state?.length}/20</div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's country"
        type="text"
        maxLength={20}
        value={country}
        required
        onChange={(e)=> setCountry(e.target.value)}
        >
        </input>
        <div><p className="counter">{country?.length}/20</p></div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's price"
        type="text"
        maxLength={10}
        value={price}
        required pattern="[0-9,'. + -]+" title="Numeric characters only"
        onChange={(e)=> setPrice(e.target.value)}
        >
        </input>
        <div><p className="counter">{price?.length}/10</p></div>
        </div>

        <div>
        <textarea
        placeholder="Enter your lair's description"
        type="textarea"
        maxLength={150}
        value={description}
        required
        onChange={(e)=> setDescription(e.target.value)}
        >
        </textarea>
        <div><p className="counter">{description?.length}/150</p></div>
        </div>

        <div>
        <input
        placeholder="Enter an ImageUrl for your lair"
        type="text"
        maxLength={500}
        value={url}
        required
        onChange={(e)=> setUrl(e.target.value)}
        >
        </input>
        <div><p className="counter">{url?.length}/500</p></div>
        </div>

        <button type="submit">Submit</button>

      </form>

    </div>

  )


}
