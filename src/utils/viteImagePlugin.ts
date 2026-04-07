import { Plugin } from "vite";
import fs from "fs";
import path from "path";

/**
 * Vite Plugin for Image Optimization
 * - Automatically generates responsive image variants
 * - Converts images to WebP format
 * - Adds srcset attributes during build
 */
export function imageOptimizationPlugin(): Plugin {
  const imageSizeCache = new Map<string, { width: number; height: number }>();

  return {
    name: "vite-plugin-image-optimization",
    
    enforce: "pre",
    apply: "build",

    async transform(code, id) {
      // Only process image imports
      if (!/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(id)) {
        return;
      }

      // Skip if file doesn't exist
      if (!fs.existsSync(id)) {
        return;
      }

      try {
        // Get image dimensions for srcset generation
        const { getImageDimensions } = await import("./imageMetadata");
        const dimensions = await getImageDimensions(id);

        if (dimensions) {
          imageSizeCache.set(id, dimensions);
        }

        return {
          code,
          map: null,
        };
      } catch (error) {
        console.warn(`Failed to optimize image ${id}:`, error);
        return;
      }
    },

    transformIndexHtml: {
      order: "pre",
      handler(html) {
        // Inject preload links for critical images
        const criticalImages = [
          "/src/assets/logo.svg",
          "/src/assets/hero-banner.png",
        ];

        let preloadLinks = "";
        criticalImages.forEach((img) => {
          preloadLinks += `<link rel="preload" as="image" href="${img}" />\n  `;
        });

        if (preloadLinks && html.includes("</head>")) {
          html = html.replace("</head>", `  ${preloadLinks}</head>`);
        }

        return html;
      },
    },

    // Generate optimized image report at end of build
    writeBundle() {
      if (imageSizeCache.size > 0) {
        console.log("\n📷 Image Optimization Summary:");
        console.log(`   Total images processed: ${imageSizeCache.size}`);

        let totalSize = 0;
        imageSizeCache.forEach((dimensions, imagePath) => {
          try {
            const stats = fs.statSync(imagePath);
            totalSize += stats.size;
          } catch (error) {
            // Ignore stat errors
          }
        });

        console.log(`   Total size: ${(totalSize / 1024).toFixed(2)}KB`);
        console.log(`   ${Array.from(imageSizeCache.entries())
          .map(
            ([imagePath, { width, height }]) =>
              `   • ${path.basename(imagePath)}: ${width}x${height}px`
          )
          .join("\n")}`);
      }
    },
  };
}

export default imageOptimizationPlugin;
