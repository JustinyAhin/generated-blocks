import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

const OTHERWIDGETBLOCKS = [
  "core/archives",
  "core/calendar",
  "core/categories",
  "core/latest-comments",
  "core/latest-posts",
  "core/page-list",
  "core/search",
  "core/shortcode",
  "core/social-link",
  "core/tag-cloud",
];

test.describe("Blocks", () => {
  test("Other widget blocks", async ({ page }) => {
    await createPage(page, "other widget blocks");

    OTHERWIDGETBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
      });
    });

    await postPublishActions(page, "other widget blocks");
  });
});
