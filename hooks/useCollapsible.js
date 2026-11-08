import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";

const ANIMATION_OPTIONS = {
  duration: 600,
  easing: "ease-in-out",
  fill: "forwards",
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function animateHeight(element, from, to, beforeRelease) {
  const animation = element.animate(
    [
      { height: `${from}px`, overflow: "hidden" },
      { height: `${to}px`, overflow: "hidden" },
    ],
    ANIMATION_OPTIONS,
  );

  await animation.finished;
  beforeRelease?.();
  animation.cancel();
}

export default function useCollapsible() {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const collapsedSizeRef = useRef(null);
  const animatingRef = useRef(false);

  const runAnimation = useCallback(async (...args) => {
    animatingRef.current = true;
    try {
      await animateHeight(...args);
    } finally {
      animatingRef.current = false;
    }
  }, []);

  const toggle = useCallback(() => {
    const element = containerRef.current;
    if (!element || animatingRef.current) return false;

    if (prefersReducedMotion()) {
      setExpanded(!expanded);
      return true;
    }

    const currentHeight = element.offsetHeight;

    if (!expanded) {
      collapsedSizeRef.current = {
        height: currentHeight,
        width: element.offsetWidth,
      };
      flushSync(() => setExpanded(true));
      runAnimation(element, currentHeight, element.offsetHeight);
      return true;
    }

    const collapsedSize = collapsedSizeRef.current;
    if (!collapsedSize || collapsedSize.width !== element.offsetWidth) {
      setExpanded(false);
      return true;
    }

    runAnimation(element, currentHeight, collapsedSize.height, () =>
      flushSync(() => setExpanded(false)),
    );
    return true;
  }, [expanded, runAnimation]);

  return { expanded, toggle, containerRef };
}
