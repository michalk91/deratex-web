import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";

import useCarousel from "../../hooks/useCarousel";
import Carousel from "./Carousel";
import LightboxGallery from "../lightboxGallery/LightboxGallery";
import { Flipper, Flipped } from "react-flip-toolkit";



function RichCarousel({
  children,
  autoPlay = false,
  slideTime,
  withGallery,
  navigationOutside,
  // thumbnailWidth,
  // thumbnailHeight,
  // thumbnailWithBorderRadius,
  thumbnailsOptions,

  ...rest
}) {
  // const [galleryOpen, setGalleryOpen] = useState(false);
  // const [flipAnimating, setFlipAnimating] = useState(false);

  const [carouselInfo, setCarouselInfo] = useState({
    galleryOpen: false,
    flipAnimating: false,
  });

  const containerRef = useRef();
  const ref = useRef({
    containerRef,
  });

  const dataRef = useRef([]);
  const virtualizedDataRef = useRef([]);

  const {
    touchEvents,
    navCallbacks,
    handleIndex,
    handleSwipe,
    onTransitionEnd,
    transitionEnded,
  } = useCarousel({
    childrenCount: React.Children.count(children),
    containerRef,
    withoutTransitionEndHandling: carouselInfo.galleryOpen ? false : true,
    autoPlay,
    slideTime,
    withoutAxisDetection: carouselInfo.galleryOpen ? true : false,
  });

  const { activeIndex } = handleIndex;

  const lightboxFor = "carousel";

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



  const pullData = (data) => {
    const dataLength = dataRef.current.push(data);

    return dataLength;
  };

  useEffect(() => {
    if (React.Children.count(children) < 5) return;

    virtualizedDataRef.current = dataRef.current.slice(
      activeIndex >= 2 && activeIndex - 2,
      activeIndex < React.Children.count(children) && activeIndex + 3
    );
  }, [activeIndex, carouselInfo.galleryOpen]);


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
      flipKey={carouselInfo.galleryOpen}
      portalKey="modal"
    >

        <Carousel
          ref={ref}
          handleIndex={handleIndex}
          navCallbacks={navCallbacks}
          touchEvents={touchEvents}
          handleSwipe={handleSwipe}
          navigationOutside={navigationOutside}
          withGallery={withGallery}
          openGallery={openGallery}
          carouselInfo={carouselInfo}
          virtualizedItems={virtualizedDataRef.current}
          transitionEnded={transitionEnded}
          pullData={pullData}
          lightboxFor={lightboxFor}
          {...rest}
        >
          {children}
        </Carousel>


      {withGallery && (
        <LightboxGallery
          transitionEnded={transitionEnded}
          onTransitionEnd={onTransitionEnd}
      handleSwipe={handleSwipe}
          lightboxForSlider
          lightboxThumbsVisible
          items={dataRef.current}
          carouselInfo={carouselInfo}
          closeGallery={closeGallery}
          navCallbacks={navCallbacks}
          touchEvents={touchEvents}
          handleIndex={handleIndex}
          thumbnailsOptions={thumbnailsOptions}
          lightboxFor={lightboxFor}
          virtualizedItems={virtualizedDataRef.current}
        />
      )}
    </Flipper>
  );
}

export default memo(RichCarousel);
