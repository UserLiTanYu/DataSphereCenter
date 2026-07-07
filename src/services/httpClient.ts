import axios from 'axios';

import { appConfig } from '@/config/app';

export const httpClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10_000,
});

