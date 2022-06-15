require("dotenv").config();

interface SiteInterface {
  url: string;
  username: string;
  password: string;
}

interface ImageDataInterface {
  url: string;
  alt: string;
}

const SITE: SiteInterface = {
  url: process.env.BASE_URL,
  username: process.env.SITE_USERNAME,
  password: process.env.SITE_PASSWORD,
};

const IMAGEDATA: ImageDataInterface = {
  url: "https://picsum.photos/1200/450",
  alt: "Picsum image 1200x450",
};

const HTMLCONTENT = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis?</p>`;

export { SITE, IMAGEDATA, HTMLCONTENT };
