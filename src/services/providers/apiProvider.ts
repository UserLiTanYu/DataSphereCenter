import type { DashboardData } from '@/types/dashboard';

import { httpClient } from '../httpClient';
import type { DataProvider } from './types';

export const apiProvider: DataProvider = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await httpClient.get<DashboardData>('/dashboard');
    return response.data;
  },
};

