import React, {useState} from "react";
import LoginButton from '../../components/LoginButton';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const {login, error, isLoading} = useLogin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  };

  
  return (
    <div className="login-page">
      <LoginButton className="register-button-in-login" as={Link} to="/register">Register</LoginButton>
      <div className="auth-form-container">
        <div className="login-display">
          <div className="text-wrapper-wastewise">Waste Wise</div>
          <div className="login-group">
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
            <div>
              <p className="text-wrapper-login" style={{width: '3.5em', textAlign: 'center'}}>Log In</p>
            </div>
          <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
        </div>
      </div> 

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="input-wrapper-login">
              <input 
                className="input-field-login" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                type="email" 
                placeholder="Email" 
                id="email" 
                name="email"
              />
            </div>

            <div className="input-wrapper-login">
              <input 
                className="input-field-login" 
                value={password} 
                onChange={(e)=>setPass(e.target.value)} 
                type="password" 
                placeholder="Password" 
                id="password" 
                name="password"/>
            </div>

            <button disabled={isLoading} type="submit" className="login-button-login-page" >Log In</button>
            {error && <div className="error">{error}</div>}
          </form>

        <Link className="text-wrapper-continue-login" onClick={()=> navigate(-1)}>Continue without account</Link>
      </div>
    </div>
  );
};

export default Login;