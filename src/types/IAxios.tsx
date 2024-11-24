export interface QuestionData {
  name?: string;
  role: string;
  experience: string;
  theme?: string;
}

export interface QuestionResponseData {
  id: number;
  question: string;
  comment: string;
  role: string;
  experience: string;
  theme: string;
}

export interface RequestData {
  role: string;
  experience: string;
  theme?: string;
}
export interface QuestionData2 {
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

export type QuestionResponseData2 = QuestionData2[];
