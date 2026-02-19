import { useId } from 'react';

interface StarIconProps {
  fill: 'empty' | 'half' | 'full';
  size?: number;
}

export function StarIcon({ fill, size = 24 }: StarIconProps) {
  const uniqueId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {fill === 'half' && (
        <defs>
          <linearGradient id={uniqueId}>
            <stop offset="50%" stopColor="var(--color-primary-vivid)" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
        fill={
          fill === 'full'
            ? 'var(--color-primary-vivid)'
            : fill === 'half'
              ? `url(#${uniqueId})`
              : 'transparent'
        }
        stroke={fill === 'empty' ? 'var(--color-star-empty)' : 'var(--color-primary-vivid)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
