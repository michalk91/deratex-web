import React, { memo, useContext, useMemo, useEffect, useRef } from "react";
import styles from "../../styles/carouselSlider.module.css";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Flipped } from "react-flip-toolkit";
import Image from "next/image";

const CarouselItem = memo(function CarouselItem({
  children,
  backgroundImage,
  backgroundColor,
  width,
  height,
  itemClassName,
  openGallery,
  lightboxImgID,
  ...rest
}) {
  const { style, ...realRest } = rest;
  const carouselChild = React.Children.map(children, (child) => {
    if (child.type === ImageForLightbox) {
      return React.cloneElement(child, {
        openGallery,
        lightboxImgID,
      });
    } else return React.cloneElement(child);
  });

  return (
    <div
      className={classNames(styles.carouselItem, itemClassName)}
      {...realRest}
      style={{
        width,
        height,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundColor: backgroundColor ? backgroundColor : "none",
        ...(style || {}),
      }}
    >
      {carouselChild}
    </div>
  );
});

const ImageForLightbox = memo(function ImageForLightbox({
  src,
  alt,
  objectFit,
  imgClassName,
  width,
  height,
  lightboxImgID,
  openGallery,
  fillContainer
}) {
  return (
    <Flipped
      onStart={(e) => (
        (e.style.zIndex = "10"), (e.style.position = "relative")
      )}
      onComplete={(e) => ((e.style.zIndex = ""), (e.style.position = ""))}
      flipId={lightboxImgID}
    >
      <div onClick={openGallery} className={classNames(imgClassName)}>
        <Image
          src={src}
          alt={alt}
          height={height ? height : undefined}
          width={width ? width : undefined}
          sizes="100vw"
          fill={fillContainer ? true : false}
          style={{ objectFit: objectFit ? objectFit : "contain" }}
        />
      </div>
    </Flipped>
  );
});

const Carousel = React.forwardRef(function Carousel(
  {
    children,
    sliderRectanglesVisible,
    width,
    height,
    transitionX,
    isSwiping,
    activeIndex,
    setNavigate,
    prevSlide,
    nextSlide,
    handleMouseLeave,
    handleMouseOver,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    navigationOutside,
    lightboxOpen,
    flipAnimating,
    openGallery,
    lightboxImgID,
    virtualized,
    withGallery,
  },
  ref
) {
  const defaultChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        if (virtualized) return;

        return React.cloneElement(child, {
          style: {
            opacity: flipAnimating && index !== activeIndex ? 0 : 1,
          },
          width,
          height,
          openGallery,
          lightboxImgID: `${lightboxImgID}${index}`,
        });
      }),
    [flipAnimating, lightboxImgID]
  );

  console.log("activeindexx w carousel", activeIndex);
  const virtualizedChildren = useMemo(() => {
    if (!withGallery ?? !virtualized) return;

    const start = activeIndex > 0 ? activeIndex - 1 : 0;
    const end = activeIndex + 2;

    return children.slice(start, end).map((child, index) =>
      React.cloneElement(child, {
        width,
        height,
        style: {
          opacity: flipAnimating && index + start !== activeIndex ? 0 : 1,
        },
        index: index + start,
        lightboxImgID: `${lightboxImgID}${index + start}`,
        openGallery,
      })
    );
  }, [activeIndex, flipAnimating, lightboxImgID, height, width]);

  return (
    <>
      <div
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          width: navigationOutside ? width : "",
          height: navigationOutside ? height : "",
        }}
      >
        {navigationOutside && (
          <FiChevronLeft
            className={styles.buttonLeftOutside}
            onClick={prevSlide}
          />
        )}
        <div
          ref={ref}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          className={classNames(styles.carousel)}
          style={{
            overflow: flipAnimating ? "visible" : "hidden",
            width: navigationOutside ? "calc(100% - 5rem)" : width,
          }}
        >
          <div
            className={styles.container}
            style={{
              transform:
                virtualized &&
                activeIndex > 1 &&
                `translateX(${activeIndex - 1}00%`,
            }}
          >
            <div
              className={classNames(styles.inner, {
                ["without-transition"]: isSwiping,
              })}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                pointerEvents: lightboxOpen ? "none" : "auto",

                transform:
                  lightboxOpen && isSwiping
                    ? `translateX(
                  -${activeIndex}00)%`
                    : `translateX(calc(${transitionX}px - ${activeIndex}00%)`,
              }}
            >
              {!virtualized ? defaultChildren : virtualizedChildren}
            </div>
          </div>

          {!navigationOutside && (
            <FiChevronLeft
              className={classNames(styles.buttonLeft)}
              onClick={prevSlide}
            />
          )}
          {sliderRectanglesVisible && !navigationOutside && (
            <div className={classNames(styles.rectangleContainer)}>
              {React.Children.map(children, (_, index) => {
                return (
                  <div
                    data-id={index}
                    className={classNames(styles.rectangle, {
                      [styles.active]: index === activeIndex,
                    })}
                    onClick={setNavigate}
                  ></div>
                );
              })}
            </div>
          )}
          {!navigationOutside && (
            <FiChevronRight
              className={classNames(styles.buttonRight)}
              onClick={nextSlide}
            />
          )}
        </div>
        {navigationOutside && (
          <FiChevronRight
            className={styles.buttonRightOutside}
            onClick={nextSlide}
          />
        )}
      </div>
      {sliderRectanglesVisible && navigationOutside && (
        <div className={classNames(styles.rectangleContainerOutside)}>
          {React.Children.map(children, (_, index) => {
            return (
              <div
                data-id={index}
                className={classNames(styles.rectangle, {
                  [styles.active]: index === activeIndex,
                })}
                onClick={setNavigate}
              ></div>
            );
          })}
        </div>
      )}
    </>
  );
});
export default memo(Carousel);
export { CarouselItem, ImageForLightbox };
