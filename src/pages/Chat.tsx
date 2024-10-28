import ChatContainer from '../components/chat/ChatContainer';
import ChatHeader from '../components/chat/ChatHeader';
import Layout from '../components/layout/Layout';
import './Chat.scss';

export default function Chat() {
  return (
    <Layout page="chat">
      <ChatHeader />
      <ChatContainer></ChatContainer>
    </Layout>
  );
}
