import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { Agentation } from "agentation";

// Lazy load page components to split javascript chunks and minimize initial load size
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));

// Defer fallback skeleton loader
const RouteSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-[#37C643] border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const { loadRecaptcha } = useRecaptcha();

  useEffect(() => {
    loadRecaptcha();
  }, [loadRecaptcha]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<RouteSkeleton />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      {import.meta.env.DEV && <Agentation />}
    </ErrorBoundary>
  );
};

export default App;
