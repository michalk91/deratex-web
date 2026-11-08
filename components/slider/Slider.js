import { useState, useCallback, useRef, memo } from "react";
import styles from "./slider.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import SliderDot from "./SliderDot";
import SlideImage from "./SlideImage";
import useSwiping from "../../hooks/useSwiping";
import useKeyPress from "../../hooks/useKeyPress";

function Slider({ slides }) {
  const [sliderInfo, setSliderInfo] = useState({
    activeIndex: 0,
    hovered: false,
    enteredViewport: false,
    autoPlayStopped: false,
  });

  const { activeIndex, hovered, enteredViewport, autoPlayStopped } = sliderInfo;

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
      activeIndex: (state.activeIndex + 1) % slidesCount,
    }));
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      activeIndex: (state.activeIndex - 1 + slidesCount) % slidesCount,
    }));
  }, [slidesCount]);

  const handleEnterViewport = useCallback(() => {
    setSliderInfo((state) => ({ ...state, enteredViewport: true }));
  }, []);

  const keys = [
    { key: "ArrowRight", action: nextSlide },
    { key: "ArrowLeft", action: prevSlide },
  ];

  const { inViewport } = useKeyPress({
    inViewportRef: containerRef,
    keys,
    hover: hovered,
    onEnterViewport: handleEnterViewport,
  });

  const autoPlayPaused = hovered || autoPlayStopped || !inViewport;

  const { touchHandlers } = useSwiping({
    currentSlide: activeIndex,
    nextSlide,
    prevSlide,
    slidesCount,
    bodyScrollAllTimeLocked: false,
    disableResistanceOnEnds: true,
  });

  const handleMouseEnter = useCallback(() => {
    setSliderInfo((state) => ({ ...state, hovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSliderInfo((state) => ({ ...state, hovered: false }));
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setSliderInfo((state) => ({
      ...state,
      autoPlayStopped: !state.autoPlayStopped,
    }));
  }, []);

  const setNavigate = useCallback((index) => {
    setSliderInfo((state) => ({ ...state, activeIndex: index }));
  }, []);

  return (
    <section
      ref={containerRef}
      className={styles.slider}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...touchHandlers}
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
              paused={autoPlayPaused}
              onComplete={nextSlide}
            />
          </button>
        ))}
      </div>
      {slides.map((slide, index) => (
        <div
          className={classNames(styles.slide, {
            [styles.activeSlide]:
              activeIndex === index && (inViewport || !enteredViewport),
            [styles.pausedSlide]: autoPlayPaused,
          })}
          key={index}
        >
          <div className={styles.imageContainer}>
            <SlideImage
              slide={slide}
              loading={index === 0 || firstSlideLoaded ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              onLoad={index === 0 ? handleFirstSlideLoaded : undefined}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default memo(Slider);
