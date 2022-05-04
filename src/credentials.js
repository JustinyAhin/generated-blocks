import "dotenv/config";

const baseUrl = "https://blocks.trylurking.com";

const credentials = {
    'username': process.env.SITE_USERNAME,
    'password': process.env.SITE_PASSWORD,
}

export { baseUrl, credentials };
