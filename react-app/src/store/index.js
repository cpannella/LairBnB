import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bookingReducer from './bookings';
import reviewReducer from './reviews';
import SessionReducer from './session'
import spotReducer from './spots';

const rootReducer = combineReducers({
  session: SessionReducer,
  spots: spotReducer,
  reviews: reviewReducer,
  bookings: bookingReducer
});


let enhancer;


if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
