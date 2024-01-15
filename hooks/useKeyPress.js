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
      const { key } = e;

      if (modalIsOpen) {
        e.stopPropagation();
        e.preventDefault();
      }

      keys?.map((item) => {
        if (key === item.key) {
          item.action();
        }
      });
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
  }, [inViewport]);

  useEffect(() => {
    setSelectedID(id);
  }, [hover]);

  useEffect(() => {
    if (!inViewport) return;

    if (selectedID === id || instancesCount === 1) {
      document.addEventListener("keydown", handleUserKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [selectedID, instancesCount]);

  return { inViewport, handleUserKeyPress };
};
export default useKeyPress;
