import styles from "./servicesShort.module.css";
import Image from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import deratyzacja from "/public/images/index/servicesShort/deratyzacja.png";
import dezynsekcja from "/public/images/index/servicesShort/dezynsekcja.png";
import dezynfekcja from "/public/images/index/servicesShort/dezynfekcja.png";
import ozonowanie from "/public/images/index/servicesShort/ozonowanie.png";
import fumigacja from "/public/images/index/servicesShort/fumigacja.png";
import wiezbadachowa from "/public/images/index/servicesShort/wiezbadachowa.png";

function ServicesShort() {
  const images = [
    { src: deratyzacja, alt: "Deratyzacja", text: "Deratyzacja (odszczurzanie)" },
    { src: dezynsekcja, alt: "Dezynsekcja", text: "Dezynsekcja (odrobaczanie)" },
    { src: dezynfekcja, alt: "Dezynfekcja", text: "Dezynfekcja" },
    { src: ozonowanie, alt: "Ozonowanie", text: "Ozonowanie" },
    { src: fumigacja, alt: "Fumigacja", text: "Fumigacja" },
    { src: wiezbadachowa, alt: "więźba dachowa", text: "Zwalczanie szkodników drewna wyrobionego (więźba dachowa)" },
  ];

  const containerRef = useRef();

  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });

  return (
    <section className={classNames(styles.services)}>
      <span className={classNames("title")}>Oferowane usługi</span>
      <div className={classNames("graySection")}>
        <section ref={containerRef} className={classNames("innerContentWidth")}>
          {images.map((item, index) => (
            <article className={classNames(styles.imgsContainer)} key={index}>
              <div className={classNames({ ["fade-in"]: animate })}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={0}
                  height={0}
                  placeholder="blur"
                  sizes="(max-width: 350px) 100vw, (max-width: 700px) 50vw, 33vw"
                />
              </div>
              <h2 className={styles.services}>{item.text}</h2>
              <Link href="/uslugi">
                <button aria-label="Czytaj więcej" className={styles.services}>
                  Czytaj więcej
                </button>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default memo(ServicesShort);
