import styles from "./aboutUs.module.css";
import React from "react";
import Image from "next/image";
import { memo } from "react";
import classNames from "classnames";

function AboutUs() {
  return (
    <section className={classNames(styles.aboutUs, "innerContentWidth")}>
      <div className={styles.aboutUsImage}>
        <Image
          src="/images/firmarodzinna.jpg"
          alt="logo"
          height={0}
          width={0}
          placeholder="blur"
          sizes="(max-width: 500px) 100vw, (max-width: 860px) 50vw, 33vw"
        />
      </div>

      <div>
        <span className={classNames("secondTitle")}>
          Kilka słów <b>o nas</b>
        </span>
        <p>
          <strong>Zakład DDD Deratex</strong> to firma rodzinna, którą cechuje
          nie tylko szeroka wiedza z zakresu dezynfekcji, dezynsekcji i
          deratyzacji, ale też wysoka kultura osobista. Wciąż podnosimy nasze
          kwalifikacje uczestnicząc w szkoleniach i zdobywając kolejne
          certyfikaty poświadczajace najwyższą jakość i profesjonalizm
          świadczonych usług. Wdrażamy program ochrony przed szkodnikami zgodnie
          z systemami GHP, GMP i HACCP, IFS/BRC i AIB, które zapewnią Państwu
          bezpieczeństwo prowadzenia działalności w sektorze spożywczym i
          przetwarzającym żywność.
        </p>
      </div>
    </section>
  );
}

export default memo(AboutUs);
