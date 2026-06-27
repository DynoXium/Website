"use client";

import React, { useEffect, useRef } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export default function Turnstile({ siteKey, onVerify, onExpire, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load script if not already loaded
    if (!document.querySelector('script[src*="turnstile/v0/api.js"]')) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    let widgetId: string | null = null;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current) {
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          "expired-callback": onExpire,
          "error-callback": onError,
          theme: "dark",
        });
      }
    };

    // If script is already loaded and turnstile object exists, render immediately
    if (window.turnstile) {
      renderWidget();
    } else {
      // Otherwise wait for the global turnstile script to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [siteKey, onVerify, onExpire, onError]);

  return <div ref={containerRef} />;
}

// Add turnstile type declaration for window object
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: any) => string;
      remove: (widgetId: string) => void;
    };
  }
}
