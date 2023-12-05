import React from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import './EditProfile.css'
 
function EditProfile() {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    return(
        
        <div className="account-settings">
      <aside className="sidebar">
        <ul>
          <li>Account Settings</li>
          <li><Link className="change-password" to='/change-password'>Change Password</Link></li>
          <li onClick={() => navigate(-1)}>Finish Editing</li>
        </ul>
      </aside>
      <div className="settings-form">
        <h1>Account Settings</h1>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" defaultValue={user.email}/>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" defaultValue={user.username} />
        </div>
        <div className="form-group">
          <label>Zipcode</label>
          <input type="text" defaultValue="000000" />
        </div>
      </div>
    </div>
    
    );
}

export default EditProfile