import { defineConfig } from '@playwright/test';
const hostedURL = process.env.TARIAN_TEST_BASE_URL;
if (hostedURL && !/^https:\/\/(ashy-mud-035919310\.1\.azurestaticapps\.net|tarianventures\.com|www\.tarianventures\.com)\/?$/.test(hostedURL)) {
  throw new Error('Hosted tests must target a verified Tarian hostname.');
}
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: hostedURL ?? 'http://127.0.0.1:4321',
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
  },
  webServer: hostedURL ? undefined : {
    command: 'node scripts/serve-built.mjs',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
});
