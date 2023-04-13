import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "../../styles/lightboxGallery.module.css";
import classNames from "classnames";
import Modal from "../modal/Modal";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import useIsScrollableX from "../../hooks/useIsScrollableX";
import { Flipped } from "react-flip-toolkit";
import Image from "next/image";
import Thumbnail from "./Thumbnail";

const LightboxImage = memo(
  ({
    index,
    item,
    lightboxFor,
    imgContainerClassName,
    openGallery,
    fitToContainer,
  }) => {
    return (
      <Flipped
        onStart={(e) => (
          (e.style.zIndex = "10"), (e.style.position = "relative")
        )}
        onComplete={(e) => ((e.style.zIndex = ""), (e.style.position = ""))}
        flipId={`${lightboxFor}${index}`}
      >
        <div
          data-id={index}
          onClick={openGallery}
          className={classNames(imgContainerClassName)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            height={!fitToContainer && item.height ? item.height : undefined}
            width={!fitToContainer && item.width ? item.width : undefined}
            // layout={item.width && item.height  ? "responsive" : "fill"}
            layout={fitToContainer ? "fill" : "responsive"}
            objectFit="cover"
          />
        </div>
      </Flipped>
    );
  }
);

const ZoomedLightboxImage = memo(
  ({ index, activeIndex, item, lightboxFor }) => {
    return (
      <div className={styles.slideWrapper}>
        <div
          className={styles.imageWrapper}
          style={{
            height: !item.height && !item.width && "100%",
            maxHeight: !item.height && !item.width && "100%",
            aspectRatio: `${[item.width]}/${[item.height]}`,
          }}
        >
          <Flipped
            onStart={(e) => (e.style.zIndex = "10")}
            onComplete={(e) => (e.style.zIndex = "")}
            flipId={
              index === activeIndex ? `${lightboxFor}${index}` : undefined
            }
          >
            <div data-id={index} className={styles.imageContainer}>
              <Image
                src={item.src}
                alt={item.alt}
                // height={item.height ? item.height : undefined}
                // width={item.width ? item.width : undefined}
                layout="fill"
                objectFit={!item.height && !item.width ? "contain" : undefined}
                priority={true}
                quality={50}
              />
            </div>
          </Flipped>
          {item.text && index === activeIndex && (
            <div className={styles.captionContainer}>
              <p> {item.text} </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

function LightboxGallery({
  closeGallery,

  lightboxThumbsVisible,
touchEvents,
 handleIndex,
  lightboxForSlider,
  lightboxOpen,
navCallbacks,
  handleSwipe,
  onTransitionEnd,
  transitionEnded,
  thumbnailsOptions,
  lightboxFor,
  lightboxContainerClassName,
  items,
  imgContainerClassName,
  virtualizedItems,
  carouselInfo,
  openGallery,

  fitToContainer,
}) {
  // const isMobile = useMediaPredicate("(max-width: 1180px)");

  const thumbsContainerRef = useRef();
  // const [itemsToShow, setItemsToShow] = useState();





  const isScrollableX = useIsScrollableX({
    scrollContainerRef: thumbsContainerRef,
    enabled: carouselInfo?.galleryOpen || lightboxOpen,
  });

  const {onTouchEnd, onTouchStart, onTouchMove} = touchEvents;
  const { activeIndex, setNavigate} = handleIndex;
  const {prevSlide, nextSlide} = navCallbacks;
  const {isSwiping, transitionX} = handleSwipe;

// const slice = useCallback( ({items, startIndex, endIndex})=>{
//   return items.slice(startIndex, endIndex).map((item, index)=>({
//     item,
//     index: index + startIndex,
//   }))
// },[])

//   useEffect(()=>{


//     setItemsToShow(slice({items:items, startIndex:activeIndex>=0 && activeIndex, endIndex:activeIndex+3}))
//     console.log("mateuszek juj", itemsToShow)

//   },[activeIndex])





  return (
    <>
      <div className={lightboxContainerClassName}>
        {!lightboxForSlider &&
          items.map((item, index) => (
            <LightboxImage
              fitToContainer={fitToContainer}
              openGallery={openGallery}
              key={index}
              index={index}
              item={item}
              imgContainerClassName={imgContainerClassName}
              lightboxFor={lightboxFor}
            />
          ))}
      </div>

      <Modal
        isOpen={carouselInfo?.galleryOpen || lightboxOpen}
        onClose={closeGallery}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        containerClassName={styles.wrapper}
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
              <ZoomedLightboxImage
                key={index}
                index={index}
                item={item}
                activeIndex={activeIndex}
                lightboxFor={lightboxFor}
              />
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
          {lightboxThumbsVisible &&
            items?.map((item, index) => (
              <Thumbnail
                key={index}
                index={index}
                onNavigate={setNavigate}
                activeIndex={activeIndex}
                item={item}
                isScrollableX={isScrollableX}
                thumbnailsOptions={thumbnailsOptions}
              />
            ))}
        </div>
      </Modal>
    </>
  );
}

export default memo(LightboxGallery);