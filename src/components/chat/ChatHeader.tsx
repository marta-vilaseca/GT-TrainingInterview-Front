import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import './ChatHeader.scss';

function ChatHeader() {
  return (
    <div className="chat-header">
      <AiOutlineMenu />
      <h3>Dora</h3>
      <AiOutlineEdit />
    </div>
  );
}

export default ChatHeader;
