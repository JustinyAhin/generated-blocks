import { Page } from "@playwright/test";

async function login(url: String, page: Page) {
  await page.goto(`${url}/wp-login.php`);
  await page.type("#user_login", `${process.env.SITE_USERNAME}`);
  await page.type("#user_pass", `${process.env.SITE_PASSWORD}`);
  await page.click("#wp-submit");
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

export { insertBlock, login, publishPage };
