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

    // Block insertion
    const insertBlock = async (blockRepresentation) => {
        await page.evaluate((_blockRepresentation) => {
            function recursiveCreateBlock({ name, attributes = {}, innerBlocks = [], }) {
                return window.wp.blocks.createBlock(name, attributes, innerBlocks.map((innerBlock) => recursiveCreateBlock(innerBlock)));
            }
            const block = recursiveCreateBlock(_blockRepresentation);
            window.wp.data.dispatch('core/block-editor').insertBlock(block);
        }, blockRepresentation);
    }

    // Create a new page
    await page.goto(`${baseUrl}/wp-admin/post-new.php?post_type=page&post_title=Generated+Blocks`);

    // Retrieve all Core blocks
    const allBlocks = await retrieveAllBlocks(page);

    const blocksByCategory = allBlocks.reduce((acc, block) => {
        if (block.category) {
            if (!acc[block.category]) {
                acc[block.category] = [];
            }
            acc[block.category].push(block.name);
        }
        return acc;
    }, {});

    // Text blocks
    const textBlocks = ["core/paragraph", "core/heading", "core/freeform", "core/code", "core/missing", "core/preformatted", "core/verse"]

    const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?";

    textBlocks.forEach(async (blockName) => {
        await insertBlock({
            name: blockName,
            attributes: {
                content,
            }
        });
    });

    // Quote blocks
    const quoteBlocks = ["core/quote", "core/pullquote"];

    const citation = "Jane Doe";
    const value = "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?</p>";

    quoteBlocks.forEach(async (blockName) => {
        await insertBlock({
            name: blockName,
            attributes: {
                value,
                citation,
            }
        });
    });


    // List block
    const values = `<li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
        <li>Fourth list item</li>
        <li>Fifth list item</li>`;

    await insertBlock({
        name: "core/list",
        attributes: {
            values,
        }
    });

    // Image block
    const imageData = {
        url: "https://picsum.photos/1200/450",
        alt: "Picsum image 1200x450",
    }

    await insertBlock({
        name: "core/image",
        attributes: {
            url: imageData.url,
            alt: imageData.alt,
        }
    });


    // Cover block
    await insertBlock({
        name: "core/cover",
        attributes: {
            url: imageData.url,
            alt: imageData.alt,
            dimRatio: 30,
        }
    });


    // Gallery block
    const galleryImages = [];

    for (let i = 0; i < 10; i++) {
        const image = {
            name: "core/image",
            attributes: {
                url: `https://picsum.photos/${Math.floor(Math.random() * 1000)}/${Math.floor(Math.random() * 1000)}`,
                alt: `Random picsum photo ${i}`,
            }
        };

        galleryImages.push(image);
    }

    await insertBlock({
        name: "core/gallery",
        innerBlocks: galleryImages,
    });

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
