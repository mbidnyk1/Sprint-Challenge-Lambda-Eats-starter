import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HomePage(){
    return(
        <div>
            <h2>Your favorite food, delivered while coding</h2>
            <NavLink to='/pizza'>Pizza?</NavLink>
        </div>
    
    )}