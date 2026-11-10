import { memo } from "react";
import classNames from "classnames";
import styles from "./consentButton.module.css";

function ConsentButton({ variant, onClick, children }) {
  return (
    <button
      type="button"
      className={classNames("button-reset", styles.button, styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(ConsentButton);
