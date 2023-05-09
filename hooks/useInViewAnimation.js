import { useCallback, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { isMobile } from "react-device-detect";

function useInViewAnimation({
  animateContainerRef,
  sensivity = "250",
  mobileSensivity = "150",
}) {
  const animateRef = useRef(false);

  const onEnterViewport = useCallback(() => {
    if (animateRef.current) return;

    animateRef.current = true;
  }, []);

  useInViewport(
    animateContainerRef,
    { rootMargin: !isMobile ? `-${sensivity}px` : `-${mobileSensivity}px` },
    {},
    { onEnterViewport }
  );

  return { animate: animateRef.current };
}

export default useInViewAnimation;
