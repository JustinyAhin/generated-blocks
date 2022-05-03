import { chromium } from "@playwright/test";
import { saveAllBlocksToJson } from './utils.js';

(async () => {
    const browser = await chromium.launch({
        headless: true,
    });

    // Login
    const page = await browser.newPage();
    await page.goto('http://core.local/wp-admin');
    await page.type('#user_login', 'admin');
    await page.type('#user_pass', 'password');
    await page.click('#wp-submit');

    // Create a new page
    await page.goto('http://core.local/wp-admin/post-new.php?post_type=page&post_title=Generated+Blocks');

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
    saveAllBlocksToJson(allBlockTypes);

    // Save the page
    await page.evaluate(() => {
        window.wp.data.dispatch('core/editor').savePost();
    });
    await page.waitForSelector('.components-snackbar:has-text("Saved")');

    // Go to the page preview
    await page.locator('button:has-text("Preview")').click();
    await Promise.all([
        page.waitForEvent('popup'),
        page.locator('text=Preview in new tab').click(),
        page.waitForLoadState(),
    ]);

    await browser.close();
})();
