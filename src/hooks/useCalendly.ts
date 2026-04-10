declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL =
  "https://calendly.com/d/zzy-699-f8v/book-a-demo?embed_domain=surveyvista.com&embed_type=PopupText";

export function useCalendly() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Fallback: open in a new tab if the widget script hasn't loaded yet
      window.open(CALENDLY_URL, "_blank");
    }
  };

  return { openCalendly };
}
