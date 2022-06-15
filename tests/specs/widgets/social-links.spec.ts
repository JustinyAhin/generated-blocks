import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const SOCIALLINKS = [
  {
    name: "core/social-link",
    attributes: {
      url: "https://www.facebook.com/",
      service: "facebook",
    },
  },
  {
    name: "core/social-link",
    attributes: {
      url: "https://www.twitter.com/",
      service: "twitter",
    },
  },
];

test.describe("Blocks", () => {
  test("Social links blocks", async ({ page }) => {
    await createPage(page, "social links");

    await insertBlock(page, {
      name: "core/social-links",
      innerBlocks: SOCIALLINKS,
    });

    await postPublishActions(page, "social");
  });
});
