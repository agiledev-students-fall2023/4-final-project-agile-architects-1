import React, {useState} from "react";
import LoginButton from './components/LoginButton';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import "./Register.css";

export const Register = () => {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);

  }
  return (
    <div className="register-page">
      <LoginButton className="login-button-in-register" as={Link} to="/login">Log In</LoginButton>

      <div className="auth-form-container">
        <div className="register-display">

        

          <div className="text-wrapper-wastewise">Waste Wise</div>


          <div className="register-group" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
            <div >
              <p className="text-wrapper-register" style={{width: '3.5em', textAlign: 'center'}}>Register</p>
            </div>
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
        </div>

          </div> 
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">

              <input className="input-field" value={username} onChange={(e)=>setUser(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
            </div>
            <div className="input-wrapper">

              <input className="input-field" value={password} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
            </div>

            <div className="input-wrapper">

              <input className="input-field" value={password} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Confirm Password" id="password" name="password"/>
            </div>
            <LoginButton className="register-button-register-page" as={Link} to="/">Log In</LoginButton>
          </form>
          {/*
          <button>Don't have an account? Register</button>
    */}
        <Link className="text-wrapper-continue" to="/">Continue without account</Link>
      </div>
    </div>
  );
};

export default Register;