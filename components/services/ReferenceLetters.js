import React from "react";
import { memo } from "react";
import styles from "./referenceLetters.module.css";
import classNames from "classnames";
import RichCarousel from "../carouselSlider/RichCarousel";
import { CarouselItem } from "../carouselSlider/Carousel";
import { ImageForLightbox } from "../carouselSlider/Carousel";

function ReferenceLetters() {
  const images = [
    { src: "/images/reference.jpg", alt: "reference letter" },
    { src: "/images/reference.jpg", alt: "reference letter" },
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
              lightboxZoomedImgSizes="(max-width: 680px) 100vw, (max-width: 900px) 80vw,(max-width: 1200px) 50vw, (max-width: 1600px) 40vw, 33vw"
            >
              {images.map((item, index) => (
                <CarouselItem itemClassName={styles.slideContainer} key={index}>
                  <ImageForLightbox
                    imgClassName={styles.imgContainer}
                    src={item.src}
                    alt={item.alt}
                    width={464}
                    height={621}
                    sizes="20vw"
                  />
                  <div className={styles.textContainer}>
                    <p>Spółdzielnia Mieszkaniowa Lokatorsko-własnościowa</p>
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
