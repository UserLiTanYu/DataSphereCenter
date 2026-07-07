<script setup lang="ts">
import type { MetricCard } from '@/types/dashboard';
import { formatNumber, formatPercent } from '@/utils/format';

defineProps<{
  metric: MetricCard;
}>();
</script>

<template>
  <article
    class="metric-card"
    :class="`metric-card--${metric.accent}`"
  >
    <div class="metric-card__meta">
      <span class="metric-card__label">{{ metric.label }}</span>
      <span
        class="metric-card__trend"
        :class="{ 'metric-card__trend--down': metric.trend < 0 }"
      >
        {{ formatPercent(metric.trend) }}
      </span>
    </div>
    <div class="metric-card__value">
      {{ formatNumber(metric.value) }}
      <small>{{ metric.unit }}</small>
    </div>
    <div class="metric-card__bar" />
  </article>
</template>

