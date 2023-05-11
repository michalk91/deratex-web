import styles from "../../styles/indexStyles/certificates.module.css";
import React, { memo, useState, Ref } from "react";
import Carousel, { CarouselItem } from "../carouselSlider/Carousel";
import RichCarousel from "../carouselSlider/RichCarousel";
import classNames from "classnames";
import Image from "next/image";
import { Flipper, Flipped } from "react-flip-toolkit";
import { ImageForLightbox } from "../carouselSlider/Carousel";

function Certificates() {
  const certificates = [
    {
      src: "/images/certificates/Biolog_terenowy_Leszek_Kukla.jpg",
      alt: "baner image1",
      slideText: `"Zadania biologa terenowego wykonującego inspekcję zakładu
        produkującego żywność i walidację systemu zabezpieczenia
        zakładu przez organizamami szkodliwymi"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/irs_brc.jpg",
      alt: "baner image2",
      slideText: ` "Ochrona obiektów zakładu przemysłu spożywczego przed
        szkodnikami zgodna z wymaganiami system HACCP, IFS/BRC i
        AIB"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/haccp_grazyna_kukla.jpg",
      alt: "baner image3",
      slideText: ` "Ochrona obiektów zakładu przemysłu spożywczego przed
        szkodnikami zgodna z wymaganiami systemu HACCP"`,
      slideText2: " - Grazyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/deratyzacja_poziom_wyzszy_grazyna_kukla.jpg",
      alt: "baner image4",
      slideText: `"Deratyzacja - poziom wyższy"`,
      slideText2: " - Grazyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/dezynsekcja_poziom_wyzszy_grazyna_kukla.jpg",
      alt: "baner image4",
      slideText: `"Dezynsekcja - poziom wyższy"`,
      slideText2: " - Grazyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/mrowki_ogrodowe_grazyna_kukla.jpg",
      alt: "baner image4",
      slideText: `"Mrówki ogrodowe i ich zwalczanie"`,
      slideText2: " - Grazyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/mrowki_ogrodowe_leszek_kukla.jpg",
      alt: "baner image4",
      slideText: `"Mrówki ogrodowe i ich zwalczanie"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/ozonowanie_leszek_kukla.jpg",
      alt: "baner image4",
      slideText: `"Ozonowanie jako nowoczesna forma dezynfekcji oraz usuwanie przykrych zapachów"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/pluskwa_domowa_grazyna_kukla.jpg",
      alt: "baner image4",
      slideText: `"Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń"`,
      slideText2: " - Grazyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/pluskwa_domowa_leszek_kukla.jpg",
      alt: "baner image4",
      slideText: `"Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/podstawy_dezodoryzacji_grazyna_kukla.jpg",
      alt: "baner image4",
      slideText: `"Podstawy dezodoryzacji"`,
      slideText2: " - Grażyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/podstawy_dezodoryzacji_leszek_kukla.jpg",
      alt: "baner image4",
      slideText: `"Podstawy dezodoryzacji"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/szkodniki_magazynowe_i_ich_zwalczanie_grazyna_kukla.jpg",
      alt: "baner image4",
      slideText: `"Szkodniki magazynowe i ich zwalczanie"`,
      slideText2: " - Grażyna Kukla - ",
      height: 1600,
      width: 1114,
    },
    {
      src: "/images/certificates/szkodniki_magazynowe_i_ich_zwalczanie_leszek_kukla.jpg",
      alt: "baner image4",
      slideText: `"Szkodniki magazynowe i ich zwalczanie"`,
      slideText2: " - Leszek Kukla - ",
      height: 1600,
      width: 1114,
    },
  ];

  return (
    <section className={classNames("innerContentWidth", styles.certificates)}>
      <span>
        <b className={classNames("short-underline")}>Certyfikaty</b>
      </span>

      <div className={styles.certificatesWrapper}>
        <RichCarousel
          // slideTime={3000}
          // width="70vw"

          height= "240px"
          virtualized
          // imagesForLightboxData={certificates} //add this when you want using virtualized and you added "withGallery" prop
          withGallery
          navigationOutside
          thumbnailsOptions={{
            keepRatio: true,
            thumbnailWithBorderRadius: false,
            thumbnailHeight: 80,
          }}
        >
          {certificates.map((item, index) => (
            <CarouselItem

              key={index}
              itemClassName={styles.certificatesSlideContainer}
            >
              <ImageForLightbox
                src={item.src}
                alt={item.alt}
                height={1600}
                width={1114}
                // objectFit="contain"
                imgClassName={styles.certificatesImage}
              />

              <div className={classNames(styles.certificatesText)}>
                <h2>{item.slideText}</h2>
                <h3>{item.slideText2}</h3>
              </div>
            </CarouselItem>
          ))}
        </RichCarousel>
      </div>
    </section>
  );
}

export default memo(Certificates);
