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
  imagesForLightboxData,
  width,
  height,
  thumbnailsOptions,
  virtualized = false,
  ...rest
}) {

  const id = useId();
  const [carouselInfo, setCarouselInfo] = useState({
    lightboxOpen: false,
    flipAnimating: false,
  });

  const { lightboxOpen, flipAnimating } = carouselInfo;

  // const containerRef = useRef();
  const ref = useRef();

  const dataRef = useRef([]);

  const {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    prevSlide,
    nextSlide,
    handleMouseLeave,
    handleMouseOver,
    handleUserKeyPress,
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

  const lightboxFor = `carousel${id}`;

  const openGallery = useCallback(() => {
    if (!withGallery) return;

    setCarouselInfo((state) => ({
      ...state,
      lightboxOpen: true,
    }));
  }, []);
  const closeGallery = useCallback(() => {
    setCarouselInfo((state) => ({
      ...state,
      lightboxOpen: false,
    }));
  }, []);

 const getImageForLightboxProps = useCallback((children) => {
    React.Children.forEach(children, (child) => {
      if (child.props) {
        child.type === ImageForLightbox
          ? dataRef.current.push(child.props)
          : getImageForLightboxProps(child.props.children);
      }
    });
  },[])

  if (withGallery && dataRef.current.length === 0) getImageForLightboxProps(children);


  return (
    <Flipper
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
      flipKey={lightboxOpen}
      portalKey="modal"
    >
      <Carousel
        ref={ref}
        activeIndex={activeIndex}
        setNavigate={setNavigate}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        handleMouseLeave={lightboxOpen ? undefined : handleMouseLeave}
        handleMouseOver={lightboxOpen ? undefined : handleMouseOver}
        onTouchEnd={lightboxOpen ? undefined : onTouchEnd}
        onTouchStart={lightboxOpen ? undefined : onTouchStart}
        onTouchMove={lightboxOpen ? undefined : onTouchMove}
        transitionX={transitionX}
        isSwiping={isSwiping}
        navigationOutside={navigationOutside}
        withGallery={withGallery}
        openGallery={openGallery}
        lightboxOpen={lightboxOpen}
        flipAnimating={flipAnimating}
        lightboxFor={lightboxFor}
        virtualized={virtualized}
        height={height}
        width={width}
        {...rest}
      >
        {children}
      </Carousel>

      {withGallery && (
        <LightboxGallery
        lightboxForSlider
        lightboxThumbsVisible
          transitionEnded={transitionEnded}
          onTransitionEnd={onTransitionEnd}
          transitionX={transitionX}
          isSwiping={isSwiping}
          items={dataRef.current}
          lightboxOpen={lightboxOpen}
          closeGallery={closeGallery}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          activeIndex={activeIndex}
          setNavigate={setNavigate}
          thumbnailsOptions={thumbnailsOptions}
          lightboxFor={lightboxFor}
          virtualized={virtualized}
        />
      )}
    </Flipper>
  );
}

export default memo(RichCarousel);
