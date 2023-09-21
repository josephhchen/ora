import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './nav';

function Chat() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [location, setLocation] = useState('');
  
    const sendMessage = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/ask', { message, location });
        setResponse(res.data.message);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
        <p>ORA: {response}</p>
      </>
    );
  }

export default Chat