import { test } from "@playwright/test";

import {
  createPage,
  insertBlock,
  postPublishActions,
} from "../../src/tests-utils";

test.describe("Blocks", () => {
  test("Gallery blocks", async ({ page }) => {
    await createPage(page, "gallery");

    await insertBlock(page, {
      name: "core/gallery",
      innerBlocks: generateGalleryImages(),
    });

    await postPublishActions(page, "gallery");
  });
});

function generateRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGalleryImages(): object[] {
  const galleryImages: object[] = [];

  for (let i = 0; i < 10; i++) {
    const image = {
      name: "core/image",
      attributes: {
        url: `https://picsum.photos/${generateRandomInt(
          1200,
          1600
        )}/${generateRandomInt(450, 600)}`,
        alt: `Random picsum photo ${i}`,
      },
    };

    galleryImages.push(image);
  }

  return galleryImages;
}
