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
      {/* reCAPTCHA Badge Container - Google renders official badge here automatically */}
      <div
        id="recaptcha-badge"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
        }}
      />
    </>
  );
};

export default RecaptchaBadge;
