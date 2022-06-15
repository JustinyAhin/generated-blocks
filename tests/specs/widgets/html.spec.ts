import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";
import { HTMLCONTENT } from "../../src/site";

test.describe("Blocks", () => {
  test("Html blocks", async ({ page }) => {
    await createPage(page, "html");

    await insertBlock(page, {
      name: "core/html",
      attributes: {
        content: HTMLCONTENT,
      },
    });

    await postPublishActions(page, "html");
  });
});
