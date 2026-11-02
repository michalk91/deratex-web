import { memo } from "react";
import styles from "./consentPlaceholder.module.css";
import { openCookiePreferences } from "../../lib/iubenda";

function ConsentPlaceholder({ serviceName }) {
  return (
    <div className={styles.placeholder}>
      <p className={styles.text}>
        Ta treść pochodzi z serwisu {serviceName}, który może zbierać Twoje
        dane. Aby ją wyświetlić, zaakceptuj odpowiednie pliki cookies.
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={openCookiePreferences}
      >
        Ustawienia cookies
      </button>
    </div>
  );
}

export default memo(ConsentPlaceholder);
