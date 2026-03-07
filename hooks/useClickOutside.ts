import { useEffect, RefObject } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}