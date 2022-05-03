import { chromium } from "@playwright/test";
import { saveAllBlocksToJson } from './utils.js';

(async () => {
    const browser = await chromium.launch({
        headless: true,
    });

    const page = await browser.newPage();
    await page.goto('http://core.local/wp-admin');
    await page.type('#user_login', 'admin');
    await page.type('#user_pass', 'password');
    await page.click('#wp-submit');

    await page.goto('http://core.local/wp-admin/post-new.php?post_type=page');

    const allBlockTypes = await page.evaluate(() => {
        window.wp.data.dispatch('core/edit-post').toggleFeature('welcomeGuide');
        const allBlocks = window.wp.blocks.getBlockTypes();

        allBlocks.forEach(block => {
            const createdBlock = window.wp.blocks.createBlock(block.name);
            window.wp.data.dispatch('core/block-editor').insertBlock(createdBlock);
        });

        return allBlocks;
    });

    saveAllBlocksToJson(allBlockTypes);

    await browser.close();
})();
