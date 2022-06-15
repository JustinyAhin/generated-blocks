import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

const QUOTEBLOCKS = ["core/quote", "core/pullquote"];
const CITATION = "Jane Doe";
const VALUE =
  "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?</p>";

test.describe("Blocks", () => {
  test("Quote blocks", async ({ page }) => {
    await createPage(page, "quote");

    QUOTEBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
        attributes: {
          value: VALUE,
          citation: CITATION,
        },
      });
    });

    await postPublishActions(page, "quote");
  });
});
