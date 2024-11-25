// src/components/chat/ChatIntro.tsx
import { useLocation } from 'react-router-dom';
import { ChatUser } from '../../types/IChatTypes';
import { reverseRoles, reverseThemes, RoleType } from '../../utils/constants';
import './ChatContainer.scss';

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
    <section className="chat-intro">
      <h2>Hola, {name}</h2>
      <p>¡Aquí comienza tu entrenamiento!</p>
      <p>
        Te haré preguntas específicas para <strong>{originalRole}</strong>,
        adecuadas para un nivel <strong>{experience}</strong>
        {originalTheme && originalTheme !== 'General' && (
          <>
            {' '}
            (centradas en <strong>{originalTheme}</strong>)
          </>
        )}{' '}
        y te daré consejos para tu próxima entrevista.
      </p>
    </section>
  );
}

export default ChatIntro;
