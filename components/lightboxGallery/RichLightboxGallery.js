import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import useCarousel from "../../hooks/useCarousel";
import LightboxGallery from "./LightboxGallery";
import TextAndImageLightbox from "./TextAndImageLightbox";
import { Flipper, Flipped } from "react-flip-toolkit";

function RichLightboxGallery({
  lightboxThumbsVisible = true,
  clickTextToOpenLightbox,
  lightboxContainerClassName,
  imgContainerClassName,
  items,
  fitToContainer = true,
  thumbnailsOptions,
}) {
  const [lightboxOpen, setLightBoxOpen] = useState(false);

  const {
    touchEvents,
    navCallbacks,
    handleIndex,
    handleSwipe,
    onTransitionEnd,

    transitionEnded,
  } = useCarousel({
    childrenCount: items?.length,
    withoutTransitionEndHandling: false,
    withoutAxisDetection: lightboxOpen ? true : false,
  });

  const lightboxFor = "gallery";
  const { updateIndex } = handleIndex;

  const closeGallery = useCallback(() => {
    console.log("kupa jestem w closeGallery");

    setLightBoxOpen(false);
  }, [setLightBoxOpen]);

  const openGallery = useCallback((e) => {
    updateIndex(Number(e.target.closest("[data-id]").dataset.id));
    setLightBoxOpen(true);

    console.log("kkk k", Number(e.target.closest("[data-id]").dataset.id));
  }, []);

  return clickTextToOpenLightbox ? (
    <TextAndImageLightbox
      transitionEnded={transitionEnded}
      handleSwipe={handleSwipe}
      onTransitionEnd={onTransitionEnd}
      openGallery={openGallery}
      lightboxOpen={lightboxOpen}
      closeGallery={closeGallery}
      navCallbacks={navCallbacks}
      lightboxThumbsVisible={lightboxThumbsVisible}
      touchEvents={touchEvents}
      handleIndex={handleIndex}
      lightboxContainerClassName={lightboxContainerClassName}
      items={items}
      thumbnailsOptions={thumbnailsOptions}
    />
  ) : (
    <Flipper flipKey={lightboxOpen} portalKey="modal">
      <LightboxGallery
        transitionEnded={transitionEnded}
        handleSwipe={handleSwipe}
        onTransitionEnd={onTransitionEnd}
        navCallbacks={navCallbacks}
        lightboxOpen={lightboxOpen}
        closeGallery={closeGallery}
        openGallery={openGallery}
        lightboxThumbsVisible={lightboxThumbsVisible}
        touchEvents={touchEvents}
        handleIndex={handleIndex}
        lightboxFor={lightboxFor}
        lightboxContainerClassName={lightboxContainerClassName}
        items={items}
        imgContainerClassName={imgContainerClassName}
        fitToContainer={fitToContainer}
        thumbnailsOptions={thumbnailsOptions}
      />
    </Flipper>
  );
}

export default memo(RichLightboxGallery);
