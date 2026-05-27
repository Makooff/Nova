// Nova presentation video — scenes
// Each scene is wrapped in <Sprite start end> and uses useSprite() for local timing.
// Aesthetic locked to Nova: monochrome oklch, Sora thin, DM Mono micro-labels,
// cubic-bezier(0.16, 1, 0.3, 1) → matches Easing.easeOutQuart-ish curve.

const { Sprite, useSprite, useTime, useTimeline, Easing, interpolate, animate, clamp } = window;

// ── Reusable bits ──────────────────────────────────────────────────────────

const COLORS = {
  bg:        'oklch(0.06 0 0)',
  bg2:       'oklch(0.10 0 0)',
  bg3:       'oklch(0.14 0 0)',
  surface:   'oklch(0.12 0 0)',
  cream:     'oklch(0.96 0 0)',
  creamDim:  'oklch(0.75 0 0)',
  creamMid:  'oklch(0.48 0 0)',
  creamFaint:'oklch(0.38 0 0)',
  rule:      'oklch(0.22 0 0)',
  ruleSub:   'oklch(0.16 0 0)',
};

const FONT_SORA  = '"Sora", "Helvetica Neue", system-ui, sans-serif';
const FONT_MONO  = '"DM Mono", ui-monospace, SFMono-Regular, monospace';
const FONT_JAK   = '"Plus Jakarta Sans", system-ui, sans-serif';

// nova ease — matches site's cubicBezier(0.16, 1, 0.3, 1)
const novaEase = Easing.easeOutQuart;

// Fade/slide-in helper
function entrance(localTime, { start = 0, dur = 0.7, dy = 24, ease = novaEase } = {}) {
  const t = clamp((localTime - start) / dur, 0, 1);
  const e = ease(t);
  return { opacity: e, transform: `translateY(${(1 - e) * dy}px)` };
}

// Fade-out helper  (for tail of scene)
function exit(localTime, totalDur, { dur = 0.6, dy = -20, ease = Easing.easeInQuad } = {}) {
  const start = totalDur - dur;
  const t = clamp((localTime - start) / dur, 0, 1);
  const e = ease(t);
  return { opacity: 1 - e, transform: `translateY(${e * dy}px)` };
}

// Mono kicker label
function MonoKicker({ children, style = {}, color = COLORS.creamFaint }) {
  return (
    <div style={{
      fontFamily: FONT_MONO,
      fontSize: 18,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color,
      ...style,
    }}>{children}</div>
  );
}

// Grain overlay — fixed across stage
function Grain() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 9999, pointerEvents: 'none',
      opacity: 0.04,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '256px 256px',
      mixBlendMode: 'overlay',
    }} />
  );
}

// Vignette
function Vignette({ opacity = 0.9 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, oklch(0.03 0 0 / ${opacity}) 100%)`,
    }} />
  );
}

// Camera label corner mark (cinematic indicator)
function CornerMark({ label = 'NV-01', t = 0, scene = '' }) {
  return (
    <>
      <div style={{
        position: 'absolute', top: 32, left: 32,
        fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: COLORS.creamFaint,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          display: 'inline-block', width: 8, height: 8, borderRadius: 999,
          background: 'oklch(0.6 0.2 25)', boxShadow: '0 0 8px oklch(0.6 0.2 25)',
        }} />
        REC · {label}
      </div>
      <div style={{
        position: 'absolute', top: 32, right: 32,
        fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: COLORS.creamFaint,
      }}>
        {scene}
      </div>
    </>
  );
}

// ── Background showreel iframe (Vimeo) ───────────────────────────────────
// We mount ONE iframe inside the Stage canvas, persistent across scenes,
// and scale/position it to give continuity.
const SHOWREEL_ID = '850854753';

function ShowreelBg({ opacity = 0.13, scale = 1.1, x = '50%', y = '50%', blur = 0 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      opacity,
    }}>
      <iframe
        src={`https://player.vimeo.com/video/${SHOWREEL_ID}?autoplay=1&muted=1&background=1&loop=1&quality=720p`}
        style={{
          position: 'absolute',
          top: y, left: x,
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: 1920, height: 1080,
          border: 0,
          filter: blur ? `blur(${blur}px)` : undefined,
        }}
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

// ── Scene 1 — INTRO (logo reveal) ────────────────────────────────────────
function Scene1Intro() {
  const { localTime, duration } = useSprite();

  // Logo: pure smooth opacity fade-in
  const logoOp = Easing.easeInOutCubic(clamp((localTime - 0.4) / 1.6, 0, 1));

  // Kicker top — appears first
  const kickerOp = clamp((localTime - 0.2) / 0.7, 0, 1);
  const kickerY  = (1 - novaEase(kickerOp)) * 12;

  // Subtitle below — after logo
  const subOp    = clamp((localTime - 2.0) / 0.8, 0, 1);
  const subY     = (1 - novaEase(subOp)) * 14;

  // Rule line draws under logo
  const ruleScale = clamp((localTime - 2.4) / 1.0, 0, 1);

  // Whole scene exit
  const exitT = clamp((duration - localTime) / 0.6, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: exitOp,
    }}>
      {/* Persistent bg handles video — just add depth glow here */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, oklch(0.10 0 0) 0%, oklch(0.03 0 0) 60%)' }} />

      {/* Top kicker */}
      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: kickerOp,
        transform: `translateY(${kickerY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em' }}>
          Agence de Production Vidéo · BE / FR
        </MonoKicker>
      </div>

      {/* Logo — smooth opacity fade only */}
      <div style={{
        opacity: logoOp,
        willChange: 'opacity',
      }}>
        <img src="logo-nova-cream.png" alt="Nova" style={{ width: 880, height: 'auto', display: 'block' }} />
      </div>

      {/* Rule under logo */}
      <div style={{
        marginTop: 36,
        width: 320, height: 1,
        background: COLORS.rule,
        transform: `scaleX(${ruleScale})`,
        transformOrigin: 'center',
      }} />

      {/* Subtitle */}
      <div style={{
        marginTop: 26,
        opacity: subOp,
        transform: `translateY(${subY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 14, letterSpacing: '0.4em' }} color={COLORS.creamMid}>
          Production · Reels · Site web
        </MonoKicker>
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 2 — HERO TAGLINE ─────────────────────────────────────────────
function Scene2Hero() {
  const { localTime, duration } = useSprite();

  // Lines staggered
  const lines = [
    { text: 'On filme.',                color: COLORS.cream,      delay: 0.1 },
    { text: 'On monte.',                color: COLORS.cream,      delay: 0.45 },
    { text: 'Vos clients regardent.',   color: COLORS.creamFaint, delay: 0.85 },
  ];

  // Background BG ken burns
  const bgScale = 1.08 + (localTime / duration) * 0.08;

  // Whole scene parallax + exit (slide content but keep video visible)
  const exitT = clamp((duration - localTime) / 0.6, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);
  const exitY = (1 - exitT) * -40;
  // Content-only fade — bg video stays at full visibility through the transition
  const contentOp = clamp((duration - localTime) / 0.4, 0, 1);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'transparent',
      transform: `translateY(${exitY}px)`,
    }}>
      {/* Persistent bg video handles the footage — no per-scene iframe */}

      {/* Content wrapper — foreground fades out, persistent bg stays visible */}
      <div style={{ position: 'absolute', inset: 0, opacity: contentOp }}>

      {/* Top kicker */}
      <div style={{ position: 'absolute', top: 120, left: 160, opacity: clamp(localTime / 0.6, 0, 1) }}>
        <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em' }}>
          Hero · 01
        </MonoKicker>
      </div>

      {/* Centered text block */}
      <div style={{
        position: 'absolute', top: 250, left: 160, right: 160,
      }}>
        {lines.map((l, i) => {
          const op = clamp((localTime - l.delay) / 0.7, 0, 1);
          const e = novaEase(op);
          const y = (1 - e) * 60;
          return (
            <div key={i} style={{
              fontFamily: FONT_SORA, fontWeight: 200,
              fontSize: 180, lineHeight: 1.05, letterSpacing: '-0.04em',
              color: l.color,
              opacity: op, transform: `translateY(${y}px)`,
              willChange: 'transform, opacity',
              marginBottom: 4,
            }}>
              {l.text}
            </div>
          );
        })}

        {/* Subtitle below */}
        <div style={{
          marginTop: 40,
          maxWidth: 900,
          fontFamily: FONT_SORA, fontWeight: 300,
          fontSize: 26, lineHeight: 1.55,
          color: COLORS.creamMid,
          opacity: clamp((localTime - 1.4) / 0.8, 0, 1),
          transform: `translateY(${(1 - clamp((localTime - 1.4) / 0.8, 0, 1)) * 14}px)`,
        }}>
          Vidéos publicitaires, Reels et TikToks tournés et montés.
          Gestion sociale, site web et SEO pour entreprises BE &amp; FR.
        </div>

        {/* Marquee-style tags row */}
        <div style={{
          marginTop: 40,
          display: 'flex', gap: 14,
          opacity: clamp((localTime - 1.9) / 0.7, 0, 1),
          transform: `translateY(${(1 - clamp((localTime - 1.9) / 0.7, 0, 1)) * 14}px)`,
        }}>
          {['Tournage', 'Montage', 'Reels', 'Site web', 'SEO'].map((p, i) => {
            const delay = 1.9 + i * 0.07;
            const op = clamp((localTime - delay) / 0.4, 0, 1);
            return (
              <div key={p} style={{
                padding: '10px 20px', borderRadius: 999,
                fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: COLORS.creamDim,
                border: `1px solid ${COLORS.rule}`,
                opacity: op,
                transform: `translateY(${(1 - novaEase(op)) * 12}px) rotateX(${(1 - novaEase(op)) * 25}deg)`,
                transformOrigin: 'center bottom',
              }}>{p}</div>
            );
          })}
        </div>
      </div>

      </div>
      <Grain />
    </div>
  );
}

