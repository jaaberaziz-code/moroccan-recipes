'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-10 h-10', text: 'text-lg' },
    md: { container: 'w-12 h-12', text: 'text-xl' },
    lg: { container: 'w-16 h-16', text: 'text-2xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`${s.container} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta via-saffron to-majorelle shadow-lg`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="w-2/3 h-2/3 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tajine lid */}
          <path
            d="M24 8C16 8 10 14 10 20C10 22 11 24 12 26H36C37 24 38 22 38 20C38 14 32 8 24 8Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          {/* Tajine base */}
          <path
            d="M8 28C8 28 12 32 24 32C36 32 40 28 40 28L38 36H10L8 28Z"
            fill="currentColor"
          />
          {/* Decorative pattern */}
          <circle cx="24" cy="18" r="3" fill="#F2E8D5" />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${s.text} bg-gradient-to-r from-terracotta to-majorelle bg-clip-text text-transparent`}>
            Chaimae's
          </span>
          <span className={`text-sm font-medium text-charcoal/70 -mt-1`} dir="rtl">
            وصفات شيماء
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="12" fill="url(#gradient)" />
      <path
        d="M24 10C17 10 12 15 12 20C12 22 13 23 14 25H34C35 23 36 22 36 20C36 15 31 10 24 10Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M10 27C10 27 13 30 24 30C35 30 38 27 38 27L37 34H11L10 27Z"
        fill="white"
      />
      <circle cx="24" cy="19" r="2.5" fill="#F2E8D5" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E07A5F" />
          <stop offset="0.5" stopColor="#F2CC8F" />
          <stop offset="1" stopColor="#3D5A80" />
        </linearGradient>
      </defs>
    </svg>
  );
}
