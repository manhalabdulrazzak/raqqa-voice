import React from 'react';

interface AnimatedServiceIconProps {
  category: string;
  className?: string;
  size?: number;
  isHovered?: boolean;
  color?: string;
}

export const AnimatedServiceIcon: React.FC<AnimatedServiceIconProps> = ({
  category,
  className = '',
  size = 28,
  isHovered = false,
  color = 'currentColor',
}) => {
  const norm = category.toLowerCase();

  // Water icon: Droplet with ripple & fluid motion
  if (norm.includes('water') || norm.includes('مياه') || norm.includes('صرف')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${
          isHovered ? 'scale-110 -translate-y-0.5' : ''
        } ${className}`}
      >
        <path
          d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
          className="transition-transform duration-300 origin-center"
        />
        <path
          d="M8.5 14a3.5 3.5 0 0 0 7 0"
          strokeOpacity="0.7"
          className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
        />
      </svg>
    );
  }

  // Electricity icon: Lightning bolt with quick energy pulse
  if (norm.includes('electric') || norm.includes('كهرباء') || norm.includes('طاقة')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-200 ${
          isHovered ? 'scale-115 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : ''
        } ${className}`}
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }

  // Health icon: Pulse / Heartbeat cross with subtle heartbeat pulse
  if (norm.includes('health') || norm.includes('صحة') || norm.includes('طب')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${
          isHovered ? 'scale-115 text-rose-600' : ''
        } ${className}`}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M3.5 12h4l2-3 3 6 2-4 2 2h3" strokeOpacity="0.9" />
      </svg>
    );
  }

  // Roads & Municipality icon: Road with perspective & streetlines
  if (norm.includes('municipality') || norm.includes('بلدية') || norm.includes('طرق') || norm.includes('أشغال')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-200 ${
          isHovered ? '-translate-y-1' : ''
        } ${className}`}
      >
        <path d="M4 19L9 4" />
        <path d="M20 19L15 4" />
        <line x1="12" y1="5" x2="12" y2="9" />
        <line x1="12" y1="13" x2="12" y2="18" />
      </svg>
    );
  }

  // Sanitation / Cleaning icon: Waste / Recycle broom sweep
  if (norm.includes('sanitation') || norm.includes('نظافة') || norm.includes('بيئة')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 origin-bottom ${
          isHovered ? 'rotate-6 scale-105' : ''
        } ${className}`}
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    );
  }

  // Education icon: Book gently opening
  if (norm.includes('education') || norm.includes('تربية') || norm.includes('مدارس') || norm.includes('تعليم')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-200 ${
          isHovered ? 'scale-108' : ''
        } ${className}`}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    );
  }

  // Supply / Consumer protection icon: Scale of justice / market shopping bag
  if (norm.includes('supply') || norm.includes('تموين') || norm.includes('مستهلك') || norm.includes('تجارة')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${
          isHovered ? '-rotate-6 scale-105' : ''
        } ${className}`}
      >
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h18" />
      </svg>
    );
  }

  // Transport icon: Bus / vehicle with directional movement
  if (norm.includes('transport') || norm.includes('نقل') || norm.includes('مواصلات') || norm.includes('سير')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${
          isHovered ? '-translate-x-1' : ''
        } ${className}`}
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10H8s-2.7.6-4.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  }

  // Agriculture icon: Sprout / leaf with growth motion
  if (norm.includes('agriculture') || norm.includes('زراعة') || norm.includes('ري') || norm.includes('محاصيل')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${
          isHovered ? 'scale-112 rotate-3' : ''
        } ${className}`}
      >
        <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7Z" />
        <path d="M11 13c0-4 3-7 3-7" />
        <path d="M11 20v-7" />
      </svg>
    );
  }

  // Social Affairs icon: Connected people / solidarity
  if (norm.includes('social') || norm.includes('شؤون') || norm.includes('تضامن') || norm.includes('عمل')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-200 ${
          isHovered ? 'scale-108' : ''
        } ${className}`}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  // Default civic building / institution
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-200 ${
        isHovered ? '-translate-y-0.5' : ''
      } ${className}`}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
};
