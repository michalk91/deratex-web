import styles from "./certificates.module.css";
import { memo } from "react";
import { CarouselItem } from "../carouselSlider/Carousel";
import RichCarousel from "../carouselSlider/RichCarousel";
import classNames from "classnames";
import { ImageForLightbox } from "../carouselSlider/Carousel";
import biolog from "/public/images/index/certificates/Biolog_terenowy_Leszek_Kukla.jpg";
import irsBrc from "/public/images/index/certificates/irs_brc.jpg";
import haccpGrazyna from "/public/images/index/certificates/haccp_grazyna_kukla.jpg";
import deratyzacjaGrazyna from "/public/images/index/certificates/deratyzacja_poziom_wyzszy_grazyna_kukla.jpg";
import dezynsekcjaGrazyna from "/public/images/index/certificates/dezynsekcja_poziom_wyzszy_grazyna_kukla.jpg";
import mrowkiGrazyna from "/public/images/index/certificates/mrowki_ogrodowe_grazyna_kukla.jpg";
import mrowkiLeszek from "/public/images/index/certificates/mrowki_ogrodowe_leszek_kukla.jpg";
import ozonowanieLeszek from "/public/images/index/certificates/ozonowanie_leszek_kukla.jpg";
import pluskwaGrazyna from "/public/images/index/certificates/pluskwa_domowa_grazyna_kukla.jpg";
import pluskwaLeszek from "/public/images/index/certificates/pluskwa_domowa_leszek_kukla.jpg";
import dezodoryzacjaGrazyna from "/public/images/index/certificates/podstawy_dezodoryzacji_grazyna_kukla.jpg";
import dezodoryzacjaLeszek from "/public/images/index/certificates/podstawy_dezodoryzacji_leszek_kukla.jpg";
import szkodnikiGrazyna from "/public/images/index/certificates/szkodniki_magazynowe_i_ich_zwalczanie_grazyna_kukla.jpg";
import szkodnikiLeszek from "/public/images/index/certificates/szkodniki_magazynowe_i_ich_zwalczanie_leszek_kukla.jpg";
import killgerm2025Grazyna from "/public/images/index/certificates/killgerm-2025.jpg";
import killgerm2025Leszek from "/public/images/index/certificates/killgerm-2025-2.jpg";

function Certificates() {
  const certificates = [
    { src: biolog, alt: "baner image1", slideText: `"Zadania biologa terenowego wykonującego inspekcję zakładu produkującego żywność i walidację systemu zabezpieczenia zakładu przez organizamami szkodliwymi"`, slideText2: " - Leszek Kukla - " },
    { src: irsBrc, alt: "baner image2", slideText: `"Ochrona obiektów zakładu przemysłu spożywczego przed szkodnikami zgodna z wymaganiami system HACCP, IFS/BRC i AIB"`, slideText2: " - Leszek Kukla - " },
    { src: haccpGrazyna, alt: "baner image3", slideText: `"Ochrona obiektów zakładu przemysłu spożywczego przed szkodnikami zgodna z wymaganiami systemu HACCP"`, slideText2: " - Grazyna Kukla - " },
    { src: deratyzacjaGrazyna, alt: "baner image4", slideText: `"Deratyzacja - poziom wyższy"`, slideText2: " - Grazyna Kukla - " },
    { src: dezynsekcjaGrazyna, alt: "baner image5", slideText: `"Dezynsekcja - poziom wyższy"`, slideText2: " - Grazyna Kukla - " },
    { src: mrowkiGrazyna, alt: "baner image6", slideText: `"Mrówki ogrodowe i ich zwalczanie"`, slideText2: " - Grazyna Kukla - " },
    { src: mrowkiLeszek, alt: "baner image7", slideText: `"Mrówki ogrodowe i ich zwalczanie"`, slideText2: " - Leszek Kukla - " },
    { src: ozonowanieLeszek, alt: "baner image8", slideText: `"Ozonowanie jako nowoczesna forma dezynfekcji oraz usuwanie przykrych zapachów"`, slideText2: " - Leszek Kukla - " },
    { src: pluskwaGrazyna, alt: "baner image9", slideText: `"Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń"`, slideText2: " - Grazyna Kukla - " },
    { src: pluskwaLeszek, alt: "baner image10", slideText: `"Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń"`, slideText2: " - Leszek Kukla - " },
    { src: dezodoryzacjaGrazyna, alt: "baner image11", slideText: `"Podstawy dezodoryzacji"`, slideText2: " - Grażyna Kukla - " },
    { src: dezodoryzacjaLeszek, alt: "baner image12", slideText: `"Podstawy dezodoryzacji"`, slideText2: " - Leszek Kukla - " },
    { src: szkodnikiGrazyna, alt: "baner image13", slideText: `"Szkodniki magazynowe i ich zwalczanie"`, slideText2: " - Grażyna Kukla - " },
    { src: szkodnikiLeszek, alt: "baner image14", slideText: `"Szkodniki magazynowe i ich zwalczanie"`, slideText2: " - Leszek Kukla - " },
    { src: killgerm2025Grazyna, alt: "baner image15", slideText: `"Warsztaty Killgerm Polska"`, slideText2: " - Grażyna Kukla - " },
    { src: killgerm2025Leszek, alt: "baner image16", slideText: `"Warsztaty Killgerm Polska"`, slideText2: " - Leszek Kukla - " },
  ];

  return (
    <section className={classNames("innerContentWidth", styles.certificates)}>
      <h2>
        <b className={classNames("short-underline")}>Certyfikaty</b>
      </h2>

      <div className={styles.certificatesWrapper}>
        <RichCarousel
          height="260px"
          virtualized
          withGallery
          navigationOutside
          lightboxThumbsOptions={{
            keepRatio: true,
            thumbnailWithBorderRadius: false,
            thumbnailHeight: 80,
          }}
          lightboxZoomedImgSizes="(max-width: 680px) 100vw, (max-width: 900px) 80vw,(max-width: 1200px) 50vw, (max-width: 1600px) 40vw, 33vw"
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
                imgClassName={styles.certificatesImage}
                sizes="20vw"
              />

              <div className={classNames(styles.certificatesText)}>
                <h3>{item.slideText}</h3>
                <h4>{item.slideText2}</h4>
              </div>
            </CarouselItem>
          ))}
        </RichCarousel>
      </div>
    </section>
  );
}

export default memo(Certificates);
