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
    { src: biolog, alt: "Certyfikat: Zadania biologa terenowego wykonującego inspekcję zakładu produkującego żywność i walidację systemu zabezpieczenia zakładu przed organizmami szkodliwymi – Leszek Kukla", slideText: `"Zadania biologa terenowego wykonującego inspekcję zakładu produkującego żywność i walidację systemu zabezpieczenia zakładu przez organizamami szkodliwymi"`, slideText2: " - Leszek Kukla - " },
    { src: irsBrc, alt: "Certyfikat: Ochrona obiektów zakładu przemysłu spożywczego przed szkodnikami zgodna z wymaganiami system HACCP, IFS/BRC i AIB – Leszek Kukla", slideText: `"Ochrona obiektów zakładu przemysłu spożywczego przed szkodnikami zgodna z wymaganiami system HACCP, IFS/BRC i AIB"`, slideText2: " - Leszek Kukla - " },
    { src: haccpGrazyna, alt: "Certyfikat: Ochrona obiektów zakładu przemysłu spożywczego przed szkodnikami zgodna z wymaganiami systemu HACCP – Grazyna Kukla", slideText: `"Ochrona obiektów zakładu przemysłu spożywczego przed szkodnikami zgodna z wymaganiami systemu HACCP"`, slideText2: " - Grazyna Kukla - " },
    { src: deratyzacjaGrazyna, alt: "Certyfikat: Deratyzacja - poziom wyższy – Grazyna Kukla", slideText: `"Deratyzacja - poziom wyższy"`, slideText2: " - Grazyna Kukla - " },
    { src: dezynsekcjaGrazyna, alt: "Certyfikat: Dezynsekcja - poziom wyższy – Grazyna Kukla", slideText: `"Dezynsekcja - poziom wyższy"`, slideText2: " - Grazyna Kukla - " },
    { src: mrowkiGrazyna, alt: "Certyfikat: Mrówki ogrodowe i ich zwalczanie – Grazyna Kukla", slideText: `"Mrówki ogrodowe i ich zwalczanie"`, slideText2: " - Grazyna Kukla - " },
    { src: mrowkiLeszek, alt: "Certyfikat: Mrówki ogrodowe i ich zwalczanie – Leszek Kukla", slideText: `"Mrówki ogrodowe i ich zwalczanie"`, slideText2: " - Leszek Kukla - " },
    { src: ozonowanieLeszek, alt: "Certyfikat: Ozonowanie jako nowoczesna forma dezynfekcji oraz usuwanie przykrych zapachów – Leszek Kukla", slideText: `"Ozonowanie jako nowoczesna forma dezynfekcji oraz usuwanie przykrych zapachów"`, slideText2: " - Leszek Kukla - " },
    { src: pluskwaGrazyna, alt: "Certyfikat: Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń – Grazyna Kukla", slideText: `"Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń"`, slideText2: " - Grazyna Kukla - " },
    { src: pluskwaLeszek, alt: "Certyfikat: Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń – Leszek Kukla", slideText: `"Pluskwa domowa, produkty biobójcze przeznaczone do zwalczania pluskwy domowej i sposoby wykonywania zabiegu odpluskwiania pomieszczeń"`, slideText2: " - Leszek Kukla - " },
    { src: dezodoryzacjaGrazyna, alt: "Certyfikat: Podstawy dezodoryzacji – Grażyna Kukla", slideText: `"Podstawy dezodoryzacji"`, slideText2: " - Grażyna Kukla - " },
    { src: dezodoryzacjaLeszek, alt: "Certyfikat: Podstawy dezodoryzacji – Leszek Kukla", slideText: `"Podstawy dezodoryzacji"`, slideText2: " - Leszek Kukla - " },
    { src: szkodnikiGrazyna, alt: "Certyfikat: Szkodniki magazynowe i ich zwalczanie – Grażyna Kukla", slideText: `"Szkodniki magazynowe i ich zwalczanie"`, slideText2: " - Grażyna Kukla - " },
    { src: szkodnikiLeszek, alt: "Certyfikat: Szkodniki magazynowe i ich zwalczanie – Leszek Kukla", slideText: `"Szkodniki magazynowe i ich zwalczanie"`, slideText2: " - Leszek Kukla - " },
    { src: killgerm2025Grazyna, alt: "Certyfikat: Warsztaty Killgerm Polska – Grażyna Kukla", slideText: `"Warsztaty Killgerm Polska"`, slideText2: " - Grażyna Kukla - " },
    { src: killgerm2025Leszek, alt: "Certyfikat: Warsztaty Killgerm Polska – Leszek Kukla", slideText: `"Warsztaty Killgerm Polska"`, slideText2: " - Leszek Kukla - " },
  ];

  return (
    <section className={classNames("innerContentWidth", styles.certificates)}>
      <h2>
        <b className="accent-underline accent-underline--short">Certyfikaty</b>
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
