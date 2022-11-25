
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useHistory } from 'react-router-dom';
import {Modal} from '../context/Modal.js'
import CreateSpotFormModal from './spotForms/createSpotFormModal';

const NavBar = () => {



  const history = useHistory()
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>

        <li>
          <LogoutButton />
        </li>


          <div>
            <CreateSpotFormModal/>
          </div>


      </ul>
    </nav>
  );
}

export default NavBar;
