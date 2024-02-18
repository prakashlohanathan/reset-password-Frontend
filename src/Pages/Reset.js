import React, { useState } from 'react';
import './Page.css';
import apiClient from '../http-common';
import { useNavigate, useSearchParams } from 'react-router-dom';


function Reset() {
  const [password, setPassword] = useState(''); // Add state for password
  const [confirmPassword, setConfirmPassword] = useState(''); // Add state for confirm password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [state ] = useSearchParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password === '') {
      setError('Password is required');
      setLoading(false);
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
    } else {
      const postData = {
        password: password, // Include the password in the POST data
      };

      try {
        const res = await apiClient.post(`auth/reset-password?id=${state.get("id")}&token=${state.get("token")}`, postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        console.log(result);
      } catch (err) {
        console.log(error);
      }

      setTimeout(() => {
        setLoading(false);
        alert('Password reset successfully!');
        navigate('/', { replace: true });
      }, 1000);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>Reset Your Password</p>
        <div className="auth-login">
          <div className="auth-login-container">
            <div className="input-field">
              <p>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
              />
            </div>
            <div className="input-field">
              <p>Confirm Password</p>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password" 
              />
            </div>
            <button onClick={handleResetPassword} disabled={loading} style={{ marginTop: '10px' }}>
              {loading ? 'Sending Reset Email...' : 'Reset Password'}
            </button>

            <p
              onClick={() => navigate('/')}
              style={{
                marginTop: '10px',
                textAlign: 'center',
                color: '#0095ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Back to Login
            </p>
          </div>
        </div>
        {error !== '' && (
          <p
            style={{
              color: 'red',
              fontSize: '14px',
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Reset;
