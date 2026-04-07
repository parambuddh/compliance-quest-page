/**
 * Image Optimization Utilities
 * Provides helpers for responsive images, WebP conversion, and lazy loading
 */

export interface ImageOptimizationOptions {
  format?: "webp" | "jpg" | "png";
  width?: number;
  quality?: number;
  placeholder?: "blur" | "empty";
}

/**
 * Generate optimized image URLs with responsive sizing
 * Supports WebP format with PNG/JPG fallback
 */
export const getOptimizedImageUrl = (
  imagePath: string,
  options: ImageOptimizationOptions = {}
): string => {
  const { format = "webp", width, quality = 75 } = options;

  // For local images, return as-is (Vite handles optimization in build)
  if (imagePath.startsWith("/") || imagePath.startsWith("./")) {
    return imagePath;
  }

  // For external URLs, append optimization params if supported
  if (imagePath.includes("http")) {
    // Example: Add your CDN image optimization params here
    // Cloudinary, Imgix, or similar services
    return imagePath;
  }

  return imagePath;
};

/**
 * Generate srcset for responsive images at different viewport sizes
 */
export const generateSrcSet = (
  imagePath: string,
  sizes: number[] = [320, 640, 960, 1280, 1920]
): string => {
  return sizes
    .map((size) => {
      const url = getOptimizedImageUrl(imagePath, { width: size });
      return `${url} ${size}w`;
    })
    .join(", ");
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (
  configurations: Array<{ media: string; size: string }> = [
    { media: "(max-width: 640px)", size: "100vw" },
    { media: "(max-width: 1024px)", size: "90vw" },
    { media: "(max-width: 1280px)", size: "80vw" },
    { media: "default", size: "70vw" },
  ]
): string => {
  return configurations
    .map((config) => {
      if (config.media === "default") {
        return config.size;
      }
      return `${config.media} ${config.size}`;
    })
    .join(", ");
};

/**
 * Generate blur placeholder for images (LQIP - Low Quality Image Placeholder)
 */
export const generateBlurDataUrl = (width: number = 10, height: number = 10): string => {
  // Generates a simple SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="b">
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <rect fill="#f0f0f0" width="${width}" height="${height}" filter="url(#b)" />
    </svg>
  `.trim();
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Image loader utility for Next.js style image optimization
 */
export const imageLoader = (
  path: string,
  width: number,
  quality: number = 75
): string => {
  // Implement based on your CDN or image service
  // Example for Vercel Image Optimization API

  if (path.startsWith("http")) {
    return path;
  }

  return `${path}?w=${width}&q=${quality}`;
};

/**
 * Preload critical images for better LCP (Largest Contentful Paint)
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  if (typeof document === "undefined") return;

  imagePaths.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = path;
    link.type = "image/webp";
    document.head.appendChild(link);
  });
};

/**
 * Prefetch images that might be needed soon (e.g., for infinite scroll)
 */
export const prefetchImages = (imagePaths: string[]): void => {
  if (typeof document === "undefined") return;

  imagePaths.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Get WebP support status in browser
 */
export const supportsWebP = (): boolean => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp", 0.5).indexOf("image/webp") === 0;
};

/**
 * Optimize image dimensions for different devices
 */
export const getResponsiveImageProps = (
  src: string,
  alt: string,
  width: number,
  height: number,
  sizes?: string
) => {
  return {
    src,
    alt,
    width,
    height,
    srcSet: generateSrcSet(src),
    sizes:
      sizes ||
      generateSizes([
        { media: "(max-width: 640px)", size: "100vw" },
        { media: "(max-width: 1024px)", size: "90vw" },
        { media: "default", size: "70vw" },
      ]),
  };
};
