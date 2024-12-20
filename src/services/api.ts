// services/api.ts

import axios, { AxiosResponse } from 'axios';
import { RequestData, QuestionData } from '../types/IAxios';

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
    const response: AxiosResponse<QuestionData[]> = await api.post(
      '/',
      processedData
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};
