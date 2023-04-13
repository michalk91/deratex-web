import styles from "../../styles/indexStyles/ourGuarantee.module.css";
import React from "react";
import Image from "next/image";
import { memo, useRef } from "react";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function OurGuarantee() {
  const images = [
    {
      src: "/images/piz.png",
      alt: "Atesty Państwowego Zakłdu Higieny",
      text: "Stosujemy preparaty i srodki posiadajace zezwolenia Ministra Zdrowia i atesty Państwowego Zakładu Higieny",
    },
    {
      src: "/images/price.png",
      alt: "Rozsądne ceny",
      text: "Rozsadne ceny(każda usługa i jej koszt uzgadniana z klientem)",
    },
    {
      src: "/images/professional.png",
      alt: "Profesjonalne wykonanie usługi",
      text: "Profesjonalne wykonanie usługi",
    },
    {
      src: "/images/insect.png",
      alt: "Doradztwo",
      text: "Doradztwo i informacje na temat zabiegu i srodków użytych",
    },
    {
      src: "/images/protocol.png",
      alt: "Protokół",
      text: "Po wykonanym zabiegu wystawiamy protokół (co, gdzie, kiedy, ile)",
    },
    {
      src: "/images/calendar.png",
      alt: "Kalendarz",
      text: "Dogodne terminy, (ustalany każdorazowo z klientem)",
    },
    {
      src: "/images/safety.png",
      alt: "Bezpieczństwo",
      text: "Bezpieczeństwo stosowanych srodków chemicznych",
    },

    {
      src: "/images/ubez.png",
      alt: "Firma jest ubezpieczona",
      text: "Nasza firma jest ubezpieczona",
    },

  ];

 const containerRef = useRef();

  const animate = useInViewAnimation({animateContainerRef:containerRef});

  return (
    <section>
      <span className={classNames("title")}>Nasza gwarancja</span>
      <div className={classNames("graySection")}

      >
        <section ref={containerRef} className={classNames("innerContentWidth", styles.articleContainer)}>
          {images.map((item, index) => (
            <article key={index}>
              <div className={classNames( styles.imageContainer, {["fade-in-down"]: animate})}>
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

              <h2 className={classNames({["fade-in-up"]: animate})}>{item.text}</h2>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default memo(OurGuarantee);
