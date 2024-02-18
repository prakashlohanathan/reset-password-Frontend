import React, { useState } from 'react';
import apiClient from '../http-common';
import { useNavigate } from 'react-router-dom';
import './Page.css'

function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required'); 
    } else {
      const postData = {
        email: email,
      };

      try {
        const res = await apiClient.post("/auth/forgot-password", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        // Handle the result here, you can update the state or display a success message

        console.log(result);
      } catch (err) {
        setError(err.response?.data || err.message); // Log the error message here
      }

      setLoading(false);
      navigate('/reset-password'); // Redirect to the home page after successful login
    }
  };

  return (
    <div className="auth">
      <div className="auth-container-forgot">
        <p>Forgot Password</p>
        <form onSubmit={handleForgotPassword} disabled={loading}>
          <div className="input-field-forgot">
            <label htmlFor="email">Email</label> 
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>} 
          
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
