import { FC } from 'react';

interface SegmentsRingPropsType {
  segmentsCount: number;
  size: number;
  strokeWidth?: number;
  segmentsColors?: [string, string];
}

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) => {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const createArcPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
  ].join(' ');
};

export const SegmentsRing: FC<SegmentsRingPropsType> = ({
  segmentsCount,
  strokeWidth = 2,
  size,
  segmentsColors = ['#FF4DBB', '#5B19E7'],
}) => {
  const radius = (size - strokeWidth) / 2;
  const gapDeg = 10;
  const segmentDeg = 360 / segmentsCount - gapDeg;
  const rotationOffset = -90 - segmentDeg / 2;

  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="story-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={segmentsColors[0]} />
          <stop offset="100%" stopColor={segmentsColors[1]} />
        </linearGradient>
      </defs>
      <g transform={`rotate(${rotationOffset} ${size / 2} ${size / 2})`}>
        {Array.from({ length: segmentsCount }).map((_, index) => {
          const start = index * (segmentDeg + gapDeg);
          const end = start + segmentDeg;

          return (
            <path
              key={index}
              d={createArcPath(size / 2, size / 2, radius, start, end)}
              stroke={`url(#story-gradient)`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};
