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

  const [isChatStarted, setIsChatStarted] = useState(false); // Chat started state
  const [chatHistory, setChatHistory] = useState<
    {
      question: string;
      answers: string[];
      feedback: string | null;
      selectedAnswer: string | null;
    }[]
  >([]);
  const [areControlsDisabled, setAreControlsDisabled] = useState(true); // Disable controls initially
  const [areQuestionsLoading, setAreQuestionsLoading] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false); // Track if an answer is selected
  const [questionSet, setQuestionSet] = useState<QuestionData2[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData2 | null>(
    null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[] | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isContinuing, setIsContinuing] = useState(false); // Track if continuing after encouragement
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Start chat and fetch questions
  const handleStartChat = async () => {
    setAreQuestionsLoading(true);
    setAreControlsDisabled(true);
    setIsChatStarted(true); // Mark chat as started

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
      } else {
        console.warn('No questions available.');
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setAreQuestionsLoading(false);
      setAreControlsDisabled(false); // Enable controls after questions are loaded
    }
  };

  // Handle answer selection
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
    setIsAnswerSelected(true); // Mark answer as selected
  };

  // Submit answer and proceed to next question
  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentQuestion && isAnswerSelected) {
      const isCorrect = selectedAnswer === correctAnswer;
      const feedbackToAdd = isCorrect
        ? currentQuestion.correctFeedback
        : currentQuestion.wrongFeedback || 'POTATO';

      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: currentQuestion.question,
          answers: currentAnswers || [],
          feedback: feedbackToAdd,
          selectedAnswer: selectedAnswer,
        },
      ]);

      displayNextQuestion();
    } else {
      console.log('Please select an answer before submitting.');
    }
  };

  // Cancel session
  const handleCancelSession = () => {
    console.log('Session Cancelled');
    setIsChatStarted(false);
    setIsAnswerSelected(false);
    setAreQuestionsLoading(false);
    setCurrentAnswers([]);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Function to handle when the next question is displayed or the end message is shown
  const displayNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSelected(false);

    if (currentQuestionIndex < questionSet.length - 1) {
      // Continue to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      const nextQuestion = questionSet[currentQuestionIndex + 1];

      const randomizedAnswers = randomizeStrings([
        nextQuestion.correctAnswer,
        nextQuestion.wrongAnswerA,
        nextQuestion.wrongAnswerB,
      ]);

      setCurrentQuestion(nextQuestion);
      setCorrectAnswer(nextQuestion.correctAnswer);
      setCurrentAnswers(randomizedAnswers);
      setAreControlsDisabled(false); // Enable controls after a question is set
    } else {
      // If it's the last question, show the thank you message and enable the buttons
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: '',
          answers: [],
          feedback: '¡Gracias por participar!',
          selectedAnswer: null,
        },
      ]);

      // Set areControlsDisabled to false, enabling both buttons
      setAreControlsDisabled(false);
      console.log(
        'Are controls disabled after last question?',
        areControlsDisabled
      );
    }
  };

  // Function to handle the "Continuar" button logic
  const handleContinueSession = () => {
    if (isContinuing) {
      // Restart the round of questions
      setIsContinuing(false);

      // Add encouragement message
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: '',
          answers: [],
          feedback: '¡Vamos por más!',
          selectedAnswer: null,
        },
      ]);

      // Reset to the first question of the set, but keep the previous questions in chatHistory
      setCurrentQuestionIndex(0); // Reset question index
      const nextQuestion = questionSet[0];
      const randomizedAnswers = randomizeStrings([
        nextQuestion.correctAnswer,
        nextQuestion.wrongAnswerA,
        nextQuestion.wrongAnswerB,
      ]);

      setCurrentQuestion(nextQuestion);
      setCorrectAnswer(nextQuestion.correctAnswer);
      setCurrentAnswers(randomizedAnswers);
      setAreControlsDisabled(false); // Enable controls to allow answering
    } else {
      // Enable the "Continuar" button, show the encouragement message
      setIsContinuing(true);

      // Show the encouragement message when clicking "Continuar"
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          question: '',
          answers: [],
          feedback: '¡Vamos por más!',
          selectedAnswer: null,
        },
      ]);
    }
  };

  // Scroll to the bottom of the chat when new content is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

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

          {/* Render chat history */}
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

          {/* Render current question */}
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
                          checked={selectedAnswer === answer}
                          onChange={handleAnswerChange}
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
                  disabled={areControlsDisabled || !isAnswerSelected}
                  classname="secondary"
                  onClick={handleCancelSession}
                >
                  Terminar
                </Button>
                <Button
                  type="submit"
                  disabled={areControlsDisabled || !isAnswerSelected}
                  classname="primary"
                  onClick={
                    isContinuing ? handleContinueSession : handleSubmitAnswer
                  }
                >
                  Continuar
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
