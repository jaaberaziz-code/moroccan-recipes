'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Minimalist Tajine Icon */}
      <div className={`${s.icon} relative`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
          {/* Simple circle background */}
          <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Minimalist tajine shape */}
          <path 
            d="M10 28c0-6 4.5-11 10-11s10 5 10 11" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M8 28h24" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="14" r="2" fill="currentColor" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-semibold ${s.text} text-charcoal dark:text-white`}>
            Chaimae's
          </span>
          <span className={`text-xs text-charcoal/60 dark:text-white/60`} dir="rtl">
            وصفات شيماء
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 28c0-6 4.5-11 10-11s10 5 10 11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 28h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}
