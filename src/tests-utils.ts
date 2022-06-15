import { Page } from "@playwright/test";
import { downloadGeneratedPage, getCurrentDateTime } from "./misc";
import { SITE } from "./site";

async function createPage(page: Page, blockType: string) {
  const pageTitle = `${blockType}+blocks+on+${getCurrentDateTime()}`;
  await page.goto(
    `/wp-admin/post-new.php?post_type=page&post_title=${pageTitle}`
  );
}

async function login(page: Page) {
  await page.goto(`${SITE.url}/wp-login.php`);
  await page.waitForTimeout(500);

  await page.locator("#user_login").type(`${process.env.SITE_USERNAME}`);
  await page.locator("#user_pass").type(`${process.env.SITE_PASSWORD}`);

  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Log In').click()
  ]);
}

async function insertBlock(page: Page, blockRepresentation): Promise<void> {
  await page.evaluate((_blockRepresentation) => {
    function recursiveCreateBlock({ name, attributes = {}, innerBlocks = [] }) {
      // @ts-ignore
      return window.wp.blocks.createBlock(
        name,
        attributes,
        innerBlocks.map((innerBlock) => recursiveCreateBlock(innerBlock))
      );
    }
    const block = recursiveCreateBlock(_blockRepresentation);

    // @ts-ignore
    window.wp.data.dispatch("core/block-editor").insertBlock(block);
  }, blockRepresentation);
}

async function publishPage(page: Page) {
  await page.locator('[aria-label="Editor top bar"] >> text=Publish').click();
  await page
    .locator('[aria-label="Editor publish"] >> text=Publish')
    .first()
    .click();
  await page.waitForSelector('.components-snackbar:has-text("Published")');
}

async function postPublishActions(
  page: Page,
  blockType: string
): Promise<void> {
  // Publish the page
  await publishPage(page);

  // Navigate to the page
  await page
    .locator(".post-publish-panel__postpublish-buttons >> text=View Page")
    .click();

  // Get the page URL
  const url = await page.evaluate(() => window.location.href);

  // Download the page
  downloadGeneratedPage(url, getCurrentDateTime(), blockType);
}

export { createPage, insertBlock, login, publishPage, postPublishActions };
