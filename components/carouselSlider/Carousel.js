import React, { memo, useContext, useMemo, useEffect, useRef } from "react";
import styles from "../../styles/carouselSlider.module.css";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Flipper, Flipped } from "react-flip-toolkit";
import Image from "next/image";

const CarouselItem = memo(
  ({
    children,
    backgroundImage,
    backgroundColor,
    width,
    height,
    itemClassName,
    openGallery,
    lightboxForID,
    ...rest
  }) => {
    const { style, ...realRest } = rest;

    const carouselChild = useMemo(()=> React.Children.map(children, (child) => {
      if (child.type === ImageForLightbox) {
        return React.cloneElement(child, {
          openGallery,
          lightboxForID,
        });
      } else return React.cloneElement(child);
    }));

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
  }
);

const ImageForLightbox = memo(
  ({
    src,
    alt,
    objectFit,
    imgClassName,
    width,
    height,
    lightboxForID,
    openGallery,
  }) => {
    return (
      <Flipped
        onStart={(e) => (
          (e.style.zIndex = "10"), (e.style.position = "relative")
        )}
        onComplete={(e) => ((e.style.zIndex = "10"), (e.style.position = ""))}
        flipId={lightboxForID}
      >
        <div onClick={openGallery} className={imgClassName}>
          <Image
            src={src}
            alt={alt}
            height={height ? height : undefined}
            width={width ? width : undefined}
            layout={width && height ? "responsive" : "fill"}
            priority={true}
            objectFit={objectFit ? objectFit : "cover"}
            quality={30}
          />
        </div>
      </Flipped>
    );
  }
);

const Carousel = React.forwardRef(
  (
    {
      children,
      sliderRectanglesVisible = true,
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
      lightboxFor,
      virtualized,
      withGallery,
    },
    ref
  ) => {


    const defaultChildren = useMemo(() =>
      React.Children.map(children,(child, index) => {
        if (virtualized) return;

        return React.cloneElement(child, {
          style: {
            opacity: flipAnimating && index !== activeIndex ? 0 : 1,
          },
          width,
          height,
          openGallery,
          lightboxForID: `${lightboxFor}${index}`,
        });
      })
    );

    const virtualizedChildren = useMemo(() => {
      if (!withGallery ?? !virtualized) return;

      const start = activeIndex > 0 ? activeIndex - 1 : activeIndex;
      const end = activeIndex + 2;

      return children.slice(start, end).map((child, index) =>
        React.cloneElement(child, {
          width,
          height,
          style: {
            opacity: flipAnimating && index + start !== activeIndex ? 0 : 1,
          },
          lightboxForID: `${lightboxFor}${index + start}`,
          openGallery,
        })
      );
    }, [activeIndex, flipAnimating]);

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

            // touchAction:  "pan-y",
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
                // height: "100%",
                willChange: "transform",
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
                  willChange: "transform",

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
  }
);
export default memo(Carousel);
export { CarouselItem, ImageForLightbox };
