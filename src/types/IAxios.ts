// src/types/IAxios.ts

export interface RequestData {
  role: string;
  experience: string;
  theme?: string;
}
export interface QuestionData {
  id: number;
  question: string;
  role: string;
  experience: string;
  theme: string;
  correctAnswer: string;
  wrongAnswerA: string;
  wrongAnswerB: string;
  correctFeedback: string;
  wrongFeedback: string;
}

// export type QuestionResponseData = QuestionData[];
