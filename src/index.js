import { baseUrl } from "./utils/credentials.js";

import { chromium } from "@playwright/test";
import { downloadGeneratedPage } from "./utils/utils.js";
import { login, publishPage, retrieveAllBlocks } from "./utils/browser.js";

(async () => {
    const browser = await chromium.launch({
        headless: true,
    });

    // Login
    const page = await login(browser);

    // Create a new page
    await page.goto(`${baseUrl}/wp-admin/post-new.php?post_type=page&post_title=Generated+Blocks`);

    // Retrieve all Core blocks
    const allBlocks = await retrieveAllBlocks(page);

    const blocksWithContentAttribute = allBlocks.filter(block => block.attributes.content);
    await page.evaluate(blocksWithContentAttribute => {
        blocksWithContentAttribute.forEach(block => {
            const createBlock = window.wp.blocks.createBlock(block.name, {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?",
            });
            window.wp.data.dispatch('core/block-editor').insertBlock(createBlock);
        });
    }, blocksWithContentAttribute);

    const blocksWithoutContentAttribute = allBlocks.filter(block => !block.attributes.content);
    await page.evaluate(blocksWithoutContentAttribute => {
        blocksWithoutContentAttribute.forEach(block => {
            const createBlock = window.wp.blocks.createBlock(block.name);
            window.wp.data.dispatch('core/block-editor').insertBlock(createBlock);
        });
    }, blocksWithoutContentAttribute);

    // Publish the page
    await publishPage(page);

    // Navigate to the page
    await page.locator('.post-publish-panel__postpublish-buttons >> text=View Page').click();

    // Get the page URL
    const url = await page.evaluate(() => window.location.href);

    // Download the page
    await downloadGeneratedPage(url);

    await browser.close();
})();
