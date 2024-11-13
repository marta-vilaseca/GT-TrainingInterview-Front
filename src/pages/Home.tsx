import Layout from '../components/layout/Layout';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import Button from '../components/common/Button';
import Modal from '../components/modals/KnowMoreModal';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.scss';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleStart = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    console.log('This is a botton');
    navigate('/login');
  };

  const handleClickModal = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    console.log('This is a know more');
    setShowModal(true);
  };

  return (
    <>
      <Layout page="home" extraClassName="home">
        <div className="greetings">
          <img src={Dora} className="greetings__logo" alt="PildorasUX logo" />
          <h2 className="greetings__title">¡Hola, soy Dora!</h2>
          <h3 className="greetings__title">
            Tu entrenadora virtual para entrevistas.
          </h3>
          <p className="greetings__subtitle">
            Con cada entrenamiento reforzarás tus habilidades y mejorarás tus
            áreas débiles.
          </p>
          <Button className="greetings__button" onClick={handleStart}>
            Comenzar entrevista
          </Button>
        </div>

        <div className="benefits">
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
