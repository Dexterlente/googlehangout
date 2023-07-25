import React,  { useState } from 'react'
import API_ENDPOINT from '../config.jsx'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const loginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await fetch(`${API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Login successful!', data);
            Cookies.set('token', data.token);
            // navigate to index page after sucessfull login
            navigate('/');
          } else {
            const error = await response.json();
            console.error('Login failed:', error.msg);
         
          }
        } catch (error) {
          console.error('Error occurred during login:', error);
     
        }
      };
  return (
    <div>
    <h2>Login</h2>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Login</button>
  </div>

  )
}

export default loginPage