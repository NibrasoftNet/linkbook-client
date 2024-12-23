import pino from 'pino';

import { Env } from '@/libs/Env';

let options = {};

if (Env.LOGTAIL_SOURCE_TOKEN) {
  options = {
    transport: {
      target: '@logtail/pino',
      options: { sourceToken: Env.LOGTAIL_SOURCE_TOKEN },
    },
  };
} else {
  options = {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  };
}

export const logger = pino(options);
