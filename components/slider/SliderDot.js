import { memo } from "react";
import styles from "./SliderDot.module.css";
import classNames from "classnames";

function SliderDot({ active, paused, onComplete }) {
  if (active) {
    return (
      <span className={styles.container}>
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
            className={classNames(styles.circleWithBorderAnimation, {
              [styles.circleWithBorderAnimationPaused]: paused,
            })}
            cx="15"
            cy="15"
            r="10"
            stroke="#fff"
            strokeWidth="4"
            fillOpacity="0"
            onAnimationEnd={onComplete}
          />
          <circle
            className={classNames({
              [styles.circleWithScaleAnimation]: paused,
            })}
            cx="15"
            cy="15"
            r="5.5"
            strokeWidth="0"
            fillOpacity="0"
          />
        </svg>
      </span>
    );
  } else {
    return (
      <span className={styles.container}>
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
      </span>
    );
  }
}

export default memo(SliderDot);
