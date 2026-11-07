import { useCallback, useState } from "react";
import { useInViewport } from "react-in-viewport";
import { isMobile } from "react-device-detect";

function useInViewAnimation({
  animateContainerRef,
  sensivity = "250",
  mobileSensivity = "150",
}) {
  const [animate, setAnimate] = useState(false);

  const onEnterViewport = useCallback(() => {
    setAnimate(true);
  }, []);

  useInViewport(
    animateContainerRef,
    { rootMargin: !isMobile ? `-${sensivity}px` : `-${mobileSensivity}px` },
    {},
    { onEnterViewport }
  );

  return { animate };
}

export default useInViewAnimation;
