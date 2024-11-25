// src/types/IChatTypes.ts

import { QuestionData } from './IAxios';

export interface ReviewQuestion {
  question: QuestionData;
}

// src/types/chat.ts

export interface ChatHistoryItem {
  question: string;
  answers: string[];
  correction: JSX.Element | null;
  feedback: React.ReactNode | null;
  selectedAnswer: string | null;
  questionSetIndex?: number;
}

export interface ChatUser {
  name: string;
  role: string;
  experience: string;
  theme?: string;
}

export interface ChatState {
  // Chat status
  isChatStarted: boolean;
  areControlsDisabled: boolean;
  areQuestionsLoading: boolean;
  isAnswerSelected: boolean;
  isSetCompleted: boolean;
  showFeedback: boolean;

  // Questions and answers
  questionSet: QuestionData[];
  currentQuestion: QuestionData | null;
  currentQuestionIndex: number;
  currentAnswers: string[] | null;
  correctAnswer: string | null;
  selectedAnswer: string | null;

  // Statistics
  totalQuestions: number;
  correctQuestions: number;
  reviewQuestions: ReviewQuestion[];

  // Chat history
  chatHistory: ChatHistoryItem[];

  // Actions
  startChat: (role: string, experience: string, theme: string) => Promise<void>;
  handleAnswerChange: (answer: string) => void;
  handleSubmitAnswer: () => void;
  displayNextQuestion: () => void;
  startNewQuestionSet: (
    role: string,
    experience: string,
    theme: string
  ) => Promise<void>;
  resetChat: () => void;
}
