export const appConfig = {
  name: 'DataSphereCenter',
  title: '数境中枢',
  subtitle: 'DataSphereCenter',
  dataSource: import.meta.env.VITE_DATA_SOURCE ?? 'mock',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
};

