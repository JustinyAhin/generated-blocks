import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const VIDEOURL =
  "https://blocks.trylurking.com/wp-content/uploads/2022/05/plated-dish.mp4";

test.describe("Blocks", () => {
  test("Video blocks", async ({ page }) => {
    await createPage(page, "video");

    await insertBlock(page, {
      name: "core/video",
      attributes: {
        src: VIDEOURL,
      },
    });

    await postPublishActions(page, "video");
  });
});
