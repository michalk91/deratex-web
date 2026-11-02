import { useEffect, useCallback, useId } from "react";
import { useInViewport } from "react-in-viewport";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  selectedID: "",
  instancesCount: 0,
};
const { useGlobalState } = createGlobalState(initialState);

const useKeyPress = ({ inViewportRef, hover, modalIsOpen, keys }) => {
  const { inViewport } = useInViewport(
    inViewportRef !== undefined ? inViewportRef : ""
  );
  const [selectedID, setSelectedID] = useGlobalState("selectedID");
  const [instancesCount, setInstancesCount] = useGlobalState("instancesCount");

  const id = useId();

  const handleUserKeyPress = useCallback(
    (e) => {
      const matchedKey = keys?.find((item) => item.key === e.key);

      if (modalIsOpen) e.stopPropagation();
      if (!matchedKey) return;

      if (modalIsOpen) e.preventDefault();
      matchedKey.action();
    },
    [modalIsOpen, keys]
  );

  useEffect(() => {
    if (inViewport) setInstancesCount((prevState) => prevState + 1);
    else if (!inViewport) {
      setInstancesCount((prevState) =>
        prevState > 0 ? prevState - 1 : prevState
      );
    }
  }, [inViewport]); // eslint-disable-line

  useEffect(() => {
    setSelectedID(id);
  }, [hover]); // eslint-disable-line

  useEffect(() => {
    if (!inViewport) return;

    if (selectedID === id || instancesCount === 1) {
      document.addEventListener("keydown", handleUserKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [selectedID, instancesCount]); // eslint-disable-line

  return { inViewport, handleUserKeyPress };
};
export default useKeyPress;
