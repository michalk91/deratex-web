import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useScrolledOverMargin = ({
  scrollMargin,
  initialHeight, //use when position is set to "sticky" and scrollMargin is greater than 0, "initialHeight" should be greater than "heightAfterScrolling"
  heightAfterScrolling, //use when position is set to "sticky" and scrollMargin is greater than 0, "initialHeight" should be greater than "heightAfterScrolling"
}) => {
  const [scrolledOverMargin, setScrolledOverMargin] = useState(false);

  const heightDifference =
    initialHeight &&
    heightAfterScrolling &&
    initialHeight - heightAfterScrolling;

  const handleScroll = useDebouncedCallback(() => {
    const scrollY = window.scrollY;
    const scrollMarginWithDiff =
      scrollMargin > heightDifference ? scrollMargin - heightDifference : 0;

    if (scrollY > scrollMargin) {
      setScrolledOverMargin(true);
    } else if (scrollY <= scrollMarginWithDiff) {
      setScrolledOverMargin(false);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolledOverMargin;
};
