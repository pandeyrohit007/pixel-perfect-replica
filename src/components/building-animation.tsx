// Minimal animated SVG: a building constructs itself floor-by-floor on loop.
export function BuildingAnimation() {
  const floors = 6;
  const floorH = 28;
  const baseY = 280;
  const buildingW = 120;
  const buildingX = 190;

  return (
    <svg
      viewBox="0 0 500 320"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line
        x1="0"
        y1={baseY + 2}
        x2="500"
        y2={baseY + 2}
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeDasharray="4 6"
      />

      {/* Crane */}
      <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" fill="none">
        {/* Mast */}
        <line x1="380" y1={baseY} x2="380" y2="60" />
        {/* Jib */}
        <line x1="200" y1="60" x2="430" y2="60" />
        {/* Counter jib brace */}
        <line x1="380" y1="40" x2="430" y2="60" />
        <line x1="380" y1="40" x2="280" y2="60" />
        {/* Cable */}
        <line x1="260" y1="60" x2="260" y2="120">
          <animate
            attributeName="y2"
            values="120;200;200;120;120"
            keyTimes="0;0.35;0.55;0.85;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </line>
        {/* Hook / load */}
        <rect x="252" y="118" width="16" height="6" fill="currentColor" fillOpacity="0.6" stroke="none">
          <animate
            attributeName="y"
            values="118;198;198;118;118"
            keyTimes="0;0.35;0.55;0.85;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Building floors — appear one by one, then reset */}
      <g>
        {Array.from({ length: floors }).map((_, i) => {
          const y = baseY - (i + 1) * floorH;
          const totalDur = 6;
          const start = (i / floors) * (totalDur * 0.85);
          return (
            <g key={i}>
              <rect
                x={buildingX}
                y={y}
                width={buildingW}
                height={floorH - 2}
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeOpacity="0.7"
                strokeWidth="1.2"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes={`0;${(start / totalDur).toFixed(3)};${((start + 0.4) / totalDur).toFixed(3)};0.95;1`}
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values={`${y - 20};${y - 20};${y};${y};${y}`}
                  keyTimes={`0;${(start / totalDur).toFixed(3)};${((start + 0.4) / totalDur).toFixed(3)};0.95;1`}
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                />
              </rect>
              {/* windows */}
              {[0, 1, 2, 3].map((w) => (
                <rect
                  key={w}
                  x={buildingX + 12 + w * 26}
                  y={y + 8}
                  width="14"
                  height="10"
                  fill="currentColor"
                  fillOpacity="0.5"
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0;0.9;0.9;0"
                    keyTimes={`0;${((start + 0.3) / totalDur).toFixed(3)};${((start + 0.5) / totalDur).toFixed(3)};0.95;1`}
                    dur={`${totalDur}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          );
        })}
      </g>

      {/* Foundation */}
      <rect
        x={buildingX - 10}
        y={baseY - 4}
        width={buildingW + 20}
        height="6"
        fill="currentColor"
        fillOpacity="0.6"
      />

      {/* Scaffolding hint */}
      <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" fill="none">
        <line x1={buildingX - 6} y1={baseY} x2={buildingX - 6} y2={baseY - floors * floorH} />
        <line x1={buildingX + buildingW + 6} y1={baseY} x2={buildingX + buildingW + 6} y2={baseY - floors * floorH} />
      </g>
    </svg>
  );
}
