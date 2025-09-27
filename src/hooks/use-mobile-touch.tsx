import { useState, useEffect } from 'react';

export const useMobileTouch = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(isMobileDevice);
      setIsTouchDevice(isTouchCapable);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, isTouchDevice };
};

// Touch-friendly button sizes
export const getTouchButtonSize = (isMobile: boolean, isTouchDevice: boolean) => {
  if (isMobile || isTouchDevice) {
    return {
      minHeight: '44px', // Apple's recommended minimum touch target
      minWidth: '44px',
      padding: '12px 16px',
    };
  }
  return {};
};

// Touch-friendly spacing
export const getTouchSpacing = (isMobile: boolean) => {
  return isMobile ? {
    gap: '12px',
    padding: '16px',
    margin: '8px',
  } : {
    gap: '8px',
    padding: '12px',
    margin: '4px',
  };
};
