import React from "react";
import styles from "../styles/Footer.module.css";
import { memo } from "react";
import Image from "next/dist/client/image";
import classNames from "classnames";
import { RiFacebookBoxLine } from "react-icons/ri";
import RichLightboxGallery from "./lightboxGallery/RichLightboxGallery";

function Footer() {



  const texts = [
    {
      src: "/images/reference.jpg",
      alt: "reference list",
      text: "Kliknij aby zobaczyć list",
      width: 464,
      height: 621,
      textClassName: styles.redHover,
    },
    {
      src: "/images/reference.jpg",
      alt: "reference list",
      text: "Kliknij aby zobaczyć list",
      width: 464,
      height: 621,
      textClassName: styles.redHover,
    },
  ];

  return (
    <>
      <footer className={styles.footer}>
        <div className={classNames("innerContentWidth")}>
          <div className={classNames(styles.gridContainer)}>
            <div className={styles.innerContainer}>
              <p className={classNames(styles.columnInfo)}>Kontakt</p>
              <div className={classNames(styles.nestedColumnInfo)}>
                <p className={classNames(styles.nestedColumnTitle)}>Adres:</p>
                <p>ul. Cegielniana 28/41,</p>
                <p>89-500 Tuchola</p>
              </div>
              <div className={classNames(styles.nestedColumnInfo)}>
                <p className={classNames(styles.nestedColumnTitle)}>
                  Numery telefonów:
                </p>
                <p>
                  <a
                    className={classNames(styles.redHover)}
                    href="tel:660826121"
                  >
                    tel. 660 826 121
                  </a>
                </p>
                <p>
                  <a
                    className={classNames(styles.redHover)}
                    href="tel:660906327"
                  >
                    tel. 660 906 327
                  </a>
                </p>
              </div>
              <div className={classNames(styles.nestedColumnInfo)}>
                <p className={classNames(styles.nestedColumnTitle)}>E-mail: </p>
                <a
                  className={classNames(styles.redHover)}
                  href="mailto:ul50@wp.pl"
                >
                  ul50@wp.pl
                </a>
              </div>
            </div>

            <div className={styles.innerContainer}>
              <p className={classNames(styles.columnInfo)}>Nasze referencje</p>
              <div className={classNames(styles.nestedColumnInfo)}>
                <p className={classNames(styles.nestedColumnTitle)}>
                  Listy referencyjne:
                </p>
                <RichLightboxGallery
                  clickTextToOpenLightbox
                  items={texts}
                  thumbnailsOptions={{
                    thumbnailWithBorderRadius: false,
                    keepRatio:true,
                    thumbnailHeight: 85,

                  }}
                ></RichLightboxGallery>
                <p className={classNames(styles.columnInfo)}>Nasz facebook </p>
                <a href="https://www.facebook.com/deratexdddtuchola">
                  <RiFacebookBoxLine
                    size={70}
                    className={classNames(styles.fbLogo)}
                  />
                </a>
              </div>
            </div>
            <div className={styles.innerContainer}>
              <p className={classNames(styles.columnInfo)}>Godziny pracy</p>
              <div className={classNames(styles.nestedColumnInfo)}>
                <p>Poniedziałek - Piątek: 8:00 - 16:00</p>
                <p>Sobota: 8:00 - 15:00</p>
                <p>Niedziela: ZAMKNIĘTE</p>
              </div>
              <div className={styles.navlogo}>
                <Image
                  src="/images/logo-white.svg"
                  alt="logo"
                  height={80}
                  width={180}
                  layout="responsive"
                  priority={true}
                />
              </div>
            </div>
          </div>

          <div className={classNames(styles.footerBottomText)}>
            &copy; 2023 DERATEX - Zakład Dezynfekcji, Dezynsekcji i Deratyzacji
          </div>
        </div>
      </footer>
    </>
  );
}

export default memo(Footer);
