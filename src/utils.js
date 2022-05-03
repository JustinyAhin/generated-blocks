import fs from "fs";

const saveAllBlocksToJson = (blocks) => {
    const date = new Date();
    const fileName = `blocks-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
    const filePath = `./blocks/${fileName}`;

    fs.writeFileSync(filePath, JSON.stringify(blocks, null, 2));
}

export { saveAllBlocksToJson };
