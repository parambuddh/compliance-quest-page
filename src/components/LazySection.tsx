import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  rootMargin = "300px",
  minHeight = "400px",
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: isInView ? "auto" : minHeight,
        containIntrinsicSize: `auto ${minHeight}`,
        contentVisibility: isInView ? "visible" : "auto",
      }}
    >
      {isInView ? children : fallback || null}
    </div>
  );
};

export default LazySection;
