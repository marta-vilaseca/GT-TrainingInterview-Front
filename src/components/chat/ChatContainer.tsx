// src/components/chat/ChatContainer.tsx
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { ChatUser } from '../../types/IChatTypes';
import ChatIntro from './ChatIntro';
import ChatHistory from './ChatHistory';
import ChatCurrentQuestion from './ChatCurrentQuestion';
import ChatControls from './ChatControls';
import ChatLoader from './ChatLoader';
import Loader from '../common/Loader';
import './ChatContainer.scss';

export default function ChatContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { state } = location;
  const userData = state as ChatUser;
  const { role, experience, theme } = userData || {};

  const {
    chatHistory,
    areQuestionsLoading,
    isProcessing,
    currentQuestion,
    resetChat,
    updateUserData,
    isTerminating,
  } = useChatStore();

  useEffect(() => {
    resetChat();
    // If we have user data, just update the stored values without starting chat
    if (role && experience) {
      updateUserData(role, experience, theme || 'General');
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
  }, [
    chatHistory,
    currentQuestion,
    areQuestionsLoading,
    isProcessing,
    isTerminating,
  ]);

  return (
    <section className="chat-container">
      <div className="scrollbar-padding">
        <article className="chat-body">
          <ChatIntro />
          <ChatHistory />
          <ChatCurrentQuestion />

          {/* Show regular loader when exiting the chat, chat dot bubble otherwise */}
          {isTerminating ? (
            <Loader />
          ) : areQuestionsLoading || isProcessing ? (
            <div className="chat-loader">
              <ChatLoader />
            </div>
          ) : null}

          <div className="spacer" ref={chatEndRef}></div>
        </article>
      </div>

      <ChatControls />
    </section>
  );
}
