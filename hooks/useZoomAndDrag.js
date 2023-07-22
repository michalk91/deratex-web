import { useState, useCallback, useEffect } from "react";

function useZoomAndDrag({ resetZoom }) {
  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    originX: 0,
    originY: 0,
    transitionX: 0,
    transitionY: 0,
    lastX: 0,
    lastY: 0,
    zoom: 1,
  });

  useEffect(() => {
    if (dragInfo.zoom === 1) {
      setDragInfo((state) => ({
        ...state,
        isDragging: false,
        originX: 0,
        originY: 0,
        transitionX: 0,
        transitionY: 0,
        lastX: 0,
        lastY: 0,
      }));
    }
  }, [dragInfo.zoom]);

  const depArray =
    typeof resetZoom === Object || Array
      ? JSON.stringify(resetZoom)
      : resetZoom;

  useEffect(() => {
    setDragInfo((state) => ({
      ...state,
      zoom: 1,
    }));
  }, [depArray]);

  const handleIncreaseZoom = useCallback(() => {
    setDragInfo((state) => ({
      ...state,
      zoom: state.zoom < 2 ? state.zoom + 0.5 : 2,
    }));
  }, []);

  const handleDecreaseZoom = useCallback(() => {
    setDragInfo((state) => ({
      ...state,
      zoom: state.zoom > 1 ? state.zoom - 0.5 : 1,
    }));
  }, []);

  const handleResetZoom = useCallback(() => {
    setDragInfo((state) => ({
      ...state,
      zoom: 1,
    }));
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      if (dragInfo.zoom === 1) return;
      e.preventDefault();

      const currentPosX = e.clientX / dragInfo.zoom;
      const currentPosY = e.clientY / dragInfo.zoom;

      setDragInfo((state) => ({
        ...state,
        isDragging: true,
        originX: currentPosX - state.lastX,
        originY: currentPosY - state.lastY,
      }));
    },
    [dragInfo.zoom]
  );

  const onDragStart = useCallback(
    (e) => {
      if (dragInfo.zoom === 1) return;
      e.preventDefault();

      const currentPosX = Number(e.touches[0].clientX) / dragInfo.zoom;
      const currentPosY = Number(e.touches[0].clientY) / dragInfo.zoom;

      setDragInfo((state) => ({
        ...state,
        isDragging: true,
        originX: currentPosX - state.lastX,
        originY: currentPosY - state.lastY,
      }));
    },
    [dragInfo.zoom]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragInfo.isDragging) return;

      setDragInfo((state) => ({
        ...state,
        transitionX: e.clientX / state.zoom - state.originX,
        transitionY: e.clientY / state.zoom - state.originY,
      }));
    },
    [dragInfo.isDragging]
  );

  const onDraging = useCallback(
    (e) => {
      if (!dragInfo.isDragging) return;

      setDragInfo((state) => ({
        ...state,
        transitionX: Number(e.touches[0].clientX) / state.zoom - state.originX,
        transitionY: Number(e.touches[0].clientY) / state.zoom - state.originY,
      }));
    },
    [dragInfo.isDragging]
  );

  const onMouseUp = useCallback(() => {
    setDragInfo((state) => ({
      ...state,
      isDragging: false,
      originX: 0,
      originY: 0,
      lastX: state.transitionX,
      lastY: state.transitionY,
    }));
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onDraging);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onDraging);
    };
  }, [onMouseUp, onMouseMove, onDraging]);

  return {
    onMouseDown,
    onDragStart,
    dragTransitionX: dragInfo.transitionX,
    dragTransitionY: dragInfo.transitionY,
    handleDecreaseZoom,
    handleIncreaseZoom,
    handleResetZoom,
    zoom: dragInfo.zoom,
    isDragging: dragInfo.isDragging,
  };
}

export default useZoomAndDrag;
