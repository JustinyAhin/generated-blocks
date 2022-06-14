import { test } from "@playwright/test";

import { getCurrentDateTime } from "../src/misc";
import { site } from "../src/site";
import { insertBlock, login, publishPage } from "../src/tests-utils";

const textBlocks = [
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
const content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?";

test.describe("Blocks", () => {
  test("Add blocks to page", async ({ page }) => {
    await login(site.url, page);
    await page.goto(`${site.url}/wp-admin`);

    const pageTitle = `Text+blocks+on+${getCurrentDateTime()}`;
    await page.goto(
      `${site.url}/wp-admin/post-new.php?post_type=page&post_title=${pageTitle}`
    );

    textBlocks.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
        attributes: {
          content,
        },
      });
    });

    // Publish the page
    await publishPage(page);

    // Navigate to the page
    await page
      .locator(".post-publish-panel__postpublish-buttons >> text=View Page")
      .click();

    // // Get the page URL
    // const url = await page.evaluate(() => window.location.href);

    // Download the page
    // await downloadGeneratedPage(url, getCurrentDateTime());
  });
});
