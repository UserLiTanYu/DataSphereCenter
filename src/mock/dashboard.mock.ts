import type { DashboardData } from '@/types/dashboard';

export const dashboardMock: DashboardData = {
  metrics: [
    { id: 'visits', label: '今日访问量', value: 128934, unit: '次', trend: 12.8, accent: 'blue' },
    { id: 'users', label: '活跃用户数', value: 48216, unit: '人', trend: 8.6, accent: 'cyan' },
    { id: 'data', label: '数据接入量', value: 936, unit: 'GB', trend: 16.2, accent: 'green' },
    { id: 'alerts', label: '告警数量', value: 27, unit: '条', trend: -6.4, accent: 'orange' },
  ],
  trends: [
    { time: '00:00', visits: 8200, users: 3200, throughput: 120 },
    { time: '03:00', visits: 6400, users: 2400, throughput: 96 },
    { time: '06:00', visits: 11200, users: 4300, throughput: 142 },
    { time: '09:00', visits: 23600, users: 9600, throughput: 260 },
    { time: '12:00', visits: 29800, users: 12600, throughput: 318 },
    { time: '15:00', visits: 35400, users: 14900, throughput: 376 },
    { time: '18:00', visits: 41200, users: 16800, throughput: 421 },
    { time: '21:00', visits: 33800, users: 13700, throughput: 365 },
  ],
  categoryShares: [
    { name: '业务运营', value: 36 },
    { name: '用户增长', value: 24 },
    { name: '设备监控', value: 18 },
    { name: '安全告警', value: 12 },
    { name: '数据治理', value: 10 },
  ],
  regionRanks: [
    { region: '华东', value: 98 },
    { region: '华南', value: 86 },
    { region: '华北', value: 76 },
    { region: '西南', value: 68 },
    { region: '华中', value: 61 },
    { region: '西北', value: 46 },
  ],
  alerts: [
    { id: 'A-1024', level: '高', title: '核心接口响应时间升高', time: '14:26:12', status: '处理中' },
    { id: 'A-1023', level: '中', title: '华南节点数据延迟', time: '14:12:08', status: '待确认' },
    { id: 'A-1022', level: '低', title: '批处理任务自动恢复', time: '13:58:44', status: '已恢复' },
    { id: 'A-1021', level: '中', title: '资源池 CPU 使用率波动', time: '13:42:31', status: '处理中' },
  ],
  resources: [
    { name: 'CPU', value: 68, color: '#33d6ff' },
    { name: '内存', value: 74, color: '#35f2a6' },
    { name: '存储', value: 57, color: '#ffd166' },
  ],
};

