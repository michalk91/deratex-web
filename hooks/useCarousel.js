import { useState, useCallback, useEffect, useRef } from "react";
import useKeyPress from "./useKeyPress";

import useSwiping from "./useSwiping";

const useCarousel = ({
  childrenCount,
  containerRef,
  withoutTransitionEndHandling,
  autoPlay,
  slideTime,
  withoutAxisDetection,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const calculateNewIndex = useCallback(
    (newIndex) => {
      if (newIndex < 0) {
        return childrenCount - 1;
      } else if (newIndex >= childrenCount) {
        return 0;
      } else {
        return newIndex;
      }
    },
    [childrenCount]
  );

  const updateIndex = useCallback((newIndex) => {
    setActiveIndex(calculateNewIndex(newIndex));
  }, []);

  // Assumes that target has data-id attribute
  const setNavigate = useCallback((e) => {
    if (e.target.dataset.id !== undefined)
      updateIndex(parseInt(e.target.dataset.id));
    else updateIndex(parseInt(e.target.closest("[data-id]").dataset.id));
  }, []);

  const handleMouseOver = useCallback(() => {
    setPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPaused(false);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((val) => calculateNewIndex(val + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((val) => calculateNewIndex(val - 1));
  }, []);

  const {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    onTransitionEnd,
    transitionX,
    isSwiping,
    transitionEnded,
  } = useSwiping({
    currentSlide: activeIndex,
    nextSlide,
    prevSlide,
    slidesCount: childrenCount,
    withoutTransitionEndHandling,
    withoutAxisDetection: withoutAxisDetection ? true : false,
  });

  const { inViewport, handleUserKeyPress } = useKeyPress({
    inViewportRef: containerRef,
    nextSlide,
    prevSlide,
    hover: paused,
  });

  useEffect(() => {
    if (!paused && autoPlay && inViewport && !isSwiping) {
      const interval = setInterval(nextSlide, slideTime);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [nextSlide, paused, inViewport, isSwiping]);

  return {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    prevSlide,
    nextSlide,
    handleMouseLeave,
    handleMouseOver,
    handleUserKeyPress,
    paused,
    activeIndex,
    updateIndex,
    setNavigate,
    inViewport,
    onTransitionEnd,
    transitionX,
    isSwiping,
    transitionEnded,
  };
};

export default useCarousel;
