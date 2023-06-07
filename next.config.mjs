/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "admin.sassendigital.com",
      },
      {
        protocol: "https",
        hostname: "admin.sassendigital.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      }
    ],
  },
  i18n:{
    locales: ['en', 'ru'],
    defaultLocale: 'ru',

  },
  siteUrl: 'https://sassendigital.com',
  generateRobotsTxt: true,
};
export default config;
