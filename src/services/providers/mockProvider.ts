import { dashboardMock } from '@/mock/dashboard.mock';
import type { DashboardData } from '@/types/dashboard';

import type { DataProvider } from './types';

const wait = (duration = 240) => new Promise((resolve) => window.setTimeout(resolve, duration));

export const mockProvider: DataProvider = {
  async getDashboardData(): Promise<DashboardData> {
    await wait();
    return dashboardMock;
  },
};

