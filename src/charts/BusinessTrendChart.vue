<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/charts/BaseChart.vue';
import type { TrendPoint } from '@/types/dashboard';

const props = defineProps<{
  data: TrendPoint[];
}>();

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  legend: { top: 0, right: 8, textStyle: { color: '#b9d7ff' } },
  grid: { top: 48, left: 44, right: 20, bottom: 28 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.map((item) => item.time),
    axisLine: { lineStyle: { color: '#2f5f88' } },
    axisLabel: { color: '#9fb9d8' },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(91, 164, 255, 0.12)' } },
    axisLabel: { color: '#9fb9d8' },
  },
  series: [
    {
      name: '访问量',
      type: 'line',
      smooth: true,
      data: props.data.map((item) => item.visits),
      lineStyle: { width: 3, color: '#33d6ff' },
      areaStyle: { color: 'rgba(51, 214, 255, 0.16)' },
      symbol: 'circle',
    },
    {
      name: '活跃用户',
      type: 'line',
      smooth: true,
      data: props.data.map((item) => item.users),
      lineStyle: { width: 3, color: '#35f2a6' },
      areaStyle: { color: 'rgba(53, 242, 166, 0.12)' },
      symbol: 'circle',
    },
  ],
}));
</script>

<template>
  <section class="panel chart-panel chart-panel--wide">
    <header class="panel__header">
      <h2>业务趋势</h2>
      <span>Business Trend</span>
    </header>
    <BaseChart :option="option" />
  </section>
</template>

