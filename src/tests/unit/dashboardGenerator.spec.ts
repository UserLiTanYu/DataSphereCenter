import { beforeEach, describe, expect, it } from 'vitest';

import { generateDashboardData, resetDashboardGenerator } from '@/mock/dashboard.generator';

describe('dashboard generator', () => {
  beforeEach(() => {
    resetDashboardGenerator();
  });

  it('generates dashboard data with a stable structure', () => {
    const data = generateDashboardData();

    expect(data.metrics).toHaveLength(4);
    expect(data.trends).toHaveLength(8);
    expect(data.categoryShares.length).toBeGreaterThan(0);
    expect(data.regionRanks.length).toBeGreaterThan(0);
    expect(data.alerts.length).toBeGreaterThan(0);
    expect(data.resources).toHaveLength(3);
  });

  it('keeps resource usage in a reasonable range', () => {
    const data = generateDashboardData();

    data.resources.forEach((resource) => {
      expect(resource.value).toBeGreaterThanOrEqual(40);
      expect(resource.value).toBeLessThanOrEqual(90);
    });
  });

  it('keeps category shares normalized around 100 percent', () => {
    const data = generateDashboardData();
    const total = data.categoryShares.reduce((sum, item) => sum + item.value, 0);

    expect(total).toBe(100);
  });

  it('moves visits forward between refreshes', () => {
    const first = generateDashboardData();
    const second = generateDashboardData();

    expect(second.metrics[0]!.value).toBeGreaterThan(first.metrics[0]!.value);
    expect(second.trends).toHaveLength(first.trends.length);
  });
});
