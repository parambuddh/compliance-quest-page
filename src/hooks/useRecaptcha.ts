import { useState, useCallback } from 'react';

const RECAPTCHA_SITE_KEY = "6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh";

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadRecaptcha = useCallback(() => {
    if (isLoaded || document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, [isLoaded]);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!window.grecaptcha) {
      console.warn("reCAPTCHA has not loaded yet");
      return null;
    }
    try {
      return await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    } catch (e) {
      console.error("reCAPTCHA execution failed", e);
      return null;
    }
  };

  return { loadRecaptcha, executeRecaptcha, isLoaded };
};
