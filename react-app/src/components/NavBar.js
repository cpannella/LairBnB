
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useHistory } from 'react-router-dom';
import {Modal} from '../context/Modal.js'
import CreateSpotForm from './spotForms/createSpotForm';
import './navbar.css'

const NavBar = () => {



  const history = useHistory()
  return (
    <div className="navbar-container">
      <nav>
        <div className="navbar">
            <div className="navHome">
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
              <div></div>
            <div>
              <button onClick={()=> history.push('/spots/new')}>Become a host</button>
            </div>
            </div>

            <div className="navEnd">
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
            <LogoutButton />
            </div>




        </div>
      </nav>
    </div>
  );
}

export default NavBar;
