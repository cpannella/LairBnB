import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllSpots from './components/spots/spots';
import OneSpot from './components/spots/oneSpot';
import CreateSpotForm from './components/spotForms/createSpotForm';
import EditSpotForm from './components/spotForms/editSpotForm';
import Footer from './components/footer';
import SearchPage from './components/searchPage';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Footer/>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route exact path="/spots/new">
          <CreateSpotForm/>
        </Route>
        <Route exact path='/spots/:id/edit'>
          <EditSpotForm/>
        </Route>
        <Route exact path='/spots/:id'>
          <OneSpot/>
        </Route>
        <Route path ="/search/:searchTerm">
          <SearchPage/>
        </Route>
        <Route exact path='/bookings'>
          
        </Route>
        <Route path='/' exact={true} >
          <AllSpots/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
