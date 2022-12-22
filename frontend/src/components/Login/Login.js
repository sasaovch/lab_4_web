import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser, signupUser } from '../../services/auth';
import './Login.css';
import MD5 from "crypto-js/md5";

export default function Login({ setToken }) {
  const [login, setlogin] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const loginHandler = async e => {
    e.preventDefault();
    const token = await loginUser({
      login: login,
      password : MD5(password).toString()
    });
    if (token.status === 200) {
      setToken(token.token.replace("\"", ""));
    } else {
      setMessage(token.message);
    }
  }

  const signupHandler = async e => {
    e.preventDefault();
    const token = await signupUser({
      login: login,
      password : MD5(password).toString()
    });
    if ( token.status === 200 ) {
      setToken(token.token.replace("\"", ""));
    } else {
      setMessage(token.message);
    }
  }

  return(
    <div className="login-container">
    <div className="screen">
        <div className="screen__content">
            <form className="login">
                <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input type="text" className="login__input" placeholder="Login" onChange={e => setlogin(e.target.value)}/>
                </div>
                <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input type="password" className="login__input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="button login__submit" onClick={loginHandler}>
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                </button>		
                <button className="button login__submit" onClick={signupHandler}>
                    <span className="button__text">Sign Up Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                </button>	
                <div className='login__field__error'>
                  <span>{message}</span>
                </div>		
            </form>
            <div className="social-login">
            </div>
        </div>
        <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>		
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
        </div>		
    </div>
</div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
