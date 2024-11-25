// src/components/chat/ChatControls.tsx
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { ChatUser } from '../../types/IChatTypes';
import Button from '../common/Button';
import './ChatContainer.scss';

const ChatControls = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentQuestionSetRef = useRef<number>(0); // to track question set changes

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
    terminateChat,
  } = useChatStore();

  const handleCancelSession = () => {
    terminateChat();
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

  useEffect(() => {
    if (isSetCompleted) {
      currentQuestionSetRef.current += 1;
    }
  }, [isSetCompleted]);

  return (
    <section className="chat-form">
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
    </section>
  );
};

export default ChatControls;
