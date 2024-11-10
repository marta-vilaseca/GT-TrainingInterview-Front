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
            <div className="hero__container">
              <h2 className="hero__title">¡Hola!</h2>
              <p className="hero__text">
                ¡Prepárate para brillar en tus entrevistas!
              </p>
            </div>
            <img src={Dora} className="hero__logo" alt="PildorasUX logo" />
          </div>
          <p className="login__body">
            <b className="secondarycolor">Dora</b> está lista para guiarte,
            ahora personalicemos tu entrenamiento completando los siguientes
            campos.
          </p>
        </div>
        <HomeForm></HomeForm>
      </Layout>
    </>
  );
}

export default Login;
