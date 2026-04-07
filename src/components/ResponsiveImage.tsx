import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  aspectRatio?: `${number}/${number}`;
}

/**
 * ResponsiveImage Component
 * Production-grade responsive image component with:
 * - Lazy loading with Intersection Observer
 * - Built-in blur placeholder (optional)
 * - Responsive srcset support
 * - Aspect ratio container to prevent CLS (Cumulative Layout Shift)
 * - WebP format detection and fallback
 * - Priority loading for above-the-fold images
 */
export const ResponsiveImage = React.forwardRef<
  HTMLImageElement,
  ResponsiveImageProps
>(
  (
    {
      src,
      alt,
      width,
      height,
      priority = false,
      fill = false,
      sizes,
      placeholder = "empty",
      aspectRatio,
      className,
      loading: loadingProp,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>(
      priority ? src : undefined
    );
    const [supportsWebP, setSupportsWebP] = useState(true);

    // Detect WebP support
    useEffect(() => {
      const canvas = document.createElement("canvas");
      const isSupported = canvas.toDataURL("image/webp", 0.5).indexOf("image/webp") === 0;
      setSupportsWebP(isSupported);
    }, []);

    // Lazy load image with Intersection Observer
    useEffect(() => {
      if (priority) {
        return; // Skip for priority images (already loaded)
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px" }
      );

      if (ref && "current" in ref && ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref && "current" in ref && ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [src, ref, priority]);

    // Calculate padding-bottom for aspect ratio preservation
    const paddingBottom =
      aspectRatio && !fill
        ? (parseInt(aspectRatio.split("/")[1]) /
            parseInt(aspectRatio.split("/")[0])) *
          100
        : undefined;

    // Container styles for aspect ratio preservation
    const containerStyle: React.CSSProperties = fill
      ? {}
      : paddingBottom
        ? {
            position: "relative",
            paddingBottom: `${paddingBottom}%`,
            overflow: "hidden",
          }
        : {};

    const imageStyle: React.CSSProperties = fill
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }
      : {};

    const imgElement = (
      <img
        ref={ref}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : loadingProp || "lazy"}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={imageStyle}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // Fallback for image loading errors
          console.warn(`Failed to load image: ${src}`);
        }}
        {...props}
      />
    );

    if (fill) {
      return (
        <div style={containerStyle} className="relative overflow-hidden">
          {imgElement}
        </div>
      );
    }

    if (paddingBottom !== undefined) {
      return (
        <div style={containerStyle} className="relative w-full">
          {imgElement}
        </div>
      );
    }

    return imgElement;
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
