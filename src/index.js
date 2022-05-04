import { baseUrl, credentials } from "./credentials.js";

import { chromium } from "@playwright/test";
import { downloadGeneratedPage, saveAllBlocksToJson } from "./utils.js";

(async () => {
    const browser = await chromium.launch({
        headless: true,
    });

    // Login
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/wp-admin`);
    await page.type('#user_login', `${credentials.username}`);
    await page.type('#user_pass', `${credentials.password}`);
    await page.click('#wp-submit');

    // Create a new page
    await page.goto(`${baseUrl}/wp-admin/post-new.php?post_type=page&post_title=Generated+Blocks`);

    // Retrieve all Core blocks and add them to the page
    const allBlockTypes = await page.evaluate(() => {
        window.wp.data.dispatch('core/edit-post').toggleFeature('welcomeGuide');
        const allBlocks = window.wp.blocks.getBlockTypes();

        allBlocks.forEach(block => {
            const createdBlock = window.wp.blocks.createBlock(block.name);
            window.wp.data.dispatch('core/block-editor').insertBlock(createdBlock);
        });

        return allBlocks;
    });

    // Save the blocks to a JSON file
    // Comment out because this is not a hard requirement now

    // saveAllBlocksToJson(allBlockTypes);

    // Publish the page
    await page.locator('[aria-label="Editor top bar"] >> text=Publish').click();
    await page.locator('[aria-label="Editor publish"] >> text=Publish').first().click();
    await page.waitForSelector('.components-snackbar:has-text("Published")');

    // Navigate to the page
    await page.locator('.post-publish-panel__postpublish-buttons >> text=View Page').click();

    // Get the page URL
    const url = await page.evaluate(() => window.location.href);

    // Download the page
    await downloadGeneratedPage(url);

    await browser.close();
})();
