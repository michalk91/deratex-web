import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

import useCarousel from "../../hooks/useCarousel";
import Carousel, { ImageForLightbox } from "./Carousel";
import LightboxGallery from "../lightboxGallery/LightboxGallery";
import useModalTransition from "use-modal-transition";

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

  const { lightboxOpen, flipAnimating, imgLoaded } = carouselInfo;

  const ref = useRef();
  const firstElemRef = useRef();
  const modalElemRef = useRef();
  const modalRef = useRef();

  const lightboxForSlider = withGallery ? true : false;

  const data = useMemo(() => [], []);

  useEffect(() => {
    if (!lightboxOpen)
      setCarouselInfo((state) => ({ ...state, imgLoaded: false }));
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
    disableSwiping,
    enableSwiping,
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

  const onCloseAnimationStart = useCallback((e) => {
    e.style.transition = "0 !important";
    setCarouselInfo((state) => ({
      ...state,
      flipAnimating: true,
    }));
  }, []);
  const onCloseAnimationEnd = useCallback((e) => {
    setCarouselInfo((state) => ({
      ...state,
      flipAnimating: false,
    }));
  }, []);

  useModalTransition({
    firstElemRef,
    modalElemRef,
    modalOpened: lightboxOpen,
    onCloseAnimationEnd,
    onCloseAnimationStart,
    imgLoaded,
    modalRef,
  });

  return (
    <>
      <Carousel
        ref={ref}
        modalRef={modalRef}
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
          modalRef={modalRef}
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
          setParentInfo={setCarouselInfo}
          imgLoaded={imgLoaded}
          zoomedImgSizes={lightboxZoomedImgSizes}
          disableSwiping={disableSwiping}
          enableSwiping={enableSwiping}
        />
      )}
    </>
  );
}

export default memo(RichCarousel);
