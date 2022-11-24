import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";


export default function EditSpotForm(){
  const {id} = useParams()
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)
  const filteredSpot = spots?.filter(spot => spot.id == +id)[0]
  console.log(filteredSpot)



  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState(filteredSpot?.name)
  const [address, setAddress] = useState(filteredSpot?.address)
  const [state, setState] = useState(filteredSpot?.state)
  const [country, setCountry] = useState(filteredSpot?.country)
  const [price, setPrice] = useState(filteredSpot?.price)
  const [description, setDescription] = useState(filteredSpot?.description)
  const [city, setCity] = useState(filteredSpot?.city)
  const [url, setUrl] = useState(filteredSpot?.url)


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

    let spotEdited= await dispatch(editSpotThunk(payload))
    if (spotEdited){
      setName('')
      setAddress('')
      setState('')
      setCountry('')
      setPrice('')
      setDescription('')
      setCity('')
      setUrl('')
    }
  }


  return (

    <div className="create-spot-form-container">
      <form onSubmit={handleSubmit}>
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

        <input
        placeholder="Enter an ImageUrl for your lair"
        type="text"
        maxLength={1000}
        value={url}
        required
        onChange={(e)=> setUrl(e.target.value)}
        >
        </input>

        <button type="submit">Submit</button>
        <button  onClick={()=> history.push('/')}> Cancel</button>


      </form>

    </div>

  )


}
