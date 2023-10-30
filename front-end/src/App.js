import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';

import './App.css';

import Home from './routes/Home';
import MyFridge from './routes/MyFridge';
import MyProfile from './routes/MyProfile';
import PlanMeal from './routes/PlanMeal';
import BrowseIngredients from './routes/Ingredients';
import Login from './routes/Login';
import LoginButton from './components/LoginButton';
import Register from './routes/Register';
import RecommendedRecipes from './routes/RecommendedRecipes';

function MainContent() {
    const location = useLocation();

    return (
        <>
        {
            ["/", "/browse", "/fridge", "/plan", "/profile"].indexOf(location.pathname) !== -1 && (
            <LoginButton className="login-button" as={Link} to="/login">Log In</LoginButton>
            )
        }
            <div className="App-Header">{location.pathname}</div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<BrowseIngredients />} />
                <Route path="/fridge" element={<MyFridge />} />
                <Route path="/plan" element={<PlanMeal />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recommended-recipes" element={<RecommendedRecipes />} />
            </Routes>

            {
                ["/", "/browse", "/fridge", "/plan", "/profile"].indexOf(location.pathname) !== -1 && (
                    <nav className="Navigation-Bar">
                        <Link className="nav-item" to="/">Home</Link>
                        <Link className="nav-item" to="/browse">Browse Ingredients</Link>
                        <Link className="nav-item" to="/fridge">My Fridge</Link>
                        <Link className="nav-item" to="/plan">Plan Meal</Link>
                        <Link className="nav-item" to="/profile">My Profile</Link>
                    </nav>
                )
            }
        </>
    );
}

function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}

export default App;

