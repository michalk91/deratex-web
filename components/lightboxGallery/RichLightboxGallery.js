import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import useCarousel from "../../hooks/useCarousel";
import LightboxGallery from "./LightboxGallery";
import useModalTransition from "use-modal-transition";

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
    enableSwiping,
    disableSwiping,
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

  const onCloseAnimationStart = useCallback((e) => {
    e.style.zIndex = "5";
  }, []);
  const onCloseAnimationEnd = useCallback((e) => {
    e.style.zIndex = "2";
  }, []);

  useModalTransition({
    firstElemRef,
    modalElemRef,
    modalOpened: lightboxOpen,
    onCloseAnimationEnd,
    onCloseAnimationStart,
    modalSelector: "#modal",
    imgLoaded,
    activeIndex,
    hideFirstElem: false,
  });

  return (
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
      enableSwiping={enableSwiping}
      disableSwiping={disableSwiping}
      clickTextToOpenLightbox={clickTextToOpenLightbox}
    />
  );
}

export default memo(RichLightboxGallery);
