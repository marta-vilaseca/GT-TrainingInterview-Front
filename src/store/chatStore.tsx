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
};

const initialState: State = {
  isChatStarted: false,
  areControlsDisabled: true,
  areQuestionsLoading: false,
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
          areQuestionsLoading: false,
          areControlsDisabled: false,
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

    const isCorrect = state.selectedAnswer === state.correctAnswer;

    // Update stats first
    set((state) => ({
      correctQuestions: isCorrect
        ? state.correctQuestions + 1
        : state.correctQuestions,
      reviewQuestions: isCorrect
        ? state.reviewQuestions
        : [...state.reviewQuestions, { question: state.currentQuestion! }],
    }));

    // Clear current question to prevent duplicate render
    const currentQuestionCopy = state.currentQuestion;
    const currentAnswersCopy = state.currentAnswers;
    const selectedAnswerCopy = state.selectedAnswer;

    set({
      currentQuestion: null,
      currentAnswers: null,
      selectedAnswer: null,
    });

    // Add to chat history
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
        } as ChatHistoryItem, // Explicitly type the new item
      ],
    }));

    // Handle correction and feedback
    const correction = isCorrect ? null : (
      <>
        <span className="feedback__incorrect">Respuesta incorrecta</span>. La
        opción correcta es: {state.correctAnswer}
      </>
    );

    const correctMessage = randomizeStrings(correct_answer)[0];
    const feedbackToAdd = isCorrect ? (
      <>
        <span className="feedback__correct">{correctMessage}</span>
        {currentQuestionCopy.correctFeedback}
      </>
    ) : (
      currentQuestionCopy.wrongFeedback
    );

    setTimeout(() => {
      set((state) => ({
        chatHistory: state.chatHistory.map((item, index) =>
          index === state.chatHistory.length - 1
            ? ({
                ...item,
                correction,
                feedback: feedbackToAdd,
              } as ChatHistoryItem) // Explicitly type the updated item
            : item
        ),
      }));

      // Set completion check
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
          }));
        }, 1000);
      } else {
        setTimeout(() => {
          get().displayNextQuestion();
        }, 2000);
      }
    }, 1000);
  },

  displayNextQuestion: () => {
    const state = get();

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
      });
    } else {
      // Clear current question before transition
      set({
        currentQuestion: null,
        currentAnswers: null,
        selectedAnswer: null,
      });

      // Add "Continue" message
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
          } as ChatHistoryItem, // Explicitly type the new item
        ],
      }));

      // Add encouragement message
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
            } as ChatHistoryItem, // Explicitly type the new item
          ],
        }));

        // Start new question set after showing messages
        const state = get();
        if (state.isSetCompleted) {
          setTimeout(() => {
            get().startNewQuestionSet(
              state.currentQuestion?.role || '',
              state.currentQuestion?.experience || '',
              state.currentQuestion?.theme || ''
            );
          }, 2000);
        }
      }, 1000);
    }
  },

  startNewQuestionSet: async () => {
    const { currentRole, currentExperience, currentTheme } = get();

    set({
      areQuestionsLoading: true,
      areControlsDisabled: true,
      isSetCompleted: false,
      currentQuestion: null,
      currentAnswers: null,
      selectedAnswer: null,
      isAnswerSelected: false,
    });

    try {
      const fetchedQuestions = await fetchQuestions({
        role: currentRole,
        experience: currentExperience,
        theme: currentTheme,
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
      });
    }
  },

  resetChat: () => {
    set(initialState);
  },

  // New action to update user data without starting chat
  updateUserData: (role: string, experience: string, theme?: string) => {
    set({
      ...initialState,
      currentRole: role,
      currentExperience: experience,
      currentTheme: theme,
    });
  },
}));
