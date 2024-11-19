/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../../services/api';
import Button from '../common/Button';
import RadioButton from '../common/RadioButton';
import { randomizeStrings } from '../../utils/randomize';
import Dora from '../../assets/dora-white.svg';
import './ChatContainer.scss';
import { QuestionData2 } from '../../types/IAxios';
import { reverseRoles } from '../../utils/constants';
import ChatLoader from './ChatLoader';
import { renderInlineCode } from '../common/renderInlineCode';
import {
  continue_ok_message,
  continue_question,
  correct_answer,
} from '../../utils/constants';

export default function ChatContainer() {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, role, experience, theme } = location.state || {};
  const originalRole = reverseRoles[role] || role;

  const [isChatStarted, setIsChatStarted] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    {
      question: string;
      answers: string[];
      feedback: React.ReactNode;
      correction: JSX.Element | null;
      selectedAnswer: string | null;
    }[]
  >([]);

  /* @ts-ignore */
  const [areControlsDisabled, setAreControlsDisabled] = useState(true);
  const [areQuestionsLoading, setAreQuestionsLoading] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const [questionSet, setQuestionSet] = useState<QuestionData2[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData2 | null>(
    null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[] | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [isSetCompleted, setIsSetCompleted] = useState(false);
  // const [goodbyeMessage, setGoodbyeMessage] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  /* @ts-ignore */
  const [showFeedback, setShowFeedback] = useState(false);

  // Initialization of the chat
  const handleStartChat = async () => {
    setAreQuestionsLoading(true);
    setAreControlsDisabled(true);
    setIsChatStarted(true);
    setIsSetCompleted(false);
    setTotalQuestions(totalQuestions + 5);

    const requestData = { role, experience, theme: theme || '' };

    try {
      const fetchedQuestions = await fetchQuestions(requestData);
      console.log(requestData);
      console.log(fetchedQuestions);

      if (fetchedQuestions.length > 0) {
        const firstQuestion = fetchedQuestions[0];
        const randomizedAnswers = randomizeStrings([
          firstQuestion.correctAnswer,
          firstQuestion.wrongAnswerA,
          firstQuestion.wrongAnswerB,
        ]);

        setCurrentAnswers(randomizedAnswers);
        setCurrentQuestion(firstQuestion);
        setQuestionSet(fetchedQuestions);
        setCorrectAnswer(firstQuestion.correctAnswer);
        setCurrentQuestionIndex(0);
      } else {
        console.warn('No questions available.');
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setAreQuestionsLoading(false);
      setAreControlsDisabled(false);
    }
  };

  // Handle when the user picks an answer from the available options
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
    setIsAnswerSelected(true);
  };

  // Handle when the user picks an answer from the available options
  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentQuestion && isAnswerSelected) {
      const isCorrect = selectedAnswer === correctAnswer;
      if (isCorrect) setCorrectQuestions(correctQuestions + 1);

      // Prepare correction JSX if the answer is incorrect
      const correction = isCorrect ? null : (
        <>
          <span className="feedback__incorrect">Respuesta incorrecta</span>. La
          opción correcta es: {renderInlineCode(correctAnswer as string)}
        </>
      );

      const correctMessage = randomizeStrings(correct_answer)[0];

      // Prepare feedback to add, either correct or incorrect
      const feedbackToAdd = isCorrect ? (
        <>
          <span className="feedback__correct">{correctMessage}</span>
          {renderInlineCode(currentQuestion.correctFeedback as string)}
        </>
      ) : (
        renderInlineCode(currentQuestion.wrongFeedback) // no need to wrap it inside another object
      );

      // Add the user's selected answer immediately
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: currentQuestion.question,
          answers: currentAnswers || [],
          correction: null, // Set correction to null initially
          feedback: null, // Set feedback to null initially
          selectedAnswer: selectedAnswer,
        },
      ]);

      // Introduce a delay before showing the feedback
      setShowFeedback(false); // Reset feedback display state
      setTimeout(() => {
        setChatHistory((prevHistory) => {
          // Update the last history entry with correction and feedback
          const updatedHistory = [...prevHistory];
          const lastItemIndex = updatedHistory.length - 1;
          updatedHistory[lastItemIndex] = {
            ...updatedHistory[lastItemIndex],
            correction: correction, // Set correction based on isCorrect
            feedback: feedbackToAdd, // Set feedback, either correct or incorrect
          };
          return updatedHistory;
        });
        setShowFeedback(true);
      }, 2000); // 2-second delay

      // If it's the last question in the set, handle completion
      if (currentQuestionIndex === questionSet.length - 1) {
        setIsSetCompleted(true);
        setAreControlsDisabled(false);
        const continueQuestion = randomizeStrings(continue_question)[0];

        setTimeout(() => {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              question: '',
              answers: [],
              correction: null,
              feedback: continueQuestion,
              selectedAnswer: null,
            },
          ]);
        }, 2000); // Another delay for continuation
      } else {
        setTimeout(() => {
          displayNextQuestion();
        }, 4000); // Ensure sufficient delay before moving to the next question
      }
    }
  };

  // Handle when the user wants to exit
  const handleCancelSession = () => {
    setTimeout(() => {
      navigate('/chat/thankyou', {
        state: {
          fromChat: true,
          formData: { name, role, experience, theme },
          totalQuestions,
          correctQuestions,
        },
      });
    }, 2000);
  };

  // Initialize a new round of questions
  const startNewQuestionSet = async () => {
    setAreQuestionsLoading(true);
    setAreControlsDisabled(true);
    setIsSetCompleted(false);

    const requestData = { role, experience, theme: theme || '' };

    try {
      const fetchedQuestions = await fetchQuestions(requestData);
      if (fetchedQuestions.length > 0) {
        const firstQuestion = fetchedQuestions[0];
        const randomizedAnswers = randomizeStrings([
          firstQuestion.correctAnswer,
          firstQuestion.wrongAnswerA,
          firstQuestion.wrongAnswerB,
        ]);

        setCurrentAnswers(randomizedAnswers);
        setCurrentQuestion(firstQuestion);
        setQuestionSet(fetchedQuestions);
        setCorrectAnswer(firstQuestion.correctAnswer);
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setAreQuestionsLoading(false);
      setAreControlsDisabled(false);
    }
  };

  // Handle the logic for displaying the next question
  const displayNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    setAreControlsDisabled(true);
    setAreQuestionsLoading(true);

    if (!isSetCompleted) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = questionSet[nextIndex];

      const randomizedAnswers = randomizeStrings([
        nextQuestion.correctAnswer,
        nextQuestion.wrongAnswerA,
        nextQuestion.wrongAnswerB,
      ]);

      setCurrentQuestion(nextQuestion);
      setCorrectAnswer(nextQuestion.correctAnswer);
      setCurrentAnswers(randomizedAnswers);
      setCurrentQuestionIndex(nextIndex);
      setAreControlsDisabled(false);
      setAreQuestionsLoading(false);
    } else {
      // When set is completed, display "Continuar" bubble and then the encouragement message
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: '',
          answers: [],
          correction: null,
          feedback: 'Continuar',
          selectedAnswer: null,
        },
      ]);

      // When set is completed, display encouragement message and start new set
      setTimeout(() => {
        const continueMessage = randomizeStrings(continue_ok_message)[0];
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            question: '',
            answers: [],
            correction: null,
            feedback: continueMessage,
            selectedAnswer: null,
          },
        ]);
      }, 1000);

      setTimeout(() => {
        startNewQuestionSet();
      }, 3000);
    }
  };

  // to always scroll automatically to the bottom of the chat
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, [chatHistory, currentQuestion]);

  return (
    <div className="chat-container">
      <div className="scrollbar-padding">
        <div className="chat-body">
          <div className="chat-intro">
            <h2>Hola, {name}</h2>
            <p>¡Aquí comienza tu entrenamiento!</p>
            <p>
              Te haré preguntas específicas para <strong>{originalRole}</strong>
              , adecuadas para un nivel <strong>{experience}</strong>
              {theme && theme !== 'General' && (
                <>
                  {' '}
                  (centradas en <strong>{theme}</strong>)
                </>
              )}{' '}
              y te daré consejos para tu próxima entrevista.
            </p>
          </div>

          {chatHistory.map((chatItem, index) => (
            <div className="chat__history" key={index}>
              {/* Only render question bubble if there's actually a question and answers */}
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
                      {chatItem.answers.map((answer, idx) => (
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
                    <p>{chatItem.correction}</p>
                  </div>
                </div>
              )}

              {chatItem.feedback &&
                (chatItem.feedback === 'Continuar' ? (
                  <div className="outer__bubble user">
                    <div className="avatar">{name.toUpperCase()[0]}</div>
                    <div className="bubble answer">
                      <p>{chatItem.feedback}</p>
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
                    <div className="bubble feedback">{chatItem.feedback}</div>
                  </div>
                ))}
            </div>
          ))}

          {isChatStarted &&
            currentQuestion &&
            !chatHistory.some(
              (item) => item.question === currentQuestion.question
            ) && (
              <div className="outer__bubble ia">
                <div className="avatar">
                  <img src={Dora} className="avatar__dora" alt="Dora logo" />
                </div>

                <div
                  className={`bubble current-question ${areQuestionsLoading ? 'fade-in' : ''}`}
                >
                  <p>
                    <strong>
                      {renderInlineCode(currentQuestion.question)}
                    </strong>
                  </p>
                  <ul>
                    {currentAnswers &&
                      currentAnswers.map((answer, index) => (
                        <li key={['A', 'B', 'C'][index]}>
                          <RadioButton
                            id={`role-${answer.toLowerCase().replace(/\s+/g, '-')}`}
                            labelText={answer}
                            name="role"
                            value={answer}
                            onChange={handleAnswerChange}
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
      <div className="chat-form">
        <form className="controlsBox">
          {!isChatStarted && (
            <Button className="primary start" onClick={handleStartChat}>
              Iniciar
            </Button>
          )}

          {isChatStarted && !areQuestionsLoading && (
            <div className="options">
              <Button
                type="button"
                // disabled={areQuestionsLoading}
                disabled={!isSetCompleted && !isAnswerSelected}
                className="secondary"
                onClick={handleCancelSession}
              >
                Terminar
              </Button>

              <Button
                type="submit"
                disabled={!isSetCompleted && !isAnswerSelected}
                className="primary"
                onClick={
                  isSetCompleted ? displayNextQuestion : handleSubmitAnswer
                }
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
