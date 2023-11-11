import React, { useState, useEffect } from 'react';
import PostFLow from '../components/PostFlow';
import TopSearchBar from '../components/TopSearchBar';

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
        
    return (
      <div className='ingredients-page-container'>
        <TopSearchBar location="10003"/>
        <div className='post-flow-container'>
            <PostFLow posts={posts}/>
        </div>
      </div>
    );
  }
  
export default BrowseIngredients;