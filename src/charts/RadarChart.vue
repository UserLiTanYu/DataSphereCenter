<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/charts/BaseChart.vue';
import type { RadarIndicator, RadarScore } from '@/types/dashboard';

const props = defineProps<{
  indicators: RadarIndicator[];
  scores: RadarScore[];
}>();

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    backgroundColor: 'rgba(6, 18, 34, 0.94)',
    borderColor: 'rgba(51, 214, 255, 0.42)',
    textStyle: { color: '#dff8ff' },
  },
  radar: {
    indicator: props.indicators,
    center: ['50%', '55%'],
    radius: '54%',
    shape: 'polygon',
    axisName: {
      color: '#b9d7ff',
      fontSize: 12,
      padding: [2, 4],
    },
    splitArea: {
      areaStyle: {
        color: [
          'rgba(51, 214, 255, 0.04)',
          'rgba(51, 214, 255, 0.08)',
          'rgba(51, 214, 255, 0.04)',
          'rgba(51, 214, 255, 0.08)',
          'rgba(51, 214, 255, 0.04)',
        ],
      },
    },
    axisLine: { lineStyle: { color: 'rgba(51, 214, 255, 0.18)' } },
    splitLine: { lineStyle: { color: 'rgba(51, 214, 255, 0.15)' } },
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: props.scores.map((s) => s.value),
          name: '能力评估',
          lineStyle: { width: 2, color: '#33d6ff' },
          areaStyle: { color: 'rgba(51, 214, 255, 0.22)' },
          itemStyle: { color: '#33d6ff', borderColor: '#dff8ff', borderWidth: 2 },
          symbol: 'circle',
          symbolSize: 6,
        },
      ],
    },
  ],
}));
</script>

<template>
  <section class="panel chart-panel">
    <header class="panel__header">
      <div>
        <h2>能力雷达</h2>
        <span>Ability Radar</span>
      </div>
      <b>ABILITY</b>
    </header>
    <BaseChart :option="option" />
  </section>
</template>
