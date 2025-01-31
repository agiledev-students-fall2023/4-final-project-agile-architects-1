import React, { useState, useEffect } from "react";
import { useAuthContext } from './hooks/useAuthContext';
import './Test.css';

function Test() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState({ username: "User" });
  const [fridgeItems, setFridgeItems] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items
  const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

  const example_item = {
    _id: 0,
    name: 'Example Item',
    quantity: 3,
    purchasedDate: '2023-11-05',
    expiration: '2023-11-21'
  };

  const fetchItems = async () => {
    if (user) {
      if (!user.fridgeItems) {
        user.fridgeItems = [example_item];
      }
      setFridgeItems(user.fridgeItems);
    } else {
      let newUser = { fridgeItems: [example_item] };
      setFridgeItems(newUser.fridgeItems);
    }
  };

  const fetchRecommendedVideos = async () => {
    console.log("Flask API Host:", REACT_APP_BACKEND_HOST);
    setIsLoading(true);
    const selectedItemNames = selectedItems.map(item => item.name);
    try {
      const response = await fetch(`${REACT_APP_BACKEND_HOST}/youtube/get-videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fridge_items: selectedItemNames }),
      });
      console.log("Raw Response:", response);
      const data = await response.json();
      console.log("API Response:", data)
      if (response.ok) {
        setRecommendedVideos(data.videos);
      } else {
        console.error("Failed to fetch videos:", data.error);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  // Function to toggle selected items
  const toggleItemSelection = (item) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter(i => i !== item); // Deselect item
      } else {
        return [...prevSelected, item]; // Select item
      }
    });
  };

  return (
    <section className="fridge-page">
      <div className="fridge-header">
        {user && profile && (
          <h1 className="username-wrapper">{profile.username}'s Fridge</h1>
        )}
        {!user && <h1 className="username-wrapper">Default Fridge</h1>}
      </div>

      <div className="fridge-grid-test">
        {fridgeItems.map((item, index) => (
          <div
            key={index}
            className={`fridge-item-test ${selectedItems.includes(item) ? "selected" : ""}`}
            onClick={() => toggleItemSelection(item)}
          >
            <p className="item-name">{item.name}</p>
          </div>
        ))}
      </div>

      <button
        className="recommend-button"
        onClick={fetchRecommendedVideos}
        disabled={selectedItems.length === 0 || isLoading}
      >
        {isLoading ? "Loading..." : "Get Recipe Videos"}
      </button>
      {recommendedVideos.length > 0 && (<h2>Recommended Videos</h2>)}
      {recommendedVideos.length > 0 && (
        <div className="video-list">
          {recommendedVideos.map((video, index) => (
            <div key={index} className="video-item">
              <h3>{video.title}</h3>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Test;