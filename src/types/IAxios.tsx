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
