import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

const REUSABLEBLOCKS = ["core/block"];

test.describe("Blocks", () => {
  test("Reusable blocks", async ({ page }) => {
    await createPage(page, "reusable blocks");

    REUSABLEBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
      });
    });

    await postPublishActions(page, "reusable blocks");
  });
});
