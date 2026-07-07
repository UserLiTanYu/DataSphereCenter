import type { DashboardData } from '@/types/dashboard';

export interface DataProvider {
  getDashboardData: () => Promise<DashboardData>;
}

