export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      SITE_USERNAME: string;
      SITE_PASSWORD: string;
    }
  }
}
