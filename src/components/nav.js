import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Chat</Link>
      <Link to="/todo">To-do</Link>
    </div>
  );
};

export default Navbar;
