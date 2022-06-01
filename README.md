# Generated Blocks

This is a small script to generate a page with all the registered blocks by WordPress Core. The page is published on [this site](https://blocks.trylurking.com), example: [blocks.trylurking.com/generated-blocks-on-june-1-2022-859-am-utc](https://blocks.trylurking.com/generated-blocks-on-june-1-2022-859-am-utc/).

The script also saves the generated page with all its assets and media to [folders on the repo](./.artifacts/generated-pages/). The folders, as well as the page are named with the current date and time in UTC for easy identification.

The script runs on [GitHub actions](./.github/workflows/run.yml) every four days at 12.00 AM UTC.

## Purpose

To test Gutenberg blocks for accessibility, we need to have a set of blocks to test against. See [#39266](https://github.com/WordPress/gutenberg/issues/39266) for more context.
