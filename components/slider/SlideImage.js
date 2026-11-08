import { memo } from "react";
import Image from "next/image";

const MOBILE_MAX_WIDTH = 828;
const DESKTOP_QUALITY = 100;
const MOBILE_QUALITY = 40;

const slideLoader = ({ src, width }) => {
  const quality = width <= MOBILE_MAX_WIDTH ? MOBILE_QUALITY : DESKTOP_QUALITY;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

function SlideImage({ slide, loading, fetchPriority, onLoad }) {
  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      loader={slideLoader}
      fill
      placeholder="blur"
      sizes="100vw"
      loading={loading}
      fetchPriority={fetchPriority}
      onLoad={onLoad}
    />
  );
}

export default memo(SlideImage);
