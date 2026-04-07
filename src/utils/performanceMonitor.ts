/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and critical web performance metrics
 */

export interface PerformanceMetrics {
  fcp?: number;        // First Contentful Paint
  lcp?: number;        // Largest Contentful Paint
  cls?: number;        // Cumulative Layout Shift
  fid?: number;        // First Input Delay
  inp?: number;        // Interaction to Next Paint
  ttfb?: number;       // Time to First Byte
  tti?: number;        // Time to Interactive
  imageLoad?: number;  // Total image load time
  scriptLoad?: number; // JavaScript load time
}

export interface PerformanceThresholds {
  fcp: { good: number; poor: number };
  lcp: { good: number; poor: number };
  cls: { good: number; poor: number };
  fid: { good: number; poor: number };
  inp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

// Web Vitals thresholds (Google recommended)
export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  fcp: { good: 1800, poor: 3000 },
  lcp: { good: 2500, poor: 4000 },
  cls: { good: 0.1, poor: 0.25 },
  fid: { good: 100, poor: 300 },
  inp: { good: 200, poor: 500 },
  ttfb: { good: 800, poor: 1800 },
};

/**
 * Performance Monitor Class
 * Tracks and reports on website performance metrics
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS;
  private observers: Map<
    string,
    PerformanceObserver | null
  > = new Map();
  private pageLoadTime: number = performance.now();

  constructor(customThresholds?: Partial<PerformanceThresholds>) {
    if (customThresholds) {
      this.thresholds = { ...this.thresholds, ...customThresholds };
    }

    if (typeof window !== "undefined") {
      this.initialize();
    }
  }

  /**
   * Initialize performance observers
   */
  private initialize(): void {
    this.observeLargestContentfulPaint();
    this.observeLayoutShift();
    this.observeNavigationTiming();
    this.observeResourceTiming();
  }

  /**
   * Observe Largest Contentful Paint (LCP)
   */
  private observeLargestContentfulPaint(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as unknown as {
          renderTime?: number;
          loadTime?: number;
        };
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.set("lcp", observer);
    } catch (error) {
      console.warn("LCP observer not supported:", error);
    }
  }

  /**
   * Observe Cumulative Layout Shift (CLS)
   */
  private observeLayoutShift(): void {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: PerformanceEntry) => {
          const layoutEntry = entry as unknown as {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutEntry.hadRecentInput && layoutEntry.value) {
            clsValue += layoutEntry.value;
            this.metrics.cls = clsValue;
          }
        });
      });

      observer.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("cls", observer);
    } catch (error) {
      console.warn("CLS observer not supported:", error);
    }
  }

  /**
   * Observe Navigation Timing (TTFB, FCP)
   */
  private observeNavigationTiming(): void {
    try {
      if (window.performance.timing) {
        const timing = window.performance.timing;
        const navigation = window.performance.navigation;

        // Time to First Byte (TTFB)
        this.metrics.ttfb = timing.responseStart - timing.navigationStart;

        // First Contentful Paint (FCP)
        const perfData = window.performance.getEntriesByType("paint");
        perfData.forEach((entry: PerformanceEntry) => {
          const paintEntry = entry as unknown as {
            name?: string;
            startTime?: number;
          };
          if (paintEntry.name === "first-contentful-paint") {
            this.metrics.fcp = paintEntry.startTime;
          }
        });

        // Time to Interactive (estimate)
        const tti = timing.loadEventEnd - timing.navigationStart;
        this.metrics.tti = tti > 0 ? tti : undefined;
      }
    } catch (error) {
      console.warn("Navigation timing not available:", error);
    }
  }

  /**
   * Observe and measure resource timing (images, scripts, styles)
   */
  private observeResourceTiming(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let imageLoadTime = 0;
        let scriptLoadTime = 0;

        entries.forEach((entry: PerformanceEntry) => {
          const resourceEntry = entry as unknown as {
            name?: string;
            duration?: number;
          };
          const duration = resourceEntry.duration || 0;
          const name = resourceEntry.name || "";

          if (
            name.includes(".webp") ||
            name.includes(".png") ||
            name.includes(".jpg")
          ) {
            imageLoadTime += duration;
          }

          if (name.includes(".js")) {
            scriptLoadTime += duration;
          }
        });

        if (imageLoadTime > 0) {
          this.metrics.imageLoad = (this.metrics.imageLoad || 0) + imageLoadTime;
        }

        if (scriptLoadTime > 0) {
          this.metrics.scriptLoad = (this.metrics.scriptLoad || 0) + scriptLoadTime;
        }
      });

      observer.observe({ entryTypes: ["resource"] });
      this.observers.set("resource", observer);
    } catch (error) {
      console.warn("Resource timing not supported:", error);
    }
  }

  /**
   * Get all measured metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get metric status (good/poor)
   */
  public getMetricStatus(
    metric: keyof PerformanceMetrics
  ): "good" | "needs-improvement" | "poor" | "unknown" {
    const value = this.metrics[metric];

    if (value === undefined) {
      return "unknown";
    }

    // Handle different metric types
    if (metric === "cls") {
      const threshold = this.thresholds.cls;
      if (value <= threshold.good) return "good";
      if (value > threshold.poor) return "poor";
      return "needs-improvement";
    }

    // For timing metrics
    const threshold = this.thresholds[metric as keyof PerformanceThresholds];
    if (!threshold) return "unknown";

    if (metric === "ttfb" || metric === "fcp" || metric === "lcp" || metric === "fid" || metric === "inp") {
      const timingThreshold = threshold as { good: number; poor: number };
      if (value <= timingThreshold.good) return "good";
      if (value > timingThreshold.poor) return "poor";
      return "needs-improvement";
    }

    return "unknown";
  }

  /**
   * Get performance report
   */
  public getReport(): {
    metrics: PerformanceMetrics;
    status: Record<string, string>;
    score: number;
  } {
    const status: Record<string, string> = {};
    let goodCount = 0;
    const totalMetrics = Object.keys(this.metrics).length;

    Object.entries(this.metrics).forEach(([key, _value]) => {
      const metricStatus = this.getMetricStatus(key as keyof PerformanceMetrics);
      status[key] = metricStatus;

      if (metricStatus === "good") {
        goodCount++;
      }
    });

    const score = totalMetrics > 0 ? (goodCount / totalMetrics) * 100 : 0;

    return {
      metrics: this.getMetrics(),
      status,
      score: Math.round(score),
    };
  }

  /**
   * Log metrics to console
   */
  public logMetrics(): void {
    const report = this.getReport();

    console.group("📊 Performance Metrics Report");
    console.table(report.metrics);
    console.table(report.status);
    console.log(`Overall Score: ${report.score}%`);
    console.groupEnd();
  }

  /**
   * Send metrics to analytics service
   */
  public reportToAnalytics(service: {
    trackMetric: (name: string, value: number) => void;
  }): void {
    Object.entries(this.metrics).forEach(([name, value]) => {
      if (value !== undefined) {
        service.trackMetric(name, value);
      }
    });
  }

  /**
   * Check if page meets Web Vitals standards
   */
  public meetsWebVitalsStandards(): boolean {
    const report = this.getReport();
    const poorCount = Object.values(report.status).filter(
      (s) => s === "poor"
    ).length;

    return poorCount === 0;
  }

  /**
   * Dispose observers
   */
  public dispose(): void {
    this.observers.forEach((observer) => {
      if (observer) {
        observer.disconnect();
      }
    });
    this.observers.clear();
  }
}

/**
 * Global performance monitor instance
 */
let monitor: PerformanceMonitor | null = null;

/**
 * Get or create global performance monitor
 */
export function getPerformanceMonitor(): PerformanceMonitor {
  if (!monitor) {
    monitor = new PerformanceMonitor();
  }
  return monitor;
}

/**
 * Quick utility to measure function execution time
 */
export function measureExecutionTime<T>(
  fn: () => T,
  label: string = "Execution"
): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);

  return result;
}

/**
 * Async version of execution timer
 */
export async function measureAsyncExecutionTime<T>(
  fn: () => Promise<T>,
  label: string = "Async Execution"
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;

  console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);

  return result;
}

/**
 * Report specific metric value
 */
export function reportMetric(name: string, value: number): void {
  const monitor = getPerformanceMonitor();
  console.log(`📈 ${name}: ${value}ms`);

  // Send to analytics if available
  if (window.__ANALYTICS__) {
    window.__ANALYTICS__.trackMetric(name, value);
  }
}

/**
 * Extend Window interface for analytics integration
 */
declare global {
  interface Window {
    __ANALYTICS__?: {
      trackMetric: (name: string, value: number) => void;
    };
    __PERFORMANCE_MONITOR__?: PerformanceMonitor;
  }
}
