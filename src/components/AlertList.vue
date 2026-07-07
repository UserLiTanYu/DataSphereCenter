<script setup lang="ts">
import type { AlertItem } from '@/types/dashboard';

defineProps<{
  alerts: AlertItem[];
}>();

const levelClassMap: Record<AlertItem['level'], string> = {
  高: 'alert-list__level--high',
  中: 'alert-list__level--medium',
  低: 'alert-list__level--low',
};
</script>

<template>
  <section class="panel alert-list">
    <header class="panel__header">
      <div>
        <h2>实时告警</h2>
        <span>Live Alerts</span>
      </div>
      <b>EVENT STREAM</b>
    </header>

    <div class="alert-list__items">
      <article
        v-for="alert in alerts"
        :key="alert.id"
        class="alert-list__item"
      >
        <span
          class="alert-list__level"
          :class="levelClassMap[alert.level]"
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

