<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/charts/BaseChart.vue';
import type { CenterLink, CenterNode } from '@/types/dashboard';

const props = defineProps<{
  nodes: CenterNode[];
  links: CenterLink[];
}>();

const hubStats = computed(() => {
  const hub = props.nodes.find((node) => node.category === 'center');
  const throughput = props.links.reduce((sum, link) => sum + link.value, 0);

  return {
    hubName: hub?.name ?? '',
    regionCount: Math.max(props.nodes.length - 1, 0),
    throughput,
  };
});

const option = computed<EChartsOption>(() => {
  const echartsNodes = props.nodes.map((node) => {
    const isCenter = node.category === 'center';
    const yOffsetMap: Record<string, number> = {
      bj: -5,
      sh: -7,
    };
    const adjustedY = node.y + (yOffsetMap[node.id] ?? 0);
    const labelPosition = !isCenter && adjustedY >= 60 ? 'top' : 'bottom';

    return {
      id: node.id,
      name: node.name,
      x: node.x * 10,
      y: adjustedY * 10,
      symbol: 'circle',
      symbolSize: isCenter ? 72 : 42,
      category: isCenter ? 0 : 1,
      value: node.value,
      label: {
        show: true,
        position: labelPosition as 'top' | 'bottom',
        distance: isCenter ? 10 : 8,
        color: isCenter ? '#ffd166' : '#b9d7ff',
        fontSize: isCenter ? 16 : 12,
        fontWeight: isCenter ? 800 : 500,
        textShadowBlur: isCenter ? 12 : 8,
        textShadowColor: isCenter ? 'rgba(255, 209, 102, 0.7)' : 'rgba(51, 214, 255, 0.45)',
      },
      itemStyle: {
        color: isCenter
          ? {
              type: 'radial' as const,
              x: 0.5,
              y: 0.5,
              r: 0.64,
              colorStops: [
                { offset: 0, color: '#fff3c4' },
                { offset: 0.28, color: '#ffd166' },
                { offset: 0.68, color: '#ff9d2e' },
                { offset: 1, color: 'rgba(255, 111, 41, 0.3)' },
              ],
            }
          : {
              type: 'radial' as const,
              x: 0.42,
              y: 0.38,
              r: 0.68,
              colorStops: [
                { offset: 0, color: '#d5fdff' },
                { offset: 0.34, color: '#33d6ff' },
                { offset: 0.74, color: '#1687b7' },
                { offset: 1, color: 'rgba(51, 214, 255, 0.16)' },
              ],
            },
        shadowBlur: isCenter ? 38 : 22,
        shadowColor: isCenter ? 'rgba(255, 209, 102, 0.68)' : 'rgba(51, 214, 255, 0.52)',
        borderColor: isCenter ? '#fff0ad' : '#80f1ff',
        borderWidth: isCenter ? 3 : 2,
      },
    };
  });

  const echartsLinks = props.links.map((link, index) => ({
    source: link.source,
    target: link.target,
    value: link.value,
    lineStyle: {
      color: index % 2 === 0 ? 'rgba(51, 214, 255, 0.48)' : 'rgba(53, 242, 166, 0.38)',
      width: Math.max(2, Math.min(4, link.value / 28)),
      curveness: index % 2 === 0 ? 0.18 : -0.18,
      opacity: 0.86,
      shadowBlur: 10,
      shadowColor: 'rgba(51, 214, 255, 0.34)',
    },
  }));

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 18, 34, 0.94)',
      borderColor: 'rgba(51, 214, 255, 0.42)',
      textStyle: { color: '#dff8ff' },
    },
    animation: true,
    animationDuration: 1400,
    animationDurationUpdate: 1800,
    animationDelay: (index) => index * 80,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        roam: false,
        scale: false,
        data: echartsNodes,
        links: echartsLinks,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 8],
        categories: [
          { name: 'center' },
          { name: 'region' },
        ],
        lineStyle: {
          cap: 'round',
        },
        emphasis: {
          focus: 'adjacency',
          scale: true,
          label: {
            color: '#ffffff',
          },
          itemStyle: {
            shadowBlur: 36,
            shadowColor: 'rgba(51, 214, 255, 0.78)',
          },
          lineStyle: {
            width: 4,
            opacity: 1,
            shadowBlur: 16,
          },
        },
      },
    ],
  };
});
</script>

<template>
  <section class="panel chart-panel center-overview">
    <div class="center-overview__orbit center-overview__orbit--outer" />
    <div class="center-overview__orbit center-overview__orbit--inner" />
    <span class="center-overview__particle center-overview__particle--one" />
    <span class="center-overview__particle center-overview__particle--two" />
    <span class="center-overview__particle center-overview__particle--three" />

    <header class="panel__header">
      <div>
        <h2>中心态势总览</h2>
        <span>Network Overview</span>
      </div>
      <b>OVERVIEW</b>
    </header>

    <div class="center-overview__stats">
      <span>{{ hubStats.hubName }}</span>
      <span>{{ hubStats.regionCount }} Nodes</span>
      <span>{{ hubStats.throughput }} TPS</span>
    </div>

    <BaseChart :option="option" />
  </section>
</template>
