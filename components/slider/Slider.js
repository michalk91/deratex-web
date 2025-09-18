import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "./slider.module.css";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import SliderDot from "./SliderDot";
import useSwiping from "../../hooks/useSwiping";
import useKeyPress from "../../hooks/useKeyPress";
import { isMobile } from "react-device-detect";

function Slider({ slides }) {
  const [sliderInfo, setSliderInfo] = useState({
    activeIndex: 0,
    paused: false,
    pressed: false,
    startTime: Date.now(),
    elapsed: 0,
  });

  const { activeIndex, paused } = sliderInfo;

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
  }, []); // eslint-disable-line

  const prevSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      pressed: !state.pressed,
      activeIndex:
        state.activeIndex !== 0 ? state.activeIndex - 1 : slidesCount - 1,
      startTime: Date.now(),
      elapsed: 0,
    }));
  }, []); // eslint-disable-line

  const keys = [
    { key: "ArrowRight", action: nextSlide },
    { key: "ArrowLeft", action: prevSlide },
  ];

  const { inViewport } = useKeyPress({
    inViewportRef: containerRef,
    keys,
    hover: paused,
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
  if (!inViewport) return;

  setSliderInfo((state) => ({
    ...state,
    startTime: Date.now(),
    elapsed: 0,
  }));
}, [inViewport]);

  useEffect(() => {
    if (paused || !inViewport) return;

    const remaining = 3000 - sliderInfo.elapsed;
    const timer = setTimeout(() => {
      nextSlide();
    }, remaining);

    return () => clearTimeout(timer);
  }, [paused, inViewport, sliderInfo.elapsed, activeIndex, nextSlide]);

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
      <BsChevronLeft className={styles.left_arrow} onClick={prevSlide} />
      <BsChevronRight className={styles.right_arrow} onClick={nextSlide} />

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
          )
      )}

      <div className={styles.dots_container}>
        {slides.map((_, index) => (
          <div key={index} onClick={() => setNavigate(index)}>
            <SliderDot
              key={`${index}-${activeIndex}-${inViewport ? 1 : 0}`}
              active={activeIndex === index}
              paused={paused || !inViewport}
            />
          </div>
        ))}
      </div>
      {slides.map((slide, index) => (
        <div
          className={classNames(styles.slide, {
            [styles.activeSlide]: inViewport && activeIndex === index,
          })}
          key={index}
        >
          <div className={styles.imageContainer}>
            <Image
              priority
              fill
              src={slide.src}
              alt={slide.alt}
              placeholder="blur"
              sizes="100vw"
              quality={isMobile ? 40 : 100}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default memo(Slider);
