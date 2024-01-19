import { useEffect } from "react";

function useOutSideClick(ref, cb, exception) {
  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exception
      ) {
        cb();
      }
    };

    document.addEventListener("mousedown", handleClick);

    //clean up function
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, cb]);
}

export default useOutSideClick;
