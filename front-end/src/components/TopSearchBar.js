import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import './TopSearchBar.css';

const TopSearchBar = ({ location, searchStr, setSearchStr }) => {

    const onFocus = (event) => {
        event.target.setAttribute('autocomplete', 'AD33S893EA');
        console.log(event.target.autocomplete);
      };

      const handleSearchChange = (event) => {
        setSearchStr(event.target.value);
    };

    return (
        <div className="top-search-bar">
            <div className="top-bar-location">
                <div className="top-bar-location-icon">
                    <FaLocationDot />
                </div>
                <label htmlFor="location">{location}</label>
            </div>
            <div className="top-bar-search">
                <label htmlFor="search"></label> 
                
                <input 
                className="top-bar-search-box" 
                id="search" 
                name="search" 
                placeholder="Search for ingredients" 
                onFocus={onFocus} 
                value={searchStr}
                onChange={handleSearchChange}/>
            </div>
            <div className="blank"></div>
        </div>
    );
};

export default TopSearchBar;
