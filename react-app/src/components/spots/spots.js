
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { fetchSpots, deleteSpotThunk } from "../../store/spots";
import "./spotsIndex.css"



export default function AllSpots(){
  const dispatch = useDispatch()
  const history = useHistory()
  const thisUser = useSelector(state => state.session.user);
  const spotsState = useSelector(state => state.spots)
  const spots = Object.values(spotsState)


  useEffect(()=>{
    dispatch(fetchSpots())
    
  },[dispatch])


  return (
    <div className="somediv">

          <h1>Browse Spots</h1>
          <div className="spotCard-container">
            {spots.map(spot =>
              <div className="spotCard">
                <div>
                  <img onClick={()=> history.push(`spots/${spot.id}`)}className="main-spot-img" src={spot.url}></img>
                </div>
                <div className="spotCard-details">
                  <h3 className="spotCard-info">{spot.name}</h3>
                  <h4 className="spotCard-info">{spot.state}, {spot.country}</h4>
                  <h4 className="spotCard-info">${spot.price}</h4>
                </div>
                <button onClick={()=> dispatch(deleteSpotThunk(spot.id))}>Delet</button>

              </div>
              )}
          </div>

    </div>
    )

}
