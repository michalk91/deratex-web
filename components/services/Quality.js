import React from "react";
import { memo, useRef } from "react";
import styles from "./quality.module.css";
import classNames from "classnames";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import { robotoBold } from "../../fonts/fonts";

function Quality() {
  const containerRef = useRef();
  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });
  return (
    <>
      <section>
        <div
          ref={containerRef}
          className={classNames("innerContentWidth", styles.container, {
            ["fade-in"]: animate,
          })}
        >
          <span>
            <p>Jesteśmy płatnikiem podatku VAT. na zasadach ogólnych 23%.</p>

            <p>
              Firma nasza proponuje Państwu najwyższa jakość świadczonych usług
              za rozsądna cenę.
            </p>

            <p>
              Współpraca z nami zapewni Państwu spokój i bezpieczeństwo
              prowadzenia działalności.
            </p>
          </span>
          <span className={styles.secondText}>
            <p className={robotoBold.className}>
              GWARANTUJEMY RZETELNOŚĆ I PROFESJONALIZM NASZYCH USŁUG
            </p>
            <p>Z poważaniem właściciele firmy DDD Deratex</p>
            <p>Grażyna i Leszek Kukla</p>
          </span>
        </div>
      </section>
    </>
  );
}

export default memo(Quality);
