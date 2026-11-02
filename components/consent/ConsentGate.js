import useConsent from "../../hooks/useConsent";

function ConsentGate({ purposes, fallback, children }) {
  const hasConsent = useConsent(purposes);

  return hasConsent ? children : fallback;
}

export default ConsentGate;
