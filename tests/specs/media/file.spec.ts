import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const FILEURL =
  "https://blocks.trylurking.com/wp-content/uploads/2022/05/hello-world.pdf";

test.describe("Blocks", () => {
  test("File blocks", async ({ page }) => {
    await createPage(page, "file");

    await insertBlock(page, {
      name: "core/file",
      attributes: {
        fileName: "A book about WordPress - Part 1",
        href: FILEURL,
      },
    });

    await postPublishActions(page, "file");
  });
});
