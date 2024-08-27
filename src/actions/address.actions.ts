'use server';

import axios from 'axios';

import { Env } from '@/libs/Env';

export const getAllCitiesAction = async () => {
  const { data } = await axios.get(`${Env.API_URL}/address/find/all-cities`);
  if (!data) return [];
  if (data) return data;
};
