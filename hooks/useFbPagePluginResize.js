import { useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

function useFbPagePluginResize({
  minFbPageHeight,
  minFbPageWidth,
  maxFbPageWidth,
  containerRef,
}) {
  const [resize, setResize] = useState(false);
  const [fbPageWidth, setFbPageWidth] = useState(0);
  const [fbPageHeight, setFbPageHeight] = useState(0);

  const resizeHandler = useDebouncedCallback(() => {
    setResize((resize) => !resize);
  }, 1000);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      if (
        containerRef.current.offsetWidth <= maxFbPageWidth &&
        containerRef.current.offsetWidth >= minFbPageWidth
      ) {
        setFbPageWidth(containerRef.current.offsetWidth);
      } else if (containerRef.current.offsetWidth > maxFbPageWidth) {
        setFbPageWidth(maxFbPageWidth);
      } else if (containerRef.current.offsetWidth < minFbPageWidth) {
        setFbPageWidth(minFbPageWidth);
      }
      if (containerRef.current.offsetHeight > minFbPageHeight) {
        setFbPageHeight(containerRef.current.offsetHeight);
      } else {
        setFbPageHeight(minFbPageHeight);
      }
    }
  }, [resize]);

  useEffect(() => {
    if (window.FB && containerRef.current) {
      FB.XFBML.parse(containerRef.current);
    }
  }, [fbPageWidth, fbPageHeight]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return {
    fbPageWidth,
    fbPageHeight,
  };
}

export default useFbPagePluginResize;
