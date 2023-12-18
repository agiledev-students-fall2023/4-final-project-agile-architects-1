import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MyProfile.css";
import PostFLow from '../components/PostFlow';
import { useAuthContext } from './hooks/useAuthContext';

function MyProfile() {
  const { user } = useAuthContext()

  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null)

  const [description, setDescription] = useState("A passionate foodie! I'm always looking for new recipes to try, and love to share my cooking experience with others.")

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

  useEffect(() => {
    const fetchPost = async (username) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile/posts?username=${username}`);
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
        <div className="profile-basic-info">
            <div className="profile-image-container">
                {user && profile && (
                <img className="profile-picture" alt="User Profile" src={`${process.env.REACT_APP_BACKEND_HOST}${profile.usrImg}`}/>
                )}
                {!user && (
                <img className="profile-picture" alt="User Profile" src={`${process.env.REACT_APP_BACKEND_HOST}/static/images/grey.png`}/>
                )}
            </div>
            <div className="user-info">
                <div className="username-wrapper">
                    {user && profile && (
                        <span>{profile.username}</span>
                    )}
                    {!user && (
                        <span>Not Logged In</span>
                    )}
                </div>
                <div className="user-id-wrapper">
                    {user && profile && (
                        <span>User id: {profile._id}</span>
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
        </div>
        <div className="user-discription">
          {description}
        </div>
        <div className="unknown-buttons">
          {/*}
          <button className='friends'> Friends</button>
          <button className='likes'> Likes</button>
                    {*/}
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