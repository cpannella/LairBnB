import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './loginform.css'

const LoginForm = () => {

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(password)
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

const demoUser = () => {
  setEmail('demo@aa.io');
  setPassword('password');
  // history.push('/all')
}


  if (user) {
    return <Redirect to='/all' />;
  }

  return (
    <div>
    <form onSubmit={onLogin} id='loginForm'>
      <p>Login</p>

      <div className="someDiv">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='outerlogindiv'>

        <input
          className='loginemailbox'
          id='loginemailboxid'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='outerlogindiv'>

        <input
          className='loginemailbox'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />

      </div>
      <div id='loginFormModalButtonDiv'>
      <button id='loginButton' type='submit'>Login</button>
      <button className="demo" onClick={demoUser}>Demo User</button>
      </div>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
