import styles from "./helpForAllSlogan.module.css";
import React from "react";
import { memo } from "react";
import classNames from "classnames";

function helpForAllSlogan(){
    return(
        <section className={styles.helpForAll}>
        <div className={styles.helpForAllSloganTransparentBackground}>
          <span className={classNames("innerContentWidth" ,styles.helpForAllSlogan)}>
            W SZCZEGÓLNYCH PRZYPADKACH NIE ODMÓWIMY POMOCY NIKOMU NIEZALEŻNIE OD
            POŁOŻENIA.
          </span>
        </div>
      </section>
    )
}

export default memo(helpForAllSlogan);