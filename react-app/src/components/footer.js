import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Modal} from '../context/Modal.js'
import linked from './linkedicon.jpg'
import giticon from './giticon.jpg'
import './navbar.css'

const Footer = () => {





  return (
    <div className="footer">
      <a href="https://github.com/cpannella/LairBnB">
      <img className="aboutLink"src={giticon}></img>
      </a>
      <a className="linked"href="https://www.linkedin.com/in/chrisotpher-pannella-ab0852242/">
      <img className="aboutLink" src={linked}></img>
      </a>
    </div>
  )
}

export default Footer
