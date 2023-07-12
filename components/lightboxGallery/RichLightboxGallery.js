import React, {
  memo,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import useCarousel from "../../hooks/useCarousel";
import LightboxGallery from "./LightboxGallery";
import TextAndImageLightbox from "./TextAndImageLightbox";

import useFlipAnimation from "../../hooks/useFlipAnimation";

function RichLightboxGallery({
  lightboxThumbsVisible = true,
  clickTextToOpenLightbox,
  lightboxContainerClassName,
  imgContainerClassName,
  items,
  thumbnailsOptions,
  virtualized = false,
  zoomedImgSizes,
}) {
  const [lightboxOpen, setLightBoxOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const lightboxForSlider = false;

  const {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    prevSlide,
    nextSlide,
    activeIndex,
    updateIndex,
    setNavigate,
    transitionX,
    isSwiping,
    onTransitionEnd,

    transitionEnded,
  } = useCarousel({
    childrenCount: items?.length,
    withoutTransitionEndHandling: false,
    withoutAxisDetection: lightboxOpen ? true : false,
  });

  const closeGallery = useCallback(() => {
    setLightBoxOpen(false);
  }, [setLightBoxOpen]);

  const openGallery = useCallback(
    (e) => {
      updateIndex(Number(e.target.closest("[data-id]").dataset.id));
      setLightBoxOpen(true);
    },
    [updateIndex]
  );

  const firstElemRef = useRef(null);
  const modalElemRef = useRef(null);

  useEffect(() => {
    if (lightboxOpen) return;

    setImgLoaded(false);
  }, [lightboxOpen]);

  const onCloseAnimationStart = (e) => {
    e.style.zIndex = "5";
  };
  const onCloseAnimationEnd = (e) => {
    e.style.zIndex = "2";
  };
  useFlipAnimation({
    firstElemRef,
    modalElemRef,
    flipKey: lightboxOpen,
    onCloseAnimationEnd,
    onCloseAnimationStart,
    imgLoaded,
  });

  return clickTextToOpenLightbox ? (
    <TextAndImageLightbox
      transitionEnded={transitionEnded}
      transitionX={transitionX}
      isSwiping={isSwiping}
      onTransitionEnd={onTransitionEnd}
      openGallery={openGallery}
      lightboxOpen={lightboxOpen}
      closeGallery={closeGallery}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
      lightboxThumbsVisible={lightboxThumbsVisible}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      activeIndex={activeIndex}
      setNavigate={setNavigate}
      lightboxContainerClassName={lightboxContainerClassName}
      items={items}
      thumbnailsOptions={thumbnailsOptions}
      zoomedImgSizes={zoomedImgSizes}
      setImgLoaded={setImgLoaded}
      imgLoaded={imgLoaded}
    />
  ) : (
    <LightboxGallery
      lightboxForSlider={lightboxForSlider}
      transitionEnded={transitionEnded}
      transitionX={transitionX}
      isSwiping={isSwiping}
      onTransitionEnd={onTransitionEnd}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
      lightboxOpen={lightboxOpen}
      closeGallery={closeGallery}
      openGallery={openGallery}
      lightboxThumbsVisible={lightboxThumbsVisible}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      activeIndex={activeIndex}
      setNavigate={setNavigate}
      lightboxContainerClassName={lightboxContainerClassName}
      items={items}
      imgContainerClassName={imgContainerClassName}
      thumbnailsOptions={thumbnailsOptions}
      virtualized={virtualized}
      firstElemRef={firstElemRef}
      modalElemRef={modalElemRef}
      setImgLoaded={setImgLoaded}
      zoomedImgSizes={zoomedImgSizes}
      imgLoaded={imgLoaded}
    />
  );
}

export default memo(RichLightboxGallery);
