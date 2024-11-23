// src/components/chat/ChatContainer.tsx
import React, { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import RadioButton from '../common/RadioButton';
import Dora from '../../assets/dora-white.svg';
import './ChatContainer.scss';
import { reverseRoles, reverseThemes, RoleType } from '../../utils/constants';
import ChatLoader from './ChatLoader';
import { renderInlineCode } from '../common/renderInlineCode';
import { useChatStore } from '../../store/chatStore';
import { ChatHistoryItem, ChatUser } from '../../types/IChatTypes';

export default function ChatContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const currentQuestionSetRef = useRef<number>(0); // to track question set changes

  const { state } = location;
  const userData = state as ChatUser;
  const { name, role, experience, theme } = userData || {};

  const originalRole = reverseRoles[role] || role;
  const originalTheme = theme
    ? reverseThemes[role as RoleType]?.[theme] || theme
    : theme;

  const {
    isChatStarted,
    chatHistory,
    areQuestionsLoading,
    isAnswerSelected,
    currentQuestion,
    currentAnswers,
    selectedAnswer,
    isSetCompleted,
    totalQuestions,
    correctQuestions,
    reviewQuestions,
    startChat,
    handleAnswerChange,
    handleSubmitAnswer,
    displayNextQuestion,
    resetChat,
    updateUserData,
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

  const renderContent = (content: ReactNode): ReactNode => {
    if (content === null) return null;

    // If the content is a string, apply renderInlineCode
    if (typeof content === 'string') {
      return renderInlineCode(content);
    }

    // If it's a JSX element, recursively look for any string content inside it and apply renderInlineCode
    if (React.isValidElement(content)) {
      const children = React.Children.map(content.props.children, (child) =>
        renderContent(child)
      );

      return React.cloneElement(content, {}, ...children); // Clone the element and apply recursive rendering
    }

    return content; // Return as-is for anything else (arrays, numbers, etc.)
  };

  // Update the initial useEffect
  useEffect(() => {
    resetChat();

    // If we have user data, just update the stored values without starting chat
    if (role && experience) {
      updateUserData(role, experience, theme);
    } else {
      // If we don't have user data, redirect back to the form
      navigate('/');
    }
  }, [role, experience, theme]);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, [chatHistory, currentQuestion]);

  useEffect(() => {
    if (isSetCompleted) {
      currentQuestionSetRef.current += 1;
    }
  }, [isSetCompleted]);

  return (
    <div className="chat-container">
      <div className="scrollbar-padding">
        <div className="chat-body">
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

          {/* Chat history section */}
          {chatHistory.map((chatItem: ChatHistoryItem, index: number) => (
            <div className="chat__history" key={index}>
              {chatItem.question && chatItem.answers.length > 0 && (
                <div className="outer__bubble ia">
                  <div className="avatar">
                    <img src={Dora} className="avatar__dora" alt="Dora logo" />
                  </div>
                  <div className="bubble question test">
                    <p>
                      <strong>{renderInlineCode(chatItem.question)}</strong>
                    </p>
                    <ul>
                      {chatItem.answers.map((answer: string, idx: number) => (
                        <li key={['A', 'B', 'C'][idx]}>
                          <RadioButton
                            id={`role-${answer.toLowerCase().replace(/\s+/g, '-')}`}
                            labelText={answer}
                            name={`role-${index}`}
                            value={answer}
                            checked={answer === chatItem.selectedAnswer}
                            onChange={() => {}}
                            disabled
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {chatItem.selectedAnswer && (
                <div className="outer__bubble user">
                  <div className="avatar">{name.toUpperCase()[0]}</div>
                  <div className="bubble answer">
                    <p>{renderInlineCode(chatItem.selectedAnswer)}</p>
                  </div>
                </div>
              )}

              {chatItem.correction && (
                <div className="outer__bubble ia">
                  <div className="avatar">
                    <img src={Dora} className="avatar__dora" alt="Dora logo" />
                  </div>
                  <div className="bubble feedback">
                    {renderContent(chatItem.correction)}
                  </div>
                </div>
              )}

              {chatItem.feedback &&
                (chatItem.feedback === 'Continuar' ? (
                  <div className="outer__bubble user">
                    <div className="avatar">{name.toUpperCase()[0]}</div>
                    <div className="bubble answer">
                      {renderContent(chatItem.feedback)}
                    </div>
                  </div>
                ) : (
                  <div className="outer__bubble ia">
                    <div className="avatar">
                      <img
                        src={Dora}
                        className="avatar__dora"
                        alt="Dora logo"
                      />
                    </div>
                    <div className="bubble feedback">
                      {renderContent(chatItem.feedback)}
                    </div>
                  </div>
                ))}
            </div>
          ))}

          {/* Current question section */}
          {isChatStarted &&
            currentQuestion &&
            !isSetCompleted &&
            !areQuestionsLoading && (
              <div className="outer__bubble ia">
                <div className="avatar">
                  <img src={Dora} className="avatar__dora" alt="Dora logo" />
                </div>
                <div className="bubble current-question">
                  <p>
                    <strong>
                      {renderInlineCode(currentQuestion.question)}
                    </strong>
                  </p>
                  <ul>
                    {currentAnswers &&
                      currentAnswers.map((answer: string, index: number) => (
                        <li key={['A', 'B', 'C'][index]}>
                          <RadioButton
                            id={`role-${answer.toLowerCase().replace(/\s+/g, '-')}`}
                            labelText={answer}
                            name="role"
                            value={answer}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            checked={selectedAnswer === answer}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

          {areQuestionsLoading && (
            <div className="chat-loader">
              <ChatLoader />
            </div>
          )}

          <div className="spacer" ref={chatEndRef}></div>
        </div>
      </div>

      {/* Chat controls */}
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
    </div>
  );
}
