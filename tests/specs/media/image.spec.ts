import { test } from "@playwright/test";

import { IMAGEDATA } from "../../../src/site";
import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

test.describe("Blocks", () => {
  test("Image blocks", async ({ page }) => {
    await createPage(page, "image");

    await insertBlock(page, {
      name: "core/image",
      attributes: {
        url: IMAGEDATA.url,
        alt: IMAGEDATA.alt,
      },
    });

    await postPublishActions(page, "image");
  });
});
