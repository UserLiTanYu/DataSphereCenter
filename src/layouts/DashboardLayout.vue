<script setup lang="ts">
import { appConfig } from '@/config/app';
import { useCurrentTime } from '@/hooks/useCurrentTime';

defineProps<{
  dataMode: string;
  refreshing: boolean;
  autoRefreshEnabled: boolean;
  lastUpdated: string;
}>();

defineEmits<{
  toggleRefresh: [];
}>();

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
        <small>{{ refreshing ? '数据刷新中' : '运行正常' }} · {{ dataMode }}</small>
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
        <small>最后更新 · {{ lastUpdated || '等待同步' }}</small>
        <button
          class="dashboard-header__action"
          type="button"
          @click="$emit('toggleRefresh')"
        >
          {{ autoRefreshEnabled ? '暂停刷新' : '继续刷新' }}
        </button>
      </div>
    </header>

    <slot />
  </main>
</template>

