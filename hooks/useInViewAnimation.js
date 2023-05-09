import { useCallback, useRef } from "react";
import { useInViewport } from "react-in-viewport";

function useInViewAnimation({ animateContainerRef, sensivity = "250" }) {
  const animateRef = useRef(false);

  const onEnterViewport = useCallback(() => {
    if (animateRef.current) return;

    animateRef.current = true;
  }, []);

  useInViewport(
    animateContainerRef,
    { rootMargin: `-${sensivity}px` },
    {},
    { onEnterViewport }
  );

  return { animate: animateRef.current };
}

export default useInViewAnimation;
