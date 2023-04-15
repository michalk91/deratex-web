import React, { memo, useRef, useState, useEffect } from "react";
import styles from "../../styles/textAndImageLightbox.module.css";
import classNames from "classnames";
import Modal from "../modal/Modal";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import useIsScrollableX from "../../hooks/useIsScrollableX";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import useFuncDelay from "../../hooks/useFuncDelay";

function TextAndImageLightbox({
  closeGallery,
  navCallbacks,
  lightboxThumbsVisible,
  touchEvents,
  handleIndex,
  openGallery,
  lightboxOpen,
  handleSwipe,
  onTransitionEnd,
  transitionEnded,
  thumbnailsOptions,
  items,
}) {
  // const isMobile = useMediaPredicate("(max-width: 1180px)");

  const { prevSlide, nextSlide } = navCallbacks;
  const { onTouchEnd, onTouchMove, onTouchStart } = touchEvents;
  const { activeIndex, setNavigate } = handleIndex;
  const { isSwiping, transitionX } = handleSwipe;

  const [imageLoaded, setImageLoaded] = useState(false);

  const closingModalDelay = 400;

  const thumbsContainerRef = useRef();


  const isScrollableX = useIsScrollableX({
    scrollContainerRef: thumbsContainerRef,
    enabled: lightboxOpen,
  });

  const { beforeDelay, delayedFunc } = useFuncDelay({
    delay: closingModalDelay,
    functionToDelay: closeGallery,
  });
console.log(imageLoaded, "imageloaded")
  return (
    <>
      {items.map((item, index) => (
        <p
          key={index}
          className={item.textClassName}
          onClick={openGallery}
          data-id={index}
        >
          {item.text}
        </p>
      ))}

      <Modal
        isOpen={lightboxOpen}
        onClose={delayedFunc}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        containerClassName={classNames(styles.wrapper, {
          [styles.backgroundClosingAnim]: beforeDelay,
          [styles.backgroundOpeningAnim]: !beforeDelay,
        })}
      >
        <div
          className={classNames(styles.outerImagesContainerWithThumbs, {
            [styles.outerImagesContainer]: !lightboxThumbsVisible,
          })}
        >
          <div
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTransitionEnd={onTransitionEnd}
            className={classNames(styles.inner, {
              ["without-transition"]: isSwiping && !transitionEnded,
              [styles.withTransition]: !isSwiping && !transitionEnded,
            })}
            style={{
              transform: `translateX(calc(${transitionX}px - ${
                activeIndex * 100
              }%)`,
            }}
          >
            {items?.map((item, index) => (
              <div key={index} className={styles.slideWrapper}>
                <div
                  data-id={index}
                  style={{
                    aspectRatio:
                      item.width && item.height
                        ? `${[item.width / item.height]}`
                        : undefined,
                  }}
                  className={classNames(styles.imageContainer, {
                    [styles.openingAnim]: imageLoaded && !beforeDelay,
                    [styles.closingAnim]: beforeDelay,
                  })}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    layout="fill"
                    onLoadingComplete={index === activeIndex ? ()=>setImageLoaded(true) : undefined}
                    priority={true}
                    objectFit="contain"
                  />
                </div>
              </div>
            ))}
          </div>

          <IoCaretForward className={styles.nextSlide} onClick={nextSlide} />
          <IoCaretBack className={styles.prevSlide} onClick={prevSlide} />
        </div>

        <div
          className={styles.containerThumbs}
          ref={thumbsContainerRef}
          style={{
            justifyContent: isScrollableX ? "flex-start" : "center",
            scrollPadding: thumbnailsOptions?.thumbnailWithBorderRadius
              ? "15px"
              : "",
          }}
        >
          {items?.map((item, index) => {
            return (
              <Thumbnail
                key={index}
                index={index}
                onNavigate={setNavigate}
                activeIndex={activeIndex}
                item={item}
                isScrollableX={isScrollableX}
                thumbnailsOptions={thumbnailsOptions}
              />
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export default memo(TextAndImageLightbox);
