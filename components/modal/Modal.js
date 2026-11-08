import styles from "./modal.module.css";
import React, { useCallback, useEffect } from "react";
import { memo } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { createPortal } from "react-dom";
import useKeyPress from "../../hooks/useKeyPress";
import classNames from "classnames";
import useScrollLock from "../../hooks/useScrollLock";
import useFocusTrap from "../../hooks/useFocusTrap";

const CLOSE_ICON_GLYPH_BOUNDS = "112 112 288 288";

export const ModalToolbarButton = memo(function ModalToolbarButton({
  label,
  onClick,
  disabled,
  className,
  children,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={classNames(styles.toolbarButton, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

function Modal({
  children,
  isOpen,
  onClose,
  keys,
  containerClassName,
  modalRef,
  toolbar,
}) {
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    isOpen ? lockScroll() : unlockScroll();
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    modalRef?.current?.focus();

    return () => previouslyFocused?.focus?.({ preventScroll: true });
  }, [isOpen, modalRef]);

  const { handleUserKeyPress } = useKeyPress({
    modalIsOpen: isOpen,
    keys,
  });

  const trapFocus = useFocusTrap(modalRef);

  const handleKeyDown = useCallback(
    (e) => {
      trapFocus(e);
      handleUserKeyPress(e);
    },
    [trapFocus, handleUserKeyPress]
  );

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Galeria zdjęć"
            className={classNames(styles.modalWrapper, containerClassName)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className={styles.toolbar}>
              {toolbar}
              <ModalToolbarButton
                label="Zamknij"
                onClick={onClose}
                className={styles.closeButton}
              >
                <IoCloseSharp viewBox={CLOSE_ICON_GLYPH_BOUNDS} />
              </ModalToolbarButton>
            </div>
            {children}
          </div>,
          document.querySelector("#modal")
        )}
    </>
  );
}

export default memo(Modal);
