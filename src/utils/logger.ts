type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isProduction = import.meta.env.PROD;

const sendRemoteLog = (level: LogLevel, message: string, payload?: unknown) => {
  void level;
  void message;
  void payload;
  // Reserved for Sentry, OpenTelemetry, or an internal log collection API.
};

const write = (level: LogLevel, message: string, payload?: unknown) => {
  if (isProduction && level === 'debug') {
    return;
  }

  if (!isProduction) {
    console[level](`[DataSphereCenter] ${message}`, payload ?? '');
  }

  if (level === 'warn' || level === 'error') {
    sendRemoteLog(level, message, payload);
  }
};

export const logger = {
  debug: (message: string, payload?: unknown) => write('debug', message, payload),
  info: (message: string, payload?: unknown) => write('info', message, payload),
  warn: (message: string, payload?: unknown) => write('warn', message, payload),
  error: (message: string, payload?: unknown) => write('error', message, payload),
};
