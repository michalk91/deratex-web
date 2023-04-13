import styles from "../../styles/indexStyles/offerFor.module.css";
import React from "react";
import Image from "next/image";
import { memo, useRef } from "react";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function OfferFor() {
  const containerRef = useRef();
  const animate = useInViewAnimation({animateContainerRef:containerRef});
  return (
    <div className={styles.offerForWrapper} ref={containerRef}>
      <section className={classNames("innerContentWidth" ,styles.offerFor)}>
        <span className={styles.offerForText}><span className={classNames("redUnderline")}>Nasza ofertę kierujemy</span> do
          wszystkich klientów zainteresowanych odrobaczeniem, odszczurzeniem,
          usuwania insektów metoda fumigacji (gazowania), z terenu województwa
          <b> kujawsko - pomorskiego</b> oraz z terenu województw osciennych:</span>
        <div className={classNames (styles.offerForImageContainer, {["scale"]:animate})}>
          <strong>
            <div className={classNames ( {["delayed-scale"]:animate})}>kujawsko-pomorskie</div>
          </strong>
          <div className={classNames ( {["delayed-fade-in-left"]:animate})}>pomorskie</div>
          <div  className={classNames ( {["delayed-fade-in-right"]:animate})}>mazowieckie</div>
          <div  className={classNames ( {["delayed-fade-in-left"]:animate})}>wielkopolskie</div>
          <div  className={classNames ( {["delayed-fade-in-right"]:animate})}>warmińsko-mazurskie</div>

          <Image
            src="/images/poland2.png"
            alt="logo"
            height="100%"
            width="100%"
            layout="responsive"
            priority={true}
            objectFit="contain"
          />
        </div>
      </section>
    </div>
  );
}

export default memo(OfferFor);
