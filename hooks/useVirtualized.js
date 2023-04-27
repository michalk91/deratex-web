import { useRef, useEffect, useMemo } from "react";

function useVirtualized({ data, activeIndex, isOpen }) {
  const virtualizedDataRef = useRef([]);


  useMemo(() => {
    // if (React.Children.count(children) < 5) return;

    const start = activeIndex > 0 ? activeIndex - 1 : activeIndex;
    const end = activeIndex + 2;

    virtualizedDataRef.current = data
      .slice(start, end)
      .map((item, index) => ({ ...item, index: index + start }));
  }, [activeIndex, isOpen]);
  return { virtualizedData: virtualizedDataRef.current };
}

export default useVirtualized;
