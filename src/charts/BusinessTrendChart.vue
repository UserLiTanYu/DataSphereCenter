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
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(6, 18, 34, 0.94)',
    borderColor: 'rgba(51, 214, 255, 0.42)',
    textStyle: { color: '#dff8ff' },
  },
  legend: {
    top: 2,
    right: 8,
    icon: 'roundRect',
    itemWidth: 26,
    itemHeight: 12,
    textStyle: { color: '#b9d7ff', fontSize: 12 },
  },
  grid: { top: 44, left: 56, right: 28, bottom: 30 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.map((item) => item.time),
    axisTick: { show: false },
    axisLine: { lineStyle: { color: 'rgba(96, 200, 255, 0.34)' } },
    axisLabel: { color: '#9fb9d8', margin: 9 },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(91, 164, 255, 0.12)' } },
    axisLabel: { color: '#9fb9d8', margin: 12 },
  },
  series: [
    {
      name: '访问量',
      type: 'line',
      smooth: true,
      data: props.data.map((item) => item.visits),
      lineStyle: { width: 3, color: '#33d6ff', shadowBlur: 12, shadowColor: '#33d6ff' },
      areaStyle: { color: 'rgba(51, 214, 255, 0.18)' },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: { color: '#33d6ff', borderColor: '#dff8ff', borderWidth: 2 },
    },
    {
      name: '活跃用户',
      type: 'line',
      smooth: true,
      data: props.data.map((item) => item.users),
      lineStyle: { width: 3, color: '#35f2a6', shadowBlur: 12, shadowColor: '#35f2a6' },
      areaStyle: { color: 'rgba(53, 242, 166, 0.12)' },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: { color: '#35f2a6', borderColor: '#eafff6', borderWidth: 2 },
    },
  ],
}));
</script>

<template>
  <section class="panel chart-panel">
    <header class="panel__header">
      <div>
        <h2>业务趋势</h2>
        <span>Business Trend</span>
      </div>
      <b>REALTIME</b>
    </header>
    <BaseChart :option="option" />
  </section>
</template>
