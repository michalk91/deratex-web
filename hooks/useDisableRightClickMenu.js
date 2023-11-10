import { useCallback } from "react";

const useDisableRightClickMenu = ({ tagName }) => {
  const handleDisableRightClickMenu = useCallback(
    (e) => {
      if (e.target.tagName === tagName) e.preventDefault();
    },
    [tagName]
  );

  return handleDisableRightClickMenu;
};

export default useDisableRightClickMenu;
