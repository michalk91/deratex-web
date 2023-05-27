import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "../../styles/slider.module.css";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import SliderDot from "./SliderDot";
import useSwiping from "../../hooks/useSwiping";
import useKeyPress from "../../hooks/useKeyPress";

function Slider({ slides }) {
  const [sliderInfo, setSliderInfo] = useState({
    current: 0,
    paused: false,
    wasHovered: false,
    pressed: false,
  });

  const { current, paused, wasHovered, pressed } = sliderInfo;

  const slidesCount = slides.length;

  const containerRef = useRef();

  const nextSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      wasHovered: false,
      pressed: !state.pressed,
      current: state.current !== slidesCount - 1 ? state.current + 1 : 0,
    }));
  }, []);

  const prevSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      pressed: !state.pressed,
      current: state.current !== 0 ? state.current - 1 : slidesCount - 1,
    }));
  }, []);

  const { inViewport } = useKeyPress({
    inViewportRef: containerRef,
    nextSlide,
    prevSlide,
    hover: paused,
  });

  const { onTouchEnd, onTouchMove, onTouchStart } = useSwiping({
    currentSlide: current,
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
      current: index,
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
          index === current && (
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
              active={current === index}
              paused={paused || !inViewport}
            />
          </div>
        ))}
      </div>
      {slides.map((slide, index) => (
        <div
          className={classNames(styles.slide, {
            [styles.activeSlide]: inViewport && current === index,
          })}
          key={index}
        >
          <div className={styles.imageContainer}>
            <Image
              priority
              // loading="eager"
              fill
              src={slide.src}
              alt={slide.alt}
              quality={100}
              sizes="100vw"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default memo(Slider);
