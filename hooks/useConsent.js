import { useSyncExternalStore } from "react";
import { readConsent, subscribeToConsent } from "../lib/consent";

const NOT_HYDRATED = Symbol("not-hydrated");

const getServerSnapshot = () => NOT_HYDRATED;

export function useConsentState() {
  const snapshot = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    getServerSnapshot,
  );
  const isReady = snapshot !== NOT_HYDRATED;
  const consent = isReady ? snapshot : null;

  return { isReady, consent, hasDecided: consent !== null };
}

function useConsent(requiredPurposes) {
  const { consent } = useConsentState();

  return requiredPurposes.every(
    (purpose) => consent?.purposes?.[purpose] === true,
  );
}

export default useConsent;
