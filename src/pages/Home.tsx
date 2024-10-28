import Layout from '../components/layout/Layout';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import Button from '../components/common/Button';
import './Home.scss';

function Home() {
  const handleStart = () => {
    console.log('Hello');
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
      </Layout>
    </>
  );
}

export default Home;
