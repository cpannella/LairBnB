
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchSpots } from "../store/spots";




export default function AllSpots(){
  const dispatch = useDispatch()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)

  


  useEffect(()=>{
    dispatch(fetchSpots())
  },[dispatch])


  return (
    <div>
      <h1>Spots</h1>
      {spots.map(spot =>
        <div>
          <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
          <h2>{spot.name}</h2>
          <p>{spot.address}</p>
          <p>{spot.state}</p>
          <p>{spot.country}</p>
          <p>{spot.price}</p>
          <p>{spot.description}</p>
          <p>{spot.city}</p>
        </div>
        )}
    </div>
    )

}
