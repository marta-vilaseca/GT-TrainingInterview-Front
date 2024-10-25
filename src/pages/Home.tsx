import Layout from '../components/layout/Layout';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import HomeForm from '../components/forms/HomeForm';
import './Home.scss';

function Home() {
  return (
    <>
      <Layout page="home" extraClassName="chat">
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
        </div>
        <HomeForm></HomeForm>
      </Layout>
    </>
  );
}

export default Home;
