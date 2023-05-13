import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "../../styles/lightboxGallery.module.css";
import classNames from "classnames";
import Modal from "../modal/Modal";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import useIsScrollableX from "../../hooks/useIsScrollableX";
import { Flipped, Flipper } from "react-flip-toolkit";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import useVirtualized from "../../hooks/useVirtualized";

const LightboxImage = memo(
  ({
    index,
    item,
    lightboxFor,
    imgContainerClassName,
    openGallery,
    fitToContainer,
    activeIndex,
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
            priority={index === activeIndex ? true : false}
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
                priority={index === activeIndex ? true : false}
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
  onTouchEnd,
  onTouchStart,
  onTouchMove,
  activeIndex,
  setNavigate,
  lightboxForSlider,
  lightboxOpen,
  prevSlide,
  nextSlide,
  transitionX,
  isSwiping,
  onTransitionEnd,
  transitionEnded,
  thumbnailsOptions,
  lightboxFor,
  lightboxContainerClassName,
  items,
  imgContainerClassName,
  openGallery,
  virtualized,
  fitToContainer,
}) {
  const thumbsContainerRef = useRef();



  const isScrollableX = useIsScrollableX({
    scrollContainerRef: thumbsContainerRef,
    enabled:  lightboxOpen,
  });

  const { virtualizedData } = useVirtualized({
    data: items,
    activeIndex,
    isOpen: lightboxOpen,
  });
  console.log("datka", virtualizedData, activeIndex);

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
              activeIndex={activeIndex}
            />
          ))}
      </div>

      <Modal
        isOpen={lightboxOpen}
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
            style={{
              height: "100%",
              transform: virtualized
                ? activeIndex > 1 && `translateX(${activeIndex - 1}00%`
                : undefined,
            }}
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
                transform: `translateX(calc(${transitionX}px - ${activeIndex}00%)`,
              }}
            >
              {!virtualized
                ? items?.map((item, index) => (
                    <ZoomedLightboxImage
                      key={index}
                      index={index}
                      item={item}
                      activeIndex={activeIndex}
                      lightboxFor={lightboxFor}
                    />
                  ))
                : virtualizedData?.map((item) => (
                    <ZoomedLightboxImage
                      key={item.index}
                      index={item.index}
                      item={item}
                      activeIndex={activeIndex}
                      lightboxFor={lightboxFor}
                    />
                  ))}
            </div>
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
