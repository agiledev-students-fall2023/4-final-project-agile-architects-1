import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostFLow from '../components/PostFlow';
import { useAuthContext } from './hooks/useAuthContext';
import { GiOpenedFoodCan, GiCook } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import "./MyProfile.css";

function MyProfile() {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile/${userId}`)
        const json = await response.json()
        if (response.ok){
          console.log(json)
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

  useEffect(() => {
    // console.log("Profile:",profile);
    const fetchPost = async (userID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile/posts?userID=${userID}`);
            const result = await response.json()
            console.log("Got posts:",result);
            if (result.length === 0) {
              setPosts([{
                _id: `fake-id-${Date.now}`,
                id: Date.now(), 
                image: '/static/images/add_post.png', // Path to your placeholder image
                title: 'Create your first post',
                author: profile.username,
                authorID: userID,
                usrImg: profile.usrImg,
                amount: 1,
                location: 'Your Location',
                pickUpTime: 'Anytime',
                expiration: new Date(), // Current date as placeholder
                description: 'This is a placeholder post. Start your adventure by posting your story!',
                hashtags: [],
                comments: []
              }]);
            } else {
              setPosts(result)
            }

        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
    if (profile){
        fetchPost(profile._id);
    }
    }, [profile]);  

  const navigate = useNavigate()
  
  const handleEditProfile = () => {
    navigate('edit-profile')
  }


  return (
    <div className="profile-page">
      <section className="profile-container">
        <div className="profile-basic-info">
            <div className="profile-image-container">
                {user && profile && (
                <img className="profile-picture" alt="User Profile" src={`${process.env.REACT_APP_BACKEND_HOST}${profile.usrImg}`}/>
                )}
                {!user && (
                <img className="profile-picture" alt="User Profile" src={`${process.env.REACT_APP_BACKEND_HOST}/static/images/profile_pic.png`}/>
                )}
            </div>
            <div className="user-info">
                <div className="username-wrapper">
                    {user && profile && (
                        <span>{profile.username}</span>
                    )}
                    {!user && (
                        <span>Unregistered User</span>
                    )}
                </div>

                <div className="user-info-wrapper">
                    {user && profile && (
                        <span>User id: {profile._id}</span>
                    )}
                </div>

                <div className="user-info-wrapper">
                    {user && profile && (
                        <span>Zipcode: {profile.zipcode}</span>
                    )}
                </div>
            </div>
        </div>

        <div className="user-description">
            {user && profile && (
                <span>{profile.description}</span>
            )}
            {/*!user && (
                <span>User is not logged in</span>
            )*/}
        </div>

        <div className="user-buttons">
          {/*}
          <button className='friends'> Friends</button>
          <button className='likes'> Likes</button>
                    {*/}
          {!user &&(
            <div className='floating-box'>
              <span className='title'>Please Login to:</span>
              <div className='line-container'>
                <GiOpenedFoodCan className='icon'></GiOpenedFoodCan>
                <span className='message'>Post your ingredients</span>
              </div>
              <div className='line-container'>
                <AiOutlineMessage className='icon'></AiOutlineMessage>
                <span className='message'>Comment on other users' posts</span>
                </div>
              <div className='line-container'>
                <GiCook className='icon'></GiCook>
                <span className='message'>Get your customised recipes</span>
                </div>
            </div>
          )}
          {user && (
            <button className='user-button'> Posts</button>
          )}
          
          {user && (
            <button onClick={handleEditProfile} className='user-button'> Edit Profile</button>
          )}
    
        </div>
          {user && (
            <section className='post-container'>
              <div className="post-list">
                <PostFLow posts={posts}/>
              </div>
            </section>
          )}
      </section>
      
    </div>
  );
}
  
export default MyProfile;