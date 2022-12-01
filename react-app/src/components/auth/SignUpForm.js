import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signupform.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

    const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      console.log("first",first_name, "last",last_name, "PW",password)
      const data = await dispatch(signUp(username, email, password, first_name, last_name ));
      if (data) {
        setErrors(data)

      }
    }
    else{setErrors(["Passwords must match"])}
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (


    <div className='outermostSignupDiv'>

    <form onSubmit={onSignUp} className='signupForm'>
      <div className="someOther-div">
      <div className="errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      Enter your information
        <div className="label-container">
        <label className='emailSignupLabel'>User Name</label>
        <input
          id='userNameSignUpBox'
          className='signupemailbox'
          type='text'
          max={10}
          name='username'
          onChange={updateUsername}
          value={username}
          required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        ></input>
        </div>
        <div className="label-container">
        <label className='emailSignupLabel'>Email</label>
        <input
          id='signInEmailBox'
          className='signupemailbox'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
        </div>

        <div className="label-container">
          <label className='emailSignupLabel'>First Name</label>
          <input
          id='firstnamesignupbox'
          className='signupemailbox'
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={first_name}
          required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"

        ></input>
        </div>
        <div className="label-container">
          <label className='emailSignupLabel'>Last Name</label>
          <input
          id='signUpLastNameBox'
          className='signupemailbox'
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={last_name}
          required pattern="[a-zA-Z,'. + -]+" title="Alphabetic characters only!"
        ></input>
        </div>


        <div className="label-container">
        <label className='emailSignupLabel'>Password</label>
        <input
          id='passwordSignUpIdBox'
          className='signupemailbox'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
        </div>

        <div className="label-container">
        <label className='emailSignupLabel' >Confirm Password</label>
        <input
          id='labelRepeatPassword'
          className='signupemailbox'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        </div>
         <button id='signupButton' type='submit'>Sign Up</button>
        </div>

    </form>
    </div>

  );
};

export default SignUpForm;
