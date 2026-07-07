<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/charts/BaseChart.vue';
import type { RegionRank } from '@/types/dashboard';

const props = defineProps<{
  data: RegionRank[];
}>();

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { top: 18, left: 46, right: 18, bottom: 28 },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.region),
    axisLabel: { color: '#9fb9d8' },
    axisLine: { lineStyle: { color: '#2f5f88' } },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(91, 164, 255, 0.12)' } },
    axisLabel: { color: '#9fb9d8' },
  },
  series: [
    {
      name: '区域指数',
      type: 'bar',
      data: props.data.map((item) => item.value),
      barWidth: 18,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
        color: '#33d6ff',
      },
    },
  ],
}));
</script>

<template>
  <section class="panel chart-panel">
    <header class="panel__header">
      <h2>区域排行</h2>
      <span>Region Ranking</span>
    </header>
    <BaseChart :option="option" />
  </section>
</template>

