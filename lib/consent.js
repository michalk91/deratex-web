import { CONSENT_PURPOSES } from "../data/consentPurposes";

const CONSENT_STORAGE_KEY = "deratex-consent";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const CONSENT_CHANGE_EVENT = "consent:change";
export const OPEN_PREFERENCES_EVENT = "consent:open-preferences";

export const PRIVACY_POLICY_URL = "/polityka-prywatnosci";

export const SERVICE_CONSENT = {
  googleMaps: ["experience"],
  facebook: ["experience"],
};

export const ALL_GRANTED = Object.fromEntries(
  CONSENT_PURPOSES.map(({ id }) => [id, true]),
);

let fallbackRaw = null;
let cachedRaw;
let cachedConsent = null;

const isValidConsent = (consent) =>
  consent?.version === CONSENT_VERSION &&
  Number.isFinite(consent.timestamp) &&
  Date.now() - consent.timestamp <= CONSENT_MAX_AGE_MS &&
  typeof consent.purposes === "object" &&
  consent.purposes !== null;

const parseConsent = (raw) => {
  try {
    const consent = JSON.parse(raw);
    return isValidConsent(consent) ? consent : null;
  } catch {
    return null;
  }
};

const readRaw = () => {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? fallbackRaw;
  } catch {
    return fallbackRaw;
  }
};

const writeRaw = (raw) => {
  fallbackRaw = raw;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, raw);
  } catch {
    return;
  }
};

export const readConsent = () => {
  const raw = readRaw();

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedConsent = raw ? parseConsent(raw) : null;
  }

  return cachedConsent;
};

export const isConsentWithdrawn = (previousPurposes, choices) =>
  CONSENT_PURPOSES.some(
    ({ id }) => previousPurposes?.[id] === true && choices[id] !== true,
  );

export const saveConsent = (choices) => {
  const purposes = Object.fromEntries(
    CONSENT_PURPOSES.map(({ id, required }) => [
      id,
      required || choices[id] === true,
    ]),
  );

  writeRaw(
    JSON.stringify({
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      purposes,
    }),
  );

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
};

export const subscribeToConsent = (callback) => {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

export const openCookiePreferences = () =>
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
