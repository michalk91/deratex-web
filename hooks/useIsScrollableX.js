import { useState, useEffect } from "react";

function useIsScrollableX({ scrollContainerRef, enabled }) {
  const [isScrollableX, setIsScrollableX] = useState(false);

  useEffect(() => {
    scrollContainerRef.current?.scrollWidth >
    scrollContainerRef.current?.offsetWidth
      ? setIsScrollableX(true)
      : setIsScrollableX(false);
  }, [enabled]);

  return isScrollableX;
}

export default useIsScrollableX;
