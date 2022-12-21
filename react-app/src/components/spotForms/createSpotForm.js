import React, { useEffect, useState } from "react";
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
  const [image, setImage] = useState('')
  const [count, setCount] = useState(60)
  const [validationErrors, setValidationErrors] = useState([])

  const handleSubmit= async (e) => {
    e.preventDefault()

    const formData = new FormData();
    console.log(formData)
    formData.append("image", image);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("city", city);

    let spotCreated = await dispatch(createSpotThunk(formData))
    if (spotCreated){
      setName('')
      setAddress('')
      setState('')
      setCountry('')
      setPrice('')
      setDescription('')
      setCity('')
      setImage('')
      setShowModal(false)
    }
  }



  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  return (

    <div className="edit-spot-form-container">
      <form className="spot-forms" onSubmit={handleSubmit}>
        <div>Upload your spot</div>
        <div>
        {validationErrors.map((error, ind) => (
          <div key={ind}><p id="create-error"className="counter">{error}</p></div>
        ))}
        </div>
        <div>
        <input
        className="spotInputField"
        placeholder="Enter your lair's name"
        type="text"
        maxLength={60}
        value={name}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        onChange={(e)=> setName(e.target.value)}
        >
        </input>
        <div><p className="counter">{name?.length}/60 </p></div>



        <input
        placeholder="Enter your lair's address"
        type="text"
        className="spotInputField"
        maxLength={30}
        value={address}
        required pattern="[a-zA-Z, 0-9, '. ! ? + -]+" title="Alphanumeric character's only"
        onChange={(e)=> setAddress(e.target.value)}
        >
        </input>
        <div><p className="counter">{address?.length}/30</p></div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's city"
        type="text"
        className="spotInputField"
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
        className="spotInputField"
        maxLength={20}
        value={state}
        onChange={(e)=> setState(e.target.value)}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        >
        </input>
        <div className="counter">{state?.length}/20</div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's country"
        type="text"
        className="spotInputField"
        maxLength={20}
        value={country}
        required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only"
        onChange={(e)=> setCountry(e.target.value)}
        >
        </input>
        <div><p className="counter">{country?.length}/20</p></div>
        </div>

        <div>
        <input
        placeholder="Enter your lair's price"
        type="text"
        className="spotInputField"
        maxLength={10}
        value={price}
        required pattern="[0-9]+" title="Numeric characters only"
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
        required="[a-zA-Z, 0-9, '. ! ? + -]+" title="Alphanumeric character's only"
        onChange={(e)=> setDescription(e.target.value)}
        >
        </textarea>
        <div><p className="counter">{description?.length}/150</p></div>
        </div>

        <div>
          <p className='counter'> Must be valid image 'jpg, or png'</p>
          <p className="counter">If file is corrupted a default will be provided</p>
        <input

        type="file"
        accept="image/*"
        onChange={updateImage}
        >
        </input>

        </div>

        <button type="submit"
        disabled={validationErrors.length > 0}
        >Submit</button>


      </form>

    </div>

  )


}
