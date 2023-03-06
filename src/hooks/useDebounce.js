import { useEffect } from "react";

export default function useDebounce(debouncedCallback, delay = 500, depsArray = []) {
  useEffect(() => {
    const timer = setTimeout(() => debouncedCallback(), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [...depsArray]);

  return true;
}
