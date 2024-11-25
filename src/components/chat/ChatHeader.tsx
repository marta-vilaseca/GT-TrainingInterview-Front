// src/components/chat/ChatHeader.tsx
import { FiArrowLeft } from 'react-icons/fi';
import './ChatHeader.scss';

function ChatHeader() {
  return (
    <header className="chat-header">
      <a href="/login">
        <FiArrowLeft />
        <h3>Entrenando con Dora</h3>
      </a>
    </header>
  );
}

export default ChatHeader;
