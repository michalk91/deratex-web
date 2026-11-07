export const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;
