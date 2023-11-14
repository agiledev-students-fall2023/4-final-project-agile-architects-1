import React, { useState, useEffect } from 'react';
import PostFLow from '../../components/PostFlow';
import TopSearchBar from '../../components/TopSearchBar';
import { FaArrowUp } from 'react-icons/fa';

import './Ingredients.css';

function BrowseIngredients() {

    const example_egg_post = {
        image: '/example_egg.jpg',
        title: "Eggs - Expires 11/30",
        author: "user1",
        usrImg: "/example_usrimg.png",
    }
    const example_milk_post = {
        image: '/example_milk.png',
        title: "Horizon 2% Milk",
        author: "user2",
        usrImg: "/grey.png",
    }
    const example_lettuce_post = {
        image: '/example_lettuce.png',
        title: "Fresh Lettuce",
        author: "user3",
        usrImg: "/example_usrimg.png",
    }
    const example_pork_belly_post = {
        image: '/example_pork_belly.jpg',
        title: "Pork Belly",
        author: "user4",
        usrImg: "/example_usrimg.png",
    }

    const posts = [example_egg_post, example_milk_post, example_lettuce_post, example_pork_belly_post];

    const [showScrollButton, setShowScrollButton] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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