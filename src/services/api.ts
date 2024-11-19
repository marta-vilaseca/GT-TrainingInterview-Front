// services/api.ts

import axios, { AxiosResponse } from 'axios';
import {
  QuestionData,
  QuestionResponseData,
  RequestData,
  QuestionData2,
} from '../types/IAxios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchQuestions = async (data: RequestData) => {
  // Ensure 'theme' is always in lowercase if it is defined
  const processedData = {
    ...data,
    theme: data.theme ? data.theme.toLowerCase() : undefined,
  };

  try {
    const response: AxiosResponse<QuestionData2[]> = await api.post(
      '/questionary/loadQuestions',
      processedData
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

export const fetchQuestion = async (data: QuestionData) => {
  try {
    const response: AxiosResponse<QuestionResponseData> = await api.post(
      '/question',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

export const fetchFeedback = async (data: {
  question: string;
  userResponse: string;
}) => {
  try {
    const response: AxiosResponse<string> = await api.post(
      `/question/feedback?userResponse=${encodeURIComponent(data.userResponse)}`, // userResponse as a query parameter
      { question: data.question }, // question in the request body
      { responseType: 'text' } // explicitly set response type to text
    );

    return response.data; // directly return the text response as feedback
  } catch (error) {
    console.error('Error posting feedback data', error);
    throw error;
  }
};
