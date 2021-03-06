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

// TODO: Find out why this test is failing on CI

test.skip("Blocks", () => {
  test("Social links blocks", async ({ page }) => {
    await createPage(page, "social links");

    await insertBlock(page, {
      name: "core/social-links",
      innerBlocks: SOCIALLINKS,
    });

    // Wait for the social links to be visible
    await page.waitForSelector("ul.wp-block-social-links");

    await postPublishActions(page, "social");
  });
});
