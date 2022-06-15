import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

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

    await postPublishActions(page, "text");
  });
});
