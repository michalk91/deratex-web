import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "../lib/prefersReducedMotion";

const ANIMATION_OPTIONS = {
  duration: 600,
  easing: "ease-in-out",
  fill: "forwards",
};

async function animateHeight({ element, from, to, beforeRelease }) {
  const animation = element.animate(
    [
      { height: `${from}px`, overflow: "hidden" },
      { height: `${to}px`, overflow: "hidden" },
    ],
    ANIMATION_OPTIONS,
  );

  try {
    await animation.finished;
  } catch (error) {
    if (error.name === "AbortError") return;
    throw error;
  }

  beforeRelease?.();
  animation.cancel();
}

export default function useCollapsible({ onCollapse } = {}) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const collapsedSizeRef = useRef(null);
  const animatingRef = useRef(false);

  const runAnimation = useCallback(
    async ({ element, from, to, beforeRelease }) => {
      animatingRef.current = true;
      try {
        await animateHeight({ element, from, to, beforeRelease });
      } finally {
        animatingRef.current = false;
      }
    },
    [],
  );

  const expand = useCallback(
    (element) => {
      const from = element.offsetHeight;
      collapsedSizeRef.current = { height: from, width: element.offsetWidth };
      flushSync(() => setExpanded(true));
      runAnimation({ element, from, to: element.offsetHeight });
    },
    [runAnimation],
  );

  const collapse = useCallback(
    (element) => {
      onCollapse?.();

      const collapsedSize = collapsedSizeRef.current;
      if (!collapsedSize || collapsedSize.width !== element.offsetWidth) {
        setExpanded(false);
        return;
      }

      runAnimation({
        element,
        from: element.offsetHeight,
        to: collapsedSize.height,
        beforeRelease: () => flushSync(() => setExpanded(false)),
      });
    },
    [onCollapse, runAnimation],
  );

  const toggle = useCallback(() => {
    const element = containerRef.current;
    if (!element || animatingRef.current) return;

    if (prefersReducedMotion()) {
      if (expanded) onCollapse?.();
      setExpanded(!expanded);
      return;
    }

    if (expanded) collapse(element);
    else expand(element);
  }, [expanded, expand, collapse, onCollapse]);

  return { expanded, toggle, containerRef };
}
