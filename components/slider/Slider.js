import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "./slider.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import SliderDot from "./SliderDot";
import SlideImage from "./SlideImage";
import useSwiping from "../../hooks/useSwiping";
import useKeyPress from "../../hooks/useKeyPress";

function Slider({ slides }) {
  const [sliderInfo, setSliderInfo] = useState(() => ({
    activeIndex: 0,
    paused: false,
    pressed: false,
    startTime: Date.now(),
    elapsed: 0,
    enteredViewport: false,
    autoPlayStopped: false,
  }));

  const { activeIndex, paused, enteredViewport, autoPlayStopped } = sliderInfo;

  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false);
  const handleFirstSlideLoaded = useCallback(
    () => setFirstSlideLoaded(true),
    [],
  );

  const slidesCount = slides.length;

  const containerRef = useRef();

  const nextSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      activeIndex:
        state.activeIndex !== slidesCount - 1 ? state.activeIndex + 1 : 0,
      startTime: Date.now(),
      elapsed: 0,
    }));
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      pressed: !state.pressed,
      activeIndex:
        state.activeIndex !== 0 ? state.activeIndex - 1 : slidesCount - 1,
      startTime: Date.now(),
      elapsed: 0,
    }));
  }, [slidesCount]);

  const handleEnterViewport = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      enteredViewport: true,
      startTime: Date.now(),
      elapsed: 0,
    }));
  }, []);

  const keys = [
    { key: "ArrowRight", action: nextSlide },
    { key: "ArrowLeft", action: prevSlide },
  ];

  const { inViewport } = useKeyPress({
    inViewportRef: containerRef,
    keys,
    hover: paused,
    onEnterViewport: handleEnterViewport,
  });

  const { onTouchEnd, onTouchMove, onTouchStart } = useSwiping({
    currentSlide: activeIndex,
    nextSlide,
    prevSlide,
    slidesCount,
    bodyScrollAllTimeLocked: false,
    disableResistanceOnEnds: true,
  });

  useEffect(() => {
    if (paused || autoPlayStopped || !inViewport) return;

    const remaining = 3000 - sliderInfo.elapsed;
    const timer = setTimeout(() => {
      nextSlide();
    }, remaining);

    return () => clearTimeout(timer);
  }, [
    paused,
    autoPlayStopped,
    inViewport,
    sliderInfo.elapsed,
    activeIndex,
    nextSlide,
  ]);

  const handleMouseEnter = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      paused: true,
      elapsed: Date.now() - state.startTime,
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      paused: false,
      startTime: Date.now() - state.elapsed,
    }));
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      autoPlayStopped: !state.autoPlayStopped,
      elapsed: 0,
    }));
  }, []);

  const setNavigate = useCallback((index) => {
    setSliderInfo((state) => ({
      ...state,
      activeIndex: index,
      startTime: Date.now(),
      elapsed: 0,
    }));
  }, []);

  return (
    <section
      ref={containerRef}
      className={styles.slider}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      <button type="button" className="focus-only" onClick={toggleAutoPlay}>
        {autoPlayStopped
          ? "Wznów automatyczne przewijanie slajdów"
          : "Zatrzymaj automatyczne przewijanie slajdów"}
      </button>
      <button
        type="button"
        className={classNames("button-reset icon-button", styles.left_arrow)}
        aria-label="Poprzedni slajd"
        onClick={prevSlide}
      >
        <BsChevronLeft aria-hidden />
      </button>
      <button
        type="button"
        className={classNames("button-reset icon-button", styles.right_arrow)}
        aria-label="Następny slajd"
        onClick={nextSlide}
      >
        <BsChevronRight aria-hidden />
      </button>

      {slides.map(
        (slide, index) =>
          index === activeIndex && (
            <div className={styles.textContainer} key={index}>
              {slide.text && (
                <span className={styles.sliderText}>{slide.text}</span>
              )}
              {slide.text2 && (
                <span className={styles.sliderText2}>{slide.text2}</span>
              )}
              {slide.text3 && (
                <span className={styles.sliderText3}>{slide.text3}</span>
              )}
            </div>
          ),
      )}

      <div className={styles.dots_container}>
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            className="button-reset"
            aria-label={`Slajd ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => setNavigate(index)}
          >
            <SliderDot
              key={`${index}-${activeIndex}-${inViewport ? 1 : 0}`}
              active={activeIndex === index}
              paused={paused || autoPlayStopped || !inViewport}
            />
          </button>
        ))}
      </div>
      {slides.map((slide, index) => (
        <div
          className={classNames(styles.slide, {
            [styles.activeSlide]:
              activeIndex === index && (inViewport || !enteredViewport),
          })}
          key={index}
        >
          <div className={styles.imageContainer}>
            <SlideImage
              slide={slide}
              loading={index === 0 || firstSlideLoaded ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              onLoaded={index === 0 ? handleFirstSlideLoaded : undefined}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default memo(Slider);
