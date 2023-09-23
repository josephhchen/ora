import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div>ORA</div>
      <div className="flex space-x-4">
        <Link to="/chat" className="active">Chat</Link>
        <Link to="/todo">To-do</Link>
        <Link to="/reminders">Reminders</Link>
        <Link to="/calendar">Calendar</Link>
      </div>
    </div>
  );
};

export default Navbar;
