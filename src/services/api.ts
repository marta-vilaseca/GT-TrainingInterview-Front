// services/api.ts

import axios, { AxiosResponse } from 'axios';
import { UserData, FeedbackData } from '../types/IAxios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to post the user Data and get a question
export const userData = async (
  endpoint: string,
  payload: UserData
): Promise<string> => {
  // Return type is string
  try {
    const response: AxiosResponse<string> = await api.post(endpoint, payload);
    return response.data; // Question is returned as a string
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

// Function to post feedback
export const postFeedback = async (
  endpoint: string,
  payload: FeedbackData // New payload type
): Promise<string> => {
  // Return type is string
  try {
    const response: AxiosResponse<string> = await api.post(endpoint, payload);
    return response.data; // Feedback is returned as a string
  } catch (error) {
    console.error('Error posting feedback', error);
    throw error;
  }
};
