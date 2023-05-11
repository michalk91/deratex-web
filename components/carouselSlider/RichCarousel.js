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
  // thumbnailWidth,
  // thumbnailHeight,
  // thumbnailWithBorderRadius,
  thumbnailsOptions,
  virtualized = false,
  ...rest
}) {
  // const [galleryOpen, setGalleryOpen] = useState(false);
  // const [flipAnimating, setFlipAnimating] = useState(false);
  const id = useId();
  const [carouselInfo, setCarouselInfo] = useState({
    galleryOpen: false,
    flipAnimating: false,
  });

  const { galleryOpen, flipAnimating } = carouselInfo;

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
    withoutTransitionEndHandling: galleryOpen ? false : true,
    autoPlay,
    slideTime,
    withoutAxisDetection: galleryOpen ? true : false,
  });

  const lightboxFor = `carousel${id}`;

  const openGallery = useCallback(() => {
    if (!withGallery) return;

    setCarouselInfo((state) => ({
      ...state,
      galleryOpen: true,
    }));
  }, []);
  const closeGallery = useCallback(() => {
    setCarouselInfo((state) => ({
      ...state,
      galleryOpen: false,
    }));
  }, []);

  function getImageForLightboxProps(children) {
    React.Children.forEach(children, (child) => {
      if (child.props) {
        child.type === ImageForLightbox
          ? dataRef.current.push(child.props)
          : getImageForLightboxProps(child.props.children);
      }
    });
  }

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
      flipKey={galleryOpen}
      portalKey="modal"
    >
      <Carousel
        ref={ref}
        activeIndex={activeIndex}
        setNavigate={setNavigate}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        handleMouseLeave={handleMouseLeave}
        handleMouseOver={handleMouseOver}
        handleUserKeyPress={handleUserKeyPress}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        transitionX={transitionX}
        isSwiping={isSwiping}
        navigationOutside={navigationOutside}
        withGallery={withGallery}
        openGallery={openGallery}
        carouselInfo={carouselInfo}
        transitionEnded={transitionEnded}
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
          transitionEnded={transitionEnded}
          onTransitionEnd={onTransitionEnd}
          transitionX={transitionX}
          isSwiping={isSwiping}
          lightboxForSlider
          lightboxThumbsVisible
          items={dataRef.current}
          carouselInfo={carouselInfo}
          closeGallery={closeGallery}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          handleMouseLeave={handleMouseLeave}
          handleMouseOver={handleMouseOver}
          handleUserKeyPress={handleUserKeyPress}
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
