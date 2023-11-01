import React, {useState} from "react";
import LoginButton from '../components/LoginButton';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import "./Login.css";

export const Login = () => {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);

  }
  return (
    <div className="login-page">
      <LoginButton className="register-button-in-login" as={Link} to="/register">Register</LoginButton>
      <div className="auth-form-container">

        

        <div className="login-display">
          <div className="text-wrapper-wastewise">Waste Wise</div>


          <div className="login-group" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
            <div >
              <p className="text-wrapper-login" style={{width: '3.5em', textAlign: 'center'}}>Log In</p>
            </div>
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
        </div>

          </div> 
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-wrapper-login">

              <input className="input-field-login" value={username} onChange={(e)=>setUser(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
            </div>
            <div className="input-wrapper-login">

              <input className="input-field-login" value={password} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
            </div>
            <LoginButton className="login-button-login-page" as={Link} to="/">Log In</LoginButton>
          </form>
          {/*
          <button>Don't have an account? Register</button>
    */}
        <Link className="text-wrapper-continue-login" to="/">Continue without account</Link>
      </div>
    </div>
  );
};

export default Login;