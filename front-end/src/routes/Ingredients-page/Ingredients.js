import React, { useState, useEffect } from 'react';
import PostFLow from '../../components/PostFlow';
import TopSearchBar from '../../components/TopSearchBar';
import { FaArrowUp } from 'react-icons/fa';

import './Ingredients.css';

function BrowseIngredients() {

    const [posts, setPosts] = useState([]);

    const [showScrollButton, setShowScrollButton] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/browse');
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

    return (
        <div>
            <div className='ingredients-page-container'>  
                <div className='ingredients-top-bar-container'>
                    <TopSearchBar location="10003" />
                </div>
                <div className='post-flow-container'>
                    <PostFLow posts={posts} />
                </div>
            </div>
            <button className='scroll-to-top-button' onClick={scrollToTop}>
                <FaArrowUp />
            </button>
        </div>
    );
}

export default BrowseIngredients;