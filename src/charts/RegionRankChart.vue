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
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(6, 18, 34, 0.94)',
    borderColor: 'rgba(51, 214, 255, 0.42)',
    textStyle: { color: '#dff8ff' },
  },
  grid: { top: 18, left: 46, right: 18, bottom: 28 },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.region),
    axisTick: { show: false },
    axisLabel: { color: '#9fb9d8' },
    axisLine: { lineStyle: { color: 'rgba(96, 200, 255, 0.34)' } },
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
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#35f2a6' },
            { offset: 0.46, color: '#33d6ff' },
            { offset: 1, color: 'rgba(79, 140, 255, 0.28)' },
          ],
        },
        shadowBlur: 12,
        shadowColor: 'rgba(51, 214, 255, 0.32)',
      },
    },
  ],
}));
</script>

<template>
  <section class="panel chart-panel">
    <header class="panel__header">
      <div>
        <h2>区域排行</h2>
        <span>Region Ranking</span>
      </div>
      <b>TOP REGIONS</b>
    </header>
    <BaseChart :option="option" />
  </section>
</template>

