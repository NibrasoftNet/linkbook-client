'use server';

import axios from 'axios';

import { Env } from '@/libs/Env';

export const createChat = async (token: string, participants: string[]) => {
  try {
    const response = await axios.post(
      `${Env.API_URL}/chats`,
      { participants },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getChats = async (token: string) => {
  try {
    const response = await axios.get(`${Env.API_URL}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
