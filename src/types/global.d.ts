export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    _scrolled50?: boolean;
  }
}
