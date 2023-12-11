import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosTime } from "react-icons/io";

import './NewIngredientPost.css';

import { useAuthContext } from './../hooks/useAuthContext';

function NewIngredientPost() {
    const navigate = useNavigate();
    const [images, setImages] = useState(Array(3).fill(null)); // Initialize with null for three images
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { user } = useAuthContext();

    if (!user) {
        navigate('/login');
    }

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newImages = [...images];
            newImages[index] = e.target.result;
            setImages(newImages);
        };
        reader.readAsDataURL(file);
        }
    };

    const renderImageUploadButton = (image, index) => {
        return (
          <label key={index} className="post-image-upload-label">
            {image ? (
              <div className="post-image-container" style={{ backgroundImage: `url(${image})` }}></div>
            ) : (
              <div className="post-image-upload-placeholder">+</div>
            )}
            <input
              type="file"
              className="post-image-upload-input"
              onChange={(e) => handleImageChange(e, index)}
              accept="image/*"
            />
          </label>
        );
      };


      const validateForm = () => {
        if (!name.trim()) {
          return 'Name is required.';
        }
        // check for amount
        if (!amount.trim()) {
            return 'Amount is required.';
        } else if (amount <= 0) {
            return 'Amount must be greater than 0.';
        } else if (amount > 100) {
            return 'Amount must be less than 100.';
        } else if (amount % 1 !== 0) {
            return 'Amount must be a whole number.';
        } else if (amount.includes('.')) {
            return 'Amount must be a whole number.';
        } 
        if (!description.trim()) {
          return 'Description is required.';
        } else if (description.length > 500) { // Example character limit
          return 'Description is too long.';
        }
        if (!location.trim()) {
          return 'Location is required.';
        }
        if (!time.trim()) {
          return 'Time is required.';
        }
        // Date validation could be more complex, depending on requirements
        if (!expirationDate.trim()) {
          return 'Expiration date is required.';
        } else {
          const today = new Date();
          const expDate = new Date(expirationDate);
          if (expDate <= today) {
            return 'Expiration date must be in the future.';
          }
        }
        if (images.every((image) => image === null)) {
          return 'Please upload at least one image.';
        }
    
        return ''; // No errors
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Check if at least one image is uploaded
        const error = validateForm();
        if (error) {
            setErrorMessage(error);
            return;
        }
        setErrorMessage('');
      
        try {
          console.log("User:", user);

            const formData = new FormData();
        //   const formData = {
        //     title: name,
        //     description: description,
        //     location: location,
        //     time: time,
        //     expirationDate: expirationDate,
        //     authorID: user.userId,
        //   };
          formData.append('name', name);
          formData.append('amount', amount);
          formData.append('description', description);
          formData.append('location', location);
          formData.append('time', time);
          formData.append('expirationDate', expirationDate);
          formData.append('authorID', user.userId);

        //   formData.title = name;
        //   formData.description = description;
        //   formData.location = location;
        //   formData.time = time;
        //   formData.expirationDate = expirationDate;
        //   formData.authorID = user.userId;
          
          images.forEach((image, index) => {
            if (image) {
              formData.append(`image${index}`, image);
                // formData[`image${index}`] = image;
            }
          });

          console.log("Submitting formData:", formData);

          const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/browse/newpost`, { // Replace with your backend endpoint
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            console.log('Post submitted successfully');
            navigate('/browse');
          } else {
            // Handle errors
            console.error('Post submission failed:', response.statusText);
          }
        } catch (error) {
          console.error('There was an error submitting the form:', error);
        }
      };

    return (
        <div className='new-post-page'>
            <section className='new-post-top-bar'>
                    <button className="back-button" onClick={()=> navigate("/browse")}>
                        <IoIosArrowBack/>
                    </button>
                    <h1 className="post-header-title">New Ingredient Post</h1>
            </section>
            <form className="post-form" onSubmit={handleFormSubmit}>
                <label className="post-form-label">Ingredient Name: </label>
                <input 
                    type="text" 
                    placeholder="Name" 
                    className="post-form-input" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="post-form-label">Amount: </label>
                <input 
                    type="number" 
                    placeholder="Amount" 
                    className="post-form-input" 
                    value={amount} 
                    min="1" 
                    max="100"
                    inputMode="numeric"
                    onChange={(e) => setAmount(e.target.value)}
                />
                
                <label className="post-form-label">Description: </label>
                <textarea 
                    placeholder="Description" 
                    className="post-form-input post-form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                
                <div className="post-image-upload-group" >
                    {images.map(renderImageUploadButton)}
                </div>

                <label className="post-form-label">Pick Up Location: </label>

                <div className="post-location-group">
                    <div className='location-icon'><FaLocationDot /></div>
                    <input 
                    type="text" 
                    placeholder="Pick Up Location" 
                    className="post-form-input" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <label className="post-form-label">Pick Up Time: </label>
                <div className="post-time-group">
                    <div className='time-icon'><IoIosTime  /></div>
                    <input 
                    type="text" 
                    placeholder="Pick Up Time" 
                    className="post-form-input" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <label for="expirationDate" className='post-form-label'>Expiration Date: </label>
                <input 
                    type="date" 
                    className="post-form-input" 
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    placeholder="Expiration Date"
                    />
                 {errorMessage && <p className="post-error-message">{errorMessage}</p>}
                <button type="submit" className="post-submit-button">Post</button>
            </form>
        </div>
    );
}

export default NewIngredientPost;