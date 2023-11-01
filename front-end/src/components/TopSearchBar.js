import React from 'react';
import './TopSearchBar.css';

const TopSearchBar = ({location, searchStr}) => {
    return (
        <div className="top-search-bar">
            <div className="top-bar-location">
                <label htmlFor="location">{location}</label>
            </div>
            <div className="top-bar-search">
                <label htmlFor="search"></label>
                <input className="top-bar-search-box" type="text" id="search" name="search" placeholder="Search for something" />
            </div>
            <div className="blank"></div>
        </div>
    );
};

export default TopSearchBar;
