<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';

import BusinessTrendChart from '@/charts/BusinessTrendChart.vue';
import CategoryPieChart from '@/charts/CategoryPieChart.vue';
import CenterOverview from '@/charts/CenterOverview.vue';
import RadarChart from '@/charts/RadarChart.vue';
import RegionRankChart from '@/charts/RegionRankChart.vue';
import AlertTicker from '@/components/AlertTicker.vue';
import MetricCard from '@/components/MetricCard.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { logger } from '@/utils/logger';

const dashboardStore = useDashboardStore();
const dashboardData = computed(() => dashboardStore.data);

onMounted(async () => {
  logger.debug('Dashboard view mounted');
  await dashboardStore.loadDashboard();
  dashboardStore.startAutoRefresh();
});

onBeforeUnmount(() => {
  dashboardStore.stopAutoRefresh();
});
</script>

<template>
  <DashboardLayout
    :data-mode="dashboardStore.dataMode"
    :last-updated="dashboardStore.lastUpdated"
    :refreshing="dashboardStore.refreshing"
  >
    <section
      v-if="dashboardStore.loading"
      class="loading-state"
    >
      数据加载中...
    </section>
    <section
      v-else-if="dashboardStore.error"
      class="error-state"
    >
      {{ dashboardStore.error }}
    </section>
    <template v-else-if="dashboardData">
      <p
        v-if="dashboardStore.refreshError"
        class="refresh-warning"
      >
        {{ dashboardStore.refreshError }}
      </p>

      <section class="metric-grid">
        <MetricCard
          v-for="metric in dashboardData.metrics"
          :key="metric.id"
          :metric="metric"
        />
      </section>

      <section class="dashboard-body">
        <div class="dashboard-body__left">
          <BusinessTrendChart :data="dashboardData.trends" />
          <CategoryPieChart :data="dashboardData.categoryShares" />
        </div>
        <div class="dashboard-body__center">
          <CenterOverview
            :nodes="dashboardData.centerNodes"
            :links="dashboardData.centerLinks"
          />
        </div>
        <div class="dashboard-body__right">
          <RegionRankChart :data="dashboardData.regionRanks" />
          <RadarChart
            :indicators="dashboardData.radarIndicators"
            :scores="dashboardData.radarScores"
          />
        </div>
      </section>

      <AlertTicker :events="dashboardData.alertEvents" />
    </template>
  </DashboardLayout>
</template>

