import React, { useState, useEffect } from "react";
import { Masonry } from "react-masonry";
import PostBlock from '../components/PostBlock';
import './Test.css';
/*
function Test(){

    const numberOfBoxes = 16;
    const heightOptions = [100, 130, 180, 200, 260, 80];
  
    // State to store the heights for each box
    const [boxHeights, setBoxHeights] = useState([]);
  
    // Function to generate random heights for the boxes
    const generateRandomHeights = () => {
      const heights = Array.from({ length: numberOfBoxes }, () =>
        heightOptions[Math.floor(Math.random() * heightOptions.length)]
      );
      setBoxHeights(heights);
    };
  
    // Generate random heights when the component mounts
    useEffect(() => {
      generateRandomHeights();
    }, []); // Empty dependency array to ensure this only runs once
  
    // Function to generate a random color
    function generateColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/browse`);
            const result = await response.json();
            setPosts(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <Masonry className="component-container">
            {posts.map((post) => (
                <PostBlock key={post.id} post={post} />
            ))}
        </Masonry>
    );
}

export default Test;
*/


function Test() {
  const numberOfBoxes = 16;
  const heightOptions = [100, 130, 180, 200, 260, 80];

  // State to store the heights for each box
  const [boxHeights, setBoxHeights] = useState([]);

  // Function to generate random heights for the boxes
  const generateRandomHeights = () => {
    const heights = Array.from({ length: numberOfBoxes }, () =>
      heightOptions[Math.floor(Math.random() * heightOptions.length)]
    );
    setBoxHeights(heights);
  };

  // Generate random heights when the component mounts
  useEffect(() => {
    generateRandomHeights();
  }, []); // Empty dependency array to ensure this only runs once

  // Function to generate a random color
  function generateColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/browse`);
            const result = await response.json();
            setPosts(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <Masonry className="component-container">
    
      {boxHeights.map((height, index) => (
        <div className="component"
          key={index}
          style={{
            width: "50%",
            height: height,
            backgroundColor: generateColor(),
          }}
        >
          {index}
        </div>
      ))}
      
      {posts.map((post) => (
        <div key={post.id}>
          <PostBlock post={post} />
        </div>
      ))}


      {posts.map((post) => (
        <PostBlock key={post.id} post={post} />
      ))}

    </Masonry>
  );
}

export default Test;
