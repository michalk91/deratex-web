export const IUBENDA_SCRIPT_URL = "https://cdn.iubenda.com/cs/iubenda_cs.js";

const COOKIE_POLICY_ID = 59954157;
const SITE_ID = 4301840;

export const COOKIE_POLICY_URL = `https://www.iubenda.com/privacy-policy/${COOKIE_POLICY_ID}/cookie-policy`;

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

export const openCookiePreferences = () =>
  window._iub?.cs?.api?.openPreferences();
