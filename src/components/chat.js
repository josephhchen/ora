import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/chat.css';
import Navbar from './nav';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setChatHistory([...chatHistory, { type: 'user', message }]);
    setMessage(''); // Clear input
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ask', { message });
      setTimeout(() => {
        setChatHistory([...chatHistory, { type: 'user', message }, { type: 'ora', message: res.data.message }]);
        setIsTyping(false);
      }, 1000); // simulating typing delay
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-bg flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col items-start justify-start p-8">
        {chatHistory.length === 0 ? (
          <div className="flex-grow flex items-center justify-start">
            <p className="text-gray-400 text-3xl inter-font">
              Ask ORA questions, or say “ORA” to activate
            </p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <p key={index} className={`text-white ${chat.type === 'ora' ? 'non-inter-font' : 'inter-font'}`}>
              {chat.type.toUpperCase()}: {chat.message}
            </p>
          ))
        )}
        {isTyping && <p className="text-white non-inter-font">ORA: typing...</p>}
      </div>
      <div className="flex justify-center items-center p-4">
        <div className="flex items-center rounded-lg w-11/12 p-2">
          <textarea
            className="text-input flex-grow p-2 rounded-lg inter-font text-white"
            rows="1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask ORA anything..."
          />
          <button onClick={sendMessage} className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-lg inter-font">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
