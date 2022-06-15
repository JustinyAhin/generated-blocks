import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  globalSetup: "./tests/config/global-setup",
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? undefined : "html",
  use: {
    actionTimeout: 0,
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    storageState: "./artifacts/storage/storage.json",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  outputDir: "./artifacts/trace/",
};

export default config;
