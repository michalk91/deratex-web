import { useState, useCallback, useEffect, useRef } from "react";

function useZoomAndDrag({
  bottomCompensation,
  boundaryResistance = 50,
  maxZoom = 3,
  doubleTapSensivity = 300,
  minDistBetweenFingers = 80,
}) {
  const [zoomInfo, setZoomInfo] = useState({
    allowDragAndZoom: true,
    isDragging: false,
    isZooming: false,
    doubleTapped: false,
    originX: 0,
    originY: 0,
    transitionX: 0,
    transitionY: 0,
    zoom: 1,
  });

  const zoomInfoRef = useRef({
    startDistance: 0,
    lastX: 0,
    lastY: 0,
    lastZoom: 1,
    marginTop: 0,
    marginLeft: 0,
    fingersStart: 0,
    widderThanViewport: false,
    higherThanViewport: false,
    startZoomPosX: 0,
    startZoomPosY: 0,
  }).current;

  const tapInfoRef = useRef({
    lastTap: 0,
    timeout: null,
  }).current;

  const enableDragAndZoom = useCallback(() => {
    setZoomInfo((state) => ({
      ...state,
      allowDragAndZoom: true,
    }));
  }, []);

  const disableDragAndZoom = useCallback(() => {
    setZoomInfo((state) => ({
      ...state,
      allowDragAndZoom: false,
    }));
  }, []);

  const getLimitedState = useCallback(
    ({ min, max, value }) => Math.min(max, Math.max(value, min)),
    []
  );

  const getDragBoundries = useCallback(
    ({ target, zoom }) => {
      const marginTop =
        (target?.clientHeight * zoom -
          (window.innerHeight - bottomCompensation)) /
        2 /
        zoom;

      const marginLeft =
        (target?.clientWidth * zoom - window.innerWidth) / 2 / zoom;

      return { marginTop, marginLeft };
    },
    [bottomCompensation]
  );

  const handleIncreaseZoom = useCallback(() => {
    setZoomInfo((state) => ({
      ...state,
      zoom: getLimitedState({
        min: 1,
        max: maxZoom,
        value: state.zoom + 0.5,
      }),
      transitionX: 0,
      transitionY: 0,
    }));
  }, [maxZoom, getLimitedState]);

  const handleDecreaseZoom = useCallback(() => {
    setZoomInfo((state) => ({
      ...state,
      zoom: getLimitedState({
        min: 1,
        max: maxZoom,
        value: state.zoom - 0.5,
      }),
      transitionX: 0,
      transitionY: 0,
    }));
  }, [maxZoom, getLimitedState]);

  const handleResetZoom = useCallback(() => {
    setZoomInfo((state) => ({
      ...state,
      isDragging: false,
      isZooming: false,
      doubleTapped: false,
      zoom: 1,
      transitionX: 0,
      transitionY: 0,
    }));
  }, []);

  const isBiggerThanViewport = useCallback(
    ({ offsetHeight, offsetWidth, zoom }) => {
      const isWidderThanViewport = offsetWidth * zoom > window.innerWidth;
      const isHigherThanViewport =
        offsetHeight * zoom + bottomCompensation > window.innerHeight;

      return {
        isWidderThanViewport,
        isHigherThanViewport,
      };
    },
    [bottomCompensation]
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

  const getDistanceBetweenFingers = useCallback(({ fingerOne, fingerTwo }) => {
    const X1 = fingerOne.clientX;
    const Y1 = fingerOne.clientY;
    const X2 = fingerTwo.clientX;
    const Y2 = fingerTwo.clientY;

    return Number(Math.sqrt((X2 - X1) * (X2 - X1) + (Y2 - Y1) * (Y2 - Y1)));
  }, []);

  const handleDoubleTap = useCallback(
    ({ e, originX, originY }) => {
      if (
        e.target !== e.currentTarget ||
        zoomInfo.isZooming ||
        zoomInfo.isDragging
      )
        return;

      const curTime = new Date().getTime();
      const tapLen = curTime - tapInfoRef.lastTap;

      const { marginTop, marginLeft } = getDragBoundries({
        target: e.currentTarget,
        zoom: maxZoom,
      });

      if (
        tapLen < doubleTapSensivity &&
        tapLen > 0 &&
        zoomInfo.allowDragAndZoom
      ) {
        const startZoomPosX = window.innerWidth / 2 - originX;
        const startZoomPosY = window.innerHeight / 2 - originY;

        const dx = startZoomPosX - startZoomPosX / maxZoom;
        const dy = startZoomPosY - startZoomPosY / maxZoom;

        setZoomInfo((state) => ({
          ...state,
          doubleTapped: true,
          isDragging: false,
          isZooming: false,
          zoom: state.zoom === 1 ? maxZoom : 1,
          transitionX: getLimitedState({
            max: marginLeft,
            min: -marginLeft,
            value: state.zoom === 1 ? state.transitionX + dx : 0,
          }),
          transitionY: getLimitedState({
            max: marginTop,
            min: -marginTop,
            value: state.zoom === 1 ? state.transitionY + dy : 0,
          }),
        }));
      } else {
        tapInfoRef.timeout = setTimeout(() => {
          clearTimeout(tapInfoRef.timeout);
        }, doubleTapSensivity);
      }
      tapInfoRef.lastTap = curTime;
    },
    [
      tapInfoRef,
      doubleTapSensivity,
      maxZoom,
      zoomInfo.isZooming,
      getDragBoundries,
      getLimitedState,
      zoomInfo.isDragging,
      zoomInfo.allowDragAndZoom,
    ]
  );

  const onMouseDown = useCallback(
    (e) => {
      if (zoomInfo.zoom === 1 || zoomInfo.isZooming || zoomInfo.isDragging)
        return;

      e.preventDefault();

      const { marginTop, marginLeft } = getDragBoundries({
        target: e.currentTarget,
        zoom: zoomInfo.zoom,
      });

      zoomInfoRef.marginTop = marginTop;
      zoomInfoRef.marginLeft = marginLeft;

      const currentPosX = e.clientX / zoomInfo.zoom;
      const currentPosY = e.clientY / zoomInfo.zoom;

      zoomInfoRef.lastZoom = zoomInfo.zoom;
      zoomInfoRef.lastX = zoomInfo.transitionX;
      zoomInfoRef.lastY = zoomInfo.transitionY;

      setZoomInfo((state) => ({
        ...state,
        isDragging: state.allowDragAndZoom ? true : false,
        originX: currentPosX,
        originY: currentPosY,
      }));

      const { isHigherThanViewport, isWidderThanViewport } =
        isBiggerThanViewport({
          offsetHeight: e.currentTarget?.offsetHeight,
          offsetWidth: e.currentTarget?.offsetWidth,
          zoom: zoomInfo.zoom,
        });

      zoomInfoRef.higherThanViewport = isHigherThanViewport;
      zoomInfoRef.widderThanViewport = isWidderThanViewport;
    },
    [
      zoomInfo.zoom,
      zoomInfoRef,
      zoomInfo.isZooming,
      getDragBoundries,
      zoomInfo.isDragging,
      zoomInfo.transitionX,
      zoomInfo.transitionY,
      isBiggerThanViewport,
    ]
  );

  const onDragStart = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;

      zoomInfoRef.fingersStart = e.targetTouches.length;

      zoomInfoRef.lastZoom = zoomInfo.zoom;
      zoomInfoRef.lastX = zoomInfo.transitionX;
      zoomInfoRef.lastY = zoomInfo.transitionY;

      if (zoomInfoRef.fingersStart === 2) {
        const fingerOne = e.touches[0];
        const fingerTwo = e.touches[1];

        const startMidPointX = (fingerOne.clientX + fingerTwo.clientX) / 2;
        const startMidPointY = (fingerOne.clientY + fingerTwo.clientY) / 2;

        const distance =
          e.targetTouches.length === 2 &&
          zoomInfoRef.fingersStart === 2 &&
          getDistanceBetweenFingers({
            fingerOne,
            fingerTwo,
          });
        zoomInfoRef.startZoomPosX =
          (window.innerWidth / 2 - startMidPointX) * zoomInfoRef.lastZoom;

        zoomInfoRef.startZoomPosY =
          ((window.innerHeight - bottomCompensation) / 2 - startMidPointY) *
          zoomInfoRef.lastZoom;

        zoomInfoRef.startDistance = distance ? distance : 0;

        setZoomInfo((state) => ({
          ...state,
          isZooming: state.allowDragAndZoom ? true : false,
          isDragging: false,
          originX: startMidPointX,
          originY: startMidPointY,
        }));
      }
      if (zoomInfoRef.fingersStart === 1) {
        const fingerOne = e.touches[0];

        const startPointX = fingerOne.clientX;
        const startPointY = fingerOne.clientY;

        handleDoubleTap({ e, originX: startPointX, originY: startPointY });

        const { isHigherThanViewport, isWidderThanViewport } =
          isBiggerThanViewport({
            offsetHeight: e.currentTarget?.offsetHeight,
            offsetWidth: e.currentTarget?.offsetWidth,
            zoom: zoomInfo.zoom,
          });

        zoomInfoRef.higherThanViewport = isHigherThanViewport;
        zoomInfoRef.widderThanViewport = isWidderThanViewport;

        if (!zoomInfo.doubleTapped) {
          const { marginTop, marginLeft } = getDragBoundries({
            target: e.currentTarget,
            zoom: zoomInfo.zoom,
          });

          zoomInfoRef.marginTop = marginTop;
          zoomInfoRef.marginLeft = marginLeft;
        }

        setZoomInfo((state) => ({
          ...state,
          isDragging:
            state.doubleTapped || (state.zoom === 1 && !state.allowDragAndZoom)
              ? false
              : true,
          isZooming: false,
          originX: startPointX,
          originY: startPointY,
        }));
      }
    },
    [
      getDistanceBetweenFingers,
      zoomInfoRef,
      bottomCompensation,
      zoomInfo,
      handleDoubleTap,
      getDragBoundries,
      isBiggerThanViewport,
    ]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!zoomInfo.isDragging) return;

      setZoomInfo((state) => ({
        ...state,
        transitionX: zoomInfoRef.widderThanViewport
          ? getLimitedState({
              max: zoomInfoRef.marginLeft + boundaryResistance / state.zoom,
              min: -zoomInfoRef.marginLeft - boundaryResistance / state.zoom,
              value: zoomInfoRef.lastX + e.clientX / state.zoom - state.originX,
            })
          : 0,

        transitionY: zoomInfoRef.higherThanViewport
          ? getLimitedState({
              max: zoomInfoRef.marginTop + boundaryResistance / state.zoom,
              min:
                -zoomInfoRef.marginTop +
                bottomCompensation / state.zoom -
                boundaryResistance / state.zoom,
              value: zoomInfoRef.lastY + e.clientY / state.zoom - state.originY,
            })
          : 0,
      }));
    },
    [
      zoomInfoRef,
      bottomCompensation,
      boundaryResistance,
      zoomInfo,
      getLimitedState,
    ]
  );

  const onDraging = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;

      if (zoomInfo.isZooming && e.targetTouches.length === 2) {
        const fingerOne = e.touches[0];
        const fingerTwo = e.touches[1];

        const distance =
          e.targetTouches.length === 2 &&
          zoomInfoRef.fingersStart === 2 &&
          getDistanceBetweenFingers({
            fingerOne,
            fingerTwo,
          });

        const endDist = distance ? distance : 0;

        const endMidPointX = (fingerOne.clientX + fingerTwo.clientX) / 2;
        const endMidPointY = (fingerOne.clientY + fingerTwo.clientY) / 2;

        const dx =
          (zoomInfoRef.startZoomPosX / zoomInfoRef.lastZoom -
            zoomInfoRef.startZoomPosX / zoomInfo.zoom) /
          zoomInfoRef.lastZoom;

        const dy =
          (zoomInfoRef.startZoomPosY / zoomInfoRef.lastZoom -
            zoomInfoRef.startZoomPosY / zoomInfo.zoom) /
          zoomInfoRef.lastZoom;

        setZoomInfo((state) => ({
          ...state,
          transitionX:
            zoomInfoRef.startDistance > minDistBetweenFingers
              ? Number(
                  zoomInfoRef.lastX +
                    (endMidPointX - state.originX) / state.zoom +
                    dx
                )
              : state.transitionX,
          transitionY:
            zoomInfoRef.startDistance > minDistBetweenFingers
              ? Number(
                  zoomInfoRef.lastY +
                    (endMidPointY - state.originY) / state.zoom +
                    dy
                )
              : state.transitionY,

          zoom: getLimitedState({
            min: 1,
            max: maxZoom,
            value:
              zoomInfoRef.startDistance > minDistBetweenFingers
                ? (zoomInfoRef.lastZoom * endDist) / zoomInfoRef.startDistance
                : state.zoom,
          }),
        }));
      }
      if (zoomInfo.isDragging && e.targetTouches.length === 1) {
        const fingerOne = e.touches[0];

        setZoomInfo((state) => ({
          ...state,
          transitionX: getLimitedState({
            min: zoomInfoRef.widderThanViewport
              ? -zoomInfoRef.marginLeft - boundaryResistance / state.zoom
              : false,
            max: zoomInfoRef.widderThanViewport
              ? zoomInfoRef.marginLeft + boundaryResistance / state.zoom
              : false,
            value: Number(
              zoomInfoRef.lastX +
                (fingerOne.clientX - state.originX) / state.zoom
            ),
          }),
          transitionY: getLimitedState({
            max: zoomInfoRef.higherThanViewport
              ? zoomInfoRef.marginTop + boundaryResistance / state.zoom
              : false,

            min: zoomInfoRef.higherThanViewport
              ? -zoomInfoRef.marginTop +
                bottomCompensation / state.zoom -
                boundaryResistance / state.zoom
              : false,

            value:
              e.targetTouches.length === 1 &&
              zoomInfoRef.fingersStart === 1 &&
              Number(
                zoomInfoRef.lastY +
                  (fingerOne.clientY - state.originY) / state.zoom
              ),
          }),
        }));
      }
    },
    [
      zoomInfo,
      bottomCompensation,
      boundaryResistance,
      getLimitedState,
      maxZoom,
      minDistBetweenFingers,
      zoomInfoRef,
      getDistanceBetweenFingers,
    ]
  );

  const onMouseUp = useCallback(
    (e) => {
      if (zoomInfo.isZooming) {
        zoomInfoRef.startDistance = 0;
        const { marginTop, marginLeft } = getDragBoundries({
          target: e.currentTarget,
          zoom: zoomInfo.zoom,
        });

        zoomInfoRef.marginTop = marginTop;
        zoomInfoRef.marginLeft = marginLeft;

        const { isHigherThanViewport, isWidderThanViewport } =
          isBiggerThanViewport({
            offsetHeight: e.currentTarget?.offsetHeight,
            offsetWidth: e.currentTarget?.offsetWidth,
            zoom: zoomInfo.zoom,
          });

        zoomInfoRef.higherThanViewport = isHigherThanViewport;
        zoomInfoRef.widderThanViewport = isWidderThanViewport;
      }
      const { overMarginX, overMarginY } = calculateOverMargin({
        transitionX: zoomInfo.transitionX,
        transitionY: zoomInfo.transitionY,
        zoom: zoomInfo.zoom,
        marginTop: zoomInfoRef.marginTop,
        marginLeft: zoomInfoRef.marginLeft,
        bottomCompensation: bottomCompensation,
      });

      if (zoomInfo.doubleTapped) {
        setZoomInfo((state) => ({
          ...state,
          doubleTapped: false,
        }));
      } else {
        setZoomInfo((state) => ({
          ...state,
          isDragging: false,
          isZooming: false,
          transitionX: zoomInfoRef.widderThanViewport
            ? state.transitionX - overMarginX
            : 0,
          transitionY: zoomInfoRef.higherThanViewport
            ? state.transitionY - overMarginY
            : 0,
        }));
      }
    },
    [
      bottomCompensation,
      zoomInfo,
      zoomInfoRef,
      calculateOverMargin,
      getDragBoundries,
      isBiggerThanViewport,
    ]
  );

  const onMouseWheel = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;

      const { isHigherThanViewport } = isBiggerThanViewport({
        offsetHeight: e.currentTarget?.offsetHeight,
        offsetWidth: e.currentTarget?.offsetWidth,
        zoom: zoomInfo.zoom,
      });

      if (!isHigherThanViewport) return;

      const { marginTop } = getDragBoundries({
        target: e.currentTarget,
        zoom: zoomInfo.zoom,
      });

      setZoomInfo((state) => ({
        ...state,
        transitionY: getLimitedState({
          max: marginTop,
          min: -marginTop + bottomCompensation / state.zoom,
          value: state.transitionY + e.deltaY / state.zoom,
        }),
      }));
    },

    [
      zoomInfo.zoom,
      getDragBoundries,
      getLimitedState,
      bottomCompensation,
      isBiggerThanViewport,
    ]
  );

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseUp, onMouseMove]);

  return {
    onMouseDown,
    onDragStart,
    pinchZoomTransitionX: zoomInfo.transitionX,
    pinchZoomTransitionY: zoomInfo.transitionY,
    handleDecreaseZoom,
    handleIncreaseZoom,
    handleResetZoom,
    zoom: zoomInfo.zoom,
    isDragging: zoomInfo.isDragging,
    isZooming: zoomInfo.isZooming,
    wasDoubleTapped: zoomInfo.doubleTapped,
    onDraging,
    onMouseUp,
    zoomMouseWheel: onMouseWheel,
    enableDragAndZoom,
    disableDragAndZoom,
  };
}

export default useZoomAndDrag;
