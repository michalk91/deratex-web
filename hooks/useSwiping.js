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
    transitionX: 0,
    transitionEnded: true,
  });

  const swipingRef = useRef({
    isSwiping: false,
    resistanceOnEnds: false,
    startTime: 0,
    originX: 0,
    originY: 0,
    swipeAxis: "",
    swipeAxisChanged: false,
    preventTouchScroll: false,
  }).current;

  useEffect(() => {
    const preventTouchScrolling = (e) => {
      if (swipingRef.preventTouchScroll) {
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
      swipingRef.swipeAxis = "y";
    } else if (
      Math.abs(distanceX) > Math.abs(distanceY) ||
      Math.abs(distanceX) === Math.abs(distanceY)
    ) {
      swipingRef.swipeAxis = "x";
      swipingRef.preventTouchScroll = true;
    }
    swipingRef.swipeAxisChanged = true;
  }, []);

  const onTransitionEnd = useCallback(() => {
    setSwipeInfo((state) => ({
      ...state,
      transitionEnded: true,
    }));
  }, []);

  const onTouchStart = useCallback((e) => {
    swipingRef.originX = Number(e.touches[0].clientX);
    swipingRef.originY = Number(e.touches[0].clientY);
    swipingRef.startTime = Date.now();
    swipingRef.isSwiping = true;
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      const distanceX = Number(e.touches[0].clientX) - swipingRef.originX;
      const distanceY = Number(e.touches[0].clientY) - swipingRef.originY;

      if (!withoutAxisDetection && !swipingRef.swipeAxisChanged) {
        getSwipeAxis(distanceX, distanceY);
      }

      if (withoutAxisDetection || swipingRef.swipeAxis === "x") {
        swipingRef.resistanceOnEnds =
          ((slidesCount === currentSlide + 1 && distanceX < 0) ||
            (currentSlide === 0 && distanceX > 0)) &&
          !disableResistanceOnEnds
            ? true
            : false;

        setSwipeInfo((state) => ({
          ...state,
          transitionX: swipingRef.resistanceOnEnds
            ? distanceX / RESISTANCE
            : distanceX,
        }));
      }
    },
    [swipeInfo.transitionX]
  );

  const onTouchEnd = useCallback(
    (e) => {
      const endTime = Date.now();
      const swipingTime = endTime - swipingRef.startTime;
      const swipingSpeed = Math.floor(
        swipeInfo.transitionX / (swipingTime * 0.001)
      );
      const delta = Math.floor(
        (swipeInfo.transitionX / e.currentTarget.clientWidth) * 100
      );

      setSwipeInfo((state) => ({
        ...state,
        transitionX: 0,
        transitionEnded: withoutTransitionEndHandling ? true : false,
      }));

      if (delta < -SENSITIVITY || swipingSpeed < -VELOCITY) {
        nextSlide();
      } else if (delta > SENSITIVITY || swipingSpeed > VELOCITY) {
        prevSlide();
      }

      swipingRef.resistanceOnEnds = false;
      swipingRef.isSwiping = false;
      swipingRef.swipeAxisChanged = false;
      swipingRef.swipeAxis = "";
      swipingRef.preventTouchScroll = false;
    },
    [swipeInfo.transitionX]
  );

  return {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    transitionX: swipeInfo.transitionX,
    isSwiping: swipingRef.isSwiping,
    onTransitionEnd,
    transitionEnded: swipeInfo.transitionEnded,
  };
};

export default useSwiping;
