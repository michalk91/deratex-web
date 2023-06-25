import styles from "./cooperation.module.css";
import React from "react";
import Image from "next/image";
import { CarouselItem } from "../carouselSlider/Carousel";
import RichCarousel from "../carouselSlider/RichCarousel";
import { memo } from "react";
import classNames from "classnames";

function Cooperation() {
  const images = [
    [
      {
        src: "/images/index/Cooperation/hospital.jpg",
        alt: "hospital",
        text: "służby zdrowia",
      },
      {
        src: "/images/index/Cooperation/farmacja.jpg",
        alt: "farmacia",
        text: "firm farmaceutycznych",
      },
      {
        src: "/images/index/Cooperation/gastronomia.jpg",
        alt: "gastronomy",
        text: "gastronomii",
      },
      {
        src: "/images/index/Cooperation/handel.jpg",
        alt: "trade",
        text: "placówek handlu hurtowego i detalicznego",
      },
    ],
    [
      {
        src: "/images/index/Cooperation/bloki.jpg",
        alt: "blocks of flats",
        text: "spółdzielni mieszkaniowej",
      },
      {
        src: "/images/index/Cooperation/zasoby.jpg",
        alt: "housing stock",
        text: "gospodarki zasobami mieszkaniowymi",
      },
      {
        src: "/images/index/Cooperation/wspolnota.jpg",
        alt: "housing Association",
        text: "wspólnot mieszkaniowych",
      },
      {
        src: "/images/index/Cooperation/rolne.jpg",
        alt: "agri-food processing",
        text: "przetwórstwa rolno-spożywczego",
      },
    ],

    [
      {
        src: "/images/index/Cooperation/szkola.jpg",
        alt: "school",
        text: "obiektów szkolnych oraz internatów",
      },
      {
        src: "/images/index/Cooperation/osrodek.jpg",
        alt: "holiday resorts",
        text: "ośrodków wypoczynkowych",
      },
      {
        src: "/images/index/Cooperation/hotel.jpg",
        alt: "hotels",
        text: "hoteli",
      },
      {
        src: "/images/index/Cooperation/zaklad.jpg",
        alt: "food production plants",
        text: "zakładów produkujących żywność",
      },
    ],
  ];

  return (
    <>
      {/* ------------------------------------------version for mobile------------------------------------------------ */}
      <div className={styles.cooperationSectionMobile}>
        <div className={styles.cooperationTitleContainer}>
          <span className={classNames(styles.underline)}>
            <b>Szczególnie Naszą współpracę kierujemy do:</b>
          </span>
        </div>
        <div className={styles.mobileText}>
          {images.map((item) =>
            item.map((item, index) => <p key={index}>{item.text}</p>)
          )}
        </div>
      </div>

      {/* -------------------------------------------version for desktop----------------------------------------------- */}

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
                    <div className={styles.imgContainer}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        height={199}
                        width={300}
                        sizes="100vw"
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
    </>
  );
}

export default memo(Cooperation);
