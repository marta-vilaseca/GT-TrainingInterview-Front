// src/pages/Login.tsx
import React from 'react';
import { LoginFormProps } from '../types/ILoginForm';
import Layout from '../components/layout/Layout';
import HomeForm from '../components/forms/HomeForm';
import Dora from '../assets/artificial-bot-intelligence-svgrepo-com.svg';
import './LogIn.scss';

interface LoginProps {
  homeFormData: LoginFormProps;
  setHomeFormData: React.Dispatch<React.SetStateAction<LoginFormProps>>;
}

const Login: React.FC<LoginProps> = ({ homeFormData, setHomeFormData }) => {
  return (
    <>
      <Layout page="login">
        <section className="login">
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
            <b>Vamos a personalizar tu entrenamiento</b> completando los
            siguientes campos.
          </p>
        </section>
        <HomeForm
          homeFormData={homeFormData}
          setHomeFormData={setHomeFormData}
        ></HomeForm>
      </Layout>
    </>
  );
};

export default Login;
