import fs from "fs";
import scrape from 'website-scraper';

const saveOutputToJson = (output) => {
    const date = new Date();
    const fileName = `blocks-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
    const filePath = `./.artifacts/blocks/${fileName}`;

    fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
}

const downloadGeneratedPage = async (url) => {
    const date = new Date();
    const path = `./.artifacts/generated-pages/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    const options = {
        urls: [url],
        directory: path,
    };

    return await scrape(options);
}

export { downloadGeneratedPage, saveOutputToJson };
