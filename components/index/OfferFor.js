import styles from "./offerFor.module.css";
import React from "react";
import Image from "next/image";
import { memo, useRef } from "react";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function OfferFor() {
  const containerRef = useRef();
  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });
  return (
    <div className={styles.offerForWrapper} ref={containerRef}>
      <section className={classNames("innerContentWidth", styles.offerFor)}>
        <span className={styles.offerForText}>
          <span className={classNames("redUnderline")}>
            Nasza ofertę kierujemy
          </span>{" "}
          do wszystkich klientów zainteresowanych odrobaczeniem, odszczurzeniem,
          usuwania insektów metoda fumigacji (gazowania), z terenu województwa
          <b> kujawsko - pomorskiego</b> oraz z terenu województw osciennych:
        </span>
        <div
          className={classNames(styles.offerForImageContainer, {
            ["scale"]: animate,
          })}
        >
          <strong>
            <div className={classNames({ ["delayed-scale"]: animate })}>
              kujawsko-pomorskie
            </div>
          </strong>
          <div className={classNames({ ["delayed-fade-in"]: animate })}>
            pomorskie
          </div>
          <div className={classNames({ ["delayed-fade-in"]: animate })}>
            mazowieckie
          </div>
          <div className={classNames({ ["delayed-fade-in"]: animate })}>
            wielkopolskie
          </div>
          <div className={classNames({ ["delayed-fade-in"]: animate })}>
            warmińsko-mazurskie
          </div>

          <Image
            src="/images/index/offerFor/poland.jpg"
            alt="logo"
            height={0}
            width={0}
            sizes="(max-width: 750px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
    </div>
  );
}

export default memo(OfferFor);
