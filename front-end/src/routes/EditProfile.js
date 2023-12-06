import React, { useState, useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEdit } from "./hooks/useEdit";
import './EditProfile.css'
 

function EditProfile() {
  const { user } = useAuthContext()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true);
  const {edit, error, isLoading} = useEdit()
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        setProfileLoading(true)
        const response = await fetch(`http://localhost:3001/profile/${userId}`)
        const json = await response.json()
        if (response.ok){
          setProfile(json)
        }
      } catch(error){
        console.error('Error fetching profile: ', error)
      } finally {
        setProfileLoading(false)
      }
    };

    if (user){
      fetchUser(user.userId);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      userId: user.userId,
      email,
      username,
      zipcode
    }
    console.log(`accessing user id: ${user.userId}`)
    await edit(userData)
  };

  if(profileLoading){
    return <div>Loading...</div>
  }

  return(
      
      <div className="account-settings">
    <aside className="sidebar">
      <ul>
        <li>Account Settings</li>
        <li><Link className="change-password" to='/change-password'>Change Password</Link></li>
        <li onClick={() => navigate(-1)}>Go Back</li>
      </ul>
    </aside>
    <form className="settings-form" onSubmit={handleSubmit}>
      <h1>Account Settings</h1>

      <div className="form-group">
        <label>Email address</label>
        <input 
          className="input-field-login" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          type="email" 
          placeholder ={profile.email}
          id="email" 
          name="email"
        />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input 
          className="input-field-login" 
          value={username} 
          onChange={(e)=>setUsername(e.target.value)} 
          type="text" 
          placeholder={profile.username}
          id="text" 
          name="text"
        />
      </div>

      <div className="form-group">
        <label>Zipcode</label>
        <input 
          className="input-field-login" 
          value={zipcode} 
          onChange={(e)=>setZipcode(e.target.value)} 
          type="text" 
          placeholder={profile.zipcode}
          id="text" 
          name="text"
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button className="finish-edit" type="submit" >Finish Editing</button>
    </form>
  </div>
  
  );
}

export default EditProfile