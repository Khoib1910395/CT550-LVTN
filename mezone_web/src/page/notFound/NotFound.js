import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">Oops!</h1>
            <p className="not-found__subtitle">We can't seem to find the page you're looking for.</p>
            <Link className="not-found__link" to="/">Go back to the homepage</Link>
        </div>
    );
};

export default NotFound;
