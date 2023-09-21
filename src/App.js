import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Landing from './components/landing-page';
import Chat from './components/chat';
import ToDo from './components/to-do';
import Reminders from './components/reminders';
import Calendar from './components/calendar';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;
