// services/api.ts

import axios, { AxiosResponse } from 'axios';
import { UserData, UserResponseData } from '../types/IAxios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to post the user Data and get a question and the question feedback
export const userData = async (
  endpoint: string,
  payload: UserData
): Promise<UserResponseData> => {
  // Return type is now UserResponseData
  try {
    const response: AxiosResponse<UserResponseData> = await api.post(
      endpoint,
      payload
    );
    return response.data; // Now returns an object of type UserResponseData
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

// DISABLED FOR NOW - Function to post feedback
// export const postFeedback = async (
//   endpoint: string,
//   payload: FeedbackData // New payload type
// ): Promise<string> => {
//   // Return type is string
//   try {
//     const response: AxiosResponse<string> = await api.post(endpoint, payload);
//     return response.data; // Feedback is returned as a string
//   } catch (error) {
//     console.error('Error posting feedback', error);
//     throw error;
//   }
// };
