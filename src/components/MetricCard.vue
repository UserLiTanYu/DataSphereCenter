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
    <div class="metric-card__corner metric-card__corner--tl" />
    <div class="metric-card__corner metric-card__corner--br" />

    <div class="metric-card__meta">
      <div>
        <span class="metric-card__label">{{ metric.label }}</span>
        <small>{{ metric.description }}</small>
      </div>
      <span class="metric-card__code">{{ metric.code }}</span>
    </div>

    <div class="metric-card__value">
      {{ formatNumber(metric.value) }}
      <small>{{ metric.unit }}</small>
    </div>

    <div class="metric-card__footer">
      <span
        class="metric-card__trend"
        :class="{ 'metric-card__trend--down': metric.trend < 0 }"
      >
        {{ metric.trend >= 0 ? 'UP' : 'DOWN' }} {{ formatPercent(metric.trend) }}
      </span>
      <span class="metric-card__pulse" />
    </div>

    <div class="metric-card__bar" />
  </article>
</template>

