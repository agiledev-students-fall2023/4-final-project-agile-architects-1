import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';

import "./LocationBar.css";

function LocationBar({location}) {
    return (
        <div className="location-info">
            <div className='location-icon'>
                <FaLocationDot/>
            </div>
            <div className="location-wrapper">
                {location}
            </div>
        </div>
    );
}

export default LocationBar;
