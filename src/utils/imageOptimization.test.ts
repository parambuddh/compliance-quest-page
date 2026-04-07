import { describe, it, expect } from "vitest";
import {
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
  supportsWebP,
  getResponsiveImageProps,
} from "@/utils/imageOptimization";

describe("Image Optimization Utilities", () => {
  describe("getOptimizedImageUrl", () => {
    it("should return local paths unchanged", () => {
      const url = getOptimizedImageUrl("/images/hero.png");
      expect(url).toBe("/images/hero.png");
    });

    it("should return relative paths unchanged", () => {
      const url = getOptimizedImageUrl("./images/hero.png");
      expect(url).toBe("./images/hero.png");
    });

    it("should return external URLs unchanged", () => {
      const url = getOptimizedImageUrl(
        "https://example.com/images/hero.png"
      );
      expect(url).toBe("https://example.com/images/hero.png");
    });

    it("should accept optimization options", () => {
      const url = getOptimizedImageUrl("/images/hero.png", {
        format: "webp",
        width: 800,
        quality: 80,
      });
      expect(typeof url).toBe("string");
    });
  });

  describe("generateSrcSet", () => {
    it("should generate responsive srcset string", () => {
      const srcset = generateSrcSet("/images/hero.webp", [320, 640, 960]);
      expect(srcset).toContain("320w");
      expect(srcset).toContain("640w");
      expect(srcset).toContain("960w");
      expect(srcset).toContain(",");
    });

    it("should use default sizes if not provided", () => {
      const srcset = generateSrcSet("/images/hero.webp");
      expect(srcset).toContain("320w");
      expect(srcset).toContain("1920w");
    });

    it("should properly format srcset string", () => {
      const srcset = generateSrcSet("/images/test.webp", [320, 640]);
      const entries = srcset.split(", ");
      expect(entries.length).toBe(2);
      entries.forEach((entry) => {
        expect(entry).toMatch(/^\S+ \d+w$/);
      });
    });
  });

  describe("generateSizes", () => {
    it("should generate responsive sizes string", () => {
      const sizes = generateSizes();
      expect(sizes).toContain("max-width");
      expect(sizes).toContain("vw");
      expect(sizes).toContain(",");
    });

    it("should handle custom configurations", () => {
      const sizes = generateSizes([
        { media: "(max-width: 768px)", size: "100vw" },
        { media: "default", size: "50vw" },
      ]);

      expect(sizes).toContain("768px");
      expect(sizes).toContain("100vw");
      expect(sizes).toContain("50vw");
    });

    it("should properly format sizes string", () => {
      const sizes = generateSizes([
        { media: "(max-width: 640px)", size: "100vw" },
        { media: "default", size: "70vw" },
      ]);

      expect(sizes).toMatch(/\(max-width.*?\)\s+\d+vw/);
    });
  });

  describe("supportsWebP", () => {
    it("should return a boolean", () => {
      const result = supportsWebP();
      expect(typeof result).toBe("boolean");
    });

    it("should detect WebP support in browser", () => {
      // This will vary by environment/browser
      const result = supportsWebP();
      expect([true, false]).toContain(result);
    });
  });

  describe("getResponsiveImageProps", () => {
    it("should return all required props", () => {
      const props = getResponsiveImageProps(
        "/images/hero.webp",
        "Hero",
        1200,
        600
      );

      expect(props).toHaveProperty("src");
      expect(props).toHaveProperty("alt");
      expect(props).toHaveProperty("width");
      expect(props).toHaveProperty("height");
      expect(props).toHaveProperty("srcSet");
      expect(props).toHaveProperty("sizes");
    });

    it("should generate valid prop values", () => {
      const props = getResponsiveImageProps(
        "/images/hero.webp",
        "Hero",
        1200,
        600,
        "100vw"
      );

      expect(props.src).toBe("/images/hero.webp");
      expect(props.alt).toBe("Hero");
      expect(props.width).toBe(1200);
      expect(props.height).toBe(600);
      expect(props.srcSet).toContain("w");
      expect(props.sizes).toBe("100vw");
    });

    it("should use default sizes when not provided", () => {
      const props = getResponsiveImageProps(
        "/images/hero.webp",
        "Hero",
        1200,
        600
      );

      expect(props.sizes).toBeDefined();
      expect(props.sizes).toContain("vw");
    });
  });

  describe("edge cases", () => {
    it("should handle empty image paths", () => {
      expect(() => {
        getOptimizedImageUrl("");
      }).not.toThrow();
    });

    it("should handle empty srcset sizes", () => {
      expect(() => {
        generateSrcSet("/images/hero.webp", []);
      }).not.toThrow();
    });

    it("should handle very large image dimensions", () => {
      const srcset = generateSrcSet("/images/huge.webp", [
        4000, 5000, 6000,
      ]);
      expect(srcset).toContain("4000w");
      expect(srcset).toContain("5000w");
      expect(srcset).toContain("6000w");
    });

    it("should handle very small image dimensions", () => {
      const srcset = generateSrcSet("/images/tiny.webp", [10, 20, 30]);
      expect(srcset).toContain("10w");
      expect(srcset).toContain("20w");
      expect(srcset).toContain("30w");
    });
  });

  describe("performance characteristics", () => {
    it("should generate srcset quickly", () => {
      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        generateSrcSet("/images/hero.webp", [320, 640, 960, 1280]);
      }
      const duration = performance.now() - start;

      // Should complete 100 srcset generations in < 50ms
      expect(duration).toBeLessThan(50);
    });

    it("should generate sizes quickly", () => {
      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        generateSizes();
      }
      const duration = performance.now() - start;

      // Should complete 100 size generations in < 50ms
      expect(duration).toBeLessThan(50);
    });
  });
});
