import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const SearchPage = () => {
  const {searchTerm} = useParams()
  const search = searchTerm.toLowerCase()
  const spots = useSelector(state => state.spots)
  const spotsArr = Object.values(spots)
  const filteredSpots = spotsArr.filter(spot => spot.name.toLowerCase().includes(search) || spot.description.toLowerCase().includes(search))
  console.log(searchTerm)
  console.log(spotsArr)
  console.log(filteredSpots)
  return (
    <div>
    <h1 className="searchSomething">404 not found</h1>
    {filteredSpots?.map(spot => (
      <div >
        <p className="searchSomething">{spot?.name}</p>
      </div>
    ))}
    </div>
  )
}
export default SearchPage
