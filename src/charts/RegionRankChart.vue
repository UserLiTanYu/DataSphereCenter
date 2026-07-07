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
  grid: { top: 14, left: 58, right: 36, bottom: 14 },
  yAxis: {
    type: 'category',
    data: [...props.data].reverse().map((item) => item.region),
    axisTick: { show: false },
    axisLabel: { color: '#b9d7ff', fontSize: 13, margin: 10 },
    axisLine: { show: false },
  },
  xAxis: {
    type: 'value',
    show: false,
  },
  series: [
    {
      name: '城市指数',
      type: 'bar',
      data: [...props.data].reverse().map((item) => item.value),
      barWidth: 14,
      barCategoryGap: '36%',
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(51, 214, 255, 0.18)' },
            { offset: 0.6, color: '#33d6ff' },
            { offset: 1, color: '#ffd166' },
          ],
        },
        shadowBlur: 10,
        shadowColor: 'rgba(51, 214, 255, 0.28)',
      },
      label: {
        show: true,
        position: 'right',
        color: '#b9d7ff',
        fontSize: 12,
        distance: 8,
      },
    },
  ],
}));
</script>

<template>
  <section class="panel chart-panel">
    <header class="panel__header">
      <div>
        <h2>城市排名</h2>
        <span>City Ranking</span>
      </div>
      <b>RANKING</b>
    </header>
    <BaseChart :option="option" />
  </section>
</template>
