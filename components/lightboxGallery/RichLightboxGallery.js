import React, {
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
} from "react";
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
  virtualized = false,
}) {
  const [lightboxOpen, setLightBoxOpen] = useState(false);
  const id = useId();

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

  const lightboxFor = `gallery${id}`;
  console.log("lightbox id lightbox", lightboxFor);

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
      lightboxFor={lightboxFor}
      lightboxContainerClassName={lightboxContainerClassName}
      items={items}
      imgContainerClassName={imgContainerClassName}
      fitToContainer={fitToContainer}
      thumbnailsOptions={thumbnailsOptions}
      virtualized={virtualized}
    />
    </Flipper>
  );
}

export default memo(RichLightboxGallery);
