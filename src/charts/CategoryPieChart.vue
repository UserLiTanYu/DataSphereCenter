<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/charts/BaseChart.vue';
import type { CategoryShare } from '@/types/dashboard';

const props = defineProps<{
  data: CategoryShare[];
}>();

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(6, 18, 34, 0.94)',
    borderColor: 'rgba(51, 214, 255, 0.42)',
    textStyle: { color: '#dff8ff' },
  },
  legend: {
    bottom: 2,
    left: 'center',
    width: '92%',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 12,
    textStyle: { color: '#b9d7ff', fontSize: 12 },
  },
  series: [
    {
      name: '分类占比',
      type: 'pie',
      radius: ['38%', '60%'],
      center: ['50%', '36%'],
      avoidLabelOverlap: true,
      labelLayout: {
        hideOverlap: true,
        moveOverlap: 'shiftY',
      },
      itemStyle: {
        borderColor: '#07111f',
        borderWidth: 4,
        shadowBlur: 14,
        shadowColor: 'rgba(51, 214, 255, 0.24)',
      },
      label: {
        alignTo: 'edge',
        color: '#dff8ff',
        edgeDistance: 14,
        formatter: '{b}\n{d}%',
        lineHeight: 16,
      },
      labelLine: {
        length: 10,
        length2: 16,
        maxSurfaceAngle: 80,
      },
      data: props.data,
    },
  ],
  color: ['#33d6ff', '#35f2a6', '#4f8cff', '#ffd166', '#ff7a90'],
}));
</script>

<template>
  <section class="panel chart-panel chart-panel--category">
    <header class="panel__header">
      <div>
        <h2>分类占比</h2>
        <span>Category Share</span>
      </div>
      <b>DISTRIBUTION</b>
    </header>
    <BaseChart :option="option" />
  </section>
</template>

