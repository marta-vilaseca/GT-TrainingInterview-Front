import { create } from 'zustand';
import { ChatHistoryItem } from '../types/IChatTypes';
import { fetchQuestions } from '../services/api';
import { randomizeStrings } from '../utils/randomize';
import {
  continue_ok_message,
  continue_question,
  correct_answer,
} from '../utils/constants';

type State = {
  isChatStarted: boolean;
  areControlsDisabled: boolean;
  areQuestionsLoading: boolean;
  isProcessing: boolean; // New state for tracking timeouts/transitions
  isAnswerSelected: boolean;
  isSetCompleted: boolean;
  showFeedback: boolean;
  questionSet: any[];
  currentQuestion: any | null;
  currentQuestionIndex: number;
  currentAnswers: string[] | null;
  correctAnswer: string | null;
  selectedAnswer: string | null;
  totalQuestions: number;
  correctQuestions: number;
  reviewQuestions: any[];
  chatHistory: ChatHistoryItem[];
  currentRole: string;
  currentExperience: string;
  currentTheme: string | undefined;
  isTerminating: boolean;
};

type Actions = {
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
  updateUserData: (role: string, experience: string, theme?: string) => void;
  terminateChat: () => void;
};

const initialState: State = {
  isChatStarted: false,
  areControlsDisabled: true,
  areQuestionsLoading: false,
  isProcessing: false, // New field
  isAnswerSelected: false,
  isSetCompleted: false,
  showFeedback: false,
  questionSet: [],
  currentQuestion: null,
  currentQuestionIndex: 0,
  currentAnswers: null,
  correctAnswer: null,
  selectedAnswer: null,
  totalQuestions: 0,
  correctQuestions: 0,
  reviewQuestions: [],
  chatHistory: [],
  currentRole: '',
  currentExperience: '',
  currentTheme: '',
  isTerminating: false,
};

