import { memo, useCallback, useState } from "react";
import { getImageProps } from "next/image";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const DESKTOP_QUALITY = 100;
const MOBILE_QUALITY = 40;

function SlideImage({ slide, loading, fetchPriority, onLoaded }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    onLoaded?.();
  }, [onLoaded]);

  const imgRef = useCallback(
    (img) => {
      if (img?.complete && img.naturalWidth) handleLoaded();
    },
    [handleLoaded],
  );

  const imageProps = {
    src: slide.src,
    alt: slide.alt,
    fill: true,
    placeholder: loaded ? "empty" : "blur",
    sizes: "100vw",
    loading,
    fetchPriority,
  };
  const { props: desktop } = getImageProps({
    ...imageProps,
    quality: DESKTOP_QUALITY,
  });
  const { props: mobile } = getImageProps({
    ...imageProps,
    quality: MOBILE_QUALITY,
  });

  return (
    <picture>
      <source
        media={MOBILE_MEDIA_QUERY}
        srcSet={mobile.srcSet}
        sizes={mobile.sizes}
      />
      <img {...desktop} ref={imgRef} decoding="sync" onLoad={handleLoaded} />
    </picture>
  );
}

export default memo(SlideImage);
