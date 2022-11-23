const ALL_SPOTS = 'spots/all'
const ONE_SPOT = 'spots/one'
const CREATE_SPOT = 'spots/new'
const EDIT_SPOT = '/spots/edit'
const DELETE_SPOT = 'spots/delete'



const getAllSpots = payload => {

  return {
      type: ALL_SPOTS,
      payload
  }
}

const oneSpot = payload => {
  return {
      type: ONE_SPOT,
      payload
  }
}

const createSpot = payload => {
  return {
      type: CREATE_SPOT,
      payload
  }
}


const editSpot = (spot) => {
  return {
      type: EDIT_SPOT,
      spot
  }
}

const deleteSpot = (spotId) => {
  return {
      type: DELETE_SPOT,
      spotId
  }
}





export const fetchSpots = () => async dispatch => {
  const res = await fetch('/api/spots');

  if (res.ok) {
      const tasks = await res.json();
      dispatch(getAllSpots(tasks));
      return tasks
  }
}


export const fetchOneSpot = id => async dispatch => {

  const res = await fetch(`/api/spots/${id}`)
  if (res.ok) {
      const singleSpot = await res.json()
      dispatch(oneSpot(singleSpot))
      return singleSpot
  }
}


export const createSpotThunk = (payload) => async dispatch => {
  const response = await fetch('/api/spots/new_spot',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  const data = await response.json()

  if (response.ok) {
      await dispatch(createSpot(data))
      return data
  } else { // any bad requests and errors
      return data
  }
}


export const editSpotThunk = (task,id) => async dispatch => {
  console.log("THUNK FIRING", task, id)
  const response = await fetch(`/api/all/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(task)
  });
  if (response.ok) {
      const task = await response.json();

      dispatch(editSpot(task))
      return task
  }
  // error handling
  throw new Error("Not this time")
}



export const deleteSpotThunk = (spotId) => async dispatch => {
  const response = await fetch(`/api/all/${spotId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
  });
  if (response.ok) {
      const task = `${spotId}`
      dispatch(deleteSpot(task))
  }
}

let initialState = {}
const spotReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {

      case ALL_SPOTS: {
                   action.payload.spots.forEach(spot => {
              newState[spot.id] = spot
          })


          return newState
      }

      case ONE_SPOT: {
          newState = {...state}
          newState[action.payload.id] = action.payload
          return newState
      }

      case CREATE_SPOT: {
          newState = { ...state }
          newState[action.payload.id] = action.payload
          return newState
      }

      case EDIT_SPOT:
          newState= {...state}
          newState[action.spot.id]= action.spot
          // newState[action.spot.id]["reviews"]= state[action.spot.id].reviews
          return newState

      case DELETE_SPOT:
          newState = {...state}
          delete newState[action.Id]
          return newState;

      default: {
          return state;
      }
    }
  }


export default spotReducer
