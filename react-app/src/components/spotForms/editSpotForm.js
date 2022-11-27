import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk, fetchOneSpot } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import './spotForms.css'

export default function EditSpotForm({}){
  const {id} = useParams()
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)
  const filteredSpot = spots.filter(spot => spot.id == id)[0]
  console.log(filteredSpot)




  const dispatch = useDispatch()

  const history = useHistory()
  const [name, setName] = useState(filteredSpot?.name)
  const [address, setAddress] = useState(filteredSpot?.address)
  const [state, setState] = useState(filteredSpot?.state)
  const [country, setCountry] = useState(filteredSpot?.country)
  const [price, setPrice] = useState(filteredSpot?.price.toString())
  const [description, setDescription] = useState(filteredSpot?.description)
  const [city, setCity] = useState(filteredSpot?.city)
  const [url, setUrl] = useState(filteredSpot?.url)


  useEffect(()=>{
    if(spotsState && spots.length > 0){
      // setName(filteredSpot?.name)

    }
  }, [filteredSpot?.price])

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
    console.log("THIS THAT PAYLOAD",payload)
    let spotEdited= await dispatch(editSpotThunk(payload, id))
    if (spotEdited){
      await dispatch (fetchOneSpot(id))
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

    <div className="edit-spot-form-container">
      <form className="spot-forms" onSubmit={handleSubmit}>
        <div>Edit spot form</div>
        <input
        placeholder="Enter your lair's name"
        type="text"
        maxLength={60}
        value={name}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        onChange={(e)=> setName(e.target.value)}
        >
        </input>
        <div><p className="counter">{name?.length}/60</p></div>

        <input
        placeholder="Enter your lair's address"
        type="text"
        maxLength={30}
        value={address}
        required pattern="[a-zA-Z, 0-9, '. ! ? + -]+" title="Alphanumeric character's only"
        onChange={(e)=> setAddress(e.target.value)}
        >
        </input>
        <div><p className="counter">{address?.length}/30</p></div>


        <input
        placeholder="Enter your lair's city"
        type="text"
        maxLength={30}
        value={city}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        onChange={(e)=> setCity(e.target.value)}
        >
        </input>
        <div><p className="counter">{city?.length}/30</p></div>

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

        <input
        placeholder="Enter your lair's country"
        type="text"
        maxLength={30}
        value={country}
        required
        onChange={(e)=> setCountry(e.target.value)}
        >
        </input>
        <div><p className="counter">{address?.length}/30</p></div>

        <input
        placeholder="Enter your lair's price"
        type="text"
        maxLength={60}
        value={price}
        required
        onChange={(e)=> setPrice(e.target.value)}
        >
        </input>
        <div><p className="counter">{price?.length}/10</p></div>

        <input
        placeholder="Enter your lair's description"
        type="textarea"
        maxLength={100}
        value={description}
        required
        onChange={(e)=> setDescription(e.target.value)}
        >
        </input>
        <div><p className="counter">{description?.length}/100</p></div>

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

        <button type="submit">Submit</button>
        <button  onClick={()=> history.push('/')}> Cancel</button>

      </form>

    </div>


  )


}
