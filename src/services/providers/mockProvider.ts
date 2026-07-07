import { generateDashboardData } from '@/mock/dashboard.generator';
import type { DashboardData } from '@/types/dashboard';

import type { DataProvider } from './types';

const wait = (duration = 240) => new Promise((resolve) => setTimeout(resolve, duration));

export const mockProvider: DataProvider = {
  async getDashboardData(): Promise<DashboardData> {
    await wait();
    return generateDashboardData();
  },
};

