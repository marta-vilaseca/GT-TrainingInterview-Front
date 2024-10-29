import Layout from '../components/layout/Layout';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import HomeForm from '../components/forms/HomeForm';
import './LogIn.scss';

function Login() {
  return (
    <>
      <Layout page="login">
        <div className="login">
          <div className="hero">
            <img src={Dora} className="hero__logo" alt="PildorasUX logo" />
            <div className="hero__container">
              <h2 className="hero__title">¡Hola, soy Dora!</h2>
              <p className="hero__text">
                Tu entrenadora virtual para entrevistas.
              </p>
            </div>
          </div>
          <p className="login__body">
            Dora está lista para guiarte. <br />
            Completa estos campos para ajustar el nivel y tipo de preguntas que
            recibirás durante el entrenamiento.
          </p>
        </div>
        <HomeForm></HomeForm>
      </Layout>
    </>
  );
}

export default Login;
