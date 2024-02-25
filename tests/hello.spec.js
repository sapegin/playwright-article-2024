// @ts-check
const { test, expect } = require('@playwright/test');

test('hello world', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('welcome back')).toBeVisible();
});

test('navigates to another page', async ({ page }) => {
  await page.goto('/');

  // Opening the pizza page
  await page.getByRole('link', { name: 'remotepizza' }).click();

  // We are on the pizza page
  await expect(page.getByRole('heading', { name: 'pizza' })).toBeVisible();
});
