import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Chatbox from '../components/forms/Chatbox';
import './Chat.scss';

function Chat() {
  return (
    <>
      <Layout page="chat">
        <div className="chat-text">
          <h2>Hola, Reyes!</h2>
          <div className="text">
            <p>
              Voy a hacerte preguntas sobre <strong>Frontend</strong> para un
              nivel <strong>Junior</strong>.
            </p>
          </div>
          <div className="action">
            <Button>Empecemos</Button>
          </div>
        </div>
        <div className="chat-form">
          <Chatbox />
        </div>
      </Layout>
    </>
  );
}

export default Chat;
