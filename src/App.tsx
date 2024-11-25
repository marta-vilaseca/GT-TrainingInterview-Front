import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { LoginFormProps } from './types/ILoginForm';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Chat from './pages/Chat';
import ThankYou from './pages/ThankYou';
import LegalNotice from './pages/LegalNotice';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
