import { test } from "@playwright/test";

import { downloadGeneratedPage, getCurrentDateTime } from "../../src/misc";
import { createPage, insertBlock, publishPage } from "../../src/tests-utils";

const IMAGEDATA = {
  url: "https://picsum.photos/1200/450",
  alt: "Picsum image 1200x450",
};

test.describe("Blocks", () => {
  test("Image blocks", async ({ page }) => {
    await createPage(page, "image");

    await insertBlock(page, {
      name: "core/image",
      attributes: {
        url: IMAGEDATA.url,
        alt: IMAGEDATA.alt,
      },
    });

    // Wait for the image to be properly displayed
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
    await downloadGeneratedPage(url, getCurrentDateTime(), "image");
  });
});
