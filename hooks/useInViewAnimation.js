import { useCallback, useState } from "react";
import { useInViewport } from "react-in-viewport";

function useInViewAnimation({ animateContainerRef, sensivity= 0.8 }) {
  const [animate, setAnimate] = useState(false);

  const onEnterViewport = useCallback(() => {
    if (animate) return;

    setAnimate(true);
  }, []);

  useInViewport(
    animateContainerRef,
    { threshold: sensivity },
    {},
    { onEnterViewport }
  );

  return animate;
}

export default useInViewAnimation;
