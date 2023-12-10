import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MyProfile.css";
import PostFLow from '../components/PostFlow';
import { useAuthContext } from './hooks/useAuthContext';

function MyProfile() {
  const { user } = useAuthContext()

  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/profile/${userId}`)
        const json = await response.json()
        if (response.ok){
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
    const fetchPost = async (username) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/profile/posts?username=${username}`);
            const result = await response.json()
            setPosts(result)
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
    if (profile){
        fetchPost(profile.username);
    }
    }, [profile]);  

  const navigate = useNavigate()
  
  const handleEditProfile = () => {
    navigate('edit-profile')
  }


  return (
    <div className="profile-page">
      <section className="profile-container">
        <img className="profile-picture" alt="User Profile" src="/profile_pic.png"/>
        <div className="user-info">
          <div className="username-wrapper">
            {user && profile && (
            <span>{profile.email}</span>
            )}
            {!user && (
            <span>Not Logged In</span>
            )}
          </div>
          <div className="user-id-wrapper">
            {user && profile && (
              <span>User ID: {profile.username}</span>
            )}
            {!user && (
              <span>User ID: User not logged in</span>
            )}
          </div>
          <div className="user-location-wrapper">
          {user && profile && (
              <span>Zipcode: {profile.zipcode}</span>
            )}
            {!user && (
              <span>Zipcode: user not logged in</span>
            )}
          </div>
        </div>
        <div className="user-discription">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className="unknown-buttons">
          <button className='friends'> Friends</button>
          <button className='likes'> Likes</button>
          <button className='posts'> Posts</button>
          {user && (
            <button onClick={handleEditProfile} className='edit-profile'> Edit Profile</button>
          )}
          

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