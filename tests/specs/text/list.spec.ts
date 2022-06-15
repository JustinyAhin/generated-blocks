import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const VALUES = `<li>First list item</li>
 <li>Second list item</li>
 <li>Third list item</li>
 <li>Fourth list item</li>
 <li>Fifth list item</li>`;

test.describe("Blocks", () => {
  test("List blocks", async ({ page }) => {
    await createPage(page, "list");

    await insertBlock(page, {
      name: "core/list",
      attributes: {
        values: VALUES,
      },
    });

    await postPublishActions(page, "list");
  });
});
