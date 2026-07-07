export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('zh-CN').format(value);
};

export const formatPercent = (value: number) => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

