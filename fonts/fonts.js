import { Roboto, Outfit } from "next/font/google";

export const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const robotoBold = Roboto({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const robotoBolder = Roboto({
  weight: "500",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const outfit = Outfit({
  weight: "300",
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});
export const outfitBolder = Outfit({
  weight: "500",
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});
