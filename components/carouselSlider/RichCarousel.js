import React, {
  memo,
  useState,
  useCallback,
  useRef,
} from "react";

import useCarousel from "../../hooks/useCarousel";
import Carousel, { ImageForLightbox } from "./Carousel";
import LightboxGallery from "../lightboxGallery/LightboxGallery";
import useModalTransition from "use-modal-transition";

function collectLightboxItems(children) {
  const items = [];

  React.Children.forEach(children, (child) => {
    if (!child?.props) return;

    if (child.type === ImageForLightbox) items.push(child.props);
    else items.push(...collectLightboxItems(child.props.children));
  });

  return items;
}

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

  const [data] = useState(() =>
    withGallery ? collectLightboxItems(children) : []
  );

  const {
    touchHandlers,
    swipeHandlers,
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
    autoPlayStopped,
    toggleAutoPlay,
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
      imgLoaded: false,
    }));
  }, []);

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
        swipeHandlers={swipeHandlers}
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
        autoPlay={autoPlay}
        autoPlayStopped={autoPlayStopped}
        toggleAutoPlay={toggleAutoPlay}
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
          touchHandlers={touchHandlers}
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
