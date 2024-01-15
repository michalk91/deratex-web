import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./lightboxGallery.module.css";
import classNames from "classnames";
import Modal from "../modal/Modal";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import useIsScrollableX from "../../hooks/useIsScrollableX";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import useVirtualized from "../../hooks/useVirtualized";
import { roboto } from "../../fonts/fonts";
import useZoomAndDrag from "../../hooks/useZoomAndDrag";
import useFuncDelay from "../../hooks/useFuncDelay";
import { SlMagnifierAdd, SlFrame, SlMagnifierRemove } from "react-icons/sl";

const LightboxText = memo(function ZoomedLightboxImage({
  index,
  textClassName,
  openGallery,
  item,
}) {
  return (
    <p className={textClassName} onClick={openGallery} data-id={index}>
      {item}
    </p>
  );
});

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
      className={classNames(imgContainerClassName, styles.smallImage)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        height={item.height ? item.height : undefined}
        width={item.width ? item.width : undefined}
        style={{
          objectFit: objectFit ? objectFit : "cover",
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
  setParentInfo,
  zoomedImgSizes,
  imgLoaded,
  pinchZoomTransitionX,
  pinchZoomTransitionY,
  zoom,
  isDragging,
  onMouseDown,
  onDragStart,
  onDraging,
  onMouseUp,
  isZooming,
  zoomMouseWheel,
  wasDoubleTapped,
  clickTextToOpenLightbox,
  beforeDelay,
}) {
  const [imgWidth, setImgWidth] = useState(0);

  return (
    <div className={styles.slideWrapper}>
      <div
        data-id={index}
        className={classNames(styles.imageWrapper, {
          [styles.transparent]: clickTextToOpenLightbox,
          [styles.withTransition]: clickTextToOpenLightbox,
          [styles.openingAnim]:
            clickTextToOpenLightbox && imgLoaded && !beforeDelay,
          [styles.closingAnim]: clickTextToOpenLightbox && beforeDelay,
        })}
        style={{
          aspectRatio: `${[item.width]}/${[item.height]}`,
          maxWidth: imgWidth !== 0 ? imgWidth : "100%", //HACK for Safari, When we use "aspect-ratio" in flex row container Safari stretch width to parent size
        }}
      >
        <Image
          className={classNames({
            [styles.grab]: zoom > 1 && !isDragging,
            [styles.grabbing]: zoom > 1 && isDragging,
            [styles.addTransition]:
              !isDragging || !isZooming || wasDoubleTapped,
            [styles.resetTransitionTime]: isDragging || isZooming,
          })}
          onMouseDown={onMouseDown}
          onTouchMove={onDraging}
          onTouchEnd={onMouseUp}
          onTouchStart={onDragStart}
          onWheel={zoomMouseWheel}
          style={{
            transform:
              index === activeIndex &&
              `scale(${zoom}) translate3d(${pinchZoomTransitionX}px, ${pinchZoomTransitionY}px, 0)`,
          }}
          ref={
            !clickTextToOpenLightbox && index === activeIndex
              ? modalElemRef
              : null
          }
          src={item.src}
          alt={item.alt}
          fill
          sizes={zoomedImgSizes ? zoomedImgSizes : "100vw"}
          priority={index === activeIndex ? true : false}
          onLoadingComplete={(e) => {
            if (index !== activeIndex) return;

            setImgWidth(e.clientWidth);
            setParentInfo((state) => ({ ...state, imgLoaded: true }));
          }}
        />

        {!isDragging &&
          !isZooming &&
          zoom === 1 &&
          item.caption &&
          imgLoaded &&
          index === activeIndex && (
            <div className={styles.captionContainer}>
              <p className={roboto.className}> {item.caption} </p>
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
  setParentInfo,
  zoomedImgSizes,
  imgLoaded,
  enableSwiping,
  disableSwiping,
  clickTextToOpenLightbox,
  modalRef,
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

  const closingModalDelay = 400;

  const { beforeDelay, delayedFunc } = useFuncDelay({
    delay: closingModalDelay,
    functionToDelay: closeGallery,
  });

  const maxZoom = 4;

  const {
    handleDecreaseZoom,
    handleIncreaseZoom,
    handleResetZoom,
    pinchZoomTransitionX,
    pinchZoomTransitionY,
    onMouseDown,
    onDragStart,
    isDragging,
    zoom,
    onDraging,
    onMouseUp,
    isZooming,
    zoomMouseWheel,
    enableDragAndZoom,
    disableDragAndZoom,
    wasDoubleTapped,
  } = useZoomAndDrag({
    maxZoom,
    bottomCompensation:
      lightboxOpen && thumbsContainerRef?.current?.clientHeight,
  });

  useEffect(() => {
    if (zoom > 1 || isZooming) {
      disableSwiping();
    } else if (!isZooming && zoom === 1) {
      enableSwiping();
    }
  }, [isZooming, disableSwiping, enableSwiping, zoom]);

  useEffect(() => {
    if (transitionX !== 0) {
      disableDragAndZoom();
    } else if (transitionX === 0) {
      enableDragAndZoom();
    }
  }, [transitionX, disableDragAndZoom, enableDragAndZoom]);

  useEffect(() => {
    handleResetZoom();
  }, [lightboxOpen, handleResetZoom, activeIndex]);

  const closeLightbox = clickTextToOpenLightbox ? delayedFunc : closeGallery;

  const keys = [
    {
      key: "Escape",
      action: zoom > 1 ? handleResetZoom : closeLightbox,
    },
    { key: "ArrowRight", action: zoom === 1 ? nextSlide : handleResetZoom },
    { key: "ArrowLeft", action: zoom === 1 ? prevSlide : handleResetZoom },
    { key: "+", action: handleIncreaseZoom },
    { key: "-", action: handleDecreaseZoom },
  ];

  return (
    <>
      {!lightboxForSlider && (
        <div className={lightboxContainerClassName}>
          {!clickTextToOpenLightbox
            ? items.map((item, index) => (
                <LightboxImage
                  firstElemRef={firstElemRef}
                  activeIndex={activeIndex}
                  openGallery={openGallery}
                  key={index}
                  index={index}
                  item={item}
                  imgContainerClassName={imgContainerClassName}
                />
              ))
            : items.map((item, index) => (
                <LightboxText
                  key={index}
                  item={item.text}
                  index={index}
                  textClassName={item.textClassName}
                  openGallery={openGallery}
                />
              ))}
        </div>
      )}

      <Modal
        modalRef={modalRef}
        isOpen={lightboxOpen}
        onClose={clickTextToOpenLightbox ? delayedFunc : closeGallery}
        keys={keys}
        containerClassName={classNames(styles.wrapper, {
          [styles.wrapperWithAnim]: !clickTextToOpenLightbox && imgLoaded,
          [styles.backgroundColorGray]: clickTextToOpenLightbox,
          [styles.backgroundClosingAnim]:
            clickTextToOpenLightbox && beforeDelay,
          [styles.backgroundOpeningAnim]:
            clickTextToOpenLightbox && !beforeDelay,
        })}
      >
        <div className={styles.btnsContainer}>
          <SlFrame
            style={{ display: zoom > 1 && zoom <= maxZoom ? "block" : "none" }}
            className={styles.alignToFrameBtn}
            onClick={handleResetZoom}
          />
          <SlMagnifierAdd
            style={{
              color: zoom >= 1 && zoom < maxZoom ? "black" : "lightGray",
            }}
            onClick={handleIncreaseZoom}
            className={styles.increaseBtn}
          />
          <SlMagnifierRemove
            style={{
              color: zoom > 1 && zoom <= maxZoom ? "black" : "lightGray",
            }}
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
            className={classNames(styles.virtualizedContainer)}
            style={{
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
                [styles.resetTransitionTime]: isSwiping && !transitionEnded,
                [styles.addTransition]: !isSwiping && !transitionEnded,
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
                      setParentInfo={setParentInfo}
                      zoomedImgSizes={zoomedImgSizes}
                      imgLoaded={imgLoaded}
                      pinchZoomTransitionX={pinchZoomTransitionX}
                      pinchZoomTransitionY={pinchZoomTransitionY}
                      zoom={zoom}
                      onMouseDown={onMouseDown}
                      isDragging={isDragging}
                      onDragStart={onDragStart}
                      onDraging={onDraging}
                      onMouseUp={onMouseUp}
                      isZooming={isZooming}
                      zoomMouseWheel={zoomMouseWheel}
                      wasDoubleTapped={wasDoubleTapped}
                      clickTextToOpenLightbox={clickTextToOpenLightbox}
                      beforeDelay={beforeDelay}
                    />
                  ))
                : virtualizedData?.map((item) => (
                    <ZoomedLightboxImage
                      modalElemRef={modalElemRef}
                      key={item.index}
                      index={item.index}
                      item={item}
                      activeIndex={activeIndex}
                      setParentInfo={setParentInfo}
                      zoomedImgSizes={zoomedImgSizes}
                      imgLoaded={imgLoaded}
                      pinchZoomTransitionX={pinchZoomTransitionX}
                      pinchZoomTransitionY={pinchZoomTransitionY}
                      zoom={zoom}
                      onMouseDown={onMouseDown}
                      isDragging={isDragging}
                      onDragStart={onDragStart}
                      onDraging={onDraging}
                      onMouseUp={onMouseUp}
                      isZooming={isZooming}
                      zoomMouseWheel={zoomMouseWheel}
                      wasDoubleTapped={wasDoubleTapped}
                      clickTextToOpenLightbox={clickTextToOpenLightbox}
                      beforeDelay={beforeDelay}
                    />
                  ))}
            </div>
          </div>
          <IoCaretForward
            className={classNames(styles.nextSlide, {
              [styles.hiddenNextSlide]: isZooming || zoom > 1,
            })}
            onClick={nextSlide}
          />
          <IoCaretBack
            className={classNames(styles.prevSlide, {
              [styles.hiddenPrevSlide]: isZooming || zoom > 1,
            })}
            onClick={prevSlide}
          />
        </div>
        <div
          className={classNames(styles.containerThumbs, {
            [styles.hideThumbsContainer]: pinchZoomTransitionY !== 0,
            [styles.flexStart]: isScrollableX,
            [styles.flexCenter]: !isScrollableX,
            [styles.scrollPadding]:
              thumbnailsOptions?.thumbnailWithBorderRadius,
            [styles.withoutScrollPadding]:
              !thumbnailsOptions?.thumbnailWithBorderRadius,
          })}
          ref={thumbsContainerRef}
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
