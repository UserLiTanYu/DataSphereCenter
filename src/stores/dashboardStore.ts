import { defineStore } from 'pinia';

import { getDashboardData } from '@/services/dashboardService';
import type { DashboardData } from '@/types/dashboard';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: null as DashboardData | null,
    loading: false,
    error: '',
  }),
  actions: {
    async loadDashboard() {
      this.loading = true;
      this.error = '';

      try {
        this.data = await getDashboardData();
      } catch {
        this.error = '数据加载失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    },
  },
});
