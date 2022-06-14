import { test } from "@playwright/test";

import { downloadGeneratedPage, getCurrentDateTime } from "../../src/misc";
import {
  createPage,
  insertBlock,
  publishPage,
} from "../../src/tests-utils";

const VALUES = `<li>First list item</li>
 <li>Second list item</li>
 <li>Third list item</li>
 <li>Fourth list item</li>
 <li>Fifth list item</li>`;

test.describe("Blocks", () => {
  test("List blocks", async ({ page }) => {
    await createPage(page, "list");

    await insertBlock(page, {
      name: "core/list",
      attributes: {
        VALUES,
      },
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
    await downloadGeneratedPage(url, getCurrentDateTime(), "list");
  });
});