/// <reference path="../.astro/types.d.ts" />

/**
 * Umami's tracker defines `window.umami` once its script has loaded. It is
 * optional on purpose: the script is only emitted in production builds with the
 * analytics env vars set, so every call site must optional-chain it.
 */
interface Window {
  umami?: {
    track: (
      eventName: string,
      eventData?: Record<string, string | number | boolean>,
    ) => void;
  };
}
