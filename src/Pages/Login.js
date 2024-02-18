import React, { useState } from 'react';
import './Page.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../http-common'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleSignIn = async (e)  => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === '' || password === '') {
      setError('Required fields are missing');
      setLoading(false);
    } else {
      // Simulate successful login & backend logic)
      const postData = {
        
        email: email,
        password: password,
      };
  
      try {
        const res = await apiClient.post("/auth/signin", postData, {
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
         if (
          result.data.message === "Please check the credentials"
         ){
          alert ("Please check the credentials");
                
         } else if (
          result.data.message === "not registered"
         ){
          alert ("Given Email Id Doesnot exist")
         }
         else {
          
          localStorage.setItem("loginUserName",result.data.user.username);
          localStorage.setItem("EmailId",result.data.user.email);
          localStorage.setItem("UserId",result.data.user._id);
          navigate('/dash');          
         }
        //setPostResult(fortmatResponse(result));
      } catch (err) {
       // setPostResult(fortmatResponse(err.response?.data || err));
       //console.log(error)
      }

    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>Login to your Account</p>
        <div className="auth-login">
          <div className="auth-login-container">
            <div className="input-field">
              <p>Email</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
            </div>
            <div className="input-field">
              <p>Password</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <button onClick={handleSignIn} disabled={loading} style={{ marginTop: '10px' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p
              onClick={() => navigate('/register')}
              style={{
                marginTop: '10px',
                textAlign: 'center',
                color: '#0095ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Don't have an account? Register
            </p>
            <p
              onClick={() => navigate('/forgot-password')}
              style={{
                marginTop: '10px',
                textAlign: 'center',
                color: '#0095ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Forgot Password?
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

export default Login;
