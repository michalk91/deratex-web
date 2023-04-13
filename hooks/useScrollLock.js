import { useCallback } from "react";

function useScrollLock() {

    const lockScroll = useCallback(
        () => {
          const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollBarCompensation}px`;
        }, []);

        const unlockScroll = useCallback(() => {
          document.body.style.overflow = '';
          document.body.style.paddingRight = ''
        }, [])

  return {lockScroll, unlockScroll};
}

export default useScrollLock;