export interface MetricCard {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: number;
  accent: 'blue' | 'cyan' | 'green' | 'orange';
}

export interface TrendPoint {
  time: string;
  visits: number;
  users: number;
  throughput: number;
}

export interface CategoryShare {
  name: string;
  value: number;
}

export interface RegionRank {
  region: string;
  value: number;
}

export interface AlertItem {
  id: string;
  level: '高' | '中' | '低';
  title: string;
  time: string;
  status: '处理中' | '已恢复' | '待确认';
}

export interface ResourceUsage {
  name: string;
  value: number;
  color: string;
}

export interface DashboardData {
  metrics: MetricCard[];
  trends: TrendPoint[];
  categoryShares: CategoryShare[];
  regionRanks: RegionRank[];
  alerts: AlertItem[];
  resources: ResourceUsage[];
}

