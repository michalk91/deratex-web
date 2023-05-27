import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
  useMemo,
  useId,
} from "react";

import useCarousel from "../../hooks/useCarousel";
import Carousel, { ImageForLightbox } from "./Carousel";
import LightboxGallery from "../lightboxGallery/LightboxGallery";
import { Flipper, Flipped } from "react-flip-toolkit";
// import useId from "@accessible/use-id";

function RichCarousel({
  children,
  autoPlay = false,
  slideTime,
  withGallery,
  navigationOutside,
  width,
  height,
  lightboxThumbsOptions,
  virtualized = false,
  sliderRectanglesVisible = true,
  lightboxThumbsVisible = true,
}) {
  const id = useId();
  const lightboxImgID = useMemo(() => `carousel${id}`, [id]);
  const [carouselInfo, setCarouselInfo] = useState({
    lightboxOpen: false,
    flipAnimating: false,
  });

  const { lightboxOpen, flipAnimating } = carouselInfo;

  const ref = useRef();
  const lightboxForSlider = withGallery ? true : false;


  const data = useMemo(() => [], []);

  const {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    prevSlide,
    nextSlide,
    handleMouseLeave,
    handleMouseOver,
    activeIndex,
    setNavigate,
    transitionX,
    isSwiping,
    onTransitionEnd,
    transitionEnded,
  } = useCarousel({
    childrenCount: React.Children.count(children),
    containerRef: ref,
    withoutTransitionEndHandling: lightboxOpen ? false : true,
    autoPlay,
    slideTime,
    withoutAxisDetection: lightboxOpen ? true : false,
  });

  const openGallery = useCallback(() => {
    if (!withGallery) return;

    setCarouselInfo((state) => ({
      ...state,
      lightboxOpen: true,
    }));
  }, [withGallery]);
  const closeGallery = useCallback(() => {
    setCarouselInfo((state) => ({
      ...state,
      lightboxOpen: false,
    }));
  }, []);

  const getImageForLightboxProps = useCallback(
    (children) => {
      React.Children.forEach(children, (child) => {
        if (child.props) {
          child.type === ImageForLightbox
            ? data.push(child.props)
            : getImageForLightboxProps(child.props.children);
        }
      });
    },
    [data]
  );

  if (withGallery && data.length === 0) getImageForLightboxProps(children);

  return (
    <Flipper
      flipKey={lightboxOpen}
      portalKey="modal"
      onStart={(e) => (
        (e.style.zIndex = "12"),
        (e.style.position = "relative"),
        setCarouselInfo((state) => ({
          ...state,
          flipAnimating: true,
        }))
      )}
      onComplete={(e) => (
        (e.style.zIndex = ""),
        (e.style.position = ""),
        setCarouselInfo((state) => ({
          ...state,
          flipAnimating: false,
        }))
      )}
    >
      <Carousel
        ref={ref}
        sliderRectanglesVisible={sliderRectanglesVisible}
        activeIndex={activeIndex}
        setNavigate={setNavigate}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        handleMouseLeave={handleMouseLeave}
        handleMouseOver={handleMouseOver}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        transitionX={transitionX}
        isSwiping={isSwiping}
        navigationOutside={navigationOutside}
        withGallery={withGallery}
        openGallery={openGallery}
        lightboxOpen={lightboxOpen}
        flipAnimating={flipAnimating}
        lightboxImgID={lightboxImgID}
        virtualized={virtualized}
        height={height}
        width={width}
      >
        {children}
      </Carousel>

      {withGallery && (
        <LightboxGallery
          lightboxForSlider={lightboxForSlider}
          lightboxThumbsVisible={lightboxThumbsVisible}
          transitionEnded={transitionEnded}
          onTransitionEnd={onTransitionEnd}
          transitionX={transitionX}
          isSwiping={isSwiping}
          items={data}
          lightboxOpen={lightboxOpen}
          closeGallery={closeGallery}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          activeIndex={activeIndex}
          setNavigate={setNavigate}
          thumbnailsOptions={lightboxThumbsOptions}
          lightboxImgID={lightboxImgID}
          virtualized={virtualized}
        />
      )}
    </Flipper>
  );
}

export default memo(RichCarousel);
