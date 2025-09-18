import { memo } from "react";
import styles from "./referenceLetters.module.css";
import classNames from "classnames";
import RichCarousel from "../carouselSlider/RichCarousel";
import { CarouselItem } from "../carouselSlider/Carousel";
import { ImageForLightbox } from "../carouselSlider/Carousel";
import reference1 from "/public/images/services/ReferenceLetters/reference.jpg";
import reference2 from "/public/images/services/ReferenceLetters/reference_second.jpg";

function ReferenceLetters() {
  const images = [
    {
      src: reference1,
      alt: "reference letter",
      height: 621,
      width: 464,
      text: "Spółdzielnia Mieszkaniowa",
    },
    {
      src: reference2,
      alt: "reference letter 2",
      height: 2000,
      width: 1414,
      text: "Burmistrz Świecia",
    },
  ];

  return (
    <>
      <section>
        <h2 className={classNames("title")}>Listy Referencyjne</h2>
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
                    placeholder="blur"
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
