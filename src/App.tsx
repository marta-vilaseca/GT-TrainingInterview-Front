import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Chat from './pages/Chat';
import ThankYou from './pages/ThankYou';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App;
