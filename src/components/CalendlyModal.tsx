import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// IMPORTANT: Update this with your actual Calendly URL
// Format: https://calendly.com/your-username or https://calendly.com/your-username/meeting-type
const CALENDLY_URL = "https://calendly.com/d/zzy-699-f8v/book-a-demo";

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate loading time
      const timer = setTimeout(() => setIsLoading(false), 1000);
      // Hide body scrollbar when modal opens
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      // Restore body scrollbar when modal closes
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative flex flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Left Side - Logo & Info */}
            <div className="hidden md:flex w-2/5 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex-col p-8 border-r border-gray-200 dark:border-slate-700 items-center justify-start pt-12">
              {/* Company Logo */}
              <div className="mb-8">
                <img 
                  src="/ComplianceVista-logo.svg" 
                  alt="ComplianceVista Logo"
                  className="h-24 w-auto"
                />
              </div>

              {/* Info Section */}
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Book A Demo</h3>
                  <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                    <div className="w-5 h-5 flex items-center justify-center">⏱️</div>
                    <span className="text-sm font-medium">45 min</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ready to see how ComplianceVista can transform your compliance testing? Schedule a personalized demo with our team today.
                </p>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-left text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <p><strong>What to expect:</strong></p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Product overview</li>
                    <li>Feature walkthrough</li>
                    <li>Q&A session</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Calendar */}
            <div className="w-full md:w-3/5 flex flex-col overflow-hidden">
              {/* Mobile Header */}
              <div className="md:hidden px-6 pt-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                <h2 className="text-2xl font-bold gradient-text">Schedule a Demo</h2>
                <p className="text-sm text-muted-foreground mt-1">Book a time that works best for you</p>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading calendar...</p>
                  </div>
                </div>
              )}

              {/* Scrollable Calendar Container */}
              {!isLoading && (
                <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 #f1f5f9"
                  }}
                >
                  <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      width: 6px;
                    }
                    .scrollbar-hide::-webkit-scrollbar-track {
                      background: transparent;
                      border-radius: 12px;
                    }
                    .scrollbar-hide::-webkit-scrollbar-thumb {
                      background: #cbd5e1;
                      border-radius: 3px;
                    }
                    .scrollbar-hide::-webkit-scrollbar-thumb:hover {
                      background: #94a3b8;
                    }
                  `}</style>
                  <iframe
                    src={`${CALENDLY_URL}?embed_domain=${window.location.hostname}&embed_type=Inline`}
                    width="100%"
                    height="1400"
                    frameBorder="0"
                    title="Schedule a demo"
                    allowFullScreen
                    scrolling="no"
                    style={{ display: "block", borderRadius: "8px" }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;
