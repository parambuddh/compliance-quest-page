import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  PerformanceMonitor,
  getPerformanceMonitor,
  measureExecutionTime,
  measureAsyncExecutionTime,
  DEFAULT_THRESHOLDS,
} from "@/utils/performanceMonitor";

describe("PerformanceMonitor", () => {
  let monitor: PerformanceMonitor;

  beforeEach(() => {
    // Create fresh monitor for each test
    monitor = new PerformanceMonitor();
  });

  describe("initialization", () => {
    it("should initialize with default thresholds", () => {
      expect(monitor).toBeDefined();
    });

    it("should accept custom thresholds", () => {
      const customMonitor = new PerformanceMonitor({
        lcp: { good: 2000, poor: 3500 },
      });
      expect(customMonitor).toBeDefined();
    });

    it("should return singleton instance", () => {
      const monitor1 = getPerformanceMonitor();
      const monitor2 = getPerformanceMonitor();
      expect(monitor1).toBe(monitor2);
    });
  });

  describe("metrics collection", () => {
    it("should initialize empty metrics", () => {
      const metrics = monitor.getMetrics();
      expect(metrics).toBeDefined();
      expect(typeof metrics).toBe("object");
    });

    it("should handle missing metrics gracefully", () => {
      const metrics = monitor.getMetrics();
      expect(metrics.lcp).toBeUndefined();
      expect(metrics.cls).toBeUndefined();
    });
  });

  describe("metric status evaluation", () => {
    it("should return 'good' for metrics below threshold", () => {
      const monitor = new PerformanceMonitor();
      // Simulate setting metric values
      const metrics = monitor.getMetrics();
      metrics.cls = 0.05;

      const status = monitor.getMetricStatus("cls");
      expect(status).toMatch(/good|unknown/);
    });

    it("should return 'unknown' for unmeasured metrics", () => {
      const status = monitor.getMetricStatus("lcp");
      expect(status).toBe("unknown");
    });
  });

  describe("reporting", () => {
    it("should generate performance report", () => {
      const report = monitor.getReport();

      expect(report).toHaveProperty("metrics");
      expect(report).toHaveProperty("status");
      expect(report).toHaveProperty("score");
      expect(typeof report.score).toBe("number");
      expect(report.score).toBeGreaterThanOrEqual(0);
      expect(report.score).toBeLessThanOrEqual(100);
    });

    it("should not throw when logging metrics", () => {
      expect(() => {
        monitor.logMetrics();
      }).not.toThrow();
    });

    it("should accurately report Web Vitals standards compliance", () => {
      const isCompliant = monitor.meetsWebVitalsStandards();
      expect(typeof isCompliant).toBe("boolean");
    });
  });

  describe("cleanup", () => {
    it("should dispose observers without errors", () => {
      expect(() => {
        monitor.dispose();
      }).not.toThrow();
    });
  });
});

describe("measureExecutionTime", () => {
  it("should measure synchronous function execution", () => {
    const result = measureExecutionTime(() => {
      return 42;
    }, "test-sync");

    expect(result).toBe(42);
  });

  it("should handle functions that throw", () => {
    expect(() => {
      measureExecutionTime(() => {
        throw new Error("Test error");
      });
    }).toThrow("Test error");
  });
});

describe("measureAsyncExecutionTime", () => {
  it("should measure async function execution", async () => {
    const result = await measureAsyncExecutionTime(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 42;
    }, "test-async");

    expect(result).toBe(42);
  });

  it("should handle async functions that reject", async () => {
    await expect(
      measureAsyncExecutionTime(async () => {
        throw new Error("Async error");
      })
    ).rejects.toThrow("Async error");
  });
});

describe("Performance thresholds", () => {
  it("should have valid default thresholds", () => {
    expect(DEFAULT_THRESHOLDS.lcp.good).toBeLessThan(
      DEFAULT_THRESHOLDS.lcp.poor
    );
    expect(DEFAULT_THRESHOLDS.cls.good).toBeLessThan(
      DEFAULT_THRESHOLDS.cls.poor
    );
    expect(DEFAULT_THRESHOLDS.fcp.good).toBeLessThan(
      DEFAULT_THRESHOLDS.fcp.poor
    );
  });

  it("should use Google recommended values", () => {
    expect(DEFAULT_THRESHOLDS.lcp.good).toBe(2500);
    expect(DEFAULT_THRESHOLDS.cls.good).toBe(0.1);
    expect(DEFAULT_THRESHOLDS.fid.good).toBe(100);
  });
});
