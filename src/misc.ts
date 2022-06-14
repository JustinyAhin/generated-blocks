import { execSync } from "child_process";
import { DateTime } from "luxon";

import { site } from "./site";

function downloadGeneratedPage(
  url: string,
  dateString: string,
  blockType: string
): void {
  execSync(
    `node-site-downloader download -d ${site.url} -s ${site.url} -o ./artifacts/${dateString}/${blockType} --outputFolderSuffix blocks --include-images`
  );
}

function getCurrentDateTime(): string {
  let currentDateTime = DateTime.utc()
    .toLocaleString(DateTime.DATE_MED)
    .toLocaleLowerCase();
  return currentDateTime.replace(/\s/g, "-").replace(/,/g, "");
}

export { downloadGeneratedPage, getCurrentDateTime };