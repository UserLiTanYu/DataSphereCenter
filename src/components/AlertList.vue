<script setup lang="ts">
import type { AlertItem } from '@/types/dashboard';

defineProps<{
  alerts: AlertItem[];
}>();
</script>

<template>
  <section class="panel alert-list">
    <header class="panel__header">
      <h2>实时告警</h2>
      <span>Live Alerts</span>
    </header>
    <div class="alert-list__items">
      <article
        v-for="alert in alerts"
        :key="alert.id"
        class="alert-list__item"
      >
        <span
          class="alert-list__level"
          :class="`alert-list__level--${alert.level}`"
        >
          {{ alert.level }}
        </span>
        <div class="alert-list__content">
          <strong>{{ alert.title }}</strong>
          <small>{{ alert.id }} · {{ alert.time }}</small>
        </div>
        <span class="alert-list__status">{{ alert.status }}</span>
      </article>
    </div>
  </section>
</template>

