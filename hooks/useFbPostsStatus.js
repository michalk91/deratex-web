import { useEffect, useRef, useState } from "react";
import { useGlobalState } from "../pages/_app";

const LOAD_TIMEOUT_MS = 20000;
const SETTLE_TIME_MS = 300;
const MIN_RENDERED_POST_HEIGHT = 70;
const RENDER_STATE_ATTRIBUTE = "fb-xfbml-state";
const RENDERED_STATE = "rendered";

export const FB_POSTS_STATUS = {
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
};

function useFbPostsStatus(containerRef) {
  const [status, setStatus] = useState(FB_POSTS_STATUS.LOADING);
  const [fbSDKLoaded] = useGlobalState("fbSDKLoaded");
  const [fbSDKFailed] = useGlobalState("fbSDKFailed");
  const parsedRef = useRef(false);

  useEffect(() => {
    if (fbSDKFailed) setStatus(FB_POSTS_STATUS.ERROR);
  }, [fbSDKFailed]);

  useEffect(() => {
    if (!fbSDKLoaded || status !== FB_POSTS_STATUS.LOADING) return;

    const container = containerRef.current;
    const posts = Array.from(container.querySelectorAll(".fb-post"));
    let settleTimeoutId;

    const resolveStatus = () => {
      const allRendered = posts.every(
        (post) => post.getAttribute(RENDER_STATE_ATTRIBUTE) === RENDERED_STATE
      );
      if (!allRendered) return;

      const tallestPost = Math.max(...posts.map((post) => post.offsetHeight));
      setStatus(
        tallestPost < MIN_RENDERED_POST_HEIGHT
          ? FB_POSTS_STATUS.ERROR
          : FB_POSTS_STATUS.READY
      );
    };

    const scheduleStatusCheck = () => {
      clearTimeout(settleTimeoutId);
      settleTimeoutId = setTimeout(resolveStatus, SETTLE_TIME_MS);
    };

    const resizeObserver = new ResizeObserver(scheduleStatusCheck);
    const mutationObserver = new MutationObserver(scheduleStatusCheck);

    posts.forEach((post) => {
      resizeObserver.observe(post);
      mutationObserver.observe(post, {
        attributeFilter: [RENDER_STATE_ATTRIBUTE],
      });
    });

    const loadTimeoutId = setTimeout(
      () => setStatus(FB_POSTS_STATUS.ERROR),
      LOAD_TIMEOUT_MS
    );

    if (!parsedRef.current) {
      parsedRef.current = true;
      window.FB.XFBML.parse(container);
    }

    return () => {
      clearTimeout(settleTimeoutId);
      clearTimeout(loadTimeoutId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [containerRef, fbSDKLoaded, status]);

  return status;
}

export default useFbPostsStatus;
