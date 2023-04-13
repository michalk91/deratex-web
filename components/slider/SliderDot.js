import React from "react";
import styles from "../../styles/SliderDot.module.css";
import classNames from "classnames";
import { memo } from "react";

function SliderDot({ active, paused }) {
  if (active) {
    return (
      <div className={styles.container}>
        <svg height="30" width="30">
          <circle
            className={styles.circleBackground}
            cx="15"
            cy="15"
            r="10"
            stroke="#aaa"
            strokeWidth="4"
            fillOpacity="0"
          />
          <circle
            className={classNames({
              [styles.circleWithBorderAnimation]: active && !paused,
              [styles.circleWithScaleAnimation]: active && paused,
            })}
            cx="15"
            cy="15"
            r="10"
            stroke="#fff"
            strokeWidth="4"
            fillOpacity="0"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <svg height="30" width="30">
          <circle
            className={styles.circleBackground}
            cx="15"
            cy="15"
            r="6"
            stroke="gray"
            strokeWidth="4"
            fillOpacity="1"
          />
        </svg>
      </div>
    );
  }
}

export default memo(SliderDot);
