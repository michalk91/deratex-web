import { memo, useCallback } from "react";
import ConsentBanner from "./ConsentBanner";
import ConsentPreferences from "./ConsentPreferences";
import { useConsentState } from "../../hooks/useConsent";
import { useGlobalState } from "../../lib/globalState";
import {
  ALL_GRANTED,
  isConsentWithdrawn,
  readConsent,
  saveConsent,
} from "../../lib/consent";

function CookieConsent() {
  const { isReady, consent, hasDecided } = useConsentState();
  const [preferencesOpen, setPreferencesOpen] = useGlobalState(
    "cookiePreferencesOpen",
  );

  const openPreferences = useCallback(
    () => setPreferencesOpen(true),
    [setPreferencesOpen],
  );
  const closePreferences = useCallback(
    () => setPreferencesOpen(false),
    [setPreferencesOpen],
  );

  const save = useCallback(
    (choices) => {
      const shouldReload = isConsentWithdrawn(readConsent()?.purposes, choices);

      saveConsent(choices);
      setPreferencesOpen(false);

      if (shouldReload) window.location.reload();
    },
    [setPreferencesOpen],
  );

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
