import { FiArrowLeft } from 'react-icons/fi';
import './ChatHeader.scss';

function ChatHeader() {
  return (
    <div className="chat-header">
      <a href="/login">
        <FiArrowLeft />
        <h3>Entrenando con Dora</h3>
      </a>
    </div>
  );
}

export default ChatHeader;
