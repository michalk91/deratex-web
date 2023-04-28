import React, { memo, useState, useCallback, useRef, useEffect, useId } from "react";
import useCarousel from "../../hooks/useCarousel";
import LightboxGallery from "./LightboxGallery";
import TextAndImageLightbox from "./TextAndImageLightbox";
import { Flipper, Flipped } from "react-flip-toolkit";
// import useId from "@accessible/use-id";

function RichLightboxGallery({
  lightboxThumbsVisible = true,
  clickTextToOpenLightbox,
  lightboxContainerClassName,
  imgContainerClassName,
  items,
  fitToContainer = true,
  thumbnailsOptions,
  virtualized=false
}) {
  const [lightboxOpen, setLightBoxOpen] = useState(false);
  const id = useId();

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

  const lightboxFor = `gallery${id}` ;
  console.log("lightbox id lightbox", lightboxFor)
  const { updateIndex } = handleIndex;

  const closeGallery = useCallback(() => {


    setLightBoxOpen(false);
  }, [setLightBoxOpen]);

  const openGallery = useCallback((e) => {
    updateIndex(Number(e.target.closest("[data-id]").dataset.id));
    setLightBoxOpen(true);


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
        virtualized={virtualized}

      />

  );
}

export default memo(RichLightboxGallery);
