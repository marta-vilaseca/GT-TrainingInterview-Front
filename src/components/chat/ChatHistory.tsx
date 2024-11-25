// src/components/chat/ChatHistory.tsx
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { ChatHistoryItem, ChatUser } from '../../types/IChatTypes';
import RadioButton from '../common/RadioButton';
import { renderInlineCode } from '../common/renderInlineCode';
import Dora from '../../assets/dora-white.svg';
import './ChatContainer.scss';

export const ChatHistory = () => {
  const location = useLocation();
  const { state } = location;
  const userData = state as ChatUser;
  const { name } = userData || {};

  const { chatHistory } = useChatStore();

  const renderContent = (content: ReactNode): ReactNode => {
    if (content === null) return null;

    // If content is a string -> renderInlineCode
    if (typeof content === 'string') {
      return renderInlineCode(content);
    }

    // If content is a JSX element, recursively look for any string content inside, then -> renderInlineCode
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
        <section className="chat__history" key={index}>
          {chatItem.question && chatItem.answers.length > 0 && (
            <article className="outer__bubble ia">
              <div className="avatar">
                <img src={Dora} className="avatar__dora" alt="Dora logo" />
              </div>
              <div className="bubble question">
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
            </article>
          )}

          {chatItem.selectedAnswer && (
            <article className="outer__bubble user">
              <div className="avatar">{name.toUpperCase()[0]}</div>
              <div className="bubble answer">
                <p>{renderInlineCode(chatItem.selectedAnswer)}</p>
              </div>
            </article>
          )}

          {chatItem.correction && (
            <article className="outer__bubble ia">
              <div className="avatar">
                <img src={Dora} className="avatar__dora" alt="Dora logo" />
              </div>
              <div className="bubble feedback">
                {renderContent(chatItem.correction)}
              </div>
            </article>
          )}

          {chatItem.feedback &&
            (chatItem.feedback === 'Continuar' ? (
              <article className="outer__bubble user">
                <div className="avatar">{name.toUpperCase()[0]}</div>
                <div className="bubble answer">
                  {renderContent(chatItem.feedback)}
                </div>
              </article>
            ) : (
              <article className="outer__bubble ia">
                <div className="avatar">
                  <img src={Dora} className="avatar__dora" alt="Dora logo" />
                </div>
                <div className="bubble feedback">
                  {renderContent(chatItem.feedback)}
                </div>
              </article>
            ))}
        </section>
      ))}
    </>
  );
};

export default ChatHistory;
