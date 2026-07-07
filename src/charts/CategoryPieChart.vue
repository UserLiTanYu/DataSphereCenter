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
  tooltip: { trigger: 'item' },
  legend: { bottom: 0, textStyle: { color: '#b9d7ff' } },
  series: [
    {
      name: '分类占比',
      type: 'pie',
      radius: ['46%', '72%'],
      center: ['50%', '43%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: '#07111f',
        borderWidth: 3,
      },
      label: { color: '#dff8ff', formatter: '{b}\n{d}%' },
      data: props.data,
    },
  ],
  color: ['#33d6ff', '#35f2a6', '#4f8cff', '#ffd166', '#ff7a90'],
}));
</script>

<template>
  <section class="panel chart-panel">
    <header class="panel__header">
      <h2>分类占比</h2>
      <span>Category Share</span>
    </header>
    <BaseChart :option="option" />
  </section>
</template>

