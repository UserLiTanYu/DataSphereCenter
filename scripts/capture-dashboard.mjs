import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const port = process.env.SCREENSHOT_PORT ?? '5173';
const targetUrl = process.env.SCREENSHOT_URL ?? `http://127.0.0.1:${port}`;
const outputPath = resolve(projectRoot, 'docs/images/dashboard-home.png');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const sleep = (duration) => new Promise((resolveSleep) => setTimeout(resolveSleep, duration));

const isServerReady = async () => {
  try {
    const response = await fetch(targetUrl);
    return response.ok;
  } catch {
    return false;
  }
};

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await isServerReady()) {
      return;
    }

    await sleep(500);
  }

  throw new Error(`Dashboard server is not reachable: ${targetUrl}`);
};

const startDevServer = () => {
  const child = spawn(npmCommand, ['run', 'dev', '--', '--port', port], {
    cwd: projectRoot,
    env: { ...process.env, BROWSER: 'none' },
    stdio: 'ignore',
    windowsHide: true,
  });

  child.unref();
  return child;
};

const captureDashboard = async () => {
  let devServer = null;

  if (!(await isServerReady())) {
    devServer = startDevServer();
    await waitForServer();
  }

  await mkdir(dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: '数境中枢' }).waitFor({ state: 'visible' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: outputPath, fullPage: false });
  await browser.close();

  if (devServer) {
    devServer.kill();
  }

  console.log(`Dashboard screenshot saved to ${outputPath}`);
};

captureDashboard().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

