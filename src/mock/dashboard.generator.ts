import { dashboardMock } from '@/mock/dashboard.mock';
import type { AlertItem, DashboardData } from '@/types/dashboard';

const trendLimit = 8;
let snapshot: DashboardData = structuredClone(dashboardMock);
let alertSeed = 1025;

const alertTitles = [
  '边缘节点吞吐量短时升高',
  '数据同步任务延迟恢复',
  '核心接口响应时间波动',
  '资源池负载出现轻微抖动',
  '区域链路质量自动校准',
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const pick = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)] ?? items[0]!;

const jitter = (value: number, ratio: number, min: number, max: number) => {
  const nextValue = value + value * randomBetween(-ratio, ratio);
  return Math.round(clamp(nextValue, min, max));
};

const currentTrendTime = () =>
  new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

const currentAlertTime = () =>
  new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

const normalizeShares = (data: DashboardData) => {
  const changed = data.categoryShares.map((item) => ({
    ...item,
    value: clamp(Math.round(item.value + randomBetween(-2, 2)), 8, 40),
  }));
  const total = changed.reduce((sum, item) => sum + item.value, 0);
  let runningTotal = 0;

  data.categoryShares = changed.map((item, index) => {
    if (index === changed.length - 1) {
      return { ...item, value: 100 - runningTotal };
    }

    const value = Math.round((item.value / total) * 100);
    runningTotal += value;
    return { ...item, value };
  });
};

const updateAlerts = (data: DashboardData) => {
  const shouldAddAlert = Math.random() > 0.58;
  const statuses: AlertItem['status'][] = ['处理中', '待确认', '已恢复'];
  const levels: AlertItem['level'][] = ['高', '中', '低'];

  if (shouldAddAlert) {
    alertSeed += 1;
    data.alerts.unshift({
      id: `A-${alertSeed}`,
      level: pick(levels),
      title: pick(alertTitles),
      time: currentAlertTime(),
      status: pick(statuses),
    });
  } else {
    data.alerts = data.alerts.map((alert, index) =>
      index === 0 ? { ...alert, status: pick(statuses) } : alert,
    );
  }

  data.alerts = data.alerts.slice(0, 4);
};

export const generateDashboardData = (): DashboardData => {
  const nextData = structuredClone(snapshot);
  const [visits, users, dataAccess, alerts] = nextData.metrics as [
    DashboardData['metrics'][number],
    DashboardData['metrics'][number],
    DashboardData['metrics'][number],
    DashboardData['metrics'][number],
  ];

  visits.value += Math.round(randomBetween(860, 2200));
  visits.trend = Number(clamp(visits.trend + randomBetween(-0.7, 0.9), 6, 18).toFixed(1));

  users.value = jitter(users.value, 0.025, 36_000, 58_000);
  users.trend = Number(clamp(users.trend + randomBetween(-0.6, 0.7), 2, 14).toFixed(1));

  dataAccess.value += Math.round(randomBetween(5, 18));
  dataAccess.trend = Number(clamp(dataAccess.trend + randomBetween(-0.8, 0.8), 8, 24).toFixed(1));

  alerts.value = jitter(alerts.value, 0.18, 12, 42);
  alerts.trend = Number(clamp(alerts.trend + randomBetween(-1.4, 1.2), -12, 8).toFixed(1));

  const latestTrend = {
    time: currentTrendTime(),
    visits: visits.value,
    users: users.value,
    throughput: Math.round(clamp(dataAccess.value / 2.4 + randomBetween(-24, 24), 120, 520)),
  };

  nextData.trends = [...nextData.trends.slice(-(trendLimit - 1)), latestTrend];
  normalizeShares(nextData);
  nextData.regionRanks = nextData.regionRanks.map((item) => ({
    ...item,
    value: jitter(item.value, 0.045, 36, 100),
  }));
  nextData.resources = nextData.resources.map((item) => ({
    ...item,
    value: jitter(item.value, 0.06, 40, 90),
  }));
  updateAlerts(nextData);

  snapshot = nextData;
  return structuredClone(snapshot);
};

export const resetDashboardGenerator = () => {
  snapshot = structuredClone(dashboardMock);
  alertSeed = 1025;
};
