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
  const [lightboxInfo, setLightboxInfo] = useState({
    lightboxOpen: false,
    imgLoaded: false,
  });

  const { lightboxOpen, imgLoaded } = lightboxInfo;

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
    setLightboxInfo((state) => ({ ...state, lightboxOpen: false }));
  }, []);

  const openGallery = useCallback(
    (e) => {
      updateIndex(Number(e.target.closest("[data-id]").dataset.id));
      setLightboxInfo((state) => ({ ...state, lightboxOpen: true }));
    },
    [updateIndex]
  );

  const firstElemRef = useRef(null);
  const modalElemRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (lightboxOpen) return;

    setLightboxInfo((state) => ({ ...state, imgLoaded: false }));
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
    imgLoaded,
    modalRef,
    activeIndex,
  });

  return (
    <LightboxGallery
      modalRef={modalRef}
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
      setParentInfo={setLightboxInfo}
      zoomedImgSizes={zoomedImgSizes}
      imgLoaded={imgLoaded}
      enableSwiping={enableSwiping}
      disableSwiping={disableSwiping}
      clickTextToOpenLightbox={clickTextToOpenLightbox}
    />
  );
}

export default memo(RichLightboxGallery);
