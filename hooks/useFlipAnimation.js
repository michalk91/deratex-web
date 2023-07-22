import { useLayoutEffect } from "react";

function useFlipAnimation({
  flipKey,
  onCloseAnimationStart,
  onCloseAnimationEnd,
  firstElemRef,
  modalElemRef,
  animDuration = 280,
  imgLoaded,
}) {
  const modalElemDimCache = modalElemRef?.current?.getBoundingClientRect(); //cache elem in modal dimensions for close animation

  useLayoutEffect(() => {
    const firstElem = firstElemRef?.current;
    const modalElem = modalElemRef?.current;
    const firstDim = firstElem?.getBoundingClientRect();
    const modalDim = modalElem?.getBoundingClientRect();

    const getDelta = (first, second) => ({
      translateY:
        first.top + first.height / 2 - (second.top + second.height / 2),
      translateX:
        first.left + first.width / 2 - (second.left + second.width / 2),
      scaleWidth: first.width / second.width,
      scaleHeight: first.height / second.height,
    });

    const invertAndPlay = (delta, elem, animDir) => {
      const { translateX, translateY, scaleHeight, scaleWidth } = delta;

      const animation = elem.animate(
        [
          {
            transform: ` translate(${translateX}px, ${translateY}px) scale(${scaleWidth}, ${scaleHeight})`,
          },
          {
            transform: `none`,
          },
        ],
        {
          easing: animDir === "open" ? "ease-in" : "ease-out",
          duration: animDuration,
        }
      );
      animation.ready.then(
        () => (elem.style.zIndex = "10"),
        animDir === "close" &&
          onCloseAnimationStart &&
          onCloseAnimationStart(elem)
      );
      animation.onfinish = () => {
        animDir === "close" && onCloseAnimationEnd && onCloseAnimationEnd(elem);
      };
    };

    const openAnimation = () => {
      if (!firstDim || !modalDim) return;

      const animDir = "open";
      const delta = getDelta(firstDim, modalDim);

      invertAndPlay(delta, modalElem, animDir);
    };

    const closeAnimation = () => {
      if (!modalElemDimCache) return;

      const animDir = "close";
      const delta = getDelta(modalElemDimCache, firstDim);

      invertAndPlay(delta, firstElem, animDir);
    };

    if (flipKey && imgLoaded) {
      openAnimation();
    } else if (!flipKey) {
      closeAnimation();
    }
  }, [flipKey, animDuration, imgLoaded]);
}

export default useFlipAnimation;
