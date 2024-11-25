// src/components/chat/ChatContainer.tsx
import { useLocation} from 'react-router-dom';
import './ChatContainer.scss';
import { reverseRoles, reverseThemes, RoleType } from '../../utils/constants';
import { ChatUser } from '../../types/IChatTypes';

function ChatIntro() {
  const location = useLocation();

    const { state } = location;
  const userData = state as ChatUser;
  const { name, role, experience, theme } = userData || {};

  const originalRole = reverseRoles[role] || role;
  const originalTheme = theme
    ? reverseThemes[role as RoleType]?.[theme] || theme
    : theme;
  return (
    <div>
      {/* Chat intro section */}
      <div className="chat-intro">
            <h2>Hola, {name}</h2>
            <p>¡Aquí comienza tu entrenamiento!</p>
            <p>
              Te haré preguntas específicas para <strong>{originalRole}</strong>
              , adecuadas para un nivel <strong>{experience}</strong>
              {originalTheme && originalTheme !== 'General' && (
                <>
                  {' '}
                  (centradas en <strong>{originalTheme}</strong>)
                </>
              )}{' '}
              y te daré consejos para tu próxima entrevista.
            </p>
          </div>
    </div>
  )
}

export default ChatIntro
