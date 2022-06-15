import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const FEEDURL = "https://wordpress.org/news/feed/";

test.describe("Blocks", () => {
  test("RSS blocks", async ({ page }) => {
    await createPage(page, "rss");

    await insertBlock(page, {
      name: "core/rss",
      attributes: {
        feedURL: FEEDURL,
      },
    });

    await postPublishActions(page, "rss");
  });
});
