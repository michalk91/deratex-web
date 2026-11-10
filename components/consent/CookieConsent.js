import { memo, useCallback, useEffect, useState } from "react";
import ConsentBanner from "./ConsentBanner";
import ConsentPreferences from "./ConsentPreferences";
import { useConsentState } from "../../hooks/useConsent";
import {
  ALL_GRANTED,
  OPEN_PREFERENCES_EVENT,
  isConsentWithdrawn,
  readConsent,
  saveConsent,
} from "../../lib/consent";

function CookieConsent() {
  const { isReady, consent, hasDecided } = useConsentState();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, [openPreferences]);

  const save = useCallback((choices) => {
    const shouldReload = isConsentWithdrawn(readConsent()?.purposes, choices);

    saveConsent(choices);
    setPreferencesOpen(false);

    if (shouldReload) window.location.reload();
  }, []);

  const acceptAll = useCallback(() => save(ALL_GRANTED), [save]);
  const rejectAll = useCallback(() => save({}), [save]);

  if (!isReady) return null;

  return (
    <>
      {!hasDecided && !preferencesOpen && (
        <ConsentBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onCustomize={openPreferences}
        />
      )}
      {preferencesOpen && (
        <ConsentPreferences
          initialPurposes={consent?.purposes}
          onSave={save}
          onRejectAll={rejectAll}
          onClose={closePreferences}
        />
      )}
    </>
  );
}

export default memo(CookieConsent);
