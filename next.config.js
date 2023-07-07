global.HTMLImageElement =
  typeof window === "undefined" ? Object : window.HTMLImageElement;

module.exports = {
  reactStrictMode: true,
  images: {
    deviceSizes: [
      280, 320, 360, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
    imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
  },

  i18n: {
    locales: ["pl"],
    defaultLocale: "pl",
  },
};
