// @ts-check
const { test, expect } = require('@playwright/test');

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('load ingredients asynchronously', async ({ page }) => {
  await page.goto('/remote-pizza');

  // Ingredients list is not visible
  await expect(page.getByText(ingredients[0])).toBeHidden();

  // Load ingredients
  await page.getByRole('button', { name: 'bake' }).click();

  // All ingredients appear on the screen
  for (const ingredient of ingredients) {
    await expect(page.getByText(ingredient)).toBeVisible();
  }

  // The button is not clickable anymore
  await expect(page.getByRole('button', { name: 'cook' })).toBeDisabled();
});

test('shows an error message', async ({ page }) => {
  await page.goto('/remote-pizza');

  page.evaluate(() => {
    // Reference global instances set in src/browser.js
    const { worker, http, HttpResponse } = window.msw;
    worker.use(
      http.get(
        'https://httpbin.org/anything',
        () => HttpResponse.json(null, { status: 500 }),
        { once: true }
      )
    );
  });

  // Ingredients list is not visible
  await expect(page.getByText(ingredients[0])).toBeHidden();

  // Load ingredients
  await page.getByRole('button', { name: 'cook' }).click();

  // Ingredients list is still not visible and error message appears
  await expect(page.getByText(ingredients[0])).toBeHidden();
  await expect(page.getByText('something went wrong')).toBeVisible();
});
