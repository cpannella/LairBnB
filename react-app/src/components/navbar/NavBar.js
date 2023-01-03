
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Modal} from './context/Modal.js'
import linked from './linkedicon.jpg'
import giticon from './giticon.jpg'
import CreateSpotFormModal from './spotForms/createSpotFormModal'
import './navbar.css'
import icon from './LairBnBLogo.jpg'
import LoginForm from '../auth/LoginForm';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpFormModal';
import SearchBar from './searchBar';

const NavBar = () => {
  const history = useHistory()
  const sessionUser = useSelector(state => state.session)


  return (
    <div className="navbar-container">
      <nav>
        <div className="navbar">
            <div className="navHome">
              <img className="app-icon"src={icon} onClick={()=> history.push('/')}></img>
              {sessionUser.user &&
              <div className="upload-container">
                <CreateSpotFormModal/>

              </div>}
            </div>
            <div className="link-container">
            {/* <SearchBar/> */}

      </div>

            <div className="navEnd">
            {!sessionUser.user &&
            <div className="account-buttons">

              <LoginFormModal/>

              <SignUpFormModal/>

            </div>
            }
            {sessionUser.user &&
            <div className="logout-container">

              <p className="user-name">Welcome, {sessionUser?.user.username}</p>
              <LogoutButton />
            </div>
            }

            </div>




        </div>
      </nav>
    </div>
  );
}

export default NavBar;
