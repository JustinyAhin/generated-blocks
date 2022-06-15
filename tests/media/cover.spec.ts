import { test } from "@playwright/test";

import { downloadGeneratedPage, getCurrentDateTime } from "../../src/misc";
import { IMAGEDATA } from "../../src/site";
import { createPage, insertBlock, publishPage } from "../../src/tests-utils";


test.describe("Blocks", () => {
  test("Cover blocks", async ({ page }) => {
    await createPage(page, "cover");

    await insertBlock(page, {
      name: "core/cover",
      attributes: {
        url: IMAGEDATA.url,
        alt: IMAGEDATA.alt,
        dimRatio: 30,
      },
    });

    // Wait for the cover image to be properly displayed
    await page.waitForSelector(`img[alt="${IMAGEDATA.alt}"]`);

    // Publish the page
    await publishPage(page);

    // Navigate to the page
    await page
      .locator(".post-publish-panel__postpublish-buttons >> text=View Page")
      .click();

    // Get the page URL
    const url = await page.evaluate(() => window.location.href);

    // Download the page
    downloadGeneratedPage(url, getCurrentDateTime(), "cover");
  });
});
