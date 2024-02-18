import React, { useState } from 'react';
import './Page.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../http-common'

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === '' || password === '' || username === '') {
      setError('Required fields are missing');
      setLoading(false);
    } else {
      // Simulate successful registration (you can replace this with your own backend logic)

      const postData = {
        username: username,
        email: email,
        password: password,
      };
  
      try {
        const res = await apiClient.post("/auth/signup", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
          };
          console.log(result)
  
        //setPostResult(fortmatResponse(result));
      } catch (err) {
       // setPostResult(fortmatResponse(err.response?.data || err));
       //console.log(error)
      }

      setTimeout(() => {
        setLoading(false);
        navigate('/'); // Redirect to login after successful registration
      }, 1000);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>Register for an Account</p>
        <div className="auth-login">
          <div className="auth-login-container">
            <div className="input-field">
              <p>Username</p>
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
            </div>
            <div className="input-field">
              <p>Email</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
            </div>
            <div className="input-field">
              <p>Password</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <button onClick={handleRegister} disabled={loading} style={{ marginTop: '10px' }}>
              {loading ? 'Registering...' : 'Register'}
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
              Already have an account? Login
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

export default Register;
