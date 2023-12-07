import React, {useState} from "react";
import LoginButton from '../../components/LoginButton';
import { Link } from 'react-router-dom';
import { useRegister } from "../hooks/useRegister";
import "./Register.css";

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const {register, error, isLoading} = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password)
  }

  return (
    <div className="register-page">
      <LoginButton className="login-button-in-register" as={Link} to="/login">Log In</LoginButton>

      <div className="auth-form-container">
        <div className="register-display">

          <div className="text-wrapper-wastewise">Waste Wise</div>

          <div className="register-group" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div className="line-wrapper-register" style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
            <div >
              <p className="text-wrapper-register" style={{width: '4em', textAlign: 'center'}}>Register</p>
            </div>
            <div className="line-wrapper-register" style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
        </div>

          </div> 
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-wrapper-register">
              <input 
                className="input-field-register" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                type="email" 
                placeholder="Email" 
                id="email" 
                name="eamil"
              />
            </div>

            <div className="input-wrapper-register">
              <input 
                className="input-field-register" 
                value={password} 
                onChange={(e)=>setPass(e.target.value)} 
                type="password" 
                placeholder="Password" 
                id="password" 
                name="password"/>
            </div>
            
            <button disabled={isLoading} type="submit" className="register-button-register-page">Register</button>
            {error && <div className="error">{error}</div>}
          </form>
          {/*
          <button>Don't have an account? Register</button>
    */}
        <Link className="text-wrapper-continue-register" to="/">Continue without account</Link>
      </div>
    </div>
  );
};

export default Register;