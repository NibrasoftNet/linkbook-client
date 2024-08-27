'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import { Env } from '@/libs/Env';

export const fileUploadAction = async ({
  formData,
}: {
  formData: FormData;
}) => {
  try {
    const { data } = await axios.post(`${Env.API_URL}/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const fileUpdateAction = async ({
  formData,
  url,
}: {
  formData: FormData;
  url: string;
}) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3001/api/v1/files/${url}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
