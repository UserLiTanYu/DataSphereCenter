<script setup lang="ts">
import type { ResourceUsage } from '@/types/dashboard';

defineProps<{
  resources: ResourceUsage[];
}>();
</script>

<template>
  <section class="panel resource-overview">
    <header class="panel__header">
      <div>
        <h2>资源使用率</h2>
        <span>Resource Usage</span>
      </div>
      <b>CORE LOAD</b>
    </header>

    <div class="resource-overview__grid">
      <div
        v-for="item in resources"
        :key="item.name"
        class="resource-overview__item"
      >
        <div
          class="resource-overview__ring"
          :style="{ '--value': item.value, '--color': item.color }"
        >
          <span>{{ item.value }}%</span>
        </div>
        <strong>{{ item.name }}</strong>
        <small>负载稳定</small>
      </div>
    </div>
  </section>
</template>

