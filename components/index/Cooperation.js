import styles from "./cooperation.module.css";
import Image from "next/image";
import { CarouselItem } from "../carouselSlider/Carousel";
import RichCarousel from "../carouselSlider/RichCarousel";
import { memo } from "react";
import classNames from "classnames";
import hospital from "/public/images/index/Cooperation/hospital.jpg";
import farmacja from "/public/images/index/Cooperation/farmacja.jpg";
import gastronomia from "/public/images/index/Cooperation/gastronomia.jpg";
import handel from "/public/images/index/Cooperation/handel.jpg";
import bloki from "/public/images/index/Cooperation/bloki.jpg";
import zasoby from "/public/images/index/Cooperation/zasoby.jpg";
import wspolnota from "/public/images/index/Cooperation/wspolnota.jpg";
import rolne from "/public/images/index/Cooperation/rolne.jpg";
import szkola from "/public/images/index/Cooperation/szkola.jpg";
import osrodek from "/public/images/index/Cooperation/osrodek.jpg";
import hotel from "/public/images/index/Cooperation/hotel.jpg";
import zaklad from "/public/images/index/Cooperation/zaklad.jpg";

function Cooperation() {
   const images = [
    [
      { src: hospital, alt: "hospital", text: "służby zdrowia" },
      { src: farmacja, alt: "farmacia", text: "firm farmaceutycznych" },
      { src: gastronomia, alt: "gastronomy", text: "gastronomii" },
      { src: handel, alt: "trade", text: "placówek handlu hurtowego i detalicznego" },
    ],
    [
      { src: bloki, alt: "blocks of flats", text: "spółdzielni mieszkaniowej" },
      { src: zasoby, alt: "housing stock", text: "gospodarki zasobami mieszkaniowymi" },
      { src: wspolnota, alt: "housing Association", text: "wspólnot mieszkaniowych" },
      { src: rolne, alt: "agri-food processing", text: "przetwórstwa rolno-spożywczego" },
    ],
    [
      { src: szkola, alt: "school", text: "obiektów szkolnych oraz internatów" },
      { src: osrodek, alt: "holiday resorts", text: "ośrodków wypoczynkowych" },
      { src: hotel, alt: "hotels", text: "hoteli" },
      { src: zaklad, alt: "food production plants", text: "zakładów produkujących żywność" },
    ],
  ];

  return (
    <>
      {/* ------------------------------------------version for mobile------------------------------------------------ */}
      <div className={styles.cooperationSectionMobile}>
        <div className={styles.cooperationTitleContainer}>
          <h2 className={classNames(styles.underline)}>
            <b>Szczególnie Naszą współpracę kierujemy do:</b>
          </h2>
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
                        placeholder="blur"
                        sizes="100vw"
                      />
                      <p>{item.text}</p>
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
