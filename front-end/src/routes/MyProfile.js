import React, { useState, useEffect } from 'react';
import "./MyProfile.css";
import PostBlock from '../components/PostBlock';
import PostFLow from '../components/PostFlow';

function MyProfile() {
  const example_egg_post = {
    image: '/example_egg.jpg',
    title: "Dozen of Eggs",
    author: "user1",
    usrImg: "/example_usrimg.png",
    id: "10086"
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

  const posts = [example_egg_post, example_milk_post, example_lettuce_post];


  return (
    <div className="profile-page">
      <section className="profile-container">
        <img className="profile-picture" alt="User Profile" src="/profile_pic.png"/>
        <div className="user-info">
          <div className="username-wrapper">
            Username
          </div>
          <div className="user-id-wrapper">
            User ID
          </div>
          <div className="user-location-wrapper">
            User location
          </div>
        </div>
        <div className="user-discription">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className="unknown-buttons">
          <button className='friends'> Friends</button>
          <button className='likes'> Likes</button>
          <button className='posts'> Posts</button>
          <button className='edit-profile'> Edit Profile</button>

        </div>
      </section>
      <section className='post-container'>
        <div className="post-list">
          <PostFLow posts={posts}/>
        </div>
      </section>
    </div>
  );
}
  
export default MyProfile;