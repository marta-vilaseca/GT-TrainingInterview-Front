// src/components/chat/ChatContainer.tsx
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import RadioButton from '../common/RadioButton';
import Dora from '../../assets/dora-white.svg';
import './ChatContainer.scss';
import { renderInlineCode } from '../common/renderInlineCode';
import { useChatStore } from '../../store/chatStore';
import { ChatHistoryItem, ChatUser } from '../../types/IChatTypes';

export const ChatHistory = () => {
  const location = useLocation();
  const { state } = location;
  const userData = state as ChatUser;
  const { name } = userData || {};

  const { chatHistory } = useChatStore();

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

  return (
    <>
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
                  <img src={Dora} className="avatar__dora" alt="Dora logo" />
                </div>
                <div className="bubble feedback">
                  {renderContent(chatItem.feedback)}
                </div>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
