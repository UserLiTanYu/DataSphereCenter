<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { init } from 'echarts';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  option: EChartsOption;
}>();

const chartRef = ref<HTMLElement | null>(null);
let chart: ReturnType<typeof init> | null = null;
let observer: ResizeObserver | null = null;

onMounted(() => {
  if (!chartRef.value) {
    return;
  }

  chart = init(chartRef.value, 'dark');
  chart.setOption(props.option);
  observer = new ResizeObserver(() => chart?.resize());
  observer.observe(chartRef.value);
});

watch(
  () => props.option,
  (option) => {
    chart?.setOption(option, true);
  },
  { deep: true },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  chart?.dispose();
});
</script>

<template>
  <div
    ref="chartRef"
    class="chart-canvas"
  />
</template>

