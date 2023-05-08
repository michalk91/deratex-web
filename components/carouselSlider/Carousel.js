import React, {
  memo,
  useContext,
  useMemo,
  createContext,
  useEffect,
  useRef,
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
    openGallery,
    lightboxFor,
    virtualizedIndex,
    virtualized,

    ...rest
  }) => {
    const { style, ...realRest } = rest;

    return (
      <div
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
        <CarouselContext.Provider value={{ openGallery, lightboxFor, index }}>
          {children}
        </CarouselContext.Provider>

        {/* {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            index: virtualized ? virtualizedIndex : index,
            openGallery,

            // openGallery,
            // lightboxFor,
          });
        })} */}
      </div>
    );
  }
);

const ImageForLightbox = memo(
  ({ src, alt, objectFit, imgClassName, width, height }) => {
    const { openGallery, lightboxFor, index } = useContext(CarouselContext);

    console.log("haha", index);
    return (
      <>
        <Flipped
          onStart={(e) => (
            (e.style.zIndex = "10"), (e.style.position = "relative")
          )}
          onComplete={(e) => ((e.style.zIndex = "10"), (e.style.position = ""))}
          flipId={`${lightboxFor}${index}`}
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
      openGallery,
      lightboxFor,
      virtualized,
      transitionEnded,
    },
    ref
  ) => {
    const { onTouchEnd, onTouchStart, onTouchMove } = touchEvents;
    const { prevSlide, nextSlide, handleMouseLeave, handleMouseOver } =
      navCallbacks;
    const { activeIndex, setNavigate } = handleIndex;
    const { isSwiping, transitionX } = handleSwipe;
    const { galleryOpen, flipAnimating } = carouselInfo;

    const virtualizedChildren = useMemo(() => {
      const start = activeIndex > 0 ? activeIndex - 1 : activeIndex;
      const end = activeIndex + 2;

      return children.slice(start, end).map((child, index) =>
        React.cloneElement(child, {
          width,
          height,
          style: {
            opacity: flipAnimating && index + start !== activeIndex ? 0 : 1,
          },
          index: index + start,
          activeIndex,
          openGallery,
          lightboxFor,
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
                  pointerEvents: galleryOpen ? "none" : "auto",
                  willChange: "transform",

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
                          opacity:
                            flipAnimating && index !== activeIndex ? 0 : 1,
                        },
                        width,
                        height,
                        index,
                        activeIndex,
                        openGallery,
                        lightboxFor,
                      });
                    })
                  : virtualizedChildren}
              </div>
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
                style={{ color: arrowColor }}
                className={classNames(styles.buttonRight, {
                  [styles.buttonRightStatic]: staticArrows,
                })}
                onClick={nextSlide}
              />
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
