import React, { memo, useRef } from "react";
import styles from "./thumbnail.module.css";
import classNames from "classnames";
import { useEffect } from "react";
import Image from "next/image";

const Thumbnail = memo(function Thumbnail({
  index,
  onNavigate,
  activeIndex,
  item,
  isScrollableX,
  thumbnailsOptions,
}) {
  const thumbRef = useRef(null);
  useEffect(() => {
    if (!isScrollableX) return;

    if (index === activeIndex) {
      setTimeout(() => {
        thumbRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }, 50); // HACK: Fixes horizontal scrolling using scrollIntoView
    }
  }, [activeIndex, isScrollableX, index]);

  const {
    thumbnailHeight,
    thumbnailWidth,
    thumbnailWithBorderRadius = true,
    keepRatio = false,
  } = thumbnailsOptions ?? {};

  return (
    <div className={styles.container}>
      <div
        ref={thumbRef}
        data-id={index}
        className={classNames(styles.thumbnail, {
          [styles.thumbnailWithBorderRadius]: thumbnailWithBorderRadius,
          [styles.active]: index === activeIndex,
          [styles.thumbnailBasicDim]: !keepRatio,
        })}
        style={{
          aspectRatio: keepRatio ? `${[item.width / item.height]}` : undefined,
          width:
            (!keepRatio && thumbnailWidth && thumbnailHeight) ||
            (keepRatio && thumbnailWidth && !thumbnailHeight)
              ? thumbnailWidth
              : undefined,
          height:
            (!keepRatio && thumbnailHeight && thumbnailWidth) ||
            (keepRatio && thumbnailHeight && !thumbnailWidth)
              ? thumbnailHeight
              : undefined,
        }}
        onClick={onNavigate}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={true}
          sizes="5vw"
          style={{ objectFit: "cover" }}
          quality={1}
        />
      </div>
    </div>
  );
});

export default Thumbnail;
