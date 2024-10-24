export interface UserData {
  name?: string;
  role: string;
  experience: string;
}

// export interface FeedbackData {
//   answer: string;
// }

export interface UserResponseData {
  role: string;
  experience: string;
  userResponse: string;
  prompt: string;
  feedback: string;
}
