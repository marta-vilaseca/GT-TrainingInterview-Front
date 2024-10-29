import Layout from '../components/layout/Layout';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

function Home() {
  const navigate = useNavigate();
  const handleStart = () => {
    console.log('Hello');
    navigate('/login');
  };

  return (
    <>
      <Layout page="home" extraClassName="home">
        <div className="greetings">
          <img src={Dora} className="greetings__logo" alt="PildorasUX logo" />
          <h2 className="greetings__title">
            ¡Hola! Soy Dora, tu entrenadora virtual para entrevistas.
          </h2>
          <p className="greetings__body">
            Estoy aquí para ayudarte a prepararte y mejorar tus respuestas de
            forma personalizada.
          </p>
          <p className="greetings__body">
            ¿Listo para comenzar tu entrenamiento?
          </p>
          <Button onClick={handleStart}>¡Empecemos!</Button>
        </div>

        <ul className="benefits">
          <p className="benefits__text">
            Dora es una inteligencia artificial diseñada para preparar a
            profesionales de diseño UX/UI, frontend y backend en entrevistas
            técnicas.
          </p>
          <p className="benefits__text">
            A través de simulaciones de entrevistas y feedback personalizado,
            Dora te ayudará a perfeccionar tus respuestas y ganar la confianza
            que necesitas para destacar en cualquier proceso de selección.
          </p>
          <li className="benefit">
            <div className="benefit__number">
              <p>1</p>
            </div>
            <h6 className="benefit__title">Simulación de entrevistas</h6>
            <p className="benefit__text">
              Practica con preguntas para diseño UX/UI, frontend y backend,
              adaptadas a entrevistas reales.
            </p>
          </li>
          <li className="benefit">
            <div className="benefit__number">
              <p>2</p>
            </div>
            <h6 className="benefit__title">Adaptado a tu nivel</h6>
            <p className="benefit__text">
              Preguntas y feedback personalizados para trainee, junior y semi
              senior.
            </p>
          </li>
          <li className="benefit">
            <div className="benefit__number">
              <p>3</p>
            </div>
            <h6 className="benefit__title">Historial de mejoras</h6>
            <p className="benefit__text">
              Guarda tus respuestas, repasa y refuerza tus habilidades antes de
              cada entrevista.
            </p>
          </li>
          <li className="benefit">
            <div className="benefit__number">
              <p>4</p>
            </div>
            <h6 className="benefit__title">Feedback en cada respuesta</h6>
            <p className="benefit__text">
              Dora te da consejos y recomendaciones específicas según tu rol
              para mejorar en tiempo real.
            </p>
          </li>
          <li className="benefit">
            <div className="benefit__number">
              <p>5</p>
            </div>
            <h6 className="benefit__title">Temas personalizados</h6>
            <p className="benefit__text">Elige en qué enfocarte:</p>
            <ul className="focus">
              <li className="focus__option">
                UX/UI: Proceso de diseño, investigación de usuarios.
              </li>
              <li className="focus__option">
                Frontend: HTML, CSS, frameworks.
              </li>
              <li className="focus__option">
                Backend: APIs, seguridad, bases de datos.
              </li>
            </ul>
          </li>
        </ul>
      </Layout>
    </>
  );
}

export default Home;
