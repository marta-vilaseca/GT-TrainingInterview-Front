import Layout from './components/layout/Layout';
import LoginForm from './components/forms/LoginForm';

function App() {
  return (
    <>
      <Layout page="home" extraClassName="test">
        <h1>Hola Mundo!</h1>
        <h2>Entrenador de Entrevistas</h2>
        <LoginForm />
      </Layout>
    </>
  );
}

export default App;
