
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchSpots, deleteSpotThunk } from "../../store/spots";
import "./spotsIndex.css"



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
          <button onClick={()=> [dispatch(deleteSpotThunk(spot.id)), dispatch(fetchSpots())]}>Delet</button>
          <p>SPOT ID{spot.id}</p>
          <h2>{spot.name}</h2>
          <p>USER_ID :{spot.user_id}</p>
          <p>{spot.address}</p>
          <p>{spot.state}</p>
          <p>{spot.country}</p>
          <p>{spot.price}</p>
          <p>{spot.description}</p>
          <p>{spot.city}</p>
          <div >
            <img className="main-spot-img" src={spot.url}></img>
          </div>
        </div>
        )}
    </div>
    )

}
