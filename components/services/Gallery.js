import React from "react";
import RichLightboxGallery from "../lightboxGallery/RichLightboxGallery";
import { memo } from "react";
import styles from "./gallery.module.css";
import classNames from "classnames";

function Gallery() {
  const images = [
    {
      src: "/images/services/gallery/galeria.jpg",
      alt: "hospital",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
      height: 1440,
      width: 1920,
    },
    {
      src: "/images/services/gallery/kosciol.jpg",
      alt: "farmacia",
      caption:
        "Usuwanie gniazda szerszeniu w budynku wielorodzinnym Usuwanie gniazda szerszeniu w budynku wielorodzinnym Usuwanie gniazda szerszeniu w budynku wielorodzinnym Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/gastronomia.jpg",
      alt: "gastronomy",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
      width: 1920,
      height: 1280,
    },
    {
      src: "/images/services/gallery/handel.jpg",
      alt: "trade",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
      width: 1920,
      height: 1104,
    },
    {
      src: "/images/services/gallery/galeria.jpg",
      alt: "hospital",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
      height: 1440,
      width: 1920,
    },
    {
      src: "/images/services/gallery/kosciol.jpg",
      alt: "farmacia",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/galeria.jpg",
      height: 1440,
      width: 1920,
      alt: "hospital",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
    },
    {
      src: "/images/services/gallery/kosciol.jpg",
      alt: "farmacia",
      caption: "foo",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/galeria.jpg",
      height: 1440,
      width: 1920,
      alt: "hospital",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym",
    },
    {
      src: "/images/services/gallery/kosciol.jpg",
      alt: "farmacia",
      caption: "dezynfekcja",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/kosciol.jpg",
      alt: "farmacia",
      caption: "Usuwanie gniazda szerszeniu w budynku wielorodzinnym ",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/kosciol.jpg",
      alt: "farmacia",
      caption: "Deratyzacja",
      width: 1368,
      height: 1824,
    },
  ];

  return (
    <>
      <section>
        <span className={classNames("title")}>Galeria</span>
        <div className={classNames("graySection")}>
          <RichLightboxGallery
            virtualized
            items={images}
            imgContainerClassName={styles.imgContainer}
            lightboxContainerClassName={classNames(
              styles.container,
              "innerContentWidth"
            )}
            thumbnailWithBorderRadius
          />
        </div>
      </section>
    </>
  );
}

export default memo(Gallery);
