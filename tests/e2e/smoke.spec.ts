import { test, expect } from '@playwright/test';

test('home renders and has quick start', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('오늘 운동 시작')).toBeVisible();
});

test('navigate to routines', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Routines' }).click();
  await expect(page.getByText('A/B Split (Example)')).toBeVisible();
});
