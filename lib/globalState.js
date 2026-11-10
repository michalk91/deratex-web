import { createGlobalState } from "react-hooks-global-state";

export const { useGlobalState, setGlobalState } = createGlobalState({
  fbSDKLoaded: false,
  cookiePreferencesOpen: false,
});
