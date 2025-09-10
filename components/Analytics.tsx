'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-812ETWW3RL', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
