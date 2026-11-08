import { memo, useCallback, useId, useRef } from "react";
import classNames from "classnames";
import RichLightboxGallery from "../lightboxGallery/RichLightboxGallery";
import useCollapsible from "../../hooks/useCollapsible";
import { prefersReducedMotion } from "../../lib/prefersReducedMotion";
import { GALLERY_IMAGES } from "../../data/galleryImages";
import styles from "./gallery.module.css";

const COLLAPSED_GALLERY_IMAGES = GALLERY_IMAGES.slice(0, 14);

function Gallery() {
  const galleryRef = useRef(null);
  const imagesId = useId();

  const scrollToGallery = useCallback(() => {
    galleryRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const { expanded, toggle, containerRef } = useCollapsible({
    onCollapse: scrollToGallery,
  });

  const imagesToDisplay = expanded ? GALLERY_IMAGES : COLLAPSED_GALLERY_IMAGES;

  return (
    <section className={styles.galleryOuterContainer} ref={galleryRef}>
      <h2 className="title">Galeria</h2>
      <div className="graySection">
        <div id={imagesId} ref={containerRef}>
          <RichLightboxGallery
            virtualized
            key={imagesToDisplay.length}
            items={imagesToDisplay}
            imgContainerClassName={styles.imgContainer}
            lightboxContainerClassName={classNames(
              styles.container,
              "innerContentWidth",
            )}
            thumbnailWithBorderRadius
            zoomedImgSizes="40vw"
          />
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={imagesId}
          className={styles.toggleButton}
        >
          <span aria-hidden="true" className={styles.arrowIcon}>
            {expanded ? "▲" : "▼"}
          </span>{" "}
          {expanded ? "Zamknij galerię" : "Zobacz całą galerię"}
        </button>
      </div>
    </section>
  );
}

export default memo(Gallery);
