import styles from "./ourGuarantee.module.css";
import React from "react";
import Image from "next/image";
import { memo, useRef } from "react";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function OurGuarantee() {
  const images = [
    {
      src: "/images/index/OurGuarantee/piz.png",
      alt: "Atesty Państwowego Zakłdu Higieny",
      text: "Stosujemy preparaty i srodki posiadajace zezwolenia Ministra Zdrowia i atesty Państwowego Zakładu Higieny",
    },
    {
      src: "/images/index/OurGuarantee/price.png",
      alt: "Rozsądne ceny",
      text: "Rozsadne ceny(każda usługa i jej koszt uzgadniana z klientem)",
    },
    {
      src: "/images/index/OurGuarantee/professional.png",
      alt: "Profesjonalne wykonanie usługi",
      text: "Profesjonalne wykonanie usługi",
    },
    {
      src: "/images/index/OurGuarantee/insect.png",
      alt: "Doradztwo",
      text: "Doradztwo i informacje na temat zabiegu i srodków użytych",
    },
    {
      src: "/images/index/OurGuarantee/protocol.png",
      alt: "Protokół",
      text: "Po wykonanym zabiegu wystawiamy protokół (co, gdzie, kiedy, ile)",
    },
    {
      src: "/images/index/OurGuarantee/calendar.png",
      alt: "Kalendarz",
      text: "Dogodne terminy, (ustalany każdorazowo z klientem)",
    },
    {
      src: "/images/index/OurGuarantee/safety.png",
      alt: "Bezpieczństwo",
      text: "Bezpieczeństwo stosowanych srodków chemicznych",
    },

    {
      src: "/images/index/OurGuarantee/ubez.png",
      alt: "Firma jest ubezpieczona",
      text: "Nasza firma jest ubezpieczona",
    },
  ];

  const containerRef = useRef();

  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });

  return (
    <section>
      <span className={classNames("title")}>Nasza gwarancja</span>
      <div className={classNames("graySection")}>
        <section
          ref={containerRef}
          className={classNames("innerContentWidth", styles.articleContainer)}
        >
          {images.map((item, index) => (
            <article key={index}>
              <div
                className={classNames(styles.imageContainer, {
                  ["fade-in"]: animate,
                })}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  height={0}
                  width={0}
                  sizes="(max-width: 300px) 100vw, (max-width: 800px) 50vw, (max-width: 1000px) 33vw, 20vw"
                />
              </div>

              <h2 className={classNames({ ["fade-in"]: animate })}>
                {item.text}
              </h2>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default memo(OurGuarantee);
