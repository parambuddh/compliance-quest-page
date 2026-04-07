import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  once?: boolean;
}

/**
 * LazyImage Component
 * Implements native lazy loading for images with fallback to Intersection Observer
 * Improves page performance by deferring image loading
 */
export const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, alt, className, once = true, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
      // Use Intersection Observer for better compatibility
      const img = new Image();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              if (once) {
                observer.unobserve(entry.target);
              }
            }
          });
        },
        { rootMargin: "50px" }
      );

      if (ref && "current" in ref && ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref && "current" in ref && ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [src, ref, once]);

    return (
      <img
        ref={ref}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    );
  }
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
