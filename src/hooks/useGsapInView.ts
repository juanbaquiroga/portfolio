import { useEffect, useState, RefObject } from "react";

export function useGsapInView(ref: RefObject<HTMLElement>, options: { margin?: string } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, rootMargin: options.margin || "0px", threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.margin]);
  return inView;
}