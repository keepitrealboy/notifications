import { isServer } from '@tanstack/react-query';

export const API_PATH = isServer
  ? `${process.env.NEXT_PUBLIC_BASE_URL}`
  : '/api';
