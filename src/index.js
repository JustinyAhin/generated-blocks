import { baseUrl, credentials } from "./credentials.js";

import { chromium } from "@playwright/test";
import { downloadGeneratedPage, saveOutputToJson } from "./utils.js";

(async () => {
    const browser = await chromium.launch({
        headless: false,
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

async function retrieveAllBlocks(page) {
    return await page.evaluate(() => {
        window.wp.data.dispatch('core/edit-post').toggleFeature('welcomeGuide');
        let allBlocks = window.wp.blocks.getBlockTypes();
        allBlocks = allBlocks.filter(block => !block.title.includes("deprecated"));

        return allBlocks;
    });
}

async function publishPage(page) {
    await page.locator('[aria-label="Editor top bar"] >> text=Publish').click();
    await page.locator('[aria-label="Editor publish"] >> text=Publish').first().click();
    await page.waitForSelector('.components-snackbar:has-text("Published")');
}

async function login(browser) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/wp-admin`);
    await page.type('#user_login', `${credentials.username}`);
    await page.type('#user_pass', `${credentials.password}`);
    await page.click('#wp-submit');
    return page;
}

