import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import { exit_message } from '../utils/constants';
import { ReviewQuestion } from '../types/IChatTypes';
import { renderInlineCode } from '../components/common/renderInlineCode';
import './ThankYou.scss';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, correctQuestions, totalQuestions, reviewQuestions } =
    location.state || {};

  console.log('formData:', formData);
  console.log(
    'correctQuestions: ',
    correctQuestions,
    'totalQuestions: ',
    totalQuestions,
    'reviewQuestions: ',
    reviewQuestions
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
          <img src={Dora} className="thankyou__logo" alt="PildorasUX logo" />
          <h2 className="thankyou__title">¡Gran trabajo, {formData.name}!</h2>
          <p className="thankyou__message">
            Recuerda que la preparación es clave, y cada paso te acerca a tu
            objetivo.
          </p>
          <h3 className="thankyou__title2">Resumen de tu sesión</h3>
          <h4 className="thankyou__reviewTitle">
            Respuestas correctas: {correctQuestions}/{totalQuestions}
          </h4>
          {reviewQuestions.length > 0 && (
            <div className="thankyou__reviewQuestions">
              <p>¡Bien hecho! Estas son las preguntas que puedes mejorar:</p>
              <ol>
                {reviewQuestions.map((item: ReviewQuestion, index: number) => (
                  <li className="reviewItem" key={index}>
                    <p className="reviewItem__question">
                      {renderInlineCode(item.question.question)}
                    </p>
                    <p className="reviewItem__answer">
                      {renderInlineCode(item.question.correctAnswer)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <p className="exitMessage">{exit_message}</p>
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
