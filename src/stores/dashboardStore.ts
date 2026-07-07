import { defineStore } from 'pinia';

import { appConfig } from '@/config/app';
import { getDashboardData } from '@/services/dashboardService';
import type { DashboardData } from '@/types/dashboard';
import { logger } from '@/utils/logger';

const refreshInterval = 3000;

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: null as DashboardData | null,
    loading: false,
    refreshing: false,
    autoRefreshEnabled: false,
    lastUpdated: '',
    refreshError: '',
    error: '',
    refreshTimer: null as ReturnType<typeof setInterval> | null,
  }),
  getters: {
    dataMode: () => (appConfig.dataSource === 'api' ? 'API Mode' : 'Mock Mode'),
    refreshInterval: () => refreshInterval,
  },
  actions: {
    async loadDashboard() {
      this.loading = true;
      this.error = '';
      await this.refreshDashboard(true);
      this.loading = false;
    },
    async refreshDashboard(isInitialLoad = false) {
      if (!isInitialLoad) {
        this.refreshing = true;
      }

      try {
        this.data = await getDashboardData();
        this.lastUpdated = new Intl.DateTimeFormat('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        this.refreshError = '';
      } catch {
        const message = '数据加载失败，请稍后重试';

        if (!this.data) {
          this.error = message;
        }

        this.refreshError = message;
      } finally {
        this.refreshing = false;
      }
    },
    startAutoRefresh() {
      if (this.refreshTimer) {
        return;
      }

      this.autoRefreshEnabled = true;
      logger.debug('Dashboard auto refresh started');
      this.refreshTimer = setInterval(() => {
        void this.refreshDashboard();
      }, refreshInterval);
    },
    stopAutoRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
      }

      this.autoRefreshEnabled = false;
      logger.debug('Dashboard auto refresh stopped');
    },
    toggleAutoRefresh() {
      if (this.autoRefreshEnabled) {
        this.stopAutoRefresh();
        return;
      }

      this.startAutoRefresh();
    },
  },
});

