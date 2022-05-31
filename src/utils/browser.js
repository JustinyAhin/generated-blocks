import { baseUrl, credentials } from "./credentials.js";

const login = async (browser) => {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/wp-admin`);

    // Wait for the login form to be visible
    await page.waitForSelector('#loginform');

    await page.type('#user_login', `${credentials.username}`);
    await page.type('#user_pass', `${credentials.password}`);
    await page.click('#wp-submit');
    return page;
}

const retrieveAllBlocks = async (page) => {
    return await page.evaluate(() => {
        window.wp.data.dispatch('core/edit-post').toggleFeature('welcomeGuide');
        let allBlocks = window.wp.blocks.getBlockTypes();
        allBlocks = allBlocks.filter(block => !block.title.includes("deprecated"));

        return allBlocks;
    });
}

const publishPage = async (page) => {
    await page.locator('[aria-label="Editor top bar"] >> text=Publish').click();
    await page.locator('[aria-label="Editor publish"] >> text=Publish').first().click();
    await page.waitForSelector('.components-snackbar:has-text("Published")');
}

export { login, publishPage, retrieveAllBlocks };