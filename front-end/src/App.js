import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Home from './routes/Home';
import MyFridge from './routes/MyFridge';
import MyProfile from './routes/MyProfile';
import PlanMeal from './routes/PlanMeal';
import BrowseIngredients from './routes/Ingredients';
import Login from './routes/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<BrowseIngredients />} />
                <Route path="/fridge" element={<MyFridge />} />
                <Route path="/plan" element={<PlanMeal />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/login" element={<Login />} />

            </Routes>
            <div className="Top-Nav">
                <Link className="login-button" to="/login">Log In</Link>
            </div>

            <nav className="Navigation-Bar">
                <Link className="nav-item" to="/">Home</Link>
                <Link className="nav-item" to="/browse">Browse Ingredients</Link>
                <Link className="nav-item" to="/fridge">My Fridge</Link>
                <Link className="nav-item" to="/plan">Plan Meal</Link>
                <Link className="nav-item" to="/profile">My Profile</Link>
            </nav>


        </Router>

    );
}

export default App;
