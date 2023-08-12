import { useState, useCallback, useEffect, useRef } from "react";

function useZoomAndDrag({
  resetZoom,
  bottomCompensation,
  boundaryResistance = 30,
}) {
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

  const dragMargin = useRef({
    target: null,
    marginSetY: false,
    marginSetX: false,
    marginTop: 0,
    marginLeft: 0,
    widderThanViewport: false,
    higherThanViewport: false,
  }).current;

  const depArray =
    typeof resetZoom === Object || Array
      ? JSON.stringify(resetZoom)
      : resetZoom;

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
      transitionX: 0,
      transitionY: 0,
      lastX: 0,
      lastY: 0,
    }));
  }, []);

  const handleResetZoom = useCallback(() => {
    setDragInfo((state) => ({
      ...state,
      zoom: 1,
    }));
  }, []);

  const isBiggerThanViewport = useCallback(
    ({ offsetHeight, offsetWidth, zoom }) => {
      const isWidderThanViewport = offsetWidth * zoom > window.innerWidth;
      const isHigherThanViewport = offsetHeight * zoom > window.innerHeight;

      return { isWidderThanViewport, isHigherThanViewport };
    },
    []
  );

  const getLimitedState = useCallback(
    ({ min, max, value }) => Math.min(min, Math.max(value, max)),
    []
  );

  const calculateOverMargin = useCallback(
    ({
      transitionX,
      transitionY,
      marginTop,
      marginLeft,
      zoom,
      bottomCompensation,
    }) => {
      const overMarginedY =
        transitionY !== 0 &&
        (transitionY > marginTop ||
          transitionY < -marginTop + bottomCompensation / zoom);

      const overMarginedX =
        transitionX !== 0 &&
        (transitionX > marginLeft || transitionX < -marginLeft);

      const overMarginY = overMarginedY
        ? transitionY > 0
          ? transitionY - marginTop
          : transitionY + marginTop - bottomCompensation / zoom
        : 0;
      const overMarginX = overMarginedX
        ? transitionX > 0
          ? transitionX - marginLeft
          : transitionX + marginLeft
        : 0;
      return { overMarginX, overMarginY };
    },
    []
  );

  useEffect(() => {
    dragMargin.marginSetY = false;
    dragMargin.marginSetX = false;

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
  }, [dragInfo.zoom, dragMargin]);

  useEffect(() => {
    const top = dragMargin?.target?.getBoundingClientRect?.().top;
    const left = dragMargin?.target?.getBoundingClientRect?.().left;

    if (dragInfo.isDragging && !dragMargin.marginSetY) {
      dragMargin.marginTop = Math.abs(top / dragInfo.zoom) + dragInfo.lastY;
      dragMargin.marginSetY = true;
    }
    if (dragInfo.isDragging && !dragMargin.marginSetX) {
      dragMargin.marginLeft = Math.abs(left / dragInfo.zoom) + dragInfo.lastX;
      dragMargin.marginSetX = true;
    }
  }, [
    dragMargin,
    dragInfo.isDragging,
    dragInfo.zoom,
    dragInfo.lastY,
    dragInfo.lastX,
  ]);

  useEffect(() => {
    const { isHigherThanViewport, isWidderThanViewport } = isBiggerThanViewport(
      {
        offsetHeight: dragMargin?.target?.offsetHeight,
        offsetWidth: dragMargin?.target?.offsetWidth,
        zoom: dragInfo.zoom,
      }
    );
    dragMargin.higherThanViewport = isHigherThanViewport;
    dragMargin.widderThanViewport = isWidderThanViewport;
  }, [dragInfo, dragMargin, isBiggerThanViewport]);

  useEffect(() => {
    handleResetZoom();
  }, [depArray]);

  const onMouseDown = useCallback(
    (e) => {
      dragMargin.target = e.currentTarget;
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
    [dragInfo.zoom, dragMargin]
  );

  const onDragStart = useCallback(
    (e) => {
      dragMargin.target = e.currentTarget;
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
    [dragInfo.zoom, dragMargin]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragInfo.isDragging) return;

      setDragInfo((state) => ({
        ...state,

        transitionX: dragMargin.widderThanViewport
          ? getLimitedState({
              min: dragMargin.marginLeft + boundaryResistance,
              max: -dragMargin.marginLeft - boundaryResistance,
              value: e.clientX / state.zoom - state.originX,
            })
          : 0,

        transitionY: dragMargin.higherThanViewport
          ? getLimitedState({
              min: dragMargin.marginTop + boundaryResistance,
              max:
                -dragMargin.marginTop +
                bottomCompensation / state.zoom -
                boundaryResistance,
              value: e.clientY / state.zoom - state.originY,
            })
          : 0,
      }));
    },
    [
      dragMargin,
      bottomCompensation,
      boundaryResistance,
      dragInfo,
      getLimitedState,
    ]
  );

  const onDraging = useCallback(
    (e) => {
      if (!dragInfo.isDragging) return;

      setDragInfo((state) => ({
        ...state,

        transitionX: dragMargin.widderThanViewport
          ? getLimitedState({
              min: dragMargin.marginLeft + boundaryResistance,
              max: -dragMargin.marginLeft - boundaryResistance,
              value: Number(e.touches[0].clientX) / state.zoom - state.originX,
            })
          : 0,

        transitionY: dragMargin.higherThanViewport
          ? getLimitedState({
              min: dragMargin.marginTop + boundaryResistance,
              max:
                -dragMargin.marginTop +
                bottomCompensation / state.zoom -
                boundaryResistance,
              value: Number(e.touches[0].clientY) / state.zoom - state.originY,
            })
          : 0,
      }));
    },
    [
      dragInfo.isDragging,
      bottomCompensation,
      boundaryResistance,
      getLimitedState,
      dragMargin.higherThanViewport,
      dragMargin.widderThanViewport,
      dragMargin.marginLeft,
      dragMargin.marginTop,
    ]
  );

  const onMouseUp = useCallback(() => {
    const { overMarginX, overMarginY } = calculateOverMargin({
      transitionX: dragInfo.transitionX,
      transitionY: dragInfo.transitionY,
      zoom: dragInfo.zoom,
      marginTop: dragMargin.marginTop,
      marginLeft: dragMargin.marginLeft,
      bottomCompensation: bottomCompensation,
    });

    setDragInfo((state) => ({
      ...state,
      isDragging: false,
      originX: 0,
      originY: 0,
      transitionX: state.transitionX - overMarginX,
      transitionY: state.transitionY - overMarginY,
      lastX: state.transitionX - overMarginX,
      lastY: state.transitionY - overMarginY,
    }));

    console.log("hehe", dragInfo, dragMargin);
  }, [bottomCompensation, dragInfo, dragMargin, calculateOverMargin]);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onDraging);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onDraging);
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
