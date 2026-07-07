import type { DashboardData } from '@/types/dashboard';
import { logger } from '@/utils/logger';

import { dataProvider } from './dataProvider';

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const data = await dataProvider.getDashboardData();
    logger.info('Dashboard data loaded');
    return data;
  } catch (error) {
    logger.error('Failed to load dashboard data', error);
    throw error;
  }
};

