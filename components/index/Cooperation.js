import styles from "../../styles/indexStyles/cooperation.module.css";
import React from "react";
import Image from "next/image";
import { CarouselItem } from "../carouselSlider/Carousel";
import RichCarousel from "../carouselSlider/RichCarousel";
import { memo, useMemo } from "react";
import classNames from "classnames";
import { useMediaPredicate } from "react-media-hook";

function Cooperation() {
  const images = [
    [
      {
        src: "/images/hospital.jpg",
        alt: "hospital",
        text: "służby zdrowia",
      },
      {
        src: "/images/farmacja.jpg",
        alt: "farmacia",
        text: "firm farmaceutycznych",
      },
      {
        src: "/images/gastronomia.jpg",
        alt: "gastronomy",
        text: "gastronomii",
      },
      {
        src: "/images/handel.jpg",
        alt: "trade",
        text: "placówek handlu hurtowego i detalicznego",
      },
    ],
    [
      {
        src: "/images/bloki.jpg",
        alt: "blocks of flats",
        text: "spółdzielni mieszkaniowej",
      },
      {
        src: "/images/zasoby.jpg",
        alt: "housing stock",
        text: "gospodarki zasobami mieszkaniowymi",
      },
      {
        src: "/images/wspolnota.jpg",
        alt: "housing Association",
        text: "wspólnot mieszkaniowych",
      },
      {
        src: "/images/rolne.jpg",
        alt: "agri-food processing",
        text: "przetwórstwa rolno-spożywczego",
      },
    ],

    [
      {
        src: "/images/szkola.jpg",
        alt: "school",
        text: "obiektów szkolnych oraz internatów",
      },
      {
        src: "/images/osrodek.jpg",
        alt: "holiday resorts",
        text: "ośrodków wypoczynkowych",
      },
      {
        src: "/images/hotel.jpg",
        alt: "hotels",
        text: "hoteli",
      },
      {
        src: "/images/zaklad.jpg",
        alt: "food production plants",
        text: "zakładów produkujących żywność",
      },
    ],
  ];
  const smallerThan630px = useMediaPredicate("(max-width: 630px)");
  return (
    <section className={styles.cooperationSection}>
      <div className={styles.cooperationTitleContainer}>
        <span>
          <b className={classNames("short-underline")}>
            Szczególnie Naszą współpracę kierujemy do:
          </b>
        </span>
      </div>

      <RichCarousel sliderRectanglesVisible={false} navigationOutside>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <div className={styles.cooperationArticleSliderContainer}>
              {item.map((item, index) => (
                <article key={index}>
                  <div className={styles.cooperationArticleSliderImage}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      height={1}
                      width={1.4}
                      layout="responsive"
                      priority={true}
                      objectFit="cover"
                    />
                    <h3>{item.text}</h3>
                  </div>
                </article>
              ))}
            </div>
          </CarouselItem>
        ))}
      </RichCarousel>
    </section>
  );
}

export default memo(Cooperation);
