import React from 'react';

const TopSearchBar = () => {
    return (
        <div className="top-search-bar">
            <div className="location">
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" placeholder="Enter location" />
            </div>
            <div className="search-box">
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" name="search" placeholder="Search for something" />
            </div>
            <div className="filter">
                <label htmlFor="filter">Filter:</label>
                <select id="filter" name="filter">
                    <option value="">All</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>
            <div className="blank"></div>
        </div>
    );
};

export default TopSearchBar;
