import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/nav';
import Landing from './components/landing-page';
import Chat from './components/chat';
import ToDo from './components/to-do';
import Reminders from './components/reminders';
import Calendar from './components/calendar';
import Register from './components/register';
import Login from './components/login';
import { UserProvider } from './components/user-context';
const App = () => {
  // const [showNavbar, setShowNavbar] = useState(true);

  // useEffect(() => {
  //   if (window.location.pathname === '/') {
  //     setShowNavbar(false);
  //   } else {
  //     setShowNavbar(true);
  //   }
  // }, [window.location.pathname]);

  return (
    <UserProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;