"use client";

interface QwillioLogoProps {
  size?: number;
  className?: string;
}

export default function QwillioLogo({ size = 18, className = "" }: QwillioLogoProps) {
  const r = size * 0.35;
  const cy = size / 2;
  const cx1 = size * 0.35;
  const cx2 = size * 0.65;
  const gradientId = `qw-grad-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Qwillio"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B6BF5" />
          <stop offset="100%" stopColor="#9B5CF6" />
        </linearGradient>
        <clipPath id={`clip-left-${size}`}>
          <circle cx={cx1} cy={cy} r={r} />
        </clipPath>
        <clipPath id={`clip-right-${size}`}>
          <circle cx={cx2} cy={cy} r={r} />
        </clipPath>
        <clipPath id={`clip-inter-${size}`}>
          <circle cx={cx2} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle cx={cx1} cy={cy} r={r} fill="#5B6BF5" />
      <circle cx={cx2} cy={cy} r={r} fill="#9B5CF6" />
      <circle cx={cx2} cy={cy} r={r} fill={`url(#${gradientId})`} clipPath={`url(#clip-left-${size})`} />
    </svg>
  );
}
