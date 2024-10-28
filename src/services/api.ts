// services/api.ts

import axios, { AxiosResponse } from 'axios';
import { QuestionData, QuestionResponseData } from '../types/IAxios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
