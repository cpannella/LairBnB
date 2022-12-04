import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk, fetchOneSpot } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import './spotForms.css'

export default function EditSpotForm({setShowModal}){
  const {id} = useParams()
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)
  const filteredSpot = spots.filter(spot => spot.id == id)[0]
  console.log('fugazi Pancakes')




  const dispatch = useDispatch()

  const history = useHistory()
  const [validationErrors, setValidationErrors] = useState([])
  const [name, setName] = useState(filteredSpot?.name)
  const [address, setAddress] = useState(filteredSpot?.address)
  const [state, setState] = useState(filteredSpot?.state)
  const [country, setCountry] = useState(filteredSpot?.country)
  const [price, setPrice] = useState(filteredSpot?.price.toString())
  const [description, setDescription] = useState(filteredSpot?.description)
  const [city, setCity] = useState(filteredSpot?.city)
  const [url, setUrl] = useState(filteredSpot?.url)


  useEffect(()=>{
    const errors = []
    console.log("THIS IS A CONSOLE LOG",!url.endsWith('jpg'))
    if(!((url.endsWith(".jpg"))||(url.endsWith('.png'))))errors.push("Must be valid image type 'jpg', or 'png'")
    setValidationErrors(errors)
  },[url])

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
      setShowModal(false)

    }
  }


  return (

    <div className="edit-spot-form-container">
      <form className="spot-forms" onSubmit={handleSubmit}>
      <div>
        {validationErrors.map((error, ind) => (
          <div key={ind}><p id="edit-error" className="counter">{error}</p></div>
        ))}
        </div>
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
        maxLength={20}
        value={city}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        onChange={(e)=> setCity(e.target.value)}
        >
        </input>
        <div><p className="counter">{city?.length}/20</p></div>

        <input
        placeholder="Enter your lair's state"
        type="text"
        maxLength={20}
        value={state}

        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        onChange={(e)=> setState(e.target.value)}
        >
        </input>
        <div className="counter">{state?.length}/20</div>

        <input
        placeholder="Enter your lair's country"
        type="text"
        maxLength={20}
        value={country}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        onChange={(e)=> setCountry(e.target.value)}
        >
        </input>
        <div><p className="counter">{country?.length}/20</p></div>

        <input
        placeholder="Enter your lair's price"
        type="text"
        maxLength={10}
        value={price}
        onChange={(e)=> setPrice(e.target.value)}
        required pattern="[0-9,'. + -]+" title="Numeric characters only"
        >
        </input>
        <div><p className="counter">{price?.length}/10</p></div>

        <textarea
        placeholder="Enter your lair's description"
        type="textarea"
        maxLength={150}
        value={description}
        required pattern="[a-zA-Z, 0-9, '. ! ? + -]+" title="Alphanumeric character's only"
        onChange={(e)=> setDescription(e.target.value)}
        >
        </textarea>
        <div><p className="counter">{description?.length}/150</p></div>

        <p className='counter'> Must be valid image 'jpg, or png'</p>
          <p className="counter">If file is corrupted a default will be provided</p>
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

        <button type="submit"
        disabled={validationErrors.length > 0}>Submit</button>
        <button  className="cancel" onClick={()=> history.push(`/spots/${id}`)}> Cancel</button>

      </form>

    </div>


  )


}
