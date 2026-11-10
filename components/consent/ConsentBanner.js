import { memo, useId } from "react";
import Link from "next/link";
import classNames from "classnames";
import ConsentButton from "./ConsentButton";
import sharedStyles from "./cookieConsent.module.css";
import styles from "./consentBanner.module.css";
import { PRIVACY_POLICY_URL } from "../../lib/consent";

function ConsentBanner({ onAcceptAll, onRejectAll, onCustomize }) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={classNames(sharedStyles.surface, styles.banner)}
    >
      <h2
        id={titleId}
        className={classNames(sharedStyles.title, "accent-underline")}
      >
        Szanujemy Twoją prywatność
      </h2>
      <p
        id={descriptionId}
        className={classNames(sharedStyles.text, "accent-links")}
      >
        Używamy plików cookies i podobnych technologii. Niezbędne zapewniają
        działanie strony i chronią formularz kontaktowy przed spamem. Za Twoją
        zgodą wyświetlimy również <strong>mapę Google</strong> oraz{" "}
        <strong>treści z Facebooka</strong>, których dostawcy mogą zapisywać
        własne pliki cookies. Swój wybór możesz zmienić w każdej chwili,
        klikając „Ustawienia cookies” w stopce strony. Szczegóły znajdziesz w{" "}
        <Link href={PRIVACY_POLICY_URL}>Polityce prywatności</Link>.
      </p>
      <div className={sharedStyles.actions}>
        <ConsentButton variant="secondary" onClick={onCustomize}>
          Dostosuj
        </ConsentButton>
        <ConsentButton variant="dark" onClick={onRejectAll}>
          Odrzuć
        </ConsentButton>
        <ConsentButton variant="primary" onClick={onAcceptAll}>
          Akceptuj
        </ConsentButton>
      </div>
    </section>
  );
}

export default memo(ConsentBanner);
