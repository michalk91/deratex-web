import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, getConsentedPurposes } from "../lib/iubenda";

function useConsent(requiredPurposes) {
  const [purposes, setPurposes] = useState({});

  useEffect(() => {
    const refreshPurposes = () => setPurposes(getConsentedPurposes());

    refreshPurposes();
    window.addEventListener(CONSENT_CHANGE_EVENT, refreshPurposes);

    return () =>
      window.removeEventListener(CONSENT_CHANGE_EVENT, refreshPurposes);
  }, []);

  return requiredPurposes.every((purpose) => purposes[purpose] === true);
}

export default useConsent;
