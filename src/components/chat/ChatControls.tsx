import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import './ChatContainer.scss';
import { useChatStore } from '../../store/chatStore';
import { ChatUser } from '../../types/IChatTypes';

const ChatControls = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const userData = state as ChatUser;
  const { name, role, experience, theme } = userData || {};

  const {
    isChatStarted,
    areQuestionsLoading,
    isAnswerSelected,
    isSetCompleted,
    totalQuestions,
    correctQuestions,
    reviewQuestions,
    startChat,
    handleSubmitAnswer,
    displayNextQuestion,
  } = useChatStore();

  const handleCancelSession = () => {
    setTimeout(() => {
      navigate('/chat/thankyou', {
        state: {
          fromChat: true,
          formData: { name, role, experience, theme },
          totalQuestions,
          correctQuestions,
          reviewQuestions,
        },
      });
    }, 2000);
  };

  return (
    <div className="chat-form">
      <form className="controlsBox">
        {!isChatStarted && (
          <Button
            className="primary start"
            onClick={() => startChat(role, experience, theme || '')}
          >
            Comenzar entrevista
          </Button>
        )}

        {isChatStarted && !areQuestionsLoading && (
          <div className="options">
            <Button
              type="button"
              disabled={false}
              className="secondary"
              onClick={handleCancelSession}
            >
              Terminar
            </Button>

            <Button
              type="submit"
              disabled={!isSetCompleted && !isAnswerSelected}
              className="primary"
              onClick={(e) => {
                e.preventDefault();
                isSetCompleted ? displayNextQuestion() : handleSubmitAnswer();
              }}
            >
              Continuar
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatControls;
