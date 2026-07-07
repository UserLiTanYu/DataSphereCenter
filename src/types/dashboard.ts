export interface MetricCard {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: number;
  accent: 'blue' | 'cyan' | 'green' | 'orange';
  code: string;
  description: string;
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

export interface CenterNode {
  id: string;
  name: string;
  x: number;
  y: number;
  value: number;
  category: 'center' | 'region';
}

export interface CenterLink {
  source: string;
  target: string;
  value: number;
}

export interface RadarIndicator {
  name: string;
  max: number;
}

export interface RadarScore {
  name: string;
  value: number;
}

export interface AlertEvent {
  time: string;
  title: string;
  region: string;
}

export interface DashboardData {
  metrics: MetricCard[];
  trends: TrendPoint[];
  categoryShares: CategoryShare[];
  regionRanks: RegionRank[];
  alerts: AlertItem[];
  resources: ResourceUsage[];
  centerNodes: CenterNode[];
  centerLinks: CenterLink[];
  radarIndicators: RadarIndicator[];
  radarScores: RadarScore[];
  alertEvents: AlertEvent[];
}

