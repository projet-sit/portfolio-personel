import { useEffect, useRef, useState } from "react";

/** Reveals content near the viewport without a scroll event listener. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={elementRef}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}
