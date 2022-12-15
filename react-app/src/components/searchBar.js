import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSpots, deleteSpotThunk } from "../store/spots";
import './search.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory('')
  const [searchInput, setSearchInput] = useState('')


  useEffect(()=>{
    dispatch(fetchSpots())
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      searchInput
    }
    history.push(`/search/${searchInput}`)
  }

  return (
    <div className="searchBar">
      <form className="searchForm"
      onSubmit={onSubmit}>
        <input className="searchField"
        id="search"
        type="text"
        placeholder="Anywhere"
        onChange={e => setSearchInput(e.target.value)}
        >
        </input>
      </form>
    </div>
  )
}
export default SearchBar
