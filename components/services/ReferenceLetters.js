import React from "react";
import { memo } from "react";
import styles from "./referenceLetters.module.css";
import classNames from "classnames";
import RichCarousel from "../carouselSlider/RichCarousel";
import { CarouselItem } from "../carouselSlider/Carousel";
import { ImageForLightbox } from "../carouselSlider/Carousel";

function ReferenceLetters() {
  const images = [
    {
      src: "/images/services/ReferenceLetters/reference.jpg",
      alt: "reference letter",
      height: 621,
      width: 464,
      text: "Spółdzielnia Mieszkaniowa",
    },
    {
      src: "/images/services/ReferenceLetters/reference_second.jpg",
      alt: "reference letter 2",
      height: 2000,
      width: 1414,
      text: "Burmistrz Świecia",
    },
  ];

  return (
    <>
      <section>
        <span className={classNames("title")}>Listy Referencyjne</span>
        <div className={classNames("graySection")}>
          <div className={classNames(styles.container, "innerContentWidth")}>
            <RichCarousel
              navigationOutside
              withGallery
              lightboxThumbsOptions={{
                keepRatio: true,
                thumbnailWithBorderRadius: false,
                thumbnailHeight: 80,
              }}
              lightboxZoomedImgSizes="(max-width: 680px) 100vw, (max-width: 900px) 80vw,(max-width: 1200px) 50vw"
            >
              {images.map((item, index) => (
                <CarouselItem itemClassName={styles.slideContainer} key={index}>
                  <ImageForLightbox
                    imgClassName={styles.imgContainer}
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="20vw"
                  />
                  <div className={styles.textContainer}>
                    <p>{item.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </RichCarousel>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ReferenceLetters);
