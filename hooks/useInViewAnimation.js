import { useCallback, useRef } from "react";
import { useInViewport } from "react-in-viewport";

function useInViewAnimation({ animateContainerRef, sensivity= 0.5 }) {
  const animateRef = useRef(false);

  const onEnterViewport = useCallback(() => {
    if (animateRef.current) return;

    animateRef.current=true;
  }, []);

  useInViewport(
    animateContainerRef,
    { threshold: sensivity },
    {},
    { onEnterViewport }
  );

  return {animate:animateRef.current};
}

export default useInViewAnimation;
