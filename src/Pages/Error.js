import React from 'react';
import error from '../Assests/error.jpg';
import { Link } from 'react-router-dom';
import './Page.css'; 

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-text">
        <h1 className="black-text">Oops!</h1>
        <p className="black-text">Something went wrong.</p>
        <Link to="/" className="black-text">Go back to the homepage</Link>
      </div>
      <div className="error-image">
        <img src={error} alt="Illustration of an error" />
      </div>
    </div>
  );
};

export default Error;