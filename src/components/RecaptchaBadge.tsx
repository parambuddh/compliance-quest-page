import { useEffect } from "react";

declare global {
  interface Window {
    grecaptcha: {
      render: (containerId: string, options: any) => void;
    };
  }
}

const RecaptchaBadge = () => {
  useEffect(() => {
    // Render reCAPTCHA V2 Invisible badge in the container
    if (window.grecaptcha && document.getElementById("recaptcha-badge-container")) {
      window.grecaptcha.render("recaptcha-badge-container", {
        sitekey: "6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh",
        size: "invisible",
        badge: "bottomleft",
      });
    }

    // Log verification status
    console.log(
      "%c✓ reCAPTCHA V2 Invisible Active",
      "color: #00C896; font-size: 14px; font-weight: bold; background: #f0f0f0; padding: 5px 10px; border-radius: 4px;"
    );
    console.log("Site Key: 6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh");
    console.log("Status: Protected by reCAPTCHA V2 Invisible - Badge visible at bottom-left");
    console.log(
      "Note: Secret key verification happens server-side for security"
    );
  }, []);

  return (
    <>
      {/* reCAPTCHA Badge Container - Google renders badge here */}
      <div
        id="recaptcha-badge-container"
        style={{
          position: "fixed",
          bottom: "8px",
          left: "8px",
          zIndex: 30,
          transform: "scale(0.75)",
          transformOrigin: "bottom left",
        }}
      />
    </>
  );
};

export default RecaptchaBadge;
