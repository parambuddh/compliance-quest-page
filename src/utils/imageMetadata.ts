import fs from "fs";
import sizeOf from "image-size";

/**
 * Image Metadata Utilities
 * Extracts and caches image dimensions for optimization
 */

const dimensionCache = new Map<string, { width: number; height: number }>();

/**
 * Get image dimensions using image-size library
 */
export async function getImageDimensions(
  imagePath: string
): Promise<{ width: number; height: number } | null> {
  // Check cache first
  if (dimensionCache.has(imagePath)) {
    return dimensionCache.get(imagePath) || null;
  }

  try {
    if (!fs.existsSync(imagePath)) {
      return null;
    }

    const dimensions = sizeOf(imagePath);

    if (dimensions && dimensions.width && dimensions.height) {
      dimensionCache.set(imagePath, {
        width: dimensions.width,
        height: dimensions.height,
      });

      return {
        width: dimensions.width,
        height: dimensions.height,
      };
    }

    return null;
  } catch (error) {
    console.warn(`Failed to get dimensions for ${imagePath}:`, error);
    return null;
  }
}

/**
 * Generate aspect ratio from dimensions
 */
export function getAspectRatio(
  width: number,
  height: number
): string {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Get recommended srcset sizes based on image width
 */
export function getRecommendedSizes(imageWidth: number): number[] {
  const baseSizes = [320, 640, 960, 1280, 1920];
  
  // Filter sizes that are less than or equal to the original width
  return baseSizes.filter((size) => size <= imageWidth * 1.5);
}

/**
 * Generate CSS aspect ratio padding for image container
 */
export function getAspectRatioPadding(
  width: number,
  height: number
): number {
  return (height / width) * 100;
}

/**
 * Analyze all images in a directory
 */
export async function analyzeImagesInDirectory(
  dirPath: string
): Promise<
  Array<{
    path: string;
    width: number;
    height: number;
    aspectRatio: string;
    size: number;
  }>
> {
  const imageInfo: Array<{
    path: string;
    width: number;
    height: number;
    aspectRatio: string;
    size: number;
  }> = [];

  const extensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

  function walkDir(dir: string) {
    try {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = `${dir}/${file}`;
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (extensions.test(filePath)) {
          try {
            const dimensions = sizeOf(filePath);
            if (dimensions?.width && dimensions?.height) {
              imageInfo.push({
                path: filePath,
                width: dimensions.width,
                height: dimensions.height,
                aspectRatio: getAspectRatio(
                  dimensions.width,
                  dimensions.height
                ),
                size: stat.size,
              });
            }
          } catch (error) {
            console.warn(`Failed to analyze ${filePath}`);
          }
        }
      });
    } catch (error) {
      console.warn(`Failed to read directory ${dir}`);
    }
  }

  walkDir(dirPath);
  return imageInfo;
}

/**
 * Generate responsive image configuration
 */
export function generateResponsiveImageConfig(
  imagePath: string,
  dimensions: { width: number; height: number }
) {
  const aspectRatio = getAspectRatio(dimensions.width, dimensions.height);
  const recommendedSizes = getRecommendedSizes(dimensions.width);
  const paddingBottom = getAspectRatioPadding(
    dimensions.width,
    dimensions.height
  );

  return {
    path: imagePath,
    ...dimensions,
    aspectRatio,
    recommendedSizes,
    paddingBottom,
    config: {
      srcset: recommendedSizes
        .map((size) => `${imagePath}?w=${size} ${size}w`)
        .join(", "),
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw",
    },
  };
}

/**
 * Clear dimension cache
 */
export function clearDimensionCache(): void {
  dimensionCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    cachedImages: dimensionCache.size,
    cacheSize: Array.from(dimensionCache.values()).reduce(
      (sum) => sum + 8,
      0
    ), // Rough estimate
  };
}
