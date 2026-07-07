<script setup lang="ts">
import { appConfig } from '@/config/app';
import { useCurrentTime } from '@/hooks/useCurrentTime';

const { currentTime } = useCurrentTime();
</script>

<template>
  <main class="dashboard-shell">
    <header class="dashboard-header">
      <div class="dashboard-header__side">
        <span class="dashboard-header__label">运行状态</span>
        <strong class="dashboard-header__status">Online</strong>
      </div>
      <div class="dashboard-header__title">
        <h1>{{ appConfig.title }}</h1>
        <p>{{ appConfig.subtitle }}</p>
      </div>
      <div class="dashboard-header__side dashboard-header__side--right">
        <span class="dashboard-header__label">当前时间</span>
        <strong>{{ currentTime }}</strong>
      </div>
    </header>
    <slot />
  </main>
</template>

