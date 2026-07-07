import { describe, expect, it } from 'vitest';

import { formatNumber, formatPercent } from '@/utils/format';

describe('format utils', () => {
  it('formats large numbers for zh-CN users', () => {
    expect(formatNumber(128934)).toBe('128,934');
  });

  it('keeps an explicit sign for positive percent changes', () => {
    expect(formatPercent(12.8)).toBe('+12.8%');
    expect(formatPercent(-6.4)).toBe('-6.4%');
  });
});

