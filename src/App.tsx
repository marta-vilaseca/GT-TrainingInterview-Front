import Layout from './components/layout/Layout';
import TempChat from './components/temp/TempChat';

function App() {
  return (
    <>
      <Layout page="home" extraClassName="test">
        <h2>Entrenador de Entrevistas</h2>
        <TempChat />
      </Layout>
    </>
  );
}

export default App;
