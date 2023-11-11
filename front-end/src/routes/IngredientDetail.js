import React , { useState } from 'react';
import { useNavigate, useParams, useLocation, Link} from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { BsClockHistory } from 'react-icons/bs';
import LoginButton from '../components/LoginButton';

import './IngredientDetail.css';

function IngredientDetail() {
    let { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const post = location.state ? location.state.post : null;
    const [comment, setComment] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
    }

    // use the id to fetch the details of the ingredient
    if (!post) {
        console.log('No post found in state. Redirecting to home page.');
        navigate('/');
        return;
    }

    

    return (
        <section className='ingredient-detail-page'>
            <section className='top-bar'>
                <button className="back-button" onClick={()=> navigate(-1)}>
                    <IoIosArrowBack></IoIosArrowBack>
                </button>
                {/*
                <div className='ingredient-name'>{post ? post.title: 'Unknown Name'} </div>
                */}
                <LoginButton className="register-button-in-login" as={Link} to="/register">Register</LoginButton>
            </section>

            {post && (
                <section className='ingredient-detail'>
                    <img className='ingredient-img' src={post.image} alt={post.title}/>
                    <section className='selling-info'>
                        <section className='info-without-description'>
                            <img className="profile-picture" alt="User Profile" src="/profile_pic.png"/>
                            <div className="ingredient-info">
                                <div className="name-wrapper">
                                    {post.title}
                                </div>
                                <div className="number-wrapper">
                                    Ingredient ammount
                                </div>
                                <div className="location-info">
                                    <div className='location-icon'>
                                        <FaLocationDot></FaLocationDot>
                                    </div>
                                    <div className="location-wrapper">
                                        User location
                                    </div>
                                </div>
                                <div className="expiration-info">
                                    <div className='time-icon'>
                                        <BsClockHistory></BsClockHistory>
                                    </div>
                                    <div className="expiration-wrapper">
                                        Expiration
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='description'>
                            <div className='description-wrapper'>Discription_optional</div>
                            <div className="ingredient-discription">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                            </div>
                            <section className='ingredient-hashtags'>
                                <div className='hashtag'>#nulla eius</div>
                                <div className='hashtag'>#neque</div>
                                <div className='hashtag'>#quisquam</div>
                            </section>
                        </section>
                    </section>
                </section>
            )}
            <section className="comment-section">
                <div className="sending-comment">
                    <img className="profile-picture" alt="User Profile" src="/profile_pic.png"/>
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <input className="compose-comment" value={comment} onChange={(e)=>setComment(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment"/>
                    </form>
                    <button className="send-button">
                        Send
                    </button>
                </div>
                <div className="user-comments">
                    <div className="title-wrapper">Comments</div>
                </div>
            </section>
        </section>
        );
    }

export default IngredientDetail;