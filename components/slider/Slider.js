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
    wasHovered: false,
    pressed: false,
  });

  const { activeIndex, paused, wasHovered, pressed } = sliderInfo;

  const slidesCount = slides.length;

  const containerRef = useRef();

  const nextSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      wasHovered: false,
      pressed: !state.pressed,
      activeIndex:
        state.activeIndex !== slidesCount - 1 ? state.activeIndex + 1 : 0,
    }));
  }, []);

  const prevSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      pressed: !state.pressed,
      activeIndex:
        state.activeIndex !== 0 ? state.activeIndex - 1 : slidesCount - 1,
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
    if (paused || !inViewport) return;

    if (wasHovered) {
      nextSlide();
    }

    const handleAutoplay = setInterval(nextSlide, 3000);

    return () => {
      if (handleAutoplay) {
        clearInterval(handleAutoplay);
      }
    };
  }, [paused, pressed, inViewport]);

  const handleHovered = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      paused: true,
      wasHovered: true,
    }));
  }, []);
  const handleUnpaused = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      paused: false,
    }));
  }, []);

  const setNavigate = useCallback((index) => {
    setSliderInfo((state) => ({
      ...state,
      activeIndex: index,
    }));
  }, []);

  return (
    <section
      ref={containerRef}
      className={styles.slider}
      onMouseOver={handleHovered}
      onMouseLeave={handleUnpaused}
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