// ── Scene 3 — SHOWREEL ────────────────────────────────────────────────
function Scene3Showreel() {
  const { localTime, duration } = useSprite();

  // Big card 3D entry — flips from rotateX(20deg) scale(0.85)
  const cardE = novaEase(clamp(localTime / 1.3, 0, 1));
  const rotX = (1 - cardE) * 18;
  const scale = 0.86 + 0.14 * cardE;
  const op = cardE;

  // Gentle continuous ken-burns drift on the video
  const drift = localTime / duration;
  const kbScale = 1.0 + 0.06 * drift;

  // Mask fades from black to reveal video
  const maskOp = clamp(1 - localTime / 1.2, 0, 1);

  // Play button pulse
  const pulse = (Math.sin(localTime * 2.2) + 1) / 2;

  // Heading top fade
  const headOp = clamp((localTime - 0.4) / 0.9, 0, 1);
  const headY = (1 - novaEase(headOp)) * 20;

  // Exit
  const exitT = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);
  const exitScale = 1 + (1 - exitT) * 0.04;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
      transform: `scale(${exitScale})`,
    }}>
      {/* Heading — minimal, just kicker */}
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 18, letterSpacing: '0.4em' }}>
          Showreel · Nova Production · 2025
        </MonoKicker>
      </div>

      {/* Side timecode counter */}
      <div style={{
        position: 'absolute', top: 130, right: 140,
        opacity: clamp((localTime - 1.4) / 0.6, 0, 1),
      }}>
        <MonoKicker style={{ fontSize: 14, letterSpacing: '0.3em' }} color={COLORS.creamMid}>
          REC · 00:{String(Math.floor(localTime * 6) % 60).padStart(2, '0')}
        </MonoKicker>
      </div>

      {/* Side scene mark */}
      <div style={{
        position: 'absolute', top: 130, left: 140,
        opacity: clamp((localTime - 1.4) / 0.6, 0, 1),
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: 999, background: 'oklch(0.6 0.2 25)',
          boxShadow: '0 0 10px oklch(0.6 0.2 25)',
        }} />
        <MonoKicker style={{ fontSize: 14, letterSpacing: '0.3em' }} color={COLORS.creamMid}>
          NV-01
        </MonoKicker>
      </div>

      {/* Big tilt card */}
      <div style={{
        position: 'absolute', top: 240, left: '50%',
        transform: `translateX(-50%)`,
        width: 1500, height: 760,
        perspective: 1800,
        opacity: op,
      }}>
        <div style={{
          width: '100%', height: '100%', position: 'relative',
          borderRadius: 28, overflow: 'hidden',
          border: `1px solid ${COLORS.rule}`,
          transform: `rotateX(${rotX}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 80px 160px oklch(0 0 0 / 0.7)',
          background: 'oklch(0.04 0 0)',
        }}>
          {/* Vimeo background loop */}
          <div style={{ position: 'absolute', inset: 0, transform: `scale(${kbScale})`, transformOrigin: 'center' }}>
            <iframe
              src={`https://player.vimeo.com/video/${SHOWREEL_ID}?autoplay=1&muted=1&background=1&loop=1&quality=720p`}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1600, height: 900,
                border: 0,
                pointerEvents: 'none',
              }}
              allow="autoplay; fullscreen"
            />
          </div>

          {/* Black entry mask */}
          <div style={{
            position: 'absolute', inset: 0,
            background: '#000', opacity: maskOp, pointerEvents: 'none',
          }} />

          {/* Dark gradient */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, oklch(0.04 0 0 / 0.2) 0%, oklch(0.04 0 0 / 0.5) 100%)',
          }} />

          {/* Sheen */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, oklch(0.96 0 0 / 0.07) 0%, transparent 55%)',
          }} />

          {/* Play button */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: clamp((localTime - 1.0) / 0.6, 0, 1),
          }}>
            <div style={{
              width: 130, height: 130, borderRadius: 999,
              background: `oklch(0.96 0 0 / ${0.12 + pulse * 0.05})`,
              border: '1px solid oklch(0.96 0 0 / 0.4)',
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 ${pulse * 30}px oklch(0.96 0 0 / ${0.15 * (1 - pulse)})`,
              transition: 'box-shadow 0.1s',
            }}>
              <svg width="34" height="38" viewBox="0 0 20 22" style={{ transform: 'translateX(3px)' }}>
                <path d="M0 0L20 11L0 22V0Z" fill={COLORS.cream} />
              </svg>
            </div>
          </div>

          {/* Label bottom-left */}
          <div style={{
            position: 'absolute', bottom: 32, left: 36,
            fontFamily: FONT_MONO, fontSize: 14, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: COLORS.creamDim,
            opacity: clamp((localTime - 1.4) / 0.8, 0, 1),
          }}>
            Nova Production · Showreel 2025
          </div>

          {/* Timecode bottom-right */}
          <div style={{
            position: 'absolute', bottom: 32, right: 36,
            fontFamily: FONT_MONO, fontSize: 14, letterSpacing: '0.15em',
            color: COLORS.creamFaint,
            opacity: clamp((localTime - 1.4) / 0.8, 0, 1),
          }}>
            00:{String(Math.floor(localTime * 4) % 60).padStart(2, '0')} / 02:48
          </div>
        </div>
      </div>

      <Vignette opacity={0.7} />
      <Grain />
    </div>
  );
}

// ── Scene 4 — STATS ─────────────────────────────────────────────────────
function Scene4Stats() {
  const { localTime, duration } = useSprite();

  const stats = [
    { value: 120, suffix: '+', label: 'Vidéos produites' },
    { value: 85,  suffix: '+', label: 'Clients satisfaits' },
    { value: 4,   suffix: '×', label: 'ROAS moyen' },
    { value: 2,   suffix: '',  label: 'Marchés BE & FR' },
  ];

  const headOp = clamp((localTime - 0.1) / 0.8, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 30;

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'transparent',
      opacity: exitOp,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Persistent bg handles video — extra dark overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, oklch(0.04 0 0 / 0.7) 0%, oklch(0.06 0 0 / 0.85) 100%)',
      }} />
      <Vignette opacity={0.6} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 220, left: 0, right: 0, textAlign: 'center',
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 22 }}>
          Notre impact · BE / FR
        </MonoKicker>
        <div style={{
          fontFamily: FONT_SORA, fontWeight: 200, fontSize: 92,
          letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
        }}>
          Des résultats mesurables.
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        position: 'absolute', top: 540, left: 120, right: 120,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: `1px solid ${COLORS.bg3}`,
        borderBottom: `1px solid ${COLORS.bg3}`,
      }}>
        {stats.map((s, i) => {
          const delay = 0.7 + i * 0.16;
          const op = clamp((localTime - delay) / 0.9, 0, 1);
          const e = novaEase(op);
          const y = (1 - e) * 40;

          // Count-up
          const countT = clamp((localTime - delay - 0.1) / 1.2, 0, 1);
          const countE = Easing.easeOutCubic(countT);
          const display = Math.floor(countE * s.value);

          return (
            <div key={i} style={{
              padding: '70px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              borderRight: i < 3 ? `1px solid ${COLORS.bg3}` : undefined,
              opacity: op,
              transform: `translateY(${y}px)`,
            }}>
              <div style={{
                fontFamily: FONT_SORA, fontWeight: 200,
                fontSize: 132, lineHeight: 1, letterSpacing: '-0.04em',
                color: COLORS.cream,
                fontVariantNumeric: 'tabular-nums',
                marginBottom: 18,
              }}>
                {display}{s.suffix}
              </div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 16, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: COLORS.creamFaint,
                textAlign: 'center',
              }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 5 — PACKS (3 pricing tiers) ─────────────────────────────────
function Scene5Packs() {
  const { localTime, duration } = useSprite();

  const packs = [
    {
      num: '01',
      label: 'Idéal pour démarrer',
      name: 'Essentiel',
      price: '650',
      caption: 'Présence sociale solide, sans surcharge.',
      features: [
        'Gestion Instagram & TikTok',
        '4 Reels / TikToks par mois',
        'Stories hebdomadaires',
        'Gestion communauté & messages',
        'Rapport mensuel de performance',
      ],
      featured: false,
    },
    {
      num: '02',
      label: 'Le plus populaire',
      name: 'Croissance',
      price: '1 000',
      caption: 'Social, web et SEO réunis pour scaler.',
      features: [
        'Tout le Pack Essentiel',
        '6 Reels / TikToks par mois',
        'Site web : maintenance & MAJ',
        'Optimisation SEO de base',
        'Rapport mensuel détaillé',
      ],
      featured: true,
    },
    {
      num: '03',
      label: 'Full service',
      name: 'Premium',
      price: '1 600',
      caption: 'Production, contenu vidéo et stratégie sur mesure.',
      features: [
        'Tout le Pack Croissance',
        '8 Reels / TikToks par mois',
        '1 vidéo promo par mois',
        'Couverture événements (1/mois)',
        'Stratégie éditoriale personnalisée',
      ],
      featured: false,
    },
  ];

  const headOp = clamp((localTime - 0.1) / 0.8, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 26;

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  // Sequential focus cycling — starts at 2s, each pack ~2.5s
  const focusActive = localTime > 1.8 && localTime < (duration - 0.7);
  const focusT = clamp((localTime - 1.8) / Math.max(0.001, duration - 2.6), 0, 1);
  const focusIndex = focusActive ? Math.min(Math.floor(focusT * 3), 2) : -1;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 80, left: 140, right: 140,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <div>
          <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 14 }}>
            Nos offres · 2026
          </MonoKicker>
          <div style={{
            fontFamily: FONT_SORA, fontWeight: 200, fontSize: 76,
            letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
          }}>
            Choisissez votre pack.
          </div>
        </div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: COLORS.creamFaint,
        }}>
          {focusIndex >= 0 ? `0${focusIndex + 1} / 03 · ${packs[focusIndex].name}` : '3 formules · €/mois'}
        </div>
      </div>

      {/* Pack cards */}
      <div style={{
        position: 'absolute', top: 320, left: 100, right: 100, bottom: 110,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        perspective: 2000,
      }}>
        {packs.map((p, i) => {
          const delay = 0.5 + i * 0.18;
          const op = clamp((localTime - delay) / 1.0, 0, 1);
          const e = novaEase(op);
          const y = (1 - e) * 60;
          const rotY = (1 - e) * (i === 0 ? -25 : i === 2 ? 25 : 0);
          const z = (1 - e) * (i === 1 ? -120 : -60);

          // Sequential focus: when this card is focused, scale up; when another is focused, dim down
          const isFocused = focusIndex === i;
          const isDimmed  = focusIndex !== -1 && !isFocused;
          const focusScale = isFocused ? 1.05 : (isDimmed ? 0.97 : 1.0);
          const focusOp = isDimmed ? 0.30 : 1.0;
          const focusLift = isFocused ? -10 : 0;

          // Featured card gets subtle hover lift
          const lift = p.featured ? Math.sin(localTime * 1.4) * 4 - 6 : 0;

          return (
            <div key={i} style={{
              padding: '36px 32px 32px',
              borderRadius: 20,
              border: isFocused ? `1px solid ${COLORS.cream}` : (p.featured ? `1px solid ${COLORS.creamDim}` : `1px solid ${COLORS.rule}`),
              background: p.featured ? 'oklch(0.10 0 0)' : COLORS.bg,
              display: 'flex', flexDirection: 'column',
              opacity: op * focusOp,
              transform: `translateY(${y + lift + focusLift}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${focusScale})`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center bottom',
              boxShadow: isFocused
                ? '0 70px 160px oklch(0 0 0 / 0.85), 0 0 0 1px oklch(0.96 0 0 / 0.12), 0 0 60px oklch(0.96 0 0 / 0.08)'
                : (p.featured
                  ? '0 50px 120px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.96 0 0 / 0.06)'
                  : '0 30px 80px oklch(0 0 0 / 0.5)'),
              position: 'relative',
              willChange: 'transform, opacity',
              transition: 'opacity 350ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease, border 350ms ease',
            }}>
              {/* Featured badge */}
              {p.featured && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  padding: '6px 16px', borderRadius: 999,
                  background: COLORS.cream, color: COLORS.bg,
                  fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 24px oklch(0 0 0 / 0.5)',
                  opacity: clamp((localTime - delay - 0.4) / 0.5, 0, 1),
                }}>
                  ★ Le plus populaire
                </div>
              )}

              {/* Top: num + label */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 200, fontSize: 56,
                  color: COLORS.creamFaint, letterSpacing: '-0.04em', lineHeight: 1,
                }}>{p.num}</div>
                <MonoKicker style={{ fontSize: 10, letterSpacing: '0.28em' }} color={COLORS.creamFaint}>
                  {p.label}
                </MonoKicker>
              </div>

              {/* Name */}
              <div style={{
                fontFamily: FONT_SORA, fontWeight: 200, fontSize: 60,
                letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1,
                marginBottom: 10,
              }}>{p.name}</div>

              {/* Caption */}
              <div style={{
                fontFamily: FONT_SORA, fontWeight: 300, fontSize: 15, lineHeight: 1.5,
                color: COLORS.creamMid, marginBottom: 22, minHeight: 44,
              }}>{p.caption}</div>

              {/* Price */}
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28,
                paddingBottom: 22, borderBottom: `1px solid ${COLORS.ruleSub}`,
              }}>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 200, fontSize: 72,
                  letterSpacing: '-0.05em', color: COLORS.cream, lineHeight: 0.9,
                  fontVariantNumeric: 'tabular-nums',
                }}>{p.price}<span style={{ fontSize: 36, color: COLORS.creamMid }}>&nbsp;€</span></div>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: COLORS.creamMid,
                  marginLeft: 'auto',
                }}>/ mois</div>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map((f, j) => {
                  const fd = delay + 0.6 + j * 0.08;
                  const fop = clamp((localTime - fd) / 0.5, 0, 1);
                  const fe = novaEase(fop);
                  return (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      opacity: fop,
                      transform: `translateX(${(1 - fe) * 16}px)`,
                    }}>
                      <div style={{
                        marginTop: 7, width: 6, height: 6, borderRadius: 999,
                        background: p.featured ? COLORS.cream : COLORS.creamMid,
                        flexShrink: 0,
                      }} />
                      <div style={{
                        fontFamily: FONT_SORA, fontWeight: 300, fontSize: 15,
                        lineHeight: 1.5, color: COLORS.creamDim,
                      }}>{f}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 6a — RÉSEAUX SOCIAUX (3D iPhone) ──────────────────────────
function Scene6aSocial() {
  const { localTime, duration } = useSprite();

  const headOp = clamp((localTime - 0.1) / 0.8, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 30;

  // iPhone entry — slides from right + 3D rotate in
  const phoneOp = clamp((localTime - 0.5) / 1.4, 0, 1);
  const phoneE = novaEase(phoneOp);
  const phoneRotY = (1 - phoneE) * -45; // → -8 (continuous tilt) + ambient
  const phoneX = (1 - phoneE) * 140;
  const phoneScale = 0.82 + 0.18 * phoneE;
  // Continuous slow Y-axis rotation (ambient motion)
  const ambientRotY = -8 + Math.sin(localTime * 0.4) * 6;

  // Floating chips around phone
  const chips = [
    { label: 'Instagram',           x: -340, y: -180, delay: 1.4 },
    { label: 'TikTok',              x: -380, y:   60, delay: 1.55 },
    { label: 'Stories hebdo',       x: -300, y:  240, delay: 1.7 },
    { label: 'Gestion communauté',  x:  300, y: -210, delay: 1.85 },
    { label: 'Messages 24/7',       x:  330, y:   30, delay: 2.0 },
    { label: 'Rapport mensuel',     x:  340, y:  220, delay: 2.15 },
  ];

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  // Fake feed posts inside phone
  const posts = [
    { user: 'nova.studio',    img: 'https://picsum.photos/seed/feed1/240/240?grayscale', likes: '2.4k' },
    { user: 'nova.client.01', img: 'https://picsum.photos/seed/feed2/240/240?grayscale', likes: '847' },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
    }}>
      {/* Faint blurred showreel BG */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <ShowreelBg opacity={1} scale={1.4} blur={50} />
      </div>

      {/* Header — left */}
      <div style={{
        position: 'absolute', top: 200, left: 140, maxWidth: 600,
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 18 }}>
          Réseaux sociaux · Gestion mensuelle
        </MonoKicker>
        <div style={{
          fontFamily: FONT_SORA, fontWeight: 200, fontSize: 88,
          letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 0.95,
          marginBottom: 32,
        }}>
          On gère vos<br />
          <span style={{ color: COLORS.creamFaint }}>réseaux.</span>
        </div>
        <div style={{
          fontFamily: FONT_SORA, fontWeight: 300, fontSize: 22, lineHeight: 1.5,
          color: COLORS.creamMid, maxWidth: 480,
          opacity: clamp((localTime - 0.6) / 0.9, 0, 1),
        }}>
          Instagram, TikTok, Stories, modération, messages.
          Vous postez plus, et mieux, sans y penser.
        </div>
      </div>

      {/* 3D iPhone — center right */}
      <div style={{
        position: 'absolute', top: '50%', right: 280, width: 380, height: 780,
        marginTop: -390,
        perspective: 2000,
      }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          transform: `translateX(${phoneX}px) rotateY(${phoneRotY + ambientRotY}deg) rotateX(-2deg) scale(${phoneScale})`,
          transformStyle: 'preserve-3d',
          opacity: phoneOp,
          willChange: 'transform, opacity',
        }}>
          {/* Phone body */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 56,
            background: 'linear-gradient(145deg, oklch(0.18 0 0), oklch(0.04 0 0))',
            padding: 12,
            boxShadow: '0 80px 180px oklch(0 0 0 / 0.8), 0 0 0 1px oklch(0.96 0 0 / 0.06), inset 0 0 0 1px oklch(0.30 0 0)',
          }}>
            {/* Screen */}
            <div style={{
              position: 'absolute', inset: 12,
              borderRadius: 44,
              background: 'oklch(0.05 0 0)',
              overflow: 'hidden',
              border: `1px solid ${COLORS.bg3}`,
            }}>
              {/* Status bar */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 28px 8px',
                fontFamily: FONT_MONO, fontSize: 10, color: COLORS.cream,
                fontWeight: 600, letterSpacing: '0.05em',
              }}>
                <span>9:41</span>
                <span>● ●●● ▮</span>
              </div>

              {/* Notch */}
              <div style={{
                position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
                width: 110, height: 28, borderRadius: 999, background: 'oklch(0.04 0 0)',
                zIndex: 10,
              }} />

              {/* App header with logo & icons */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 18px', borderBottom: `1px solid ${COLORS.ruleSub}`,
              }}>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 400, fontSize: 18,
                  color: COLORS.cream, letterSpacing: '-0.02em',
                }}>
                  Nova
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 14, color: COLORS.creamDim }}>
                  ♥ ✉ ⋯
                </div>
              </div>

              {/* Stories row */}
              <div style={{
                display: 'flex', gap: 12, padding: '14px 18px',
                borderBottom: `1px solid ${COLORS.ruleSub}`,
                opacity: clamp((localTime - 1.0) / 0.6, 0, 1),
              }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{
                    width: 52, height: 52, borderRadius: 999,
                    background: `linear-gradient(135deg, oklch(0.55 0.12 ${30 + i * 60}), oklch(0.30 0 0))`,
                    padding: 2,
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 999,
                      background: 'oklch(0.10 0 0)',
                      border: `2px solid oklch(0.05 0 0)`,
                    }} />
                  </div>
                ))}
              </div>

              {/* Posts feed */}
              <div style={{
                padding: '12px 18px',
                display: 'flex', flexDirection: 'column', gap: 18,
              }}>
                {posts.map((p, i) => {
                  const pOp = clamp((localTime - (1.3 + i * 0.4)) / 0.7, 0, 1);
                  return (
                    <div key={i} style={{ opacity: pOp }}>
                      {/* Post header */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
                      }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: 999,
                          background: 'oklch(0.30 0 0)',
                          border: `1px solid ${COLORS.rule}`,
                        }} />
                        <div style={{
                          fontFamily: FONT_SORA, fontWeight: 500, fontSize: 11,
                          color: COLORS.cream,
                        }}>
                          {p.user}
                        </div>
                      </div>
                      {/* Post image */}
                      <div style={{
                        aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden',
                        marginBottom: 10,
                      }}>
                        <img src={p.img} alt="" style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          display: 'block',
                        }} />
                      </div>
                      {/* Post actions */}
                      <div style={{
                        display: 'flex', gap: 14, fontSize: 16, color: COLORS.cream,
                        marginBottom: 6,
                      }}>
                        ♥ 💬 ↗
                      </div>
                      <div style={{
                        fontFamily: FONT_SORA, fontWeight: 500, fontSize: 11,
                        color: COLORS.cream,
                      }}>
                        {p.likes} likes
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sheen across screen */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(135deg, oklch(0.96 0 0 / 0.06) 0%, transparent 60%)',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips around phone */}
      <div style={{
        position: 'absolute', top: '50%', right: 470, width: 0, height: 0,
        perspective: 1400,
      }}>
        {chips.map((c, i) => {
          const op = clamp((localTime - c.delay) / 0.8, 0, 1);
          const e = novaEase(op);
          const drift = Math.sin(localTime * 0.5 + i) * 4;
          return (
            <div key={i} style={{
              position: 'absolute', left: c.x, top: c.y + drift,
              padding: '12px 22px', borderRadius: 999,
              fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: COLORS.creamDim,
              background: 'oklch(0.08 0 0 / 0.85)',
              border: `1px solid ${COLORS.rule}`,
              backdropFilter: 'blur(8px)',
              opacity: op,
              transform: `translateX(${(1 - e) * (c.x < 0 ? -40 : 40)}px) translateZ(0)`,
              boxShadow: '0 20px 60px oklch(0 0 0 / 0.4)',
              whiteSpace: 'nowrap',
            }}>{c.label}</div>
          );
        })}
      </div>

      {/* Bottom volume counter (4 / 6 / 8 Reels per pack) */}
      <div style={{
        position: 'absolute', bottom: 110, left: 140,
        opacity: clamp((localTime - 2.4) / 0.9, 0, 1),
      }}>
        <MonoKicker style={{ fontSize: 11, letterSpacing: '0.3em', marginBottom: 14 }} color={COLORS.creamFaint}>
          Volume mensuel — selon le pack
        </MonoKicker>
        <div style={{ display: 'flex', gap: 32, alignItems: 'baseline' }}>
          {[
            { v: '4', pack: 'Essentiel'  },
            { v: '6', pack: 'Croissance' },
            { v: '8', pack: 'Premium'    },
          ].map((t, i) => {
            const cd = 2.6 + i * 0.22;
            const op = clamp((localTime - cd) / 0.6, 0, 1);
            const e = novaEase(op);
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 12,
                opacity: op, transform: `translateY(${(1 - e) * 12}px)`,
              }}>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 200, fontSize: 72,
                  letterSpacing: '-0.05em', color: COLORS.cream, lineHeight: 0.9,
                  fontVariantNumeric: 'tabular-nums',
                }}>{t.v}</div>
                <div>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: COLORS.creamFaint,
                  }}>Reels / mois</div>
                  <div style={{
                    fontFamily: FONT_SORA, fontWeight: 400, fontSize: 15,
                    color: COLORS.creamDim,
                  }}>{t.pack}</div>
                </div>
                {i < 2 && (
                  <div style={{
                    width: 28, height: 1, background: COLORS.rule, marginLeft: 12, marginRight: -8,
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 6b — SITES WEB (3D web page that builds) ────────────────────
function Scene6bWebsite() {
  const { localTime, duration } = useSprite();

  const headOp = clamp((localTime - 0.1) / 0.8, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 30;

  // Browser frame entry
  const frameOp = clamp((localTime - 0.4) / 1.2, 0, 1);
  const frameE = novaEase(frameOp);
  const frameRotY = (1 - frameE) * 18; // → +6 ambient
  const ambientRotY = 6 + Math.sin(localTime * 0.4) * 3;
  const frameRotX = -4;
  const frameScale = 0.88 + 0.12 * frameE;

  // Sections of the page that appear sequentially (build animation)
  // Section opacity timings:
  const navT     = clamp((localTime - 1.2) / 0.6, 0, 1);
  const heroT    = clamp((localTime - 1.7) / 0.7, 0, 1);
  const imgT     = clamp((localTime - 2.3) / 0.7, 0, 1);
  const cardsT   = clamp((localTime - 2.9) / 0.8, 0, 1);
  const ctaT     = clamp((localTime - 3.6) / 0.7, 0, 1);

  // Live cursor that blinks
  const cursorBlink = Math.sin(localTime * 4) > 0;

  // Code label on the right
  const codeOp = clamp((localTime - 0.8) / 0.8, 0, 1);

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
    }}>
      {/* Header — top left */}
      <div style={{
        position: 'absolute', top: 100, left: 140, maxWidth: 700,
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 16 }}>
          Sites web · Sur mesure · Inclus dès Croissance
        </MonoKicker>
        <div style={{
          fontFamily: FONT_SORA, fontWeight: 200, fontSize: 80,
          letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
        }}>
          On code votre <span style={{ color: COLORS.creamFaint, fontStyle: 'italic' }}>site.</span>
        </div>
      </div>

      {/* Right-side build log */}
      <div style={{
        position: 'absolute', top: 130, right: 100, width: 280,
        opacity: codeOp,
        fontFamily: FONT_MONO, fontSize: 11, lineHeight: 1.7,
        color: COLORS.creamFaint,
      }}>
        <div style={{ marginBottom: 10, color: COLORS.creamMid, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          ● Build log
        </div>
        {[
          { t: '00:01', m: 'init project', d: 0.9 },
          { t: '00:03', m: 'install deps', d: 1.1 },
          { t: '00:05', m: 'render nav', d: 1.3 },
          { t: '00:08', m: 'mount hero', d: 1.8 },
          { t: '00:12', m: 'optimize images', d: 2.4 },
          { t: '00:18', m: 'deploy → prod', d: 3.6 },
          { t: '00:22', m: '✓ site live', d: 4.0 },
        ].map((l, i) => {
          const op = clamp((localTime - l.d) / 0.4, 0, 1);
          return (
            <div key={i} style={{
              display: 'flex', gap: 12, opacity: op,
              color: i === 6 ? 'oklch(0.7 0.18 145)' : COLORS.creamFaint,
            }}>
              <span style={{ color: COLORS.creamGhost || 'oklch(0.22 0 0)' }}>{l.t}</span>
              <span>{l.m}</span>
            </div>
          );
        })}
      </div>

      {/* 3D Browser frame — center stage */}
      <div style={{
        position: 'absolute', top: 360, left: 140, right: 420, height: 580,
        perspective: 2200,
      }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          borderRadius: 14, overflow: 'hidden',
          background: 'oklch(0.08 0 0)',
          border: `1px solid ${COLORS.rule}`,
          transform: `rotateY(${frameRotY + ambientRotY}deg) rotateX(${frameRotX}deg) scale(${frameScale})`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
          opacity: frameOp,
          boxShadow: '0 80px 180px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.96 0 0 / 0.05)',
        }}>
          {/* Browser chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 18px',
            background: 'oklch(0.10 0 0)',
            borderBottom: `1px solid ${COLORS.rule}`,
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: 999, background: 'oklch(0.22 0 0)' }} />
              <span style={{ width: 12, height: 12, borderRadius: 999, background: 'oklch(0.22 0 0)' }} />
              <span style={{ width: 12, height: 12, borderRadius: 999, background: 'oklch(0.22 0 0)' }} />
            </div>
            <div style={{
              flex: 1, marginLeft: 16, padding: '6px 16px', borderRadius: 6,
              background: 'oklch(0.06 0 0)', maxWidth: 540, textAlign: 'center',
              fontFamily: FONT_MONO, fontSize: 11, color: COLORS.creamMid,
              letterSpacing: '0.05em',
            }}>
              client.fr {cursorBlink && <span style={{ opacity: 0.8 }}>▌</span>}
            </div>
          </div>

          {/* Site content area */}
          <div style={{
            position: 'absolute', top: 50, left: 0, right: 0, bottom: 0,
            padding: '28px 36px',
            background: 'oklch(0.06 0 0)',
            display: 'flex', flexDirection: 'column', gap: 20,
            overflow: 'hidden',
          }}>
            {/* Nav row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              opacity: navT,
              transform: `translateY(${(1 - novaEase(navT)) * -14}px)`,
            }}>
              <div style={{
                fontFamily: FONT_SORA, fontWeight: 500, fontSize: 16, color: COLORS.cream,
              }}>★ client.fr</div>
              <div style={{ display: 'flex', gap: 20 }}>
                {['Accueil', 'Services', 'À propos', 'Contact'].map(x => (
                  <div key={x} style={{
                    fontFamily: FONT_SORA, fontWeight: 300, fontSize: 11, color: COLORS.creamMid,
                  }}>{x}</div>
                ))}
              </div>
            </div>

            {/* Hero text */}
            <div style={{
              marginTop: 14,
              opacity: heroT,
              transform: `translateY(${(1 - novaEase(heroT)) * 18}px)`,
            }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: COLORS.creamFaint, marginBottom: 10,
              }}>
                Atelier · Paris 11
              </div>
              <div style={{
                fontFamily: FONT_SORA, fontWeight: 200, fontSize: 54,
                letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
                marginBottom: 8,
              }}>
                Le luxe<br />du sur mesure.
              </div>
              <div style={{
                fontFamily: FONT_SORA, fontWeight: 300, fontSize: 14, lineHeight: 1.5,
                color: COLORS.creamMid, maxWidth: 360,
              }}>
                Costumes, retouches et confection. Sur rendez-vous, du lundi au samedi.
              </div>
            </div>

            {/* Image grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 8,
              opacity: imgT,
              transform: `translateY(${(1 - novaEase(imgT)) * 16}px) scale(${0.96 + 0.04 * novaEase(imgT)})`,
              transformOrigin: 'center',
            }}>
              {[
                'https://picsum.photos/seed/web-img1/600/360?grayscale',
                'https://picsum.photos/seed/web-img2/400/360?grayscale',
                'https://picsum.photos/seed/web-img3/400/360?grayscale',
              ].map((src, i) => (
                <div key={i} style={{
                  aspectRatio: '16/10', borderRadius: 6, overflow: 'hidden',
                  border: `1px solid ${COLORS.rule}`,
                }}>
                  <img src={src} alt="" style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  }} />
                </div>
              ))}
            </div>

            {/* Cards row */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
              opacity: cardsT,
              transform: `translateY(${(1 - novaEase(cardsT)) * 14}px)`,
            }}>
              {['Mesure', 'Retouches', 'Sur mesure'].map((c, i) => (
                <div key={i} style={{
                  padding: '14px 14px', borderRadius: 8,
                  border: `1px solid ${COLORS.rule}`,
                  background: 'oklch(0.08 0 0)',
                }}>
                  <div style={{
                    fontFamily: FONT_SORA, fontWeight: 400, fontSize: 12, color: COLORS.cream,
                    marginBottom: 4,
                  }}>{c}</div>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 10, color: COLORS.creamMid,
                    letterSpacing: '0.1em',
                  }}>
                    {i === 0 ? '60 min' : i === 1 ? 'dès 45€' : 'sur RDV'}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              marginTop: 'auto', marginBottom: 6,
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: ctaT,
              transform: `translateY(${(1 - novaEase(ctaT)) * 12}px)`,
            }}>
              <div style={{
                padding: '12px 22px', borderRadius: 999,
                background: COLORS.cream, color: COLORS.bg,
                fontFamily: FONT_SORA, fontWeight: 500, fontSize: 13,
              }}>Prendre rendez-vous →</div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: COLORS.creamFaint,
              }}>
                ⚡ optimisé SEO
              </div>
            </div>

            {/* Live cursor on top */}
            <div style={{
              position: 'absolute',
              top: 200 + Math.sin(localTime * 0.8) * 30,
              left: 200 + Math.cos(localTime * 0.6) * 80,
              opacity: clamp(localTime / 0.6, 0, 1),
              pointerEvents: 'none',
            }}>
              <svg width="20" height="22" viewBox="0 0 20 22">
                <path d="M3 2 L17 12 L10 13 L13 19 L11 20 L8 14 L3 17 Z"
                      fill={COLORS.cream} stroke={COLORS.bg} strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 6a — CONTENU SOCIAL (Reels & TikTok) ────────────────────────
function Scene6aContent() {
  const { localTime, duration } = useSprite();

  const reels = [
    { tag: 'Reel · 01', title: 'Tournage produit',  thumb: 'https://picsum.photos/seed/nova-product/280/500?grayscale',  caption: 'Nouveau parfum · 100% AOP', accent: 'oklch(0.55 0.12 35)' },
    { tag: 'Story · 24h', title: 'Coulisses',        thumb: 'https://picsum.photos/seed/nova-bts/280/500?grayscale',      caption: 'Backstage · Jour 02',     accent: 'oklch(0.50 0.10 200)' },
    { tag: 'TikTok',     title: 'Avis client',       thumb: 'https://picsum.photos/seed/nova-client/280/500?grayscale',   caption: '“Les ventes ont x3.”',     accent: 'oklch(0.58 0.10 145)' },
    { tag: 'Reel · 02',  title: 'Lancement promo',   thumb: 'https://picsum.photos/seed/nova-promo/280/500?grayscale',    caption: 'PROMO – 30%',                accent: 'oklch(0.60 0.18 25)'  },
  ];

  const headOp = clamp((localTime - 0.1) / 0.8, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 26;

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  // Reel counter — 4 / 6 / 8 by pack tier, 2 seconds per tier
  const counterT = clamp((localTime - 0.5) / 6.0, 0, 1);
  const tierIndex = Math.min(Math.floor(counterT * 3), 2);
  const tiers = [
    { reels: '4',  pack: 'Essentiel'  },
    { reels: '6',  pack: 'Croissance' },
    { reels: '8',  pack: 'Premium'    },
  ];
  const tier = tiers[tierIndex];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 90, left: 140, right: 140,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <div>
          <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 14 }}>
            Le contenu · production mensuelle
          </MonoKicker>
          <div style={{
            fontFamily: FONT_SORA, fontWeight: 200, fontSize: 80,
            letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
          }}>
            Reels &amp; TikToks<br />
            <span style={{ color: COLORS.creamFaint }}>tournés et montés.</span>
          </div>
        </div>

        {/* Right: dynamic counter */}
        <div style={{
          padding: '20px 26px', borderRadius: 16,
          border: `1px solid ${COLORS.rule}`,
          background: 'oklch(0.08 0 0 / 0.7)',
          backdropFilter: 'blur(10px)',
          minWidth: 260,
          opacity: clamp((localTime - 0.6) / 0.7, 0, 1),
        }}>
          <MonoKicker style={{ fontSize: 11, letterSpacing: '0.3em', marginBottom: 10 }} color={COLORS.creamFaint}>
            Volume mensuel · Pack {tier.pack}
          </MonoKicker>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{
              fontFamily: FONT_SORA, fontWeight: 200, fontSize: 100,
              letterSpacing: '-0.05em', color: COLORS.cream, lineHeight: 0.9,
              fontVariantNumeric: 'tabular-nums',
            }}>{tier.reels}</div>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: COLORS.creamMid,
            }}>Reels<br />/ TikToks</div>
          </div>
          {/* Tier dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{
                width: 24, height: 3, borderRadius: 999,
                background: j === tierIndex ? COLORS.cream : COLORS.bg3,
                transition: 'background 200ms',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Phone mockups row — 4 portraits, fixed size */}
      <div style={{
        position: 'absolute', top: 410, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 36,
        perspective: 2000,
      }}>
        {reels.map((r, i) => {
          const delay = 0.7 + i * 0.16;
          const op = clamp((localTime - delay) / 1.0, 0, 1);
          const e = novaEase(op);
          const y = (1 - e) * 80;
          const rotY = (1 - e) * (i % 2 === 0 ? -18 : 18);
          const rotZ = Math.sin(localTime * 0.6 + i) * 1.5;

          // Continuous parallax tilt
          const breath = Math.sin(localTime * 1.0 + i * 0.8) * 3;

          return (
            <div key={i} style={{
              width: 280, height: 500,
              flexShrink: 0,
              opacity: op,
              transform: `translateY(${y + breath}px) rotateY(${rotY + rotZ}deg) rotateX(-2deg)`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center',
              willChange: 'transform, opacity',
            }}>
              <div style={{
                position: 'relative', width: '100%', height: '100%',
                borderRadius: 28, overflow: 'hidden',
                border: `1px solid ${COLORS.rule}`,
                background: 'oklch(0.05 0 0)',
                boxShadow: '0 50px 100px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.96 0 0 / 0.04)',
              }}>
                {/* Fake thumbnail image */}
                <img
                  src={r.thumb}
                  alt=""
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Color wash for vibe */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(170deg, ${r.accent} 0%, transparent 30%, oklch(0.04 0 0 / 0.65) 80%, oklch(0.04 0 0 / 0.95) 100%)`,
                  mixBlendMode: 'multiply',
                  opacity: 0.85,
                }} />
                {/* Dark dim overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, oklch(0.04 0 0 / 0.4) 0%, transparent 30%, transparent 60%, oklch(0.02 0 0 / 0.75) 100%)',
                }} />

                {/* Top notch / safe area */}
                <div style={{
                  position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
                  width: 60, height: 5, borderRadius: 999, background: 'oklch(0.04 0 0)',
                }} />

                {/* Top labels */}
                <div style={{
                  position: 'absolute', top: 44, left: 18, right: 18,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: FONT_MONO, fontSize: 9, color: COLORS.creamMid, letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}>
                  <span>● {r.tag}</span>
                  <span>{String(Math.floor(localTime * 4 + i) % 60).padStart(2, '0')}:00</span>
                </div>

                {/* Big content area — caption overlay */}
                <div style={{
                  position: 'absolute', top: 80, left: 18, right: 18, bottom: 120,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontFamily: FONT_SORA, fontWeight: 200, fontSize: 28,
                    color: COLORS.cream, letterSpacing: '-0.03em', lineHeight: 1.1,
                    textAlign: 'center',
                    textShadow: '0 2px 8px oklch(0 0 0 / 0.6)',
                    maxWidth: 200,
                  }}>
                    {r.caption}
                  </div>
                  {/* Play icon below */}
                  <svg width="22" height="26" viewBox="0 0 20 22" style={{ opacity: 0.55, marginTop: 24 }}>
                    <path d="M0 0L20 11L0 22V0Z" fill={COLORS.cream} />
                  </svg>
                </div>

                {/* Bottom title */}
                <div style={{
                  position: 'absolute', bottom: 70, left: 18, right: 18,
                }}>
                  <div style={{
                    fontFamily: FONT_SORA, fontWeight: 300, fontSize: 16,
                    color: COLORS.cream, lineHeight: 1.2, letterSpacing: '-0.01em',
                  }}>{r.title}</div>
                </div>

                {/* Bottom action bar */}
                <div style={{
                  position: 'absolute', bottom: 22, left: 18, right: 18,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: FONT_MONO, fontSize: 9, color: COLORS.creamMid, letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span>♥ {(i + 2) * 47}k</span>
                    <span>↗</span>
                  </div>
                  <span>Nova</span>
                </div>

                {/* Sheen */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, oklch(0.96 0 0 / 0.05) 0%, transparent 50%)',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom: chips for what's included */}
      <div style={{
        position: 'absolute', bottom: 50, left: 140, right: 140,
        display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
        opacity: clamp((localTime - 1.5) / 0.9, 0, 1),
      }}>
        {[
          'Stories hebdomadaires',
          'Gestion communauté & messages',
          'Couverture événements (Premium)',
          '1 vidéo promo / mois (Premium)',
          'Stratégie éditoriale sur mesure',
        ].map((p, i) => {
          const d = 1.5 + i * 0.08;
          const op = clamp((localTime - d) / 0.5, 0, 1);
          return (
            <div key={p} style={{
              padding: '10px 20px', borderRadius: 999,
              fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: COLORS.creamDim,
              border: `1px solid ${COLORS.rule}`,
              opacity: op,
              transform: `translateY(${(1 - novaEase(op)) * 10}px)`,
            }}>{p}</div>
          );
        })}
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 6b — INCLUS DANS TOUS LES PACKS ────────────────────────────
function Scene6bIncluded() {
  const { localTime, duration } = useSprite();

  const headOp = clamp((localTime - 0.1) / 0.8, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 26;

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);

  // Animated calendar grid — 12 weeks shown
  const totalWeeks = 12;
  const activeWeek = Math.min(Math.floor(clamp((localTime - 1.4) / 3.5, 0, 1) * totalWeeks), totalWeeks - 1);

  const benefits = [
    {
      num: '01', cadence: 'Chaque semaine',
      title: 'Rendez-vous hebdomadaire',
      desc: 'Avec votre équipe Nova pour faire le point sur les actions en cours.',
      glyph: 'W',
    },
    {
      num: '02', cadence: 'Tous les 3 mois',
      title: 'Bilan trimestriel stratégique',
      desc: 'Ajuster vos objectifs et redéfinir les priorités pour le trimestre suivant.',
      glyph: 'Q',
    },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 110, left: 140, right: 140,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <div>
          <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 16 }}>
            Inclus dans tous les packs
          </MonoKicker>
          <div style={{
            fontFamily: FONT_SORA, fontWeight: 200, fontSize: 80,
            letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
          }}>
            On reste ensemble.
          </div>
        </div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: COLORS.creamFaint,
        }}>
          Accompagnement continu
        </div>
      </div>

      {/* Calendar strip — visual cadence */}
      <div style={{
        position: 'absolute', top: 360, left: 140, right: 140,
        opacity: clamp((localTime - 0.6) / 0.9, 0, 1),
      }}>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: COLORS.creamFaint, marginBottom: 14,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Q1 · 12 semaines</span>
          <span>S{String(activeWeek + 1).padStart(2, '0')}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: totalWeeks }).map((_, i) => {
            const isActive = i <= activeWeek;
            const isQuarter = i === 0 || i === totalWeeks - 1;
            return (
              <div key={i} style={{
                flex: 1, height: 38, borderRadius: 6,
                background: isActive ? (isQuarter ? COLORS.cream : COLORS.creamMid) : COLORS.bg3,
                border: `1px solid ${isActive ? COLORS.creamDim : COLORS.rule}`,
                position: 'relative',
                transition: 'background 200ms, border 200ms',
              }}>
                {isQuarter && (
                  <div style={{
                    position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)',
                    fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: COLORS.creamDim,
                    whiteSpace: 'nowrap',
                  }}>
                    ★ Bilan
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Two benefit cards */}
      <div style={{
        position: 'absolute', top: 540, left: 140, right: 140, bottom: 110,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        perspective: 1800,
      }}>
        {benefits.map((b, i) => {
          const delay = 0.9 + i * 0.22;
          const op = clamp((localTime - delay) / 1.0, 0, 1);
          const e = novaEase(op);
          const y = (1 - e) * 60;
          const rotY = (1 - e) * (i === 0 ? -25 : 25);

          return (
            <div key={i} style={{
              padding: 40,
              borderRadius: 18,
              border: `1px solid ${COLORS.rule}`,
              background: 'oklch(0.08 0 0)',
              display: 'flex', alignItems: 'center', gap: 32,
              opacity: op,
              transform: `translateY(${y}px) rotateY(${rotY}deg)`,
              transformStyle: 'preserve-3d',
              transformOrigin: i === 0 ? 'right center' : 'left center',
              boxShadow: '0 40px 100px oklch(0 0 0 / 0.5)',
            }}>
              {/* Glyph */}
              <div style={{
                width: 120, height: 120, borderRadius: 18,
                background: 'oklch(0.04 0 0)',
                border: `1px solid ${COLORS.rule}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 200, fontSize: 64,
                  color: COLORS.cream, letterSpacing: '-0.05em', lineHeight: 1,
                }}>{b.glyph}</div>
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '0.25em',
                  color: COLORS.creamFaint,
                }}>{b.num}</div>
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <MonoKicker style={{ fontSize: 11, letterSpacing: '0.3em', marginBottom: 10 }} color={COLORS.creamFaint}>
                  {b.cadence}
                </MonoKicker>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 200, fontSize: 36,
                  color: COLORS.cream, letterSpacing: '-0.02em', lineHeight: 1.1,
                  marginBottom: 12,
                }}>{b.title}</div>
                <div style={{
                  fontFamily: FONT_SORA, fontWeight: 300, fontSize: 17, lineHeight: 1.5,
                  color: COLORS.creamMid,
                }}>{b.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 6 — PROCESS (horizontal track with camera pan) ─────────────
function Scene6Process() {
  const { localTime, duration } = useSprite();

  const steps = [
    { num: '01', label: 'Brief',          title: 'Stratégie',  desc: 'Objectifs, angle créatif, plateforme et budget.' },
    { num: '02', label: 'Production',     title: 'Tournage',   desc: 'Direction artistique, plateau ou terrain BE / FR.' },
    { num: '03', label: 'Post-production',title: 'Montage',    desc: 'Déclinaisons Reels · Stories · YouTube · Display.' },
    { num: '04', label: 'Lancement',      title: 'Diffusion',  desc: 'Suivi performance et optimisation continue.' },
  ];

  const headOp = clamp((localTime - 0.1) / 0.7, 0, 1);
  const headY  = (1 - novaEase(headOp)) * 26;

  // Camera pans horizontally — translates the track
  const panT = clamp((localTime - 0.7) / 5.0, 0, 1);
  const panX = -panT * 420;

  const exitT  = clamp((duration - localTime) / 0.7, 0, 1);
  const exitOp = Easing.easeInOutCubic(exitT);
  const exitBlur = (1 - exitT) * 10;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: COLORS.bg,
      opacity: exitOp,
      filter: exitBlur ? `blur(${exitBlur}px)` : undefined,
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 110, left: 140, right: 140,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        opacity: headOp, transform: `translateY(${headY}px)`,
      }}>
        <div>
          <MonoKicker style={{ fontSize: 16, letterSpacing: '0.32em', marginBottom: 18 }}>
            Comment on travaille
          </MonoKicker>
          <div style={{
            fontFamily: FONT_SORA, fontWeight: 200, fontSize: 88,
            letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
          }}>
            Quatre étapes.
          </div>
        </div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: COLORS.creamFaint,
        }}>
          Process · Nova
        </div>
      </div>

      {/* Horizontal track */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        height: 460, marginTop: 60,
        overflow: 'hidden',
      }}>
        {/* Long horizontal connector line */}
        <div style={{
          position: 'absolute', top: 80, left: 0, right: 0, height: 1,
          background: `linear-gradient(to right, transparent, ${COLORS.rule} 8%, ${COLORS.rule} 92%, transparent)`,
        }} />

        {/* Filled progress on top */}
        <div style={{
          position: 'absolute', top: 80, left: '7%', height: 1,
          width: `${panT * 86}%`,
          background: COLORS.creamDim,
          boxShadow: `0 0 12px ${COLORS.creamDim}`,
        }} />

        {/* Step nodes */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          transform: `translateX(${panX}px)`,
          willChange: 'transform',
        }}>
          {steps.map((s, i) => {
            const colX = 320 + i * 460;
            const sDelay = 0.5 + i * 0.65;
            const op = clamp((localTime - sDelay) / 0.8, 0, 1);
            const e = novaEase(op);
            const sY = (1 - e) * 30;
            const circleE = clamp((localTime - sDelay) / 0.6, 0, 1);
            const cScale = 0.4 + 0.6 * Easing.easeOutBack(circleE);

            return (
              <div key={i} style={{
                position: 'absolute', left: colX, top: 0, width: 380,
                opacity: op,
                transform: `translateY(${sY}px)`,
              }}>
                {/* Circle node */}
                <div style={{
                  position: 'absolute', top: 60, left: '50%',
                  transform: `translateX(-50%) scale(${cScale})`,
                  width: 44, height: 44, borderRadius: 999,
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.creamDim}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 5,
                  boxShadow: `0 0 ${30 * cScale}px oklch(0.96 0 0 / 0.25)`,
                }}>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 12, color: COLORS.creamDim,
                  }}>{s.num}</div>
                </div>

                {/* Card below */}
                <div style={{
                  marginTop: 150, textAlign: 'center', padding: '0 30px',
                }}>
                  <MonoKicker style={{ fontSize: 12, letterSpacing: '0.3em', marginBottom: 14 }} color={COLORS.creamFaint}>
                    {s.label}
                  </MonoKicker>
                  <div style={{
                    fontFamily: FONT_SORA, fontWeight: 200, fontSize: 64,
                    letterSpacing: '-0.04em', color: COLORS.cream, lineHeight: 1.0,
                    marginBottom: 16,
                  }}>{s.title}</div>
                  <div style={{
                    fontFamily: FONT_SORA, fontWeight: 300, fontSize: 18, lineHeight: 1.55,
                    color: COLORS.creamMid,
                  }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: 180,
          background: `linear-gradient(to right, ${COLORS.bg}, transparent)`,
          pointerEvents: 'none', zIndex: 10,
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: 180,
          background: `linear-gradient(to left, ${COLORS.bg}, transparent)`,
          pointerEvents: 'none', zIndex: 10,
        }} />
      </div>

      <Grain />
    </div>
  );
}

// ── Scene 7 — CTA OUTRO ────────────────────────────────────────────────
function Scene7CTA() {
  const { localTime, duration } = useSprite();

  // Rule top draws down
  const ruleScale = clamp(localTime / 0.8, 0, 1);

  // Kicker
  const kickerOp = clamp((localTime - 0.4) / 0.7, 0, 1);
  const kickerY  = (1 - novaEase(kickerOp)) * 16;

  // Heading two lines
  const h1Op = clamp((localTime - 0.8) / 1.0, 0, 1);
  const h1Y  = (1 - novaEase(h1Op)) * 50;
  const h2Op = clamp((localTime - 1.3) / 1.0, 0, 1);
  const h2Y  = (1 - novaEase(h2Op)) * 50;

  // Logo
  const logoOp = clamp((localTime - 2.4) / 1.0, 0, 1);
  const logoE = novaEase(logoOp);
  const logoScale = 0.9 + 0.1 * logoE;

  // Buttons
  const btnOp = clamp((localTime - 2.8) / 0.9, 0, 1);
  const btnY  = (1 - novaEase(btnOp)) * 18;

  // BG ken burns
  const bgScale = 1 + (localTime / duration) * 0.06;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'oklch(0.04 0 0)',
    }}>
      {/* Faint BG showreel */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.07, transform: `scale(${bgScale})` }}>
        <ShowreelBg opacity={1} scale={1.2} />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, oklch(0.03 0 0 / 0.95) 100%)`,
      }} />

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 80, left: '50%',
        width: 1, height: 100, transform: `translateX(-50%) scaleY(${ruleScale})`,
        transformOrigin: 'top',
        background: COLORS.rule,
      }} />

      {/* Kicker */}
      <div style={{
        position: 'absolute', top: 240, left: 0, right: 0, textAlign: 'center',
        opacity: kickerOp, transform: `translateY(${kickerY}px)`,
      }}>
        <MonoKicker style={{ fontSize: 18, letterSpacing: '0.4em' }}>
          Prêt à passer à l'action
        </MonoKicker>
      </div>

      {/* Heading */}
      <div style={{
        position: 'absolute', top: 320, left: 0, right: 0, textAlign: 'center',
        fontFamily: FONT_SORA, fontWeight: 200, fontSize: 132, lineHeight: 1.04,
        letterSpacing: '-0.04em',
      }}>
        <div style={{
          color: COLORS.cream,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Votre prochaine
        </div>
        <div style={{
          color: COLORS.creamFaint,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
          marginTop: 4,
        }}>
          vidéo commence ici.
        </div>
      </div>

      {/* Logo */}
      <div style={{
        position: 'absolute', top: 760, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: logoOp, transform: `scale(${logoScale})`,
      }}>
        <img src="logo-nova-cream.png" alt="Nova" style={{ width: 320, height: 'auto', opacity: 0.95 }} />
      </div>

      {/* Coords block */}
      <div style={{
        position: 'absolute', top: 900, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 60,
        opacity: clamp((localTime - 3.0) / 0.9, 0, 1),
        transform: `translateY(${(1 - novaEase(clamp((localTime - 3.0) / 0.9, 0, 1))) * 14}px)`,
      }}>
        {[
          { label: 'Belgique', val: 'Bruxelles' },
          { label: 'France',   val: 'Paris'  },
          { label: 'Mail',     val: 'contact@novaproduction.fr' },
        ].map((b, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: COLORS.creamFaint,
              marginBottom: 8,
            }}>{b.label}</div>
            <div style={{
              fontFamily: FONT_SORA, fontWeight: 300, fontSize: 22,
              letterSpacing: '-0.01em', color: COLORS.cream,
            }}>{b.val}</div>
          </div>
        ))}
      </div>

      {/* Bottom URL */}
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center',
        opacity: clamp((localTime - 3.4) / 0.8, 0, 1),
      }}>
        <MonoKicker style={{ fontSize: 14, letterSpacing: '0.3em' }} color={COLORS.creamMid}>
          nova-agency.fr · contact@novaproduction.fr
        </MonoKicker>
      </div>

      <Grain />
    </div>
  );
}

// ── Master composition ────────────────────────────────────────────────
// Scene timings (each Sprite mounts/unmounts at boundary; small overlap window
// is fine since we fade out the exiting scene inside its own component).

const SCENES = [
  { name: 'Intro',     start: 0.0,  end: 4.0,  Component: Scene1Intro      },
  { name: 'Hero',      start: 4.0,  end: 9.0,  Component: Scene2Hero       },
  { name: 'Stats',     start: 9.0,  end: 15.0, Component: Scene4Stats      },
  { name: 'Packs',     start: 15.0, end: 25.0, Component: Scene5Packs      },
  { name: 'Social',    start: 25.0, end: 32.0, Component: Scene6aSocial    },
  { name: 'Website',   start: 32.0, end: 39.5, Component: Scene6bWebsite   },
  { name: 'Included',  start: 39.5, end: 45.5, Component: Scene6bIncluded  },
  { name: 'Process',   start: 45.5, end: 52.5, Component: Scene6Process    },
  { name: 'CTA',       start: 52.5, end: 58.5, Component: Scene7CTA        },
];

function NovaVideo() {
  const time = useTime();
  const { playing } = useTimeline();
  const audioRef = React.useRef(null);

  // ── Audio sync ────────────────────────────────────────────────────
  // Sync voix-off with timeline play/pause
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      // Sync position before playing
      if (Math.abs(a.currentTime - time) > 0.3) a.currentTime = time;
      a.play().catch(() => {});
    } else {
      a.pause();
      a.currentTime = time; // keep in sync while paused / scrubbing
    }
  }, [playing]);

  // Seek audio when user scrubs the playhead (large time jump)
  const prevTimeRef = React.useRef(time);
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const delta = Math.abs(a.currentTime - time);
    if (delta > 0.5) a.currentTime = time; // re-sync on seek
    prevTimeRef.current = time;
  }, [Math.round(time * 4)]); // runs ~4× per second

  // ── Persistent background video — runs from intro through stats, fades at packs ──
  // Blur timeline:  Intro=blurred → Hero manifesto=sharp → after manifesto=blurs again → Stats=blurred
  // Opacity timeline: fades in at start, fades out before Packs (black bg)
  const bgBlur = interpolate(
    [0,   0.5, 4.5, 6.5, 8.0, 9.0, 16.0],
    [32,  32,  30,  0,   0,   30,  30]
  )(time);
  const bgOpacity = interpolate(
    [0,   0.6, 9.0, 14.0, 16.0],
    [0,   0.22, 0.25, 0.25, 0]
  )(time);

  // Update root data-screen-label every second w/ timestamp + scene name
  React.useEffect(() => {
    const cur = SCENES.find(s => time >= s.start && time < s.end) || SCENES[SCENES.length - 1];
    const root = document.getElementById('nova-root');
    if (root) {
      const ts = `${String(Math.floor(time)).padStart(2, '0')}s`;
      root.setAttribute('data-screen-label', `${ts} · ${cur.name}`);
    }
  }, [Math.floor(time)]);

  return (
    <div id="nova-root" style={{ position: 'absolute', inset: 0, background: COLORS.bg }}>
      {/* Voix-off audio — synced with timeline */}
      <audio ref={audioRef} src="voix-off.mp3" preload="auto" />

      {/* ── Persistent video background — never cuts, blur + opacity driven by time ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
        opacity: bgOpacity,
        pointerEvents: 'none',
      }}>
        <iframe
          src={`https://player.vimeo.com/video/${SHOWREEL_ID}?autoplay=1&muted=1&background=1&loop=1&quality=720p`}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) scale(1.18)',
            width: 1920, height: 1080,
            border: 0,
            filter: `blur(${bgBlur}px)`,
            willChange: 'filter',
          }}
          allow="autoplay; fullscreen"
        />
        {/* Vignette always on top of video */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, oklch(0.03 0 0 / 0.82) 100%)',
        }} />
      </div>

      {/* Scenes on top of the persistent bg */}
      {SCENES.map(({ start, end, Component, name }) => (
        <Sprite key={name} start={start} end={end}>
          <Component />
        </Sprite>
      ))}

      {/* Persistent corner watermark — always visible */}
      <div style={{
        position: 'absolute', bottom: 32, left: 36, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <img src="logo-nova-cream.png" alt="" style={{ height: 22, width: 'auto', opacity: 0.55 }} />
      </div>
      <div style={{
        position: 'absolute', bottom: 36, right: 36, zIndex: 50,
        fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'oklch(0.45 0 0)',
      }}>
        Présentation · 2025
      </div>
    </div>
  );
}

window.NovaVideo = NovaVideo;
