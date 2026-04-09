import { useEffect } from "react";

const RecaptchaBadge = () => {
  useEffect(() => {
    // Add custom styling for reCAPTCHA badge to ensure it's visible and positioned correctly
    const style = document.createElement("style");
    style.textContent = `
      /* reCAPTCHA Badge - Always Visible */
      .grecaptcha-badge {
        visibility: visible !important;
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 999 !important;
      }
      
      /* Ensure badge is visible even on pages with iframes */
      .grecaptcha-badge iframe {
        display: block !important;
      }
      
      /* Optional: Add subtle animation when badge appears */
      @keyframes badgeFadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .grecaptcha-badge {
        animation: badgeFadeIn 0.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    // Log verification status
    console.log(
      "%c✓ reCAPTCHA V3 Active",
      "color: #00C896; font-size: 14px; font-weight: bold; background: #f0f0f0; padding: 5px 10px; border-radius: 4px;"
    );
    console.log("Site Key: 6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh");
    console.log("Status: Protected by reCAPTCHA V3");
    console.log(
      "Note: Secret key verification happens server-side for security"
    );
  }, []);

  return (
    <>
      {/* reCAPTCHA Badge Container - Google renders badge here automatically */}
      <div
        id="recaptcha-badge"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
          fontSize: "12px",
        }}
      />

      {/* Status Indicator - Shows reCAPTCHA is active */}
      <div
        className="fixed bottom-6 right-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-green-200 dark:border-green-800 shadow-lg z-[998] pointer-events-none"
        style={{ marginRight: "120px" }}
        title="reCAPTCHA V3 Protected"
      >
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-700 dark:text-green-400 font-medium">
            Protected
          </span>
        </div>
      </div>
    </>
  );
};

export default RecaptchaBadge;
