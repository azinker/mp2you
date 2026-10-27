export const META_PIXEL_ID = "2324309135006643";

export function trackMetaLead() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
