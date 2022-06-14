import { execSync } from "child_process";
import fs from "fs";
import { DateTime } from "luxon";

function downloadGeneratedPage(
  url: string,
  dateString: string,
  blockType: string
): void {
  execSync(
    `node-site-downloader download -d https://segbedji.com/a-propos -s https://segbedji.com/a-propos -o ./artifacts/${dateString}/${blockType} --outputFolderSuffix blocks --include-images`
  );
}

function getCurrentDateTime(): string {
  let currentDateTime = DateTime.utc()
    .toLocaleString(DateTime.DATE_MED)
    .toLocaleLowerCase();
  return currentDateTime.replace(/\s/g, "-").replace(/,/g, "");
}

export { downloadGeneratedPage, getCurrentDateTime };
