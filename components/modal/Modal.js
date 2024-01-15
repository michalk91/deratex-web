import styles from "./modal.module.css";
import React, { useEffect } from "react";
import { memo } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { createPortal } from "react-dom";
import useKeyPress from "../../hooks/useKeyPress";
import classNames from "classnames";
import useScrollLock from "../../hooks/useScrollLock";

function Modal({
  children,
  isOpen,
  onClose,
  keys,
  containerClassName,
  modalRef,
}) {
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    isOpen ? lockScroll() : unlockScroll();
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    if (!isOpen) return;

    modalRef?.current?.focus();
  }, [isOpen, modalRef]);

  const { handleUserKeyPress } = useKeyPress({
    modalIsOpen: isOpen,
    keys,
  });

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            ref={modalRef}
            className={classNames(styles.modalWrapper, containerClassName)}
            onKeyDown={handleUserKeyPress}
            tabIndex={0}
          >
            <IoCloseSharp className={styles.closeBtn} onClick={onClose} />
            {children}
          </div>,
          document.querySelector("#modal")
        )}
    </>
  );
}

export default memo(Modal);
