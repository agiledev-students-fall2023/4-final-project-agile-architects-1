import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import { FaHome, FaUtensils, FaShoppingBasket, FaUser } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
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
        <div className='main-container'>
        {
            ["/", "/fridge", "/plan"].indexOf(location.pathname) !== -1 && (
            <LoginButton className="login-button" as={Link} to="/login">Log In</LoginButton>
            )
        }
            {/* <div className="App-Header">{location.pathname}</div> */}
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
                        <Link className="nav-item" to="/">
                            <FaHome size={22}/>
                            <span>Home</span>
                        </Link>
                        <Link className="nav-item" to="/browse">
                            <FaUtensils size={22}/>
                            <span>Browse</span>
                        </Link>
                        <Link className="nav-item" to="/fridge">
                            <FaShoppingBasket size={22}/>
                            <span>My Fridge</span>
                        </Link>
                        <Link className="nav-item" to="/plan">
                            <FaUtensils size={22}/>
                            <span>Plan Meal</span>
                        </Link>
                        <Link className="nav-item" to="/profile">
                            <FaUser size={22}/>
                            <span>My Profile</span>
                        </Link>
                    </nav>
                )
            }
        </div>
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

