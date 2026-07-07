import { appConfig } from '@/config/app';
import { logger } from '@/utils/logger';

import { apiProvider } from './providers/apiProvider';
import { mockProvider } from './providers/mockProvider';
import type { DataProvider } from './providers/types';

export const dataProvider: DataProvider =
  appConfig.dataSource === 'api' ? apiProvider : mockProvider;

logger.info(`Data provider ready: ${appConfig.dataSource}`);

