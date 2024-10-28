import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchQuestion } from '../../services/api';
import Button from '../common/Button';
import Chatbox from './Chatbox';
import ChatLoader from '../common/ChatLoader';
import { QuestionData } from '../../types/IAxios';
import { ChatEntry } from '../../types/IChatTypes';
import './ChatContainer.scss';

export default function ChatContainer() {
  const location = useLocation();
  const { name, role, experience } = location.state || {};

  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [chatboxDisabled, setChatboxDisabled] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load first question on button click
  const handleStartChat = async () => {
    setLoadingQuestion(true);
    setChatboxDisabled(true);
    setChatStarted(true);

    const requestData: QuestionData = {
      role,
      experience,
      theme: '',
    };

    try {
      const { question, comment } = await fetchQuestion(requestData);
      setCurrentQuestion(question);
      setCurrentFeedback(comment);
    } catch (error) {
      console.error('Failed to fetch question:', error);
    } finally {
      setLoadingQuestion(false);
      setChatboxDisabled(false);
    }
  };

  // Handle answer submission from Chatbox component
  const handleSubmitAnswer = (answer: string) => {
    if (!currentQuestion) return;

    // Add the current question and answer to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { question: currentQuestion, answer, feedback: '' },
    ]);

    setChatboxDisabled(true);

    setLoadingFeedback(true);
    setTimeout(() => {
      setChatHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1].feedback = currentFeedback;
        return newHistory;
      });

      setLoadingFeedback(false);

      setTimeout(async () => {
        await handleStartChat();
      }, 1000);
    }, 2000);

    // Reset the current question and feedback but keep chat history
    setCurrentQuestion('');
    setCurrentFeedback('');
  };

  // Auto-scroll to the end of the chat when chat history or loading state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loadingQuestion, loadingFeedback]);

  return (
    <div className="chat-container">
      <div className="chat-body">
        {/* Chat intro */}
        <div className="chat-intro">
          <h2>Hola, {name}!</h2>
          <p>
            Voy a hacerte preguntas sobre <strong>{role}</strong> para un nivel{' '}
            <strong>{experience}</strong>.
          </p>
          {!chatStarted && <Button onClick={handleStartChat}>Empecemos</Button>}
        </div>

        {/* Chat history */}
        {chatHistory.map((entry, index) => (
          <div key={index} className="chat-entry">
            <div className="bubble question">{entry.question}</div>
            <div className="bubble answer">{entry.answer}</div>
            <div className="bubble feedback">
              {entry.feedback || (loadingFeedback && <ChatLoader />)}
            </div>
          </div>
        ))}

        {/* Loading bubble for question while fetching the current question */}
        {loadingQuestion && (
          <div className="bubble current-question">
            <ChatLoader />
          </div>
        )}

        {/* Render current question if not loading */}
        {!loadingQuestion && currentQuestion && (
          <div className="bubble current-question">{currentQuestion}</div>
        )}

        {/* Ref for auto-scrolling */}
        <div className="spacer" ref={chatEndRef}></div>
      </div>

      {/* Chatbox for submitting answers */}
      <div className="chat-form">
        <Chatbox onSubmit={handleSubmitAnswer} disabled={chatboxDisabled} />
      </div>
    </div>
  );
}
