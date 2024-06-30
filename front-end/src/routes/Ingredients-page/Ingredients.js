import React, { useState, useEffect } from 'react';
import PostFLow from '../../components/PostFlow';
import TopSearchBar from '../../components/TopSearchBar';
import { FaArrowUp } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";

import './Ingredients.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function BrowseIngredients() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [searchStr, setSearchStr] = useState('')
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState(null)
    const [showScrollButton, setShowScrollButton] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchUser = async (userId) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile/${userId}`)
            const json = await response.json()
            if (response.ok){
                // console.log(json)
              setProfile(json)
            }
          } catch(error){
            console.error('Error fetching profile: ', error)
          }
        };
    
        if (user){
          fetchUser(user.userId);
        }
        
      }, [user]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/browse`);
            const result = await response.json();
            setPosts(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const navigateToNewPost = () => {
        navigate('/browse/newpost');
    }

    const filteredPosts = posts.filter(post => {
        const searchLower = searchStr.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(searchLower);
        const descriptionMatch = post.description.toLowerCase().includes(searchLower);
        const hashtagMatch = post.hashtags.some(hashtag => hashtag.toLowerCase().includes(searchLower));
        return titleMatch || descriptionMatch || hashtagMatch;
    });
    
    return (
        <div>
            <div className='ingredients-top-bar-container'>
                {user && profile && (
                    <TopSearchBar location={profile.zipcode} searchStr={searchStr} setSearchStr={setSearchStr} />
                )}
                {!user && (
                    <TopSearchBar location="10003" searchStr={searchStr} setSearchStr={setSearchStr}/>
                )}
            </div>

            <div className='ingredients-page-container'>  
                <div className='post-flow-container'>
                    <PostFLow posts={filteredPosts} />
                </div>
            </div>
            <div className='button-container'>
                <button className='scroll-to-top-button' onClick={scrollToTop}>
                    <FaArrowUp />
                </button>
                <button className='new-post-button' onClick={navigateToNewPost}>
                    <IoMdAdd size={20} color='white'/>
                </button>
            </div>
        </div>
    );
}

export default BrowseIngredients;