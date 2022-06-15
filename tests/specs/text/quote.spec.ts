import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";
import { HTMLCONTENT } from "../../../src/site";

const QUOTEBLOCKS = ["core/quote", "core/pullquote"];
const CITATION = "Jane Doe";

test.describe("Blocks", () => {
  test("Quote blocks", async ({ page }) => {
    await createPage(page, "quote");

    QUOTEBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
        attributes: {
          value: HTMLCONTENT,
          citation: CITATION,
        },
      });
    });

    await postPublishActions(page, "quote");
  });
});
