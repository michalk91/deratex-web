import styles from "../../styles/indexStyles/servicesShort.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function ServicesShort() {
  const images = {
    images: [
      {
        src: "/images/deratyzacja.png",
        alt: "Deratyzacja",
        text: "Deratyzacja (odszczurzanie)",
      },
      {
        src: "/images/dezynsekcja.png",
        alt: "Dezynsekcja",
        text: "Dezynsekcja (odrobaczanie)",
      },
      {
        src: "/images/dezynfekcja.png",
        alt: "Dezynfekcja",
        text: "Dezynfekcja",
      },
      {
        src: "/images/ozonowanie.png",
        alt: "Ozonowanie",
        text: "Ozonowanie",
      },
      {
        src: "/images/fumigacja.png",
        alt: "Fumigacja",
        text: "Fumigacja",
      },
      {
        src: "/images/wiezbadachowa.png",
        alt: "więźba dachowa",
        text: "Zwalczanie szkodników drewna wyrobionego (więźba dachowa)",
      },
    ],
  };

  const containerRef = useRef();

  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });

  return (
    <section className={classNames(styles.services)}>
      <span className={classNames("title")}>Oferowane usługi</span>
      <div className={classNames("graySection")}>
        <section ref={containerRef} className={classNames("innerContentWidth")}>
          {images.images.map((item, index) => (
            <article className={classNames(styles.imgsContainer)} key={index}>
              <div className={classNames({ ["fade-in"]: animate })}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  height="100%"
                  width="100%"
                  layout="responsive"
                  priority={true}
                  objectFit="contain"
                />
              </div>
              <h1 className={styles.services}>{item.text}</h1>
              <Link href="/services">
                <button className={styles.services}>Czytaj więcej</button>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default memo(ServicesShort);
