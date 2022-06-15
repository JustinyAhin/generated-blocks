import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

const EMBEDURL = "https://twitter.com/WordPress/status/1531319545603973123";

test.describe("Blocks", () => {
  test("Embed blocks", async ({ page }) => {
    await createPage(page, "embed");

    await insertBlock(page, {
      name: "core/embed",
      attributes: {
        url: EMBEDURL,
        caption: "Twitter embed",
      },
    });

    await postPublishActions(page, "embed");
  });
});
