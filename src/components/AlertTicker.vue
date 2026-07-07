<script setup lang="ts">
import type { AlertEvent } from '@/types/dashboard';

defineProps<{
  events: AlertEvent[];
}>();
</script>

<template>
  <section class="alert-ticker">
    <header class="alert-ticker__header">
      <h2>实时动态与告警</h2>
      <b>Activity</b>
    </header>
    <div class="alert-ticker__track">
      <div class="alert-ticker__scroll">
        <article
          v-for="(event, index) in events"
          :key="index"
          class="alert-ticker__item"
        >
          <span class="alert-ticker__time">{{ event.time }}</span>
          <span class="alert-ticker__title">{{ event.title }}</span>
          <span class="alert-ticker__region">{{ event.region }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
