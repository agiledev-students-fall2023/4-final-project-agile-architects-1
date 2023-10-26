import React from "react";
import { LoginButton } from "./components/LoginButton";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./Login.css";

export const Login = () => {
  return (
    <div className="log-in">
      <div className="div">
        <div className="login-page">
          <div className="text-wrapper-2">Waste Wise</div>
          <div className="overlap-group">
            <div className="text-wrapper-3">Log In</div>
            <img className="line" alt="Line" src="line-16.svg" />
            <img className="img" alt="Line" src="line-17.svg" />
          </div>
        </div>
    <div className="post-meal-invite">
          <div className="overlap">
            <div className="text-wrapper-4">Log In</div>
          </div>
        </div>
        <div className="username-input">
          <div className="overlap-2">
            <div className="text-wrapper-5">Username</div>
            <div className="rectangle" />
          </div>
        </div>
        <div className="password-input">
          <div className="div-wrapper">
            <div className="text-wrapper-6">Password</div>
          </div>
        </div>
        
        <Link className="text-wrapper-continue" to="/login">Continue without account</Link>
      </div>
    </div>
  );
};

export default Login;