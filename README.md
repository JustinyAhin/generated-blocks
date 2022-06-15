# Generated Blocks

This is a small script to generate pages for WordPress Core blocks. The pages are published on [this site](https://blocks.trylurking.com), example : [locks.trylurking.com/other-widget-blocks-blocks-on-jun-15-2022](https://blocks.trylurking.com/other-widget-blocks-blocks-on-jun-15-2022/).

The script also saves the generated page with all its assets and media to [folders on the repo](./artifacts). The folders are named with the current date for easy identification, and the blocks page are grouped by date.

The script runs on [GitHub actions](./.github/workflows/run.yml) every four days at 12.00 AM UTC.

## Local testing

You can also run the script locally and test the generated pages. 

First duplicate the `.env.example` file and rename it to `.env`. Replace the environment variables with the credentials for the site you want to test against (a local/non production site preferably).

Then, run the following commands:

```sh
npm install
npx playwright install
npx playwright test
```
## Purpose

To test Gutenberg blocks for accessibility, we need to have a set of blocks to test against. See [#39266](https://github.com/WordPress/gutenberg/issues/39266) for more context.
