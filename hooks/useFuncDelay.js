import { useState, useCallback } from "react";

function useFuncDelay({ delay, functionToDelay }) {
  const [beforeDelay, setBeforeDelay] = useState(false);

  const handleDelay = useCallback(
    ({ ms }) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );

  const delayedFunc = async () => {
    setBeforeDelay(true);

    await handleDelay({ ms: delay });

    functionToDelay();
    setBeforeDelay(false);
  };

  return { delayedFunc, beforeDelay };
}

export default useFuncDelay;
