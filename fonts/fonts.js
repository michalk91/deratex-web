import localFont from "next/font/local";

export const inter = localFont({
  src: "./inter-300.woff2",
  weight: "300",
  display: "swap",
});

export const interRegular = localFont({
  src: "./inter-400.woff2",
  weight: "400",
  display: "swap",
  preload: false,
});

export const interMedium = localFont({
  src: "./inter-500.woff2",
  weight: "500",
  display: "swap",
  preload: false,
});

export const outfit = localFont({
  src: "./outfit-300.woff2",
  weight: "300",
  display: "swap",
  preload: false,
});

export const outfitMedium = localFont({
  src: "./outfit-500.woff2",
  weight: "500",
  display: "swap",
  preload: false,
});
