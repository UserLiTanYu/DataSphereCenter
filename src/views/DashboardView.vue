<script setup lang="ts">
import { computed, onMounted } from 'vue';

import BusinessTrendChart from '@/charts/BusinessTrendChart.vue';
import CategoryPieChart from '@/charts/CategoryPieChart.vue';
import RegionRankChart from '@/charts/RegionRankChart.vue';
import AlertList from '@/components/AlertList.vue';
import MetricCard from '@/components/MetricCard.vue';
import ResourceOverview from '@/components/ResourceOverview.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { logger } from '@/utils/logger';

const dashboardStore = useDashboardStore();
const dashboardData = computed(() => dashboardStore.data);

onMounted(async () => {
  logger.debug('Dashboard view mounted');
  await dashboardStore.loadDashboard();
});
</script>

<template>
  <DashboardLayout>
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
      <section class="metric-grid">
        <MetricCard
          v-for="metric in dashboardData.metrics"
          :key="metric.id"
          :metric="metric"
        />
      </section>

      <section class="dashboard-grid">
        <BusinessTrendChart :data="dashboardData.trends" />
        <CategoryPieChart :data="dashboardData.categoryShares" />
        <RegionRankChart :data="dashboardData.regionRanks" />
        <AlertList :alerts="dashboardData.alerts" />
        <ResourceOverview :resources="dashboardData.resources" />
      </section>
    </template>
  </DashboardLayout>
</template>

