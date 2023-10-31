import React, { useState, useEffect } from 'react';
import PostBlock from '../components/PostBlock';

import './Ingredients.css';

function BrowseIngredients() {

    const example_egg_post = {
        image: '/example_egg.jpg',
        title: "Eggs - Expires 11/30",
        author: "user1",
        usrImg: "/example_usrimg.png"
    }
    const example_milk_post = {
        image: '/example_milk.png',
        title: "Horizon 2% Milk",
        author: "user2",
        usrImg: "/grey.png"
    }
    const example_lettuce_post = {
        image: '/example_lettuce.png',
        title: "Fresh Lettuce",
        author: "user3",
        usrImg: "/example_usrimg.png"
    }

    return (
      <div>
        <h1>This is the Ingredients page</h1>
        <div className="post-list">
            <PostBlock post={example_egg_post} />
            <PostBlock post={example_milk_post} />
            <PostBlock post={example_lettuce_post} />
        </div>
      </div>
    );
  }
  
export default BrowseIngredients;