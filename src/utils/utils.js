import fs from "fs";
import scrape from 'website-scraper';
import { DateTime } from "luxon";

const getCurrentDateTime = () => {
    let currentDateTime = DateTime.utc().toLocaleString(DateTime.DATETIME_FULL).toLocaleLowerCase();
    return currentDateTime.replace(/\s/g, "-").replace(/,/g, "");
}

const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const saveOutputToJson = (output) => {
    const date = new Date();
    const fileName = `blocks-${getCurrentDateTime()}.json`;
    const filePath = `./.artifacts/blocks/${fileName}`;

    fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
}

const downloadGeneratedPage = async (url) => {
    const path = `./.artifacts/generated-pages/${getCurrentDateTime()}`;

    const options = {
        urls: [url],
        directory: path,
    };

    return await scrape(options);
}

export { downloadGeneratedPage, generateRandomInt, getCurrentDateTime, saveOutputToJson };
