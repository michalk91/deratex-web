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
import useFlipAnimation from "../../hooks/useFlipAnimation";

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
  lightboxZoomedImgSizes,
}) {
  const [carouselInfo, setCarouselInfo] = useState({
    lightboxOpen: false,
    flipAnimating: false,
    imgLoaded: false,
  });

  const [imgLoaded, setImgLoaded] = useState(false);

  const { lightboxOpen, flipAnimating } = carouselInfo;
  const firstElemRef = useRef();
  const modalElemRef = useRef();
  const ref = useRef();
  const lightboxForSlider = withGallery ? true : false;

  const data = useMemo(() => [], []);

  useEffect(() => {
    if (!lightboxOpen) setImgLoaded(false);
  }, [lightboxOpen]);

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

    setTimeout(() =>
      setCarouselInfo((state) => ({
        ...state,
        lightboxOpen: true,
      }))
    );
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
  const onCloseAnimationStart = (e) => {
    e.style.zIndex = "10";
    setCarouselInfo((state) => ({
      ...state,
      flipAnimating: true,
    }));
  };
  const onCloseAnimationEnd = (e) => {
    e.style.zIndex = "5";
    setCarouselInfo((state) => ({
      ...state,
      flipAnimating: false,
    }));
  };
  useFlipAnimation({
    firstElemRef,
    modalElemRef,
    flipKey: lightboxOpen,
    onCloseAnimationEnd,
    onCloseAnimationStart,
    imgLoaded,
  });

  return (
    <>
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
        virtualized={virtualized}
        height={height}
        width={width}
        firstElemRef={firstElemRef}
      >
        {children}
      </Carousel>

      {withGallery && (
        <LightboxGallery
          modalElemRef={modalElemRef}
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
          virtualized={virtualized}
          setImgLoaded={setImgLoaded}
          imgLoaded={imgLoaded}
          zoomedImgSizes={lightboxZoomedImgSizes}
        />
      )}
    </>
  );
}

export default memo(RichCarousel);
