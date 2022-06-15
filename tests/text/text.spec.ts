import { test } from "@playwright/test";

import { downloadGeneratedPage, getCurrentDateTime } from "../../src/misc";
import { createPage, insertBlock, publishPage } from "../../src/tests-utils";

const TEXTBLOCKS = [
  "core/paragraph",
  "core/heading",
  "core/list",
  "core/quote",
  "core/freeform",
  "core/code",
  "core/column",
  "core/missing",
  "core/preformatted",
  "core/pullquote",
  "core/table",
  "core/verse",
];
const CONTENT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?";

test.describe("Blocks", () => {
  test("Text blocks", async ({ page }) => {
    await createPage(page, "text");

    TEXTBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
        attributes: {
          CONTENT,
        },
      });
    });

    // Publish the page
    await publishPage(page);

    // Navigate to the page
    await page
      .locator(".post-publish-panel__postpublish-buttons >> text=View Page")
      .click();

    // Get the page URL
    const url = await page.evaluate(() => window.location.href);

    // Download the page
    downloadGeneratedPage(url, getCurrentDateTime(), "text");
  });
});
