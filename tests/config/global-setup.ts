import { chromium } from "@playwright/test";
import { PathLike, promises } from "fs";
import { login } from "../../src/tests-utils";

async function doesFileExisits(path: PathLike): Promise<boolean> {
  try {
    await promises.access(path);
    return true;
  } catch {
    return false;
  }
}

async function globalSetup(config) {
  const [project] = config.projects;
  const { storageState } = project.use;
  const result = await doesFileExisits(storageState);

  if (result) {
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await login(page);

  await page.context().storageState({
    path: storageState,
  });

  await browser.close();
}

export default globalSetup;
