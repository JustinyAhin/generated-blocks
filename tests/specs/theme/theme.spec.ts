import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../../src/tests-utils";

const THEMEBLOCKS = [
  "core/pattern",
  "core/navigation",
  "core/site-logo",
  "core/site-title",
  "core/site-tagline",
  "core/query",
  "core/template-part",
  "core/avatar",
  "core/post-title",
  "core/post-excerpt",
  "core/post-featured-image",
  "core/post-content",
  "core/post-author",
  "core/post-date",
  "core/post-terms",
  "core/post-navigation-link",
  "core/post-template",
  "core/query-pagination",
  "core/query-pagination-next",
  "core/query-pagination-numbers",
  "core/query-pagination-previous",
  "core/query-no-results",
  "core/read-more",
  "core/comment-author-name",
  "core/comment-content",
  "core/comment-date",
  "core/comment-edit-link",
  "core/comment-reply-link",
  "core/comments-title",
  "core/comments-query-loop",
  "core/comments-pagination",
  "core/comments-pagination-next",
  "core/comments-pagination-numbers",
  "core/comments-pagination-previous",
  "core/post-comments-form",
  "core/loginout",
  "core/term-description",
  "core/query-title",
  "core/post-author-biography",
];

test.describe("Blocks", () => {
  test("Theme blocks", async ({ page }) => {
    await createPage(page, "theme blocks");

    THEMEBLOCKS.forEach(async (blockName) => {
      await insertBlock(page, {
        name: blockName,
      });
    });

    await postPublishActions(page, "theme blocks");
  });
});
