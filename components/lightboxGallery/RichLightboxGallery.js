import React, { memo, useState, useCallback, useId, useMemo } from "react";
import useCarousel from "../../hooks/useCarousel";
import LightboxGallery from "./LightboxGallery";
import TextAndImageLightbox from "./TextAndImageLightbox";
import { Flipper} from "react-flip-toolkit";

function RichLightboxGallery({
  lightboxThumbsVisible = true,
  clickTextToOpenLightbox,
  lightboxContainerClassName,
  imgContainerClassName,
  items,
  thumbnailsOptions,
  virtualized = false,
}) {
  const [lightboxOpen, setLightBoxOpen] = useState(false);
  const id = useId();
  const lightboxImgID = useMemo(()=>`lightbox${id}`,[id]);
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

  const openGallery = useCallback((e) => {
    updateIndex(Number(e.target.closest("[data-id]").dataset.id));
    setLightBoxOpen(true);
  }, [updateIndex]);

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
    />
  ) : (
    <Flipper flipKey={lightboxOpen} portalKey="modal">
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
        lightboxImgID={lightboxImgID}
        lightboxContainerClassName={lightboxContainerClassName}
        items={items}
        imgContainerClassName={imgContainerClassName}
        thumbnailsOptions={thumbnailsOptions}
        virtualized={virtualized}
      />
    </Flipper>
  );
}

export default memo(RichLightboxGallery);
