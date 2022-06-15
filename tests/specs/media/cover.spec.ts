import { test } from "@playwright/test";

import { IMAGEDATA } from "../../../src/site";
import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

test.describe("Blocks", () => {
  test("Cover blocks", async ({ page }) => {
    await createPage(page, "cover");

    await insertBlock(page, {
      name: "core/cover",
      attributes: {
        url: IMAGEDATA.url,
        alt: IMAGEDATA.alt,
        dimRatio: 30,
      },
    });

    await postPublishActions(page, "cover");
  });
});
