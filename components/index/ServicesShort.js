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
        paddingLeft: "17%",
        paddingRight: "5%",
      },
      {
        src: "/images/dezynsekcja.png",
        alt: "Dezynsekcja",
        text: "Dezynsekcja (odrobaczanie)",
        paddingLeft: "16%",
        paddingRight: "16%",
        paddingBottom: "10%",
      },
      {
        src: "/images/dezynfekcja.png",
        alt: "Dezynfekcja",
        text: "Dezynfekcja",
        paddingLeft: "19%",
        paddingRight: "19%",
        paddingTop: "5%",
        paddingBottom: "9%",
      },
      {
        src: "/images/ozonowanie.png",
        alt: "Ozonowanie",
        text: "Ozonowanie",
        paddingRight: "10%",
        paddingLeft: "10%",
        paddingBottom: "3%",
      },
      {
        src: "/images/fumigacja.png",
        alt: "Fumigacja",
        text: "Fumigacja",
        paddingRight: "10%",
        paddingLeft: "10%",
        paddingBottom: "3%",
      },
      {
        src: "/images/wiezbadachowa.png",
        alt: "więźba dachowa",
        text: "Zwalczanie szkodników drewna wyrobionego (więźba dachowa)",
        paddingRight: "10%",
        paddingLeft: "10%",
        paddingBottom: "3%",
      },
    ],
    basicStyles: [
      {
        paddingRight: "10%",
        paddingLeft: "10%",
        paddingBottom: "3%",
      },
    ],
  };

  const containerRef = useRef();

  const {animate} = useInViewAnimation({ animateContainerRef: containerRef });

  return (
    <section className={classNames(styles.services)}>
      <span className={classNames("title")}>Oferowane usługi</span>
      <div className={classNames("graySection")}>
        <section ref={containerRef} className={classNames("innerContentWidth")}>
          {images.images.map((item, index) => (
            <article style={{ opacity: !animate && 0 }} key={index}>
              <div
                className={classNames({
                  ["fade-in-right"]: index > 2 && animate,
                  ["fade-in-left"]: index < 3 && animate,
                })}
                style={{
                  paddingLeft: item.paddingLeft,
                  paddingRight: item.paddingRight,
                  paddingTop: item.paddingTop,
                  paddingBottom: item.paddingBottom,
                }}
              >
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
