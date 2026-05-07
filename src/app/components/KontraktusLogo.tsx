interface LogoProps {
  variant?: 'full' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
}

const ACC = '#3458e6';
const ACC_DM = '#6f96ff';

/** Canonical mark — synced with `brand/primary` (refined clause stack + K + ledger). */

function ClauseStackMark({ inverse }: { inverse: boolean }) {
  const z = inverse
    ? [
        { c: '#2a3242', sw: 1.05, o: 0.44 },
        { c: '#384252', sw: 0.98, o: 0.32 },
        { c: '#4b5569', sw: 0.9, o: 0.46 },
      ]
    : [
        { c: '#ebeff9', sw: 1.1, o: 0.52 },
        { c: '#d7e1ef', sw: 1.02, o: 0.36 },
        { c: '#aab8cc', sw: 0.92, o: 0.52 },
      ];
  const ink = inverse ? '#f3f5f9' : '#080a0f';
  const leg = inverse ? '#5c697e' : '#c5cedd';
  const acc = inverse ? ACC_DM : ACC;

  return (
    <g>
      <rect x="7.05" y="7" width="67.42" height="60.92" rx={11.08} ry={11.08} stroke={z[0].c} strokeWidth={z[0].sw} fill="none" opacity={z[0].o} />
      <rect x="10.9" y="10.82" width="67.42" height="60.92" rx={10.82} ry={10.82} stroke={z[1].c} strokeWidth={z[1].sw} fill="none" opacity={z[1].o} />
      <rect x="14.72" y="14.62" width="67.42" height="60.92" rx={10.56} ry={10.56} stroke={z[2].c} strokeWidth={z[2].sw} fill="none" opacity={z[2].o} />
      <rect fill={ink} x={17.35} y={23.55} width={12.55} height={49.15} rx={4.72} ry={4.72} />
      <path fill={ink} d="M30.12 35.62 L70.42 20.05 L70.42 33.38 L42.92 53.28 L30.12 43.18 Z" />
      <path fill={ink} d="M30.12 46.88 L71.02 71.02 L71.02 57.58 L43.92 53.38 L30.12 46.88 Z" />
      <path stroke={leg} opacity={inverse ? 0.42 : 0.44} strokeWidth={1.38} strokeLinecap="round" fill="none" d="M20.05 71.92 H43.42" />
      <path stroke={acc} opacity={inverse ? 0.88 : 0.86} strokeWidth={1.38} strokeLinecap="round" fill="none" d="M43.58 71.92 H53.65" />
      <rect x={52.92} y={71.42} width={2.05} height={1.08} rx={0.42} fill={acc} opacity={inverse ? 0.88 : 0.86} />
    </g>
  );
}

export function KontraktusLogo({ variant = 'full', size = 'lg' }: LogoProps) {
  const iconSizes = { sm: 40, md: 56, lg: 72 } as const;
  const textSizes = { sm: 'text-3xl', md: 'text-5xl', lg: 'text-6xl' } as const;

  const iconSize = iconSizes[size];
  const textSize = textSizes[size];

  return (
    <div className="flex flex-col items-center gap-6">
      {variant === 'full' ? (
        <>
          <div className="flex items-center gap-5">
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="1.5 5.5 84 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(10.5 11.5)">
                <ClauseStackMark inverse={false} />
              </g>
            </svg>
            <div className="flex flex-col">
              <h1
                className={`${textSize} font-semibold tracking-tight text-slate-950`}
                style={{
                  letterSpacing: '-0.072em',
                  fontFamily: '"IBM Plex Sans", Inter, "Lato", ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 600,
                }}
              >
                Kontraktus
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-500 text-center max-w-md">
            AI-powered contract intelligence for modern enterprises
          </p>
        </>
      ) : (
        <div className="relative">
          <svg
            width={iconSize * 2}
            height={iconSize * 2}
            viewBox="0 0 160 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Kontraktus circular mark"
          >
            <circle cx={80} cy={81} r={74} fill="#06080f" />
            <g transform="translate(27.5 40) scale(1.56)">
              <ClauseStackMark inverse />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
