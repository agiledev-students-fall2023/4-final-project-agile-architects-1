import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PlanMeal() {
    return (
      <div>
        <h1>Plan Meal</h1>
        <header className="header">
            <Link to="/recommended-recipes">Recommended Recipes</Link>
        </header>

      </div>
    );
  }
  
export default PlanMeal;