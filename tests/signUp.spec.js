// @ts-check
const { test, expect } = require('@playwright/test');

test('should show success page after submission', async ({ page }) => {
  await page.goto('/signup');

  // Filling the form
  await page.getByLabel('first name').fill('Chuck');
  await page.getByLabel('last name').fill('Norris');
  await page.getByLabel('country').selectOption({ label: 'Russia' });
  await page.getByLabel('english').check();
  await page.getByLabel('subscribe to our newsletter').check();

  // Submit the form
  await page.getByRole('button', { name: 'sign in' }).click();

  // We are on the success page
  await expect(page.getByText('thank you for signing up')).toBeVisible();
});

test('should fill passport details', async ({ page }) => {
  await page.goto('/signup');

  // Filling passport number
  await page.getByLabel('passport number').fill('858123857');

  // Filling passport issue date
  const passportIssueDateGroup = page.getByRole('group', {
    name: 'passport issue date',
  });
  await passportIssueDateGroup.getByLabel('day').fill('12');
  await passportIssueDateGroup
    .getByLabel('month')
    .selectOption({ label: 'May' });
  await passportIssueDateGroup.getByLabel('year').fill('2004');

  // Filling passport expiration date
  const passportExpirationDateGroup = page.getByRole('group', {
    name: 'passport expiration date',
  });
  await passportExpirationDateGroup.getByLabel('day').fill('17');
  await passportExpirationDateGroup
    .getByLabel('month')
    .selectOption({ label: 'Nov' });
  await passportExpirationDateGroup.getByLabel('year').fill('2024');

  // Submit the form
  await page.getByRole('button', { name: 'sign in' }).click();

  // We are on the success page
  await expect(page.getByText('thank you for signing up')).toBeVisible();
});

test('should have a link to terms and conditions', async ({
  page,
  context,
}) => {
  await page.goto('/signup');

  // Check the link href
  await expect(
    page.getByRole('link', { name: 'terms and conditions' })
  ).toHaveAttribute('href', /\/toc/);

  // Open T&C link in new tab and wait for this page to load
  const pagePromise = context.waitForEvent('page');
  await page.getByRole('link', { name: 'terms and conditions' }).click();
  const newPage = await pagePromise;

  await expect(newPage.getByText("i'm baby")).toBeVisible();
});
