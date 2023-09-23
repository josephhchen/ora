import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './user-context';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setUserId } = useUser(); 

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      if (res.data.message === 'Logged in successfully!') {
        const { userId } = res.data;
        setUserId(userId);
        console.log(userId)
        alert('Logged in successfully');
        navigate('/chat');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
