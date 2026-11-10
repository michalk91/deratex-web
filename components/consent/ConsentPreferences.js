import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { IoCloseSharp } from "react-icons/io5";
import ConsentButton from "./ConsentButton";
import PurposeSwitch from "./PurposeSwitch";
import sharedStyles from "./cookieConsent.module.css";
import styles from "./consentPreferences.module.css";
import useFocusTrap from "../../hooks/useFocusTrap";
import useScrollLock from "../../hooks/useScrollLock";
import { PRIVACY_POLICY_URL } from "../../lib/consent";
import { CONSENT_PURPOSES } from "../../data/consentPurposes";

function ConsentPreferences({ initialPurposes, onSave, onRejectAll, onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const [choices, setChoices] = useState(() => ({ ...initialPurposes }));

  const { lockScroll, unlockScroll } = useScrollLock();
  const trapFocus = useFocusTrap(dialogRef);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    lockScroll();
    dialogRef.current?.focus();

    return () => {
      unlockScroll();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [lockScroll, unlockScroll]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      trapFocus(e);
    },
    [onClose, trapFocus],
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleToggle = useCallback((id, value) => {
    setChoices((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSave = useCallback(() => onSave(choices), [onSave, choices]);

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={classNames(sharedStyles.surface, styles.dialog)}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.header}>
          <h2
            id={titleId}
            className={classNames(sharedStyles.title, "accent-underline")}
          >
            Ustawienia cookies
          </h2>
          <button
            type="button"
            aria-label="Zamknij"
            title="Zamknij"
            className={styles.closeButton}
            onClick={onClose}
          >
            <IoCloseSharp aria-hidden="true" />
          </button>
        </div>
        <div className={styles.body}>
          <p className={classNames(sharedStyles.text, "accent-links")}>
            Włącz przełącznikiem kategorie, na które wyrażasz zgodę, a następnie
            kliknij „Zapisz ustawienia”. Zgodę możesz w każdej chwili wycofać.
            Więcej informacji znajdziesz w{" "}
            <Link href={PRIVACY_POLICY_URL} onClick={onClose}>
              Polityce prywatności
            </Link>
            .
          </p>
          <ul className={styles.purposes}>
            {CONSENT_PURPOSES.map((purpose) => (
              <PurposeSwitch
                key={purpose.id}
                purpose={purpose}
                checked={purpose.required || choices[purpose.id] === true}
                onChange={handleToggle}
              />
            ))}
          </ul>
        </div>
        <div className={classNames(sharedStyles.actions, styles.footer)}>
          <ConsentButton variant="dark" onClick={onRejectAll}>
            Odrzuć wszystkie
          </ConsentButton>
          <ConsentButton variant="primary" onClick={handleSave}>
            Zapisz ustawienia
          </ConsentButton>
        </div>
      </div>
    </div>
  );
}

export default memo(ConsentPreferences);
