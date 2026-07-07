import { onBeforeUnmount, ref } from 'vue';

const formatTime = () =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

export const useCurrentTime = () => {
  const currentTime = ref(formatTime());
  const timer = window.setInterval(() => {
    currentTime.value = formatTime();
  }, 1000);

  onBeforeUnmount(() => {
    window.clearInterval(timer);
  });

  return {
    currentTime,
  };
};

