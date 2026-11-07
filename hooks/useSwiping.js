import { useState, useEffect, useCallback, useRef } from "react";

const useSwiping = ({
  currentSlide,
  nextSlide,
  prevSlide,
  slidesCount,
  disableResistanceOnEnds = false,
  withoutTransitionEndHandling = true,
  withoutAxisDetection = false,
}) => {
  const SENSITIVITY = 35; // How far (in percentage) the user has to swipe to change the slide
  const VELOCITY = 200; // How fast the user needs to swipe to change the slide
  const RESISTANCE = 3; // Resistance on first and last slide

  const [swipeInfo, setSwipeInfo] = useState({
    isSwiping: false,
    transitionX: 0,
    transitionEnded: true,
    allowSwiping: true,
  });

  const swipingRef = useRef({
    resistanceOnEnds: false,
    startTime: 0,
    originX: 0,
    originY: 0,
    swipeAxis: "",
    swipeAxisChanged: false,
    preventTouchScroll: false,
    fingers: 0,
  });

  const enableSwiping = useCallback(() => {
    setSwipeInfo((state) => ({
      ...state,
      allowSwiping: true,
    }));
  }, []);

  const disableSwiping = useCallback(() => {
    setSwipeInfo((state) => ({
      ...state,
      allowSwiping: false,
    }));
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
    } else if (
      Math.abs(distanceX) > Math.abs(distanceY) ||
      Math.abs(distanceX) === Math.abs(distanceY)
    ) {
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

  const onTouchStart = useCallback(
    (e) => {
      swipingRef.current.originX = Number(e.touches[0].clientX);
      swipingRef.current.originY = Number(e.touches[0].clientY);
      swipingRef.current.startTime = Date.now();
      swipingRef.current.fingers = e.touches.length;
      setSwipeInfo((state) => ({
        ...state,
        isSwiping: e.touches.length === 1 && state.allowSwiping ? true : false,
      }));
    },
    []
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!swipeInfo.isSwiping || !swipeInfo.allowSwiping) return;

      const distanceX = Number(e.touches[0].clientX) - swipingRef.current.originX;
      const distanceY = Number(e.touches[0].clientY) - swipingRef.current.originY;

      if (!withoutAxisDetection && !swipingRef.current.swipeAxisChanged) {
        getSwipeAxis(distanceX, distanceY);
      }

      if (withoutAxisDetection || swipingRef.current.swipeAxis === "x") {
        swipingRef.current.resistanceOnEnds =
          ((slidesCount === currentSlide + 1 && distanceX < 0) ||
            (currentSlide === 0 && distanceX > 0)) &&
          !disableResistanceOnEnds
            ? true
            : false;

        setSwipeInfo((state) => ({
          ...state,
          transitionX: swipingRef.current.resistanceOnEnds
            ? distanceX / RESISTANCE
            : distanceX,
        }));
      }
    },
    [
      currentSlide,
      disableResistanceOnEnds,
      getSwipeAxis,
      slidesCount,
      withoutAxisDetection,
      swipeInfo.isSwiping,
      swipeInfo.allowSwiping,
    ]
  );

  const onTouchEnd = useCallback(
    (e) => {
      const endTime = Date.now();
      const swipingTime = endTime - swipingRef.current.startTime;
      const swipingSpeed = Math.floor(
        swipeInfo.transitionX / (swipingTime * 0.001)
      );
      const delta = Math.floor(
        (swipeInfo.transitionX / e.currentTarget.clientWidth) * 100
      );

      setSwipeInfo((state) => ({
        ...state,
        isSwiping: false,
        transitionX: 0,
        transitionEnded: withoutTransitionEndHandling ? true : false,
      }));

      if (delta < -SENSITIVITY || swipingSpeed < -VELOCITY) {
        nextSlide();
      } else if (delta > SENSITIVITY || swipingSpeed > VELOCITY) {
        prevSlide();
      }

      swipingRef.current.resistanceOnEnds = false;
      swipingRef.current.swipeAxisChanged = false;
      swipingRef.current.swipeAxis = "";
      swipingRef.current.preventTouchScroll = false;
    },
    [
      swipeInfo.transitionX,
      nextSlide,
      prevSlide,
      withoutTransitionEndHandling,
    ]
  );

  return {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    transitionX: swipeInfo.transitionX,
    isSwiping: swipeInfo.isSwiping,
    onTransitionEnd,
    transitionEnded: swipeInfo.transitionEnded,
    enableSwiping,
    disableSwiping,
  };
};

export default useSwiping;
