import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const SWIPE_DISTANCE_THRESHOLD_PERCENT = 35;
const SWIPE_VELOCITY_THRESHOLD_PX_PER_SECOND = 200;
const EDGE_RESISTANCE_DIVISOR = 3;
const CLICK_SUPPRESSION_DISTANCE_PX = 5;

const useSwiping = ({
  currentSlide,
  nextSlide,
  prevSlide,
  slidesCount,
  disableResistanceOnEnds = false,
  withoutTransitionEndHandling = true,
  withoutAxisDetection = false,
}) => {
  const [swipeInfo, setSwipeInfo] = useState({
    isSwiping: false,
    transitionX: 0,
    transitionEnded: true,
  });
  const [mouseDragging, setMouseDragging] = useState(false);

  const swipingRef = useRef({
    active: false,
    allowSwiping: true,
    resistanceOnEnds: false,
    startTime: 0,
    originX: 0,
    originY: 0,
    width: 1,
    transitionX: 0,
    swipeAxis: "",
    swipeAxisChanged: false,
    preventTouchScroll: false,
    dragged: false,
  });

  const enableSwiping = useCallback(() => {
    swipingRef.current.allowSwiping = true;
  }, []);

  const disableSwiping = useCallback(() => {
    swipingRef.current.allowSwiping = false;
  }, []);

  useEffect(() => {
    const preventTouchScrolling = (e) => {
      if (swipingRef.current.preventTouchScroll) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventTouchScrolling, {
      passive: false,
    });
    return () =>
      document.removeEventListener("touchmove", preventTouchScrolling);
  }, []);

  const getSwipeAxis = useCallback((distanceX, distanceY) => {
    if (Math.abs(distanceX) < Math.abs(distanceY)) {
      swipingRef.current.swipeAxis = "y";
    } else {
      swipingRef.current.swipeAxis = "x";
      swipingRef.current.preventTouchScroll = true;
    }
    swipingRef.current.swipeAxisChanged = true;
  }, []);

  const onTransitionEnd = useCallback(() => {
    setSwipeInfo((state) => ({
      ...state,
      transitionEnded: true,
    }));
  }, []);

  const startSwipe = useCallback((x, y, width, canSwipe) => {
    const swiping = swipingRef.current;
    swiping.originX = x;
    swiping.originY = y;
    swiping.width = width || 1;
    swiping.startTime = Date.now();
    swiping.transitionX = 0;
    swiping.dragged = false;
    swiping.active = canSwipe && swiping.allowSwiping;
    setSwipeInfo((state) => ({ ...state, isSwiping: swiping.active }));
  }, []);

  const moveSwipe = useCallback(
    (x, y, detectAxis) => {
      const swiping = swipingRef.current;
      if (!swiping.active || !swiping.allowSwiping) return;

      const distanceX = x - swiping.originX;
      const distanceY = y - swiping.originY;

      if (detectAxis && !swiping.swipeAxisChanged) {
        getSwipeAxis(distanceX, distanceY);
      }
      if (detectAxis && swiping.swipeAxis !== "x") return;

      if (Math.abs(distanceX) > CLICK_SUPPRESSION_DISTANCE_PX) {
        swiping.dragged = true;
      }

      swiping.resistanceOnEnds =
        !disableResistanceOnEnds &&
        ((slidesCount === currentSlide + 1 && distanceX < 0) ||
          (currentSlide === 0 && distanceX > 0));
      swiping.transitionX = swiping.resistanceOnEnds
        ? distanceX / EDGE_RESISTANCE_DIVISOR
        : distanceX;

      setSwipeInfo((state) => ({
        ...state,
        transitionX: swiping.transitionX,
      }));
    },
    [currentSlide, disableResistanceOnEnds, getSwipeAxis, slidesCount],
  );

  const endSwipe = useCallback(() => {
    const swiping = swipingRef.current;
    const swipingTime = Date.now() - swiping.startTime;
    const swipingSpeed = Math.floor(
      swiping.transitionX / (swipingTime * 0.001),
    );
    const delta = Math.floor((swiping.transitionX / swiping.width) * 100);

    setSwipeInfo((state) => ({
      ...state,
      isSwiping: false,
      transitionX: 0,
      transitionEnded: withoutTransitionEndHandling,
    }));

    if (
      delta < -SWIPE_DISTANCE_THRESHOLD_PERCENT ||
      swipingSpeed < -SWIPE_VELOCITY_THRESHOLD_PX_PER_SECOND
    ) {
      nextSlide();
    } else if (
      delta > SWIPE_DISTANCE_THRESHOLD_PERCENT ||
      swipingSpeed > SWIPE_VELOCITY_THRESHOLD_PX_PER_SECOND
    ) {
      prevSlide();
    }

    swiping.active = false;
    swiping.transitionX = 0;
    swiping.resistanceOnEnds = false;
    swiping.swipeAxisChanged = false;
    swiping.swipeAxis = "";
    swiping.preventTouchScroll = false;
  }, [nextSlide, prevSlide, withoutTransitionEndHandling]);

  const onTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      startSwipe(
        touch.clientX,
        touch.clientY,
        e.currentTarget.clientWidth,
        e.touches.length === 1,
      );
    },
    [startSwipe],
  );

  const onTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      moveSwipe(touch.clientX, touch.clientY, !withoutAxisDetection);
    },
    [moveSwipe, withoutAxisDetection],
  );

  const onMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      startSwipe(e.clientX, e.clientY, e.currentTarget.clientWidth, true);
      setMouseDragging(true);
    },
    [startSwipe],
  );

  useEffect(() => {
    if (!mouseDragging) return;

    const handleMouseMove = (e) => moveSwipe(e.clientX, e.clientY, false);
    const handleMouseUp = () => {
      endSwipe();
      setMouseDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseDragging, moveSwipe, endSwipe]);

  const onClickCapture = useCallback((e) => {
    if (!swipingRef.current.dragged) return;
    swipingRef.current.dragged = false;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDragStart = useCallback((e) => e.preventDefault(), []);

  const touchHandlers = useMemo(
    () => ({ onTouchStart, onTouchMove, onTouchEnd: endSwipe }),
    [onTouchStart, onTouchMove, endSwipe],
  );

  const swipeHandlers = useMemo(
    () => ({ ...touchHandlers, onMouseDown, onClickCapture, onDragStart }),
    [touchHandlers, onMouseDown, onClickCapture, onDragStart],
  );

  return {
    touchHandlers,
    swipeHandlers,
    transitionX: swipeInfo.transitionX,
    isSwiping: swipeInfo.isSwiping,
    onTransitionEnd,
    transitionEnded: swipeInfo.transitionEnded,
    enableSwiping,
    disableSwiping,
  };
};

export default useSwiping;
