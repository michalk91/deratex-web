import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./lightboxGallery.module.css";
import classNames from "classnames";
import Modal from "../modal/Modal";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import useIsScrollableX from "../../hooks/useIsScrollableX";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import useVirtualized from "../../hooks/useVirtualized";
import { roboto } from "../../fonts/fonts";
import { SlMagnifierAdd } from "react-icons/sl";
import { SlMagnifierRemove } from "react-icons/sl";
import useZoomAndDrag from "../../hooks/useZoomAndDrag";
import { SlFrame } from "react-icons/sl";

const LightboxImage = memo(function LightboxImage({
  index,
  item,
  imgContainerClassName,
  openGallery,
  objectFit,
  firstElemRef,
  activeIndex,
}) {
  return (
    <div
      ref={index === activeIndex ? firstElemRef : null}
      data-id={index}
      onClick={openGallery}
      className={classNames(imgContainerClassName)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        height={item.height ? item.height : undefined}
        width={item.width ? item.width : undefined}
        style={{
          objectFit: objectFit ? objectFit : "cover",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        sizes="20vw"
      />
    </div>
  );
});

const ZoomedLightboxImage = memo(function ZoomedLightboxImage({
  index,
  item,
  activeIndex,
  modalElemRef,
  setImgLoaded,
  zoomedImgSizes,
  imgLoaded,
  dragTransitionX,
  dragTransitionY,
  zoom,
  isDragging,
  onMouseDown,
  onDragStart,
}) {
  const [imgWidth, setImgWidth] = useState(0);

  return (
    <div className={styles.slideWrapper}>
      <div
        data-id={index}
        className={styles.imageWrapper}
        style={{
          aspectRatio: `${[item.width]}/${[item.height]}`,
          maxWidth: imgWidth !== 0 ? imgWidth : "100%", //HACK for Safari, When we use "aspect-ratio" in flex row container Safari stretch width to parent size
        }}
      >
        <Image
          onMouseDown={onMouseDown}
          onTouchStart={onDragStart}
          style={{
            zIndex: index === activeIndex && zoom > 1 && "15",
            cursor: zoom > 1 && "grab",
            transform:
              index === activeIndex &&
              zoom > 1 &&
              `scale(${zoom}) translate3d(${dragTransitionX}px, ${dragTransitionY}px, 0)`,
            transitionDuration: isDragging ? "0s" : "0.3s",
          }}
          ref={index === activeIndex ? modalElemRef : null}
          src={item.src}
          alt={item.alt}
          fill
          sizes={zoomedImgSizes ? zoomedImgSizes : "100vw"}
          priority={index === activeIndex ? true : false}
          onLoadingComplete={(e) => {
            if (index !== activeIndex) return;

            setImgWidth(e.clientWidth);
            setImgLoaded(true);
          }}
        />

        {zoom === 1 && item.text && imgLoaded && index === activeIndex && (
          <div className={styles.captionContainer}>
            <p className={roboto.className}> {item.text} </p>
          </div>
        )}
      </div>
    </div>
  );
});

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
  lightboxContainerClassName,
  items,
  imgContainerClassName,
  openGallery,
  virtualized,
  firstElemRef,
  modalElemRef,
  setImgLoaded,
  zoomedImgSizes,
  imgLoaded,
  enableSwiping,
  disableSwiping,
}) {
  const thumbsContainerRef = useRef();

  const isScrollableX = useIsScrollableX({
    scrollContainerRef: thumbsContainerRef,
    enabled: lightboxOpen,
  });

  const { virtualizedData } = useVirtualized({
    data: items,
    activeIndex,
  });

  const {
    handleDecreaseZoom,
    handleIncreaseZoom,
    handleResetZoom,
    dragTransitionX,
    dragTransitionY,
    onMouseDown,
    onDragStart,
    isDragging,
    zoom,
  } = useZoomAndDrag({ resetZoom: { lightboxOpen, activeIndex } });

  useEffect(() => {
    if (zoom > 1) {
      disableSwiping();
    } else {
      enableSwiping();
    }
  }, [zoom]);

  return (
    <>
      <div className={lightboxContainerClassName}>
        {!lightboxForSlider &&
          items.map((item, index) => (
            <LightboxImage
              firstElemRef={firstElemRef}
              activeIndex={activeIndex}
              openGallery={openGallery}
              key={index}
              index={index}
              item={item}
              imgContainerClassName={imgContainerClassName}
            />
          ))}
      </div>

      <Modal
        isOpen={lightboxOpen}
        onClose={closeGallery}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        containerClassName={classNames(styles.wrapper, {
          [styles.wrapperWithAnim]: imgLoaded,
        })}
      >
        <div className={styles.btnsContainer}>
          <SlFrame
            style={{ display: zoom > 1 && zoom <= 2 ? "block" : "none" }}
            className={styles.alignToFrameBtn}
            onClick={handleResetZoom}
          />
          <SlMagnifierAdd
            style={{ color: zoom >= 1 && zoom < 2 ? "black" : "lightGray" }}
            onClick={handleIncreaseZoom}
            className={styles.increaseBtn}
          />
          <SlMagnifierRemove
            style={{ color: zoom > 1 && zoom <= 2 ? "black" : "lightGray" }}
            onClick={handleDecreaseZoom}
            className={styles.decreaseBtn}
          />
        </div>
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
                      modalElemRef={modalElemRef}
                      key={index}
                      index={index}
                      item={item}
                      activeIndex={activeIndex}
                      setImgLoaded={setImgLoaded}
                      zoomedImgSizes={zoomedImgSizes}
                      imgLoaded={imgLoaded}
                      dragTransitionX={dragTransitionX}
                      dragTransitionY={dragTransitionY}
                      zoom={zoom}
                      onMouseDown={onMouseDown}
                      isDragging={isDragging}
                      onDragStart={onDragStart}
                    />
                  ))
                : virtualizedData?.map((item) => (
                    <ZoomedLightboxImage
                      modalElemRef={modalElemRef}
                      key={item.index}
                      index={item.index}
                      item={item}
                      activeIndex={activeIndex}
                      setImgLoaded={setImgLoaded}
                      zoomedImgSizes={zoomedImgSizes}
                      imgLoaded={imgLoaded}
                      dragTransitionX={dragTransitionX}
                      dragTransitionY={dragTransitionY}
                      zoom={zoom}
                      onMouseDown={onMouseDown}
                      isDragging={isDragging}
                      onDragStart={onDragStart}
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
