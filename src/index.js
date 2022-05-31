import { baseUrl } from "./utils/credentials.js";

import { chromium } from "@playwright/test";
import { downloadGeneratedPage, generateRandomInt } from "./utils/utils.js";
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
                url: `https://picsum.photos/${generateRandomInt(1200, 1600)}/${generateRandomInt(450, 600)}`,
                alt: `Random picsum photo ${i}`,
            }
        };

        galleryImages.push(image);
    }

    await insertBlock({
        name: "core/gallery",
        innerBlocks: galleryImages,
    });

    // Audio block
    const audioUrl = "https://blocks.trylurking.com/wp-content/uploads/2022/05/SoundHelix-Song-4.mp3";

    await insertBlock({
        name: "core/audio",
        attributes: {
            src: audioUrl,
        }
    });

    // Video block
    const videoUrl = "https://blocks.trylurking.com/wp-content/uploads/2022/05/plated-dish.mp4";

    await insertBlock({
        name: "core/video",
        attributes: {
            src: videoUrl,
        }
    });

    // File block
    const fileUrl = "https://blocks.trylurking.com/wp-content/uploads/2022/05/hello-world.pdf";

    await insertBlock({
        name: "core/file",
        attributes: {
            fileName: "A book about WordPress - Part 1",
            href: fileUrl,
        }
    });

    // Media and text block
    // await insertBlock({
    //     name: "core/media-text",
    //     attributes: {
    //         mediaUrl: imageData.url,
    //         mediaAlt: imageData.alt,
    //     }
    // });

    // HTML block
    const htmlContent = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?</p>`;

    await insertBlock({
        name: "core/html",
        attributes: {
            content: htmlContent,
        }
    });

    // RSS block
    const feedURL = "https://wordpress.org/news/feed/";

    await insertBlock({
        name: "core/rss",
        attributes: {
            feedURL,
        }
    });

    // Social links block
    const socialLinks = [
        {
            name: "core/social-link",
            attributes: {
                url: "https://www.facebook.com/",
                service: "facebook",
            }
        },
        {
            name: "core/social-link",
            attributes: {
                url: "https://www.twitter.com/",
                service: "twitter",
            }
        }
    ];

    await insertBlock({
        name: "core/social-links",
        innerBlocks: socialLinks,
    })

    // Other widgets blocks
    const otherWidgetBlocks = blocksByCategory.widgets.filter((blockName) => !["core/html", "core/rss", "core/social-links"].includes(blockName));

    otherWidgetBlocks.forEach(async (blockName) => {
        await insertBlock({
            name: blockName,
        });
    });

    // Buttons
    const innerButtons = [
        {
            name: "core/button",
            attributes: {
                text: "First button",
                url: "https://example.com",
            },
        },
        {
            name: "core/button",
            attributes: {
                text: "WordPress",
                url: "https://wordpress.org",
            },
        },
        {
            name: "core/button",
            attributes: {
                text: "Accessibility",
                url: "https://a11yproject.com",
            },
        }
    ];

    await insertBlock({
        name: "core/buttons",
        innerBlocks: innerButtons,
    });

    // Columns

    // Group
    await insertBlock({
        name: "core/group",
        innerBlocks: [
            {
                name: "core/paragraph",
                attributes: {
                    content: "This is a paragraph",
                },
            },
            innerButtons,
        ],
    });

    // Other design blocks
    const otherDesignBlocks = ["core/more", "core/nextpage", "core/separator", "core/spacer"];

    otherDesignBlocks.forEach(async (blockName) => {
        await insertBlock({
            name: blockName,
        });
    });

    // Embed
    const embedUrl = "https://twitter.com/WordPress/status/1531319545603973123";

    await insertBlock({
        name: "core/embed",
        attributes: {
            url: embedUrl,
            caption: "Twitter embed",
        }
    });

    // Theme blocks
    const themeBlocks = blocksByCategory.theme;

    themeBlocks.forEach(async (blockName) => {
        await insertBlock({
            name: blockName,
        });
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
