export const IUBENDA_SCRIPT_URL = "https://cdn.iubenda.com/cs/iubenda_cs.js";

const COOKIE_POLICY_ID = 59954157;
const SITE_ID = 4301840;

export const PRIVACY_POLICY_URL = `https://www.iubenda.com/privacy-policy/${COOKIE_POLICY_ID}`;
export const COOKIE_POLICY_URL = `${PRIVACY_POLICY_URL}/cookie-policy`;

export const IUBENDA_CONFIG = {
  cookiePolicyId: COOKIE_POLICY_ID,
  siteId: SITE_ID,
  lang: "pl",
  cookiePolicyInOtherWindow: true,
  floatingPreferencesButtonDisplay: "bottom-left",
  banner: {
    position: "float-bottom-center",
    acceptButtonDisplay: true,
    customizeButtonDisplay: true,
    rejectButtonDisplay: true,
    closeButtonDisplay: false,
    explicitWithdrawal: true,
    listPurposes: true,
    backgroundOverlay: false,
    showTitle: true,
    backgroundColor: "#ffffff",
    textColor: "#222222",
  },
};

export const CONSENT_CHANGE_EVENT = "iubenda:consent-change";

const CONSENT_PURPOSE = {
  EXPERIENCE: "3",
};

export const SERVICE_CONSENT = {
  googleMaps: [CONSENT_PURPOSE.EXPERIENCE],
  facebook: [CONSENT_PURPOSE.EXPERIENCE],
};

export const IUBENDA_CONFIG_SCRIPT = `
var _iub = _iub || [];
_iub.csConfiguration = ${JSON.stringify(IUBENDA_CONFIG)};
(function () {
  function notifyConsentChange() {
    window.dispatchEvent(new Event("${CONSENT_CHANGE_EVENT}"));
  }
  _iub.csConfiguration.callback = {
    onReady: notifyConsentChange,
    onConsentRead: notifyConsentChange,
    onPreferenceExpressed: notifyConsentChange,
  };
})();
`;

export const getConsentedPurposes = () =>
  (typeof window !== "undefined" &&
    window._iub?.cs?.api?.getPreferences?.()?.purposes) ||
  {};

export const openCookiePreferences = () =>
  window._iub?.cs?.api?.openPreferences();
