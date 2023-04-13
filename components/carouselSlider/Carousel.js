import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useContext,
  useMemo,
  createContext
} from "react";
import styles from "../../styles/carouselSlider.module.css";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Flipper, Flipped } from "react-flip-toolkit";
import Image from "next/image";

const CarouselContext = createContext();

const CarouselItem = memo(
  ({
    children,
    backgroundImage,
    backgroundColor,
    width,
    height,
    itemClassName,
    index,
    activeIndex,
    carouselItemRef,
    pullData,
    openGallery,
    lightboxFor,

    ...rest
  }) => {
    const { style, ...realRest } = rest;

    return (
      <div
        ref={carouselItemRef}
        className={classNames(styles.carouselItem, itemClassName)}
        {...realRest}
        style={{
          // opacity: flipAnimating && index !== activeIndex ? 0 : 1,
          width,
          height,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundColor: backgroundColor ? backgroundColor : "none",
          ...(style || {}),
        }}
      >
          <CarouselContext.Provider value={{ pullData, openGallery, lightboxFor }}>
        {children}
        </CarouselContext.Provider>
      </div>
    );
  }
);

const ImageForLightbox = memo(
  ({ src, alt, objectFit, imgClassName, width, height }) => {
    const { pullData, openGallery, lightboxFor } = useContext(CarouselContext);
    const indexRef = useRef();

    useEffect(() => {
      const dataLength = pullData({ src, alt, width, height });
      indexRef.current = dataLength - 1;
    }, []);

    return (
      <>
        <Flipped
          onStart={(e) => (
            (e.style.zIndex = "10"), (e.style.position = "relative")
          )}
          onComplete={(e) => ((e.style.zIndex = "10"), (e.style.position = ""))}
          flipId={`${lightboxFor}${indexRef.current}`}
        >
          <div onClick={openGallery} className={imgClassName}>
            <Image
              src={src}
              alt={alt}
              // height={1267}
              // width={1920}
              height={height ? height : undefined}
              width={width ? width : undefined}
              layout={width && height ? "responsive" : "fill"}
              // priority={true}
              objectFit={objectFit ? objectFit : "cover"}
              quality={50}
            />
          </div>
        </Flipped>
      </>
    );
  }
);

const Carousel = React.forwardRef(
  (
    {
      children,
      sliderRectanglesVisible = true,
      arrowColor = "black",
      width,
      height,
      handleSwipe,
      staticArrows = true,
      handleIndex,
      navCallbacks,
      touchEvents,
      navigationOutside,
      carouselInfo,
      virtualizedItems,
      transitionEnded,
      virtualized = false,
      pullData,
      openGallery,
      lightboxFor,
    },
    ref
  ) => {
    const { containerRef } = ref.current;
    console.log("fook uj", virtualizedItems);

    const { onTouchEnd, onTouchStart, onTouchMove } = touchEvents;
    const { prevSlide, nextSlide, handleMouseLeave, handleMouseOver } =
      navCallbacks;
    const { activeIndex, setNavigate } = handleIndex;
    const { isSwiping, transitionX } = handleSwipe;
    const { galleryOpen, flipAnimating} = carouselInfo;



    const virtualizedChildren = useMemo(() => {
      const start = activeIndex > 0 ? activeIndex - 1 : activeIndex;
      const end = activeIndex + 2;

      return children.slice(start, end).map((child, index) =>
        React.cloneElement(child, {
          width,
          height,
          style: { opacity: flipAnimating && index !== activeIndex ? 0 : 1 },
          index: index + start,
          activeIndex,
          pullData,
          openGallery,
          lightboxFor
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
              style={{ color: arrowColor }}
              onClick={prevSlide}
            />
          )}
          <div
            ref={containerRef}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={classNames(styles.carousel)}
            style={{
              overflow: flipAnimating ? "visible" : "hidden",
              width: navigationOutside ? "calc(100% - 5rem)" : width,
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
                pointerEvents: galleryOpen ? "none" : "auto",
                marginLeft:
                  virtualized && activeIndex > 1
                    ? `${
                        (activeIndex - 1) * containerRef?.current?.clientWidth
                      }px`
                    : `0px`,
                transform:
                  galleryOpen && isSwiping
                    ? `translateX(
                  -${activeIndex}00)%`
                    : `translateX(calc(${transitionX}px - ${activeIndex}00%)`,
              }}
            >
              {!virtualized
                ? React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {
                      style: {
                        opacity: flipAnimating && index !== activeIndex ? 0 : 1,
                      },
                      width,
                      height,
                      index,
                      activeIndex,
                      pullData,
                      openGallery,
                      lightboxFor
                    });
                  })
                : virtualizedChildren}
            </div>

            {!navigationOutside && (
              <FiChevronLeft
                style={{ color: arrowColor }}
                className={classNames(styles.buttonLeft, {
                  [styles.buttonLeftStatic]: staticArrows,
                })}
                onClick={prevSlide}
              />
            )}

            {!navigationOutside && (
              <FiChevronRight
                style={{ color: arrowColor }}
                className={classNames(styles.buttonRight, {
                  [styles.buttonRightStatic]: staticArrows,
                })}
                onClick={nextSlide}
              />
            )}
            {sliderRectanglesVisible && (
              <div
                className={classNames({
                  [styles.rectangleContainer]: !navigationOutside,
                  [styles.rectangleContainerOutside]: navigationOutside,
                })}
              >
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
          </div>
          {navigationOutside && (
            <FiChevronRight
              className={styles.buttonRightOutside}
              style={{ color: arrowColor }}
              onClick={nextSlide}
            />
          )}
        </div>
      </>
    );
  }
);
export default memo(Carousel);
export { CarouselItem, ImageForLightbox };

// export function CarouselImage({ children, idx }) {
//   const arrayChildren = Children.toArray(children);
//   console.log("gowno", arrayChildren);
//   return React.Children.map(arrayChildren, (child, index) => (
//     <Flipped flipId={`carousel${idx}`}>
//       {React.cloneElement(child, {
//         "data-id": index,
//       })}
//     </Flipped>
//   ));
// }
