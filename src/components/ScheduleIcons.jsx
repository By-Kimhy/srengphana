/** Traditional Khmer wedding program icons (monoline, invitation style). */

function Svg({ children, className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  )
}

const s = {
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/** Ancestor offerings — fruit trays + incense */
function Offering() {
  return (
    <Svg>
      <ellipse cx="24" cy="38" rx="13" ry="3.5" {...s} />
      <path d="M13 38c1-5 5-8 11-8s10 3 11 8" {...s} />
      <rect x="17" y="22" width="14" height="8" rx="1.5" {...s} />
      <path d="M20 22v-5M24 22v-7M28 22v-5" {...s} />
      <path d="M20 14c-.5-2 1-3.5 2.5-2M24 12c0-2.5 1.5-4 3-2.5M28 14c-.5-2 1-3.5 2.5-2" {...s} />
    </Svg>
  )
}

/** Monk blessing / soat mon — lotus + prayer bowl */
function Chanting() {
  return (
    <Svg>
      <path d="M24 8c-1 5-6 8-6 13a6 6 0 0 0 12 0c0-5-5-8-6-13Z" {...s} />
      <path d="M18 21c2 2 4 3 6 3s4-1 6-3" {...s} />
      <ellipse cx="24" cy="36" rx="11" ry="4" {...s} />
      <path d="M14 36c1-4 4-7 10-7s9 3 10 7" {...s} />
      <path d="M24 29v-3" {...s} />
    </Svg>
  )
}

/** Call spirits — candle flame on pedestal */
function Spirits() {
  return (
    <Svg>
      <path d="M24 6c-1 4-5 7-5 12a5 5 0 0 0 10 0c0-5-4-8-5-12Z" {...s} />
      <path d="M24 23v6" {...s} />
      <path d="M18 29h12v3H18z" {...s} />
      <ellipse cx="24" cy="38" rx="12" ry="3.5" {...s} />
      <path d="M14 35c1-2 4-3 10-3s9 1 10 3" {...s} />
    </Svg>
  )
}

/** Bok Leak — mortar & pestle */
function BokLeak() {
  return (
    <Svg>
      <path d="M11 30c1 7 6 11 13 11s12-4 13-11H11Z" {...s} />
      <path d="M13 30c2-5 5-8 11-8s9 3 11 8" {...s} />
      <path d="M29 8l7 18" {...s} />
      <path d="M27 7h10" {...s} />
      <circle cx="20" cy="26" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="25" cy="25" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  )
}

/** Dinner — plate + fork & spoon */
function Dinner() {
  return (
    <Svg>
      <circle cx="22" cy="24" r="11" {...s} />
      <circle cx="22" cy="24" r="6.5" {...s} />
      <path d="M38 12v20" {...s} />
      <path d="M41 14c0 4-1 8-1 12" {...s} />
      <path d="M8 14v4c0 3 1.5 5 3 5M8 28v6" {...s} />
      <path d="M11 14v20" {...s} />
    </Svg>
  )
}

/** Guest gathering — three people silhouette */
function Guests() {
  return (
    <Svg>
      <circle cx="24" cy="12" r="4.5" {...s} />
      <circle cx="12" cy="16" r="3.5" {...s} />
      <circle cx="36" cy="16" r="3.5" {...s} />
      <path d="M15 38c1-7 4-11 9-11s8 4 9 11" {...s} />
      <path d="M6 36c1-5 3-8 6-8 2 0 3.5 1 5 3" {...s} />
      <path d="M31 31c1.5-2 3-3 5-3 3 0 5 3 6 8" {...s} />
    </Svg>
  )
}

/** Procession / gift offering — stacked phka sla trays */
function Procession() {
  return (
    <Svg>
      <path d="M8 40h32" {...s} />
      <path d="M12 40l2-8h20l2 8" {...s} />
      <path d="M15 32l2-7h14l2 7" {...s} />
      <path d="M18 25l2-6h8l2 6" {...s} />
      <circle cx="24" cy="12" r="4" {...s} />
      <path d="M24 16v3" {...s} />
      <path d="M21 10c1-2 2-3 3-3s2 1 3 3" {...s} />
    </Svg>
  )
}

/** Matching / parents talk — two facing figures with handshake */
function Respects() {
  return (
    <Svg>
      <circle cx="14" cy="14" r="4.5" {...s} />
      <circle cx="34" cy="14" r="4.5" {...s} />
      <path d="M7 36c1-8 3-12 7-12s6 4 7 10" {...s} />
      <path d="M27 34c1-6 3-10 7-10s6 4 7 12" {...s} />
      <path d="M18 26h12" {...s} />
      <path d="M20 26c1 3 3 5 4 5s3-2 4-5" {...s} />
    </Svg>
  )
}

/** Ring exchange — two interlocked rings */
function Rings() {
  return (
    <Svg>
      <circle cx="18" cy="26" r="10" {...s} />
      <circle cx="30" cy="26" r="10" {...s} />
      <path d="M18 16l2-5h4l2 5" {...s} />
      <path d="M30 16l2-5h4l2 5" {...s} />
    </Svg>
  )
}

/** Hair-cutting — scissors + comb */
function Haircut() {
  return (
    <Svg>
      <circle cx="14" cy="16" r="4.5" {...s} />
      <circle cx="14" cy="32" r="4.5" {...s} />
      <path d="M18 18.5L36 10" {...s} />
      <path d="M18 29.5L36 38" {...s} />
      <path d="M36 10l5 2.5M36 38l5-2.5" {...s} />
      <path d="M28 16v16M31 18v12M34 20v8" {...s} />
    </Svg>
  )
}

/** Wrist-tying — two wrists with blessing string */
function WristTie() {
  return (
    <Svg>
      <path d="M8 20c3-2 6-3 10-3 2 0 4 .5 6 1.5" {...s} />
      <path d="M24 18.5c2-1 4-1.5 6-1.5 4 0 7 1 10 3" {...s} />
      <path d="M10 28c2 6 6 10 14 10s12-4 14-10" {...s} />
      <path d="M14 22c0 3 1 5 3 6M34 22c0 3-1 5-3 6" {...s} />
      <path d="M18 24h12" {...s} />
      <path d="M20 21c1.5 2 3 3.5 4 3.5s2.5-1.5 4-3.5" {...s} />
      <circle cx="24" cy="14" r="2" {...s} />
    </Svg>
  )
}

/** Blessing — popil leaf fan */
function Blessing() {
  return (
    <Svg>
      <path d="M24 42V22" {...s} />
      <path d="M24 22c-6-2-10-7-10-13 4 1 8 5 10 13Z" {...s} />
      <path d="M24 22c6-2 10-7 10-13-4 1-8 5-10 13Z" {...s} />
      <path d="M24 22c-2-7-1-13 0-16 1 3 2 9 0 16Z" {...s} />
      <path d="M18 40h12" {...s} />
    </Svg>
  )
}

/** Lunch — covered food bowl */
function Lunch() {
  return (
    <Svg>
      <path d="M10 26c1 9 6 14 14 14s13-5 14-14H10Z" {...s} />
      <path d="M12 26c1-5 5-8 12-8s11 3 12 8" {...s} />
      <ellipse cx="24" cy="18" rx="8" ry="3" {...s} />
      <path d="M24 10v5M21 12h6" {...s} />
    </Svg>
  )
}

/** Evening banquet — clinking glasses */
function Banquet() {
  return (
    <Svg>
      <path d="M14 10h10l-1.5 14H15.5L14 10Z" {...s} />
      <path d="M16 24v10M22 24v10M14 34h10" {...s} />
      <path d="M26 14h10l-1.5 12H27.5L26 14Z" {...s} />
      <path d="M28 26v10M34 26v10M26 36h10" {...s} />
      <path d="M20 16l10 4" {...s} />
    </Svg>
  )
}

const ICONS = {
  offering: Offering,
  chanting: Chanting,
  spirits: Spirits,
  bokleak: BokLeak,
  dinner: Dinner,
  guests: Guests,
  procession: Procession,
  respects: Respects,
  rings: Rings,
  haircut: Haircut,
  wrist: WristTie,
  blessing: Blessing,
  lunch: Lunch,
  banquet: Banquet,
}

export default function ScheduleIcon({ name }) {
  const Comp = ICONS[name] || Offering
  return <Comp />
}
