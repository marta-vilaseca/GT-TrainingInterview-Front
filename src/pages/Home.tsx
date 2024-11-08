import Layout from '../components/layout/Layout';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import Button from '../components/common/Button';
import Modal from '../components/modals/KnowMoreModal';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.scss';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    navigate('/login');
  };

  const handleClickModal = (e: React.MouseEvent<HTMLParagraphElement>) => {
    console.log(e);
    setShowModal(true);
  };

  return (
    <>
      <Layout page="home" extraClassName="home">
        <div className="greetings">
          <img src={Dora} className="greetings__logo" alt="PildorasUX logo" />
          <h2 className="greetings__title">¡Hola, soy Dora!</h2>
          <h3 className="greetings__subtitle">
            Tu entrenadora virtual para entrevistas.
          </h3>
          <p className="greetings__body">
            Estoy aquí para ayudarte a prepararte y mejorar tus respuestas de
            forma personalizada.
          </p>
          <p className="greetings__body">
            ¿Listo para comenzar tu entrenamiento?
          </p>
          <Button onClick={handleStart}>Iniciemos</Button>
        </div>

        <div className="benefits">
          <p className="benefits__text">
            A través de preguntas interactivas, simula entrevistas técnicas. Te
            brinda feedback inmediato, señalando respuestas correctas y
            ofreciendo consejos para optimizar tu desempeño.
          </p>
          <p className="benefits__text">
            Con Dora, podrás reforzar tus conocimientos, identificar áreas de
            mejora y avanzar con confianza en cada entrevista.
          </p>
          <p className="benefits__more" onClick={handleClickModal}>
            Conoce más
          </p>
        </div>
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          children
        ></Modal>
      </Layout>
    </>
  );
};

export default Home;