export const useChatStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  startChat: async (role: string, experience: string, theme: string) => {
    set({
      currentRole: role,
      currentExperience: experience,
      currentTheme: theme,
      areQuestionsLoading: true,
      areControlsDisabled: true,
      isChatStarted: true,
      isSetCompleted: false,
    });

    try {
      const fetchedQuestions = await fetchQuestions({
        role,
        experience,
        theme: theme || '',
      });

      if (fetchedQuestions.length > 0) {
        const firstQuestion = fetchedQuestions[0];
        const randomizedAnswers = randomizeStrings([
          firstQuestion.correctAnswer,
          firstQuestion.wrongAnswerA,
          firstQuestion.wrongAnswerB,
        ]);

        set((state) => ({
          currentAnswers: randomizedAnswers,
          currentQuestion: firstQuestion,
          questionSet: fetchedQuestions,
          correctAnswer: firstQuestion.correctAnswer,
          currentQuestionIndex: 0,
          totalQuestions: state.totalQuestions + 5,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      set(initialState);
    } finally {
      set({
        areQuestionsLoading: false,
        areControlsDisabled: false,
      });
    }
  },

  handleAnswerChange: (answer: string) => {
    set({
      selectedAnswer: answer,
      isAnswerSelected: true,
    });
  },

  handleSubmitAnswer: () => {
    const state = get();
    if (!state.currentQuestion || !state.isAnswerSelected) return;

    // Start processing state
    set({ isProcessing: true });

    const isCorrect = state.selectedAnswer === state.correctAnswer;

    set((state) => ({
      correctQuestions: isCorrect
        ? state.correctQuestions + 1
        : state.correctQuestions,
      reviewQuestions: isCorrect
        ? state.reviewQuestions
        : [...state.reviewQuestions, { question: state.currentQuestion! }],
    }));

    const currentQuestionCopy = state.currentQuestion;
    const currentAnswersCopy = state.currentAnswers;
    const selectedAnswerCopy = state.selectedAnswer;

    set({
      currentQuestion: null,
      currentAnswers: null,
      selectedAnswer: null,
    });

    set((state) => ({
      chatHistory: [
        ...state.chatHistory,
        {
          question: currentQuestionCopy.question,
          answers: currentAnswersCopy || [],
          correction: null,
          feedback: null,
          selectedAnswer: selectedAnswerCopy,
          questionSetIndex: state.currentQuestionIndex,
        } as ChatHistoryItem,
      ],
    }));

    const correction = isCorrect ? null : (
      <>
        <span className="feedback__incorrect">Respuesta incorrecta</span>. La
        opción correcta es: {state.correctAnswer}
      </>
    );

    const correctMessage = randomizeStrings(correct_answer)[0];
    const feedbackToAdd = isCorrect ? (
      <>
        <span className="feedback__correct">{correctMessage} </span>
        {currentQuestionCopy.correctFeedback}
      </>
    ) : (
      currentQuestionCopy.wrongFeedback
    );

    setTimeout(() => {
      set((state) => ({
        chatHistory: state.chatHistory.map((item, index) =>
          index === state.chatHistory.length - 1
            ? {
                ...item,
                correction,
                feedback: feedbackToAdd,
              }
            : item
        ),
      }));

      if (state.currentQuestionIndex === state.questionSet.length - 1) {
        set({ isSetCompleted: true });
        const continueQuestion = randomizeStrings(continue_question)[0];
        setTimeout(() => {
          set((state) => ({
            chatHistory: [
              ...state.chatHistory,
              {
                question: '',
                answers: [],
                correction: null,
                feedback: continueQuestion,
                selectedAnswer: null,
              },
            ],
            isProcessing: false, // End processing state
          }));
        }, 1000);
      } else {
        setTimeout(() => {
          get().displayNextQuestion();
          set({ isProcessing: false }); // End processing state
        }, 2000);
      }
    }, 1000);
  },

  displayNextQuestion: () => {
    const state = get();
    set({ isProcessing: true }); // Start processing state

    if (!state.isSetCompleted) {
      const nextIndex = state.currentQuestionIndex + 1;
      const nextQuestion = state.questionSet[nextIndex];

      const randomizedAnswers = randomizeStrings([
        nextQuestion.correctAnswer,
        nextQuestion.wrongAnswerA,
        nextQuestion.wrongAnswerB,
      ]);

      set({
        selectedAnswer: null,
        isAnswerSelected: false,
        currentQuestion: nextQuestion,
        correctAnswer: nextQuestion.correctAnswer,
        currentAnswers: randomizedAnswers,
        currentQuestionIndex: nextIndex,
        isProcessing: false, // End processing state
      });
    } else {
      set({
        currentQuestion: null,
        currentAnswers: null,
        selectedAnswer: null,
      });

      set((state) => ({
        chatHistory: [
          ...state.chatHistory,
          {
            question: '',
            answers: [],
            correction: null,
            feedback: 'Continuar',
            selectedAnswer: null,
            questionSetIndex: state.currentQuestionIndex,
          } as ChatHistoryItem,
        ],
      }));

      setTimeout(() => {
        const continueMessage = randomizeStrings(continue_ok_message)[0];
        set((state) => ({
          chatHistory: [
            ...state.chatHistory,
            {
              question: '',
              answers: [],
              correction: null,
              feedback: continueMessage,
              selectedAnswer: null,
              questionSetIndex: state.currentQuestionIndex,
            } as ChatHistoryItem,
          ],
        }));

        const state = get();
        if (state.isSetCompleted) {
          setTimeout(() => {
            get().startNewQuestionSet(
              state.currentRole,
              state.currentExperience,
              state.currentTheme || ''
            );
          }, 2000);
        }
      }, 1000);
    }
  },

  startNewQuestionSet: async (
    role: string,
    experience: string,
    theme: string
  ) => {
    set({
      areQuestionsLoading: true,
      areControlsDisabled: true,
      isSetCompleted: false,
      currentQuestion: null,
      currentAnswers: null,
      selectedAnswer: null,
      isAnswerSelected: false,
      isProcessing: false,
    });

    try {
      const fetchedQuestions = await fetchQuestions({
        role,
        experience,
        theme,
      });

      if (fetchedQuestions.length > 0) {
        const firstQuestion = fetchedQuestions[0];
        const randomizedAnswers = randomizeStrings([
          firstQuestion.correctAnswer,
          firstQuestion.wrongAnswerA,
          firstQuestion.wrongAnswerB,
        ]);

        set((state) => ({
          currentAnswers: randomizedAnswers,
          currentQuestion: firstQuestion,
          questionSet: fetchedQuestions,
          correctAnswer: firstQuestion.correctAnswer,
          currentQuestionIndex: 0,
          totalQuestions: state.totalQuestions + 5,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      set({
        areQuestionsLoading: false,
        areControlsDisabled: false,
        isProcessing: false,
      });
    }
  },

  resetChat: () => {
    set(initialState);
  },

  updateUserData: (role: string, experience: string, theme?: string) => {
    set({
      ...initialState,
      currentRole: role,
      currentExperience: experience,
      currentTheme: theme || 'General',
    });
  },

  terminateChat: () => {
    set({
      isProcessing: true,
      isTerminating: true,
    });
  },
}));
