require("dotenv").config();

interface SiteInterface {
  url: string;
  username: string;
  password: string;
}

const site: SiteInterface = {
  url: process.env.BASE_URL,
  username: process.env.SITE_USERNAME,
  password: process.env.SITE_PASSWORD,
};

export { site };
