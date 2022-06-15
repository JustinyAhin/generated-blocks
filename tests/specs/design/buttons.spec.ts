import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const INNERBUTTONS = [
  {
    name: "core/button",
    attributes: {
      text: "First button",
      url: "https://example.com",
    },
  },
  {
    name: "core/button",
    attributes: {
      text: "WordPress",
      url: "https://wordpress.org",
    },
  },
  {
    name: "core/button",
    attributes: {
      text: "Accessibility",
      url: "https://a11yproject.com",
    },
  },
];

test.describe("Blocks", () => {
  test("Buttons blocks", async ({ page }) => {
    await createPage(page, "buttons");

    await insertBlock(page, {
      name: "core/buttons",
      innerBlocks: INNERBUTTONS,
    });

    await postPublishActions(page, "buttons");
  });
});
