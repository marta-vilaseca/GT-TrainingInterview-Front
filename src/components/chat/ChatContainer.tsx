/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../../services/api';
import Button from '../common/Button';
import RadioButton from '../common/RadioButton';
import { randomizeStrings } from '../../utils/randomize';
import './ChatContainer.scss';
import { QuestionData2 } from '../../types/IAxios';
import ChatLoader from './ChatLoader';
import {
  continue_ok_message,
  continue_question,
  correct_answer,
  exit_message,
} from '../../utils/constants';

export default function ChatContainer() {
  const navigate = useNavigate();
  const { name, role, experience, theme } = {
    name: 'Gema',
    role: 'design',
    experience: 'junior',
    theme: 'general',
  };

  const [isChatStarted, setIsChatStarted] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    {
      question: string;
      answers: string[];
      feedback: JSX.Element | string | null;
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

  const [isSetCompleted, setIsSetCompleted] = useState(false);
  const [goodbyeMessage, setGoodbyeMessage] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Initialization of the chat
  const handleStartChat = async () => {
    setAreQuestionsLoading(true);
    setAreControlsDisabled(true);
    setIsChatStarted(true);
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

  // Handle the answer submission for each question
  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentQuestion && isAnswerSelected) {
      const isCorrect = selectedAnswer === correctAnswer;

      const correction = isCorrect ? null : (
        <p>
          <span className="feedback__incorrect">Respuesta incorrecta</span>. La
          opción correcta es: {correctAnswer}
        </p>
      );
      const correctMessage = randomizeStrings(correct_answer)[0];

      const feedbackToAdd = isCorrect ? (
        <p>
          <span className="feedback__correct">{correctMessage} </span>
          {currentQuestion.correctFeedback}
        </p>
      ) : (
        currentQuestion.wrongFeedback
      );

      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: currentQuestion.question,
          answers: currentAnswers || [],
          correction: correction,
          feedback: feedbackToAdd,
          selectedAnswer: selectedAnswer,
        },
      ]);

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
        }, 2000); // 2 second delay
      } else {
        setTimeout(() => {
          displayNextQuestion();
        }, 1000);
      }
    }
  };

  // Handle when the user wants to exit
  const handleCancelSession = () => {
    // Goodbye message isn't randomized because it's always the same one
    setGoodbyeMessage(exit_message[0]);

    setIsChatStarted(false);
    setIsAnswerSelected(false);
    setAreQuestionsLoading(false);
    setCurrentAnswers([]);
    setIsSetCompleted(false);
    setTimeout(() => {
      navigate('/');
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
      }, 2000);
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
              Te haré preguntas específicas para <strong>{role}</strong>,
              adecuadas para un nivel <strong>{experience}</strong>
              {theme && (
                <>
                  {' '}
                  y centradas en <strong>{theme}</strong>
                </>
              )}
              .
            </p>
          </div>

          {chatHistory.map((chatItem, index) => (
            <div key={index}>
              {/* Only render question bubble if there's actually a question and answers */}
              {chatItem.question && chatItem.answers.length > 0 && (
                <div className="bubble question test">
                  <p>
                    <strong>{chatItem.question}</strong>
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
              )}

              {chatItem.selectedAnswer && (
                <div className="bubble answer">
                  <p>{chatItem.selectedAnswer}</p>
                </div>
              )}

              {chatItem.correction && (
                <div className="bubble feedback">
                  <p>{chatItem.correction}</p>
                </div>
              )}

              {chatItem.feedback &&
                (chatItem.feedback === 'Continuar' ? (
                  <div className="bubble answer">
                    <p>{chatItem.feedback}</p>
                  </div>
                ) : (
                  <div className="bubble feedback">{chatItem.feedback}</div>
                ))}
            </div>
          ))}

          {/* {areQuestionsLoading && (
            <div className="chat-loader">
              <ChatLoader />
            </div>
          )} */}

          {isChatStarted &&
            currentQuestion &&
            !chatHistory.some(
              (item) => item.question === currentQuestion.question
            ) && (
              <>
                <div
                  className={`bubble current-question ${areQuestionsLoading ? 'fade-in' : ''}`}
                >
                  <p>
                    <strong>{currentQuestion.question}</strong>
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
              </>
            )}

          {goodbyeMessage && (
            <div className="new-question">
              <p>{goodbyeMessage}</p>
            </div>
          )}

          <div className="spacer" ref={chatEndRef}></div>
        </div>

        <div className="chat-form">
          <form className="controlsBox">
            {!isChatStarted && (
              <Button onClick={handleStartChat}>Iniciar</Button>
            )}

            {isChatStarted && !areQuestionsLoading && (
              <>
                <Button
                  type="button"
                  // disabled={areQuestionsLoading}
                  disabled={!isSetCompleted && !isAnswerSelected}
                  classname="secondary"
                  onClick={handleCancelSession}
                >
                  Terminar
                </Button>

                <Button
                  type="submit"
                  disabled={!isSetCompleted && !isAnswerSelected}
                  classname="primary"
                  onClick={
                    isSetCompleted ? displayNextQuestion : handleSubmitAnswer
                  }
                >
                  {isSetCompleted ? 'Continuar' : 'Enviar'}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
