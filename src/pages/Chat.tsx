// src/pages/Chat.tsx
import ChatContainer from '../components/chat/ChatContainer';
import ChatHeader from '../components/chat/ChatHeader';
import Layout from '../components/layout/Layout';
import './Chat.scss';

const Chat: React.FC = () => {
  return (
    <Layout page="chat">
      <ChatHeader />
      <ChatContainer></ChatContainer>
    </Layout>
  );
};

export default Chat;
