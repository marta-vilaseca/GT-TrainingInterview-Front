export interface ChatEntry {
  question: string;
  answer: string;
  feedback: string;
}

export interface ChatboxProps {
  onSubmit: (answer: string) => void;
  disabled: boolean;
}
