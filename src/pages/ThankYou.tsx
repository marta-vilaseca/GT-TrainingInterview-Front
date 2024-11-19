import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import { exit_message } from '../utils/constants';
import './ThankYou.scss';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, correctQuestions, totalQuestions } = location.state || {};

  console.log('formData:', formData);
  console.log(
    'correctQuestions:',
    correctQuestions,
    'totalQuestions:',
    totalQuestions
  );
  const [loadingState, setLoadingState] = useState(false);

  const handleStartNewChat = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    navigate('/login', { state: formData });
  };

  const handleNavHome = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    navigate('/');
  };

  useEffect(() => {
    if (!location.state || !location.state.fromChat) {
      // Redirect user if they didn't come from /chat
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <>
      <Layout page="thankyou" extraClassName="thankyou">
        <div className="thankyou">
          <img src={Dora} className="greetings__logo" alt="PildorasUX logo" />
          <h2 className="thankyou__title">¡Excelente trabajo!</h2>
          <h3 className="thankyou__title2">
            Has acertado {correctQuestions} de {totalQuestions} preguntas
          </h3>
          <p className="thankyou__subtitle">{exit_message}</p>
        </div>
        <div className="buttons">
          <Button
            className="button__item button__secondary"
            disabled={loadingState}
            onClick={handleNavHome}
          >
            Volver a Home
          </Button>
          <Button
            className="button__item"
            disabled={loadingState}
            onClick={handleStartNewChat}
          >
            Empezar otro chat
          </Button>
        </div>
      </Layout>
    </>
  );
};

export default ThankYou;
