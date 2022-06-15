import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

const AUDIOURL =
  "https://blocks.trylurking.com/wp-content/uploads/2022/05/SoundHelix-Song-4.mp3";

test.describe("Blocks", () => {
  test("Audio blocks", async ({ page }) => {
    await createPage(page, "audio");

    await insertBlock(page, {
      name: "core/audio",
      attributes: {
        src: AUDIOURL,
      },
    });

    await postPublishActions(page, "audio");
  });
});
