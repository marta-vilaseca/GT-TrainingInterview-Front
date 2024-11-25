// src/pages/Home.tsx
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Modal from '../components/modals/KnowMoreModal';
import Button from '../components/common/Button';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import { FaArrowRight } from 'react-icons/fa6';
import './Home.scss';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleStart = (_e: React.MouseEvent<HTMLElement>) => {
    navigate('/login');
  };

  const handleClickModal = (_e: React.MouseEvent<HTMLElement>) => {
    setShowModal(true);
  };

  return (
    <>
      <Layout page="home" extraClassName="home">
        <section className="greetings">
          <img src={Dora} className="greetings__logo" alt="PildorasUX logo" />
          <h2 className="greetings__title">¡Hola, soy Dora!</h2>
          <h3 className="greetings__title greetings__title2">
            Tu entrenadora virtual para entrevistas.
          </h3>
          <p className="greetings__subtitle">
            Con cada entrenamiento reforzarás tus habilidades y mejorarás tus
            áreas débiles.
          </p>
          <Button className="greetings__button" onClick={handleStart}>
            Comenzar entrevista
          </Button>
        </section>

        <section className="benefits">
          <p className="benefits__text">Con Dora podrás:</p>
          <ol className="benefits__list">
            <li>
              Simular entrevistas técnicas donde recibirás feedback inmediato,
              señalando respuestas correctas.
            </li>
            <li>Recibirás consejos para optimizar tu desempeño.</li>
            <li>
              Reforzarás tus conocimientos, identificando las áreas de mejora.
            </li>
            <li>Aumentarás tu confianza en cada entrevista.</li>
          </ol>
          <div className="benefits__more">
            <p className="benefits__more__text" onClick={handleClickModal}>
              Cómo funciona&nbsp;
            </p>
            <FaArrowRight className="benefits__more__arrow" />
          </div>
        </section>
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
