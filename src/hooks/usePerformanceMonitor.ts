import { useEffect, useCallback, useRef } from "react";
import {
  PerformanceMonitor,
  getPerformanceMonitor,
  PerformanceMetrics,
} from "@/utils/performanceMonitor";

/**
 * Hook to access performance monitoring
 * Returns metrics and utility functions for performance tracking
 */
export function usePerformanceMonitor() {
  const monitorRef = useRef<PerformanceMonitor | null>(null);

  useEffect(() => {
    monitorRef.current = getPerformanceMonitor();

    // Make available globally for debugging
    if (typeof window !== "undefined") {
      window.__PERFORMANCE_MONITOR__ = monitorRef.current;
    }

    return () => {
      // Don't dispose to keep tracking across page navigations
    };
  }, []);

  const getMetrics = useCallback(() => {
    return monitorRef.current?.getMetrics() ?? {};
  }, []);

  const getReport = useCallback(() => {
    return monitorRef.current?.getReport();
  }, []);

  const logMetrics = useCallback(() => {
    monitorRef.current?.logMetrics();
  }, []);

  const meetsWebVitalsStandards = useCallback(() => {
    return monitorRef.current?.meetsWebVitalsStandards() ?? false;
  }, []);

  return {
    getMetrics,
    getReport,
    logMetrics,
    meetsWebVitalsStandards,
  };
}

/**
 * Hook to measure component render time
 */
export function useMeasureRender(componentName: string) {
  const renderStartRef = useRef<number>(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - renderStartRef.current;
    console.log(`⏱️ ${componentName} render time: ${renderTime.toFixed(2)}ms`);
  }, [componentName]);
}

/**
 * Hook to measure component update time
 */
export function useMeasureUpdate(
  componentName: string,
  deps: (string | number | boolean | object)[] = []
) {
  const updateStartRef = useRef<number>(performance.now());

  useEffect(() => {
    const updateTime = performance.now() - updateStartRef.current;
    console.log(`⏱️ ${componentName} update time: ${updateTime.toFixed(2)}ms`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook to track metric threshold violations
 */
export function useMetricThresholdCheck(
  metricName: keyof PerformanceMetrics,
  threshold: number,
  onViolation?: (value: number) => void
) {
  const { getMetrics } = usePerformanceMonitor();

  useEffect(() => {
    const checkMetric = setInterval(() => {
      const metrics = getMetrics();
      const value = metrics[metricName];

      if (value !== undefined && value > threshold) {
        console.warn(
          `⚠️ ${metricName} threshold violated: ${value}ms > ${threshold}ms`
        );
        onViolation?.(value);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkMetric);
  }, [metricName, threshold, onViolation, getMetrics]);
}

/**
 * Hook to log performance report on mount/unmount
 */
export function usePerformanceReport(enabled: boolean = true) {
  const { logMetrics } = usePerformanceMonitor();

  useEffect(() => {
    if (!enabled) return;

    // Log on mount
    const timer = setTimeout(() => {
      logMetrics();
    }, 1000);

    return () => clearTimeout(timer);
  }, [enabled, logMetrics]);
}

/**
 * Hook to observe and report when LCP occurs
 */
export function useOnLargestContentfulPaint(
  callback?: (lcp: number) => void
) {
  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcpEntry = lastEntry as unknown as {
          renderTime?: number;
          loadTime?: number;
        };
        const lcp = lcpEntry.renderTime || lcpEntry.loadTime;

        console.log(`📊 Largest Contentful Paint: ${lcp.toFixed(2)}ms`);
        callback?.(lcp);
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });

      return () => observer.disconnect();
    } catch (error) {
      console.warn("LCP observer not supported:", error);
    }
  }, [callback]);
}

/**
 * Hook to detect and report Cumulative Layout Shift
 */
export function useOnLayoutShift(callback?: (cls: number) => void) {
  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

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
            console.log(`📊 Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
            callback?.(clsValue);
          }
        });
      });

      observer.observe({ entryTypes: ["layout-shift"] });

      return () => observer.disconnect();
    } catch (error) {
      console.warn("CLS observer not supported:", error);
    }
  }, [callback]);
}

/**
 * Hook to report user interaction timing (First Input Delay)
 */
export function useOnFirstInputDelay(
  callback?: (delay: number) => void
) {
  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry) => {
          const fidEntry = entry as unknown as {
            processingStart?: number;
            startTime?: number;
          };
          const delay = (fidEntry.processingStart || 0) - (fidEntry.startTime || 0);
          console.log(
            `⏱️ First Input Delay: ${delay.toFixed(2)}ms`
          );
          callback?.(delay);
        });
      });

      observer.observe({ entryTypes: ["first-input"] });

      return () => observer.disconnect();
    } catch (error) {
      console.warn("FID observer not supported:", error);
    }
  }, [callback]);
}

/**
 * Hook to measure component lifecycle and interactions
 */
export function usePerformanceTrace(
  componentName: string,
  options: {
    trackRender?: boolean;
    trackInteractions?: boolean;
    verbose?: boolean;
  } = {}
) {
  const { trackRender = true, trackInteractions = true, verbose = false } =
    options;
  const renderStartRef = useRef<number>(performance.now());
  const interactionCountRef = useRef<number>(0);

  useEffect(() => {
    if (trackRender) {
      const renderTime = performance.now() - renderStartRef.current;
      if (verbose) {
        console.log(
          `🎯 ${componentName} initial render: ${renderTime.toFixed(2)}ms`
        );
      }
    }
  }, [componentName, trackRender, verbose]);

  const trackInteraction = useCallback(
    (interactionName: string) => {
      if (trackInteractions) {
        interactionCountRef.current++;
        if (verbose) {
          console.log(
            `👆 ${componentName}.${interactionName} (interaction #${interactionCountRef.current})`
          );
        }
      }
    },
    [componentName, trackInteractions, verbose]
  );

  return {
    trackInteraction,
    getInteractionCount: () => interactionCountRef.current,
  };
}
