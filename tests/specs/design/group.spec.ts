import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

test.describe("Blocks", () => {
  test("Group blocks", async ({ page }) => {
    await createPage(page, "group");

    await insertBlock(page, {
      name: "core/group",
      innerBlocks: [
        {
          name: "core/paragraph",
          attributes: {
            content: "This is a paragraph",
          },
        },
      ],
    });

    await postPublishActions(page, "group");
  });
});
