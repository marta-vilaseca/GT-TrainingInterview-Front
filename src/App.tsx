import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Chat from './pages/Chat';
import ThankYou from './pages/ThankYou';
import { LoginFormProps } from './types/ILoginForm';

const App: React.FC = () => {
  const [homeFormData, setHomeFormData] = useState<LoginFormProps>({
    name: '',
    role: '',
    experience: '',
    theme: 'General',
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <LogIn
              homeFormData={homeFormData}
              setHomeFormData={setHomeFormData}
            />
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App;
