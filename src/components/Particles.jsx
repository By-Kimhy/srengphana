const KINDS = ['romdul', 'shuangxi', 'heart', 'snow']
const MOTIONS = ['zigzag', 'diag-left', 'diag-right']

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function buildFlakes(count = 48) {
  return Array.from({ length: count }, (_, i) => {
    const kind = KINDS[i % KINDS.length]
    const motion = MOTIONS[i % MOTIONS.length]
    return {
      id: i,
      kind,
      motion,
      left: `${rand(2, 98).toFixed(2)}%`,
      delay: `${(-rand(0, 28)).toFixed(2)}s`,
      duration: `${rand(18, 30).toFixed(2)}s`,
      scale: rand(0.75, 1.65).toFixed(3),
      driftX: `${(rand(-32, 32)).toFixed(2)}px`,
      rotBase: `${rand(0, 720).toFixed(2)}deg`,
    }
  })
}

const FLAKES = buildFlakes(40)

export default function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {FLAKES.map((f) => (
        <span
          key={f.id}
          className={`particle particle--${f.kind} particle--${f.motion}`}
          style={{
            left: f.left,
            animationDelay: f.delay,
            animationDuration: f.duration,
            '--flake-scale': f.scale,
            '--flake-drift-x': f.driftX,
            '--flake-rot-base': f.rotBase,
          }}
        >
          {f.kind === 'romdul' && (
            <img src="/img/romdul.svg" alt="" draggable={false} />
          )}
          {f.kind === 'shuangxi' && (
            <img src="/img/shuangxi.png" alt="" draggable={false} />
          )}
          {f.kind === 'heart' && '♥'}
          {f.kind === 'snow' && '❄'}
        </span>
      ))}
    </div>
  )
}
