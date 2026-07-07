<script setup lang="ts">
import { appConfig } from '@/config/app';
import { useCurrentTime } from '@/hooks/useCurrentTime';

const { currentTime } = useCurrentTime();
</script>

<template>
  <main class="dashboard-shell">
    <div class="dashboard-shell__scanline" />
    <div class="dashboard-shell__beam dashboard-shell__beam--left" />
    <div class="dashboard-shell__beam dashboard-shell__beam--right" />

    <header class="dashboard-header">
      <div class="dashboard-header__side">
        <span class="dashboard-header__label">系统状态</span>
        <strong class="dashboard-header__status">
          <i />
          Online
        </strong>
        <small>运行正常 · 数据同步中</small>
      </div>

      <div class="dashboard-header__title">
        <div class="dashboard-header__line" />
        <p>Data Intelligence Cockpit</p>
        <h1>{{ appConfig.title }}</h1>
        <span>{{ appConfig.subtitle }}</span>
      </div>

      <div class="dashboard-header__side dashboard-header__side--right">
        <span class="dashboard-header__label">当前时间</span>
        <strong>{{ currentTime }}</strong>
        <small>Asia/Shanghai · Live</small>
      </div>
    </header>

    <slot />
  </main>
</template>

