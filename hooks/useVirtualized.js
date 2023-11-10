import { useRef } from "react";

function useVirtualized({ data, activeIndex }) {
  const virtualizedDataRef = useRef([]);

  const start = activeIndex > 0 ? activeIndex - 1 : 0;
  const end = activeIndex + 2;

  virtualizedDataRef.current = data
    .slice(start, end)
    .map((item, index) => ({ ...item, index: index + start }));

  return { virtualizedData: virtualizedDataRef.current };
}

export default useVirtualized;
