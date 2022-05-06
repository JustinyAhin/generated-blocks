import "dotenv/config";

const baseUrl = process.env.BASE_URL;

const credentials = {
    'username': process.env.SITE_USERNAME,
    'password': process.env.SITE_PASSWORD,
}

export { baseUrl, credentials };
