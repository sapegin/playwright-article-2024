// @ts-check
const { test, expect } = require('@playwright/test');

test('should show success message after profile deletion', async ({ page }) => {
  await page.goto('/profile');

  // Attempting to delete profile
  await page.getByRole('button', { name: 'delete profile' }).click();

  // Confirming deletion
  await page
    .getByRole('dialog', { name: 'delete profile modal' })
    .getByRole('button', { name: 'delete profile' })
    .click();

  // We are on the success page
  await expect(
    page.getByRole('heading', { name: 'your profile was deleted' })
  ).toBeVisible();
});

test('should stay on the profile page after cancelling profile deletion', async ({
  page,
}) => {
  await page.goto('/profile');

  // Attempting to delete profile
  await page.getByRole('button', { name: 'delete profile' }).click();

  // Cancelling deletion
  await page
    .getByRole('dialog')
    .filter({
      has: page.getByRole('heading', { name: 'delete profile' }),
    })
    .getByRole('button', { name: 'cancel' })
    .click();

  // We are back on the profile page
  await expect(
    page.getByRole('heading', { name: 'Your profile', strict: true })
  ).toBeVisible();
});
