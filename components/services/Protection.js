import Image from "next/image";
import styles from "./protection.module.css";
import classNames from "classnames";
import { memo, useRef } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function Protection() {
  const svgs = [
    { src: "/images/services/Protection/HACCP.svg", alt: "HACCP" },
    { src: "/images/services/Protection/IFS.svg", alt: "IFS" },
    { src: "/images/services/Protection/AIB.svg", alt: "AIB" },
    { src: "/images/services/Protection/BRC.svg", alt: "BRC" },
  ];

  const containerRef = useRef();
  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });

  return (
    <div ref={containerRef} className="innerContentWidth">
      <h2 className={classNames("secondTitle", styles.title)}>
        <b> Oferujemy kompleksowa ochronę sanitarna obiektów według:</b>
      </h2>
      <div className={styles.wrapper}>
        {svgs.map((item, index) => (
          <div
            key={index}
            className={classNames(styles.imgContainer, { ["scale"]: animate })}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className={styles.innerText}>
        <p>
          <strong>
            „PROGRAMU OCHRONY PRZED SZKODNIKAMI SANITARNYMI OBIEKTÓW ZAKŁADU
            PRZEMYSŁU SPOŻYWCZEGO ZGODNA Z WYMAGANIAMI SYSTEMU HACCP , IFS/BRC i
            AIB”{" "}
          </strong>
          spełniajacego wymogi stawiane przez Unie Europejska zawarte w
          zaleceniach Weterynaryjnej Inspekcji Sanitarnej oraz organów Sanepidu.
        </p>
      </div>
    </div>
  );
}
export default memo(Protection);
