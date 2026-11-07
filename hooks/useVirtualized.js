import { useMemo } from "react";

function useVirtualized({ data, activeIndex }) {
  const start = activeIndex > 0 ? activeIndex - 1 : 0;
  const end = activeIndex + 2;

  const virtualizedData = useMemo(
    () =>
      data
        .slice(start, end)
        .map((item, index) => ({ ...item, index: index + start })),
    [data, start, end]
  );

  return { virtualizedData };
}

export default useVirtualized;
