import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import { FaHome, FaUtensils, FaShoppingBasket, FaUser } from 'react-icons/fa';
import { BiSolidFridge } from "react-icons/bi";
import { GiFruitBowl } from "react-icons/gi";

import './App.css';

import Home from './routes/Home';
import MyFridge from './routes/MyFridge';
import MyProfile from './routes/MyProfile';
import PlanMeal from './routes/PlanMeal';
import BrowseIngredients from './routes/Ingredients-page/Ingredients';
import Login from './routes/Login-Register/Login';
import Register from './routes/Login-Register/Register';
import RecommendedRecipes from './routes/RecommendedRecipes';
import IngredientDetail from './routes/Ingredients-page/IngredientDetail';
import NewIngredientPost from './routes/Ingredients-page/NewIngredientPost';
import { useLogout } from './routes/hooks/useLogout';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthContext } from './routes/hooks/useAuthContext';
import EditProfile from './routes/EditProfile';

function MainContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogoutClick = () => {
      logout()
    }

    const handleLoginClick = () => {
        navigate('/login')
    }

    return (
        <div className='main-container'>
            <div className='login-logout-container'>
            {user && (
                <div>
                {["/", "/fridge", "/plan", "/recommended-recipes", "/profile"].indexOf(location.pathname) !== -1 && (
                    <button onClick = {handleLogoutClick} className="logout-button">Log Out</button>
                )}
                </div>
            )}

            {!user && (
                <div>
         
                {["/", "/fridge", "/plan", "/recommended-recipes", "/profile"].indexOf(location.pathname) !== -1 && (
                        <button onClick = {handleLoginClick} className="login-button" >Log In</button>
                    )}
                </div>
            )}
                
            </div>
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
                <Route path="/browse/details/:id" element={<IngredientDetail />} />
                <Route path="/browse/newpost" element={<NewIngredientPost />} />
                <Route path="/profile/edit-profile" element={<EditProfile />} />
            </Routes>

            {
                ["/", "/browse", "/fridge", "/plan", "/profile"].indexOf(location.pathname) !== -1 && (
                    <nav className="Navigation-Bar">
                        <Link className="nav-item" to="/">
                            <FaHome size={22}/>
                            <span>Home</span>
                        </Link>
                        <Link className="nav-item" to="/browse">
                            <FaShoppingBasket size={22}/>
                            <span>Browse</span>
                        </Link>
                        <Link className="nav-item" to="/fridge">
                            <GiFruitBowl size={22}/>
                            <span>My Fridge</span>
                        </Link>
                        <Link className="nav-item" to="/plan">
                            <FaUtensils size={22}/>
                            <span>Plan Meal</span>
                        </Link>
                        <Link className="nav-item" to="/profile">
                            <FaUser size={22}/>
                            <span>Profile</span>
                        </Link>
                    </nav>
                )
            }
        </div>
    );
}

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <MainContent/>
            </Router>
        </AuthContextProvider>
    );
}

export default App;

