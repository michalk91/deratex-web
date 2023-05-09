import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "../../styles/slider.module.css";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import SliderDot from "./SliderDot";
import useSwiping from "../../hooks/useSwiping";
import useKeyPress from "../../hooks/useKeyPress";

function Slider({ slides }) {
  const [current, setCurrent] = useState(1);
  const [paused, setPaused] = useState(false);
  const [wasHovered, setWasHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const slidesCount = slides.length;

  const myRef = useRef();

  const nextSlide = useCallback(() => {
    setWasHovered(false);
    setPressed((pressed) => !pressed);
    setCurrent((val) => (val !== slidesCount ? val + 1 : 1));

  }, [slidesCount, setWasHovered, setPressed]);

  const prevSlide = useCallback(() => {
    setPressed((pressed) => !pressed);
    setCurrent((val) => (val !== 1 ? val - 1 : slidesCount));
  }, [slidesCount, setWasHovered, setPressed]);

  const { inViewport } = useKeyPress({
    inViewportRef: myRef,
    nextSlide,
    prevSlide,
    hover: paused,
  });

  const {  onTouchEnd, onTouchMove, onTouchStart } = useSwiping({
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
  }, [nextSlide, paused, pressed, wasHovered, inViewport]);

  const handleHovered = useCallback(() => {
    setPaused(true), setWasHovered(true);
  }, [setPaused, setWasHovered]);
  const handleUnpaused = useCallback(() => {
    setPaused(false);
  }, [setPaused]);

  return (
    <section
      ref={myRef}
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
          index === current - 1 && (
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
          <div
            key={index}
            onClick={useCallback(() => {
              setCurrent(index + 1);
            }, [setCurrent, index])}
          >
            <SliderDot
              active={current === index + 1}
              paused={paused || !inViewport}
            />
          </div>
        ))}
      </div>
      {slides.map((slide, index) => (
        <div
          className={classNames(styles.slide, {
            [styles.activeSlide]: inViewport && current - 1 === index,
          })}
          key={index}
        >
          <div className={styles.imageContainer}>
            <Image
              // priority={true}
              loading="eager"
              src={slide.src}
              alt={slide.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default memo(Slider);
