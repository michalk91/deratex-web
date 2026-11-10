import { memo, useId } from "react";
import styles from "./purposeSwitch.module.css";

function PurposeSwitch({ purpose, checked, onChange }) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <li className={styles.purpose}>
      <div className={styles.header}>
        <h3 id={titleId} className={styles.title}>
          {purpose.title}
        </h3>
        <div className={styles.control}>
          {purpose.required && (
            <span className={styles.alwaysActive}>Zawsze aktywne</span>
          )}
          <span className={styles.switch}>
            <input
              type="checkbox"
              role="switch"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              checked={checked}
              disabled={purpose.required}
              onChange={(e) => onChange(purpose.id, e.target.checked)}
            />
            <span className={styles.track} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div id={descriptionId}>
        <p className={styles.description}>{purpose.description}</p>
        <ul className={styles.services}>
          {purpose.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default memo(PurposeSwitch);
