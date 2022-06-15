import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

const TEXTBLOCKS = [
  "core/paragraph",
  "core/heading",
  "core/freeform",
  "core/code",
  "core/missing",
  "core/preformatted",
  "core/verse",
];
const CONTENT = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

test.describe("Blocks", () => {
  test("Text blocks", async ({ page }) => {
    await createPage(page, "text");

    TEXTBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
        attributes: {
          content: CONTENT,
        },
      });
    });

    await postPublishActions(page, "text");
  });
});
