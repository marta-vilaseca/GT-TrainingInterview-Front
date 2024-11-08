import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { fetchQuestion, fetchFeedback } from '../../services/api';

import Button from '../common/Button';

import Chatbox from './Chatbox';

import ChatLoader from './ChatLoader';

import { QuestionData } from '../../types/IAxios';

import { ChatEntry } from '../../types/IChatTypes';

import './ChatContainer.scss';

export default function ChatContainer() {
  const location = useLocation();

  const { name, role, experience, theme } = location.state || {};

  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentFeedback, setCurrentFeedback] = useState('');
  console.log(currentFeedback); // Temporary use for linter
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [chatboxDisabled, setChatboxDisabled] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [showCurrentQuestion, setShowCurrentQuestion] = useState(false); // New control for displaying the current question

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load initial question
  const handleStartChat = async () => {
    setLoadingQuestion(true);
    setChatboxDisabled(true);
    setChatStarted(true);

    const requestData: QuestionData = { role, experience, theme: theme || '' };

    try {
      const { question } = await fetchQuestion(requestData);
      setCurrentQuestion(question);
      setShowCurrentQuestion(true);
    } catch (error) {
      console.error('Failed to fetch question:', error);
    } finally {
      setLoadingQuestion(false);
      setChatboxDisabled(false);
    }
  };

  // Handle answer submission and request feedback
  const handleSubmitAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    // Add the question and answer to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { question: currentQuestion, answer, feedback: '' },
    ]);

    setChatboxDisabled(true);
    setLoadingFeedback(true);
    setShowCurrentQuestion(false); // Hide the question while feedback loads

    try {
      const feedback = await fetchFeedback({
        question: currentQuestion,
        userResponse: answer,
      });
      setCurrentFeedback(feedback);

      // Update chat history with feedback
      setChatHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1].feedback = feedback;
        return newHistory;
      });

      setShowNextQuestionButton(true); // Show "Otra pregunta" button after feedback
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoadingFeedback(false);
      setChatboxDisabled(false);
      setCurrentQuestion(''); // Reset the current question until a new one is fetched
    }
  };

  // Fetch next question when "Otra pregunta" is clicked
  const handleNextQuestion = async () => {
    setLoadingQuestion(true);
    setChatboxDisabled(true);
    setShowNextQuestionButton(false); // Hide button when fetching new question

    const requestData: QuestionData = { role, experience, theme: theme || '' };

    try {
      const { question } = await fetchQuestion(requestData);
      setCurrentQuestion(question);
      setShowCurrentQuestion(true); // Show the new question
    } catch (error) {
      console.error('Failed to fetch question:', error);
    } finally {
      setLoadingQuestion(false);
      setChatboxDisabled(false);
    }
  };

  // Auto-scroll to the end of the chat when chat history or loading state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loadingQuestion, loadingFeedback]);

  return (
    <div className="chat-container">
      <div className="scrollbar-padding">
        <div className="chat-body">
          {/* Chat intro */}
          <div className="chat-intro">
            <h2>Hola, {name}!</h2>
            <p>
              Voy a hacerte preguntas sobre <strong>{role}</strong> para un
              nivel <strong>{experience}</strong>
              {theme && (
                <>
                  {' '}
                  y centradas en <strong>{theme}</strong>
                </>
              )}
              .
            </p>
            {!chatStarted && (
              <Button onClick={handleStartChat}>Empecemos</Button>
            )}
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

          {/* Ask for another question */}
          {showNextQuestionButton && !loadingQuestion && (
            <div className="bubble next-question">
              <Button onClick={handleNextQuestion}>Otra pregunta</Button>
            </div>
          )}

          {/* Loading bubble for question while fetching the current question */}
          {loadingQuestion && (
            <div className="bubble current-question">
              <ChatLoader />
            </div>
          )}

          {/* Render current question if available and not loading */}
          {showCurrentQuestion && currentQuestion && (
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
    </div>
  );
}
