import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const OTHERDESIGNBLOCKS = [
  "core/more",
  "core/nextpage",
  "core/separator",
  "core/spacer",
];

test.describe("Blocks", () => {
  test("Other design blocks", async ({ page }) => {
    await createPage(page, "other design blocks");

    OTHERDESIGNBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
      });
    });

    await postPublishActions(page, "other design blocks");
  });
});
