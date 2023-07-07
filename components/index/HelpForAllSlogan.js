import styles from "./helpForAllSlogan.module.css";
import React from "react";
import { memo } from "react";
import classNames from "classnames";
import Image from "next/image";

function helpForAllSlogan() {
  return (
    <section className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/index/HelpForAllSlogan/backgroundImage.jpg"
          alt="background image"
          fill
          sizes="100vw"
        />
      </div>
      <div className={styles.transparentBackground}>
        <span className={classNames("innerContentWidth", styles.text)}>
          W SZCZEGÓLNYCH PRZYPADKACH NIE ODMÓWIMY POMOCY NIKOMU NIEZALEŻNIE OD
          POŁOŻENIA.
        </span>
      </div>
    </section>
  );
}

export default memo(helpForAllSlogan);
