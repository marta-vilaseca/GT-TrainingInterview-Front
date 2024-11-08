import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../../services/api';
import Button from '../common/Button';
import RadioButton from '../common/RadioButton';
import { randomizeStrings } from '../../utils/randomize';
import './ChatContainer.scss';
import { QuestionData2 } from '../../types/IAxios';

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
      feedback: string | null;
      selectedAnswer: string | null;
    }[]
  >([]);

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

  const [isContinuing, setIsContinuing] = useState(false);
  const [isSetCompleted, setIsSetCompleted] = useState(false);

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
      const feedbackToAdd = isCorrect
        ? currentQuestion.correctFeedback
        : currentQuestion.wrongFeedback;

      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: currentQuestion.question,
          answers: currentAnswers || [],
          feedback: feedbackToAdd,
          selectedAnswer: selectedAnswer,
        },
      ]);

      if (currentQuestionIndex === questionSet.length - 1) {
        setIsSetCompleted(true);
        setAreControlsDisabled(false);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            question: '',
            answers: [],
            feedback: '¡Gracias por participar!',
            selectedAnswer: null,
          },
        ]);
      } else {
        displayNextQuestion();
      }
    }
  };

  // Handle when the user wants to exit
  const handleCancelSession = () => {
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
    } else {
      // When set is completed, display encouragement message and start new set
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: '',
          answers: [],
          feedback: '¡Vamos a por ello!',
          selectedAnswer: null,
        },
      ]);
      startNewQuestionSet();
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
              {chatItem.question && <strong>{chatItem.question}</strong>}
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
              {chatItem.feedback && <div>{chatItem.feedback}</div>}
            </div>
          ))}

          {isChatStarted &&
            currentQuestion &&
            !chatHistory.some(
              (item) => item.question === currentQuestion.question
            ) && (
              <div>
                <strong>{currentQuestion.question}</strong>
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
