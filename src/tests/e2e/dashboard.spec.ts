import { expect, test } from '@playwright/test';

test('dashboard home renders project title', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: '数境中枢' })).toBeVisible();
  await expect(page.getByText('DataSphereCenter')).toBeVisible();
  await expect(page.getByText('今日访问量')).toBeVisible();
});

