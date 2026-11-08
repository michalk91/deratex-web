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
      { src: hospital, text: "służby zdrowia" },
      { src: farmacja, text: "firm farmaceutycznych" },
      { src: gastronomia, text: "gastronomii" },
      { src: handel, text: "placówek handlu hurtowego i detalicznego" },
    ],
    [
      { src: bloki, text: "spółdzielni mieszkaniowej" },
      { src: zasoby, text: "gospodarki zasobami mieszkaniowymi" },
      { src: wspolnota, text: "wspólnot mieszkaniowych" },
      { src: rolne, text: "przetwórstwa rolno-spożywczego" },
    ],
    [
      { src: szkola, text: "obiektów szkolnych oraz internatów" },
      { src: osrodek, text: "ośrodków wypoczynkowych" },
      { src: hotel, text: "hoteli" },
      { src: zaklad, text: "zakładów produkujących żywność" },
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
            <b className="accent-underline accent-underline--short">
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
                        alt=""
                        height={40}
                        width={40}
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
