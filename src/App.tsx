import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { impactMeters } from "./data/impactMeters";

const C = "#3FC8FF";
const W = "#F2F7FF";

function LogoImage({
  className = "",
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <img
      src="/no-pax-logo-clean.png"
      className={`aspect-square object-contain ${className}`}
      alt={decorative ? "" : "No to Pax Silica logo"}
      aria-hidden={decorative || undefined}
      draggable={false}
    />
  );
}

function InkFilter() {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className="ink-filter-defs"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <filter id="ink" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="n" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="n"
          scale="1.8"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

function DraftMarks({ sheet, scale = "NTS" }: { sheet: string; scale?: string }) {
  return (
    <>
      <span className="crop tl" />
      <span className="crop tr" />
      <span className="crop bl" />
      <span className="crop br" />
      <span className="draft-meta">
        <span className="coordinate">N 14°35' · E 120°58'</span>
        <span className="sheet-label">
          SHEET {sheet} · SCALE {scale}
        </span>
      </span>
    </>
  );
}

function SectionTitle({
  no,
  eyebrow,
  title,
  description,
}: {
  no: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-title">
      <div className="section-index">{no}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      <div className="title-rule">
        <span>A</span>
        <span>A</span>
      </div>
    </header>
  );
}

function TableProps({ variant = 0 }: { variant?: number }) {
  const propSets = [
    ["ruler", "red-pen", "pencil", "coffee", "tape-roll", "glasses"],
    ["tape-roll", "phone", "lanyard", "megaphone", "pencil"],
    ["ruler", "calculator", "glasses", "red-pen", "folder"],
    ["red-pen", "megaphone", "stamp", "sticky"],
  ];
  const propArt: Record<string, React.ReactNode> = {
    ruler: "1:100  20  40  60  80",
    "red-pen": null,
    pencil: null,
    coffee: <i />,
    "tape-roll": null,
    glasses: (
      <>
        <i />
        <i />
      </>
    ),
    calculator: (
      <>
        7 4 9
        <br />2 0 5
      </>
    ),
    phone: (
      <>
        BARANGAY GC
        <br />
        <b>127 members</b>
        <i>May hearing bukas?</i>
      </>
    ),
    lanyard: (
      <>
        VOLUNTEER
        <br />
        <b>MAYA SANTOS</b>
      </>
    ),
    megaphone: ")))",
    folder: (
      <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 120 90" aria-hidden="true" focusable="false">
        <path d="M6 20h38l10 12h60v50H6z" fill="#c99c55" stroke="#6c4b22" strokeWidth="3" />
        <path d="M6 32h108v50H6z" fill="#e3bb76" stroke="#6c4b22" strokeWidth="3" />
        <path d="M22 48h58M22 60h44" stroke="#fff5d4" strokeWidth="3" />
      </svg>
    ),
    stamp: (
      <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <path
          d="M40 18h40v38l18 20v14H22V76l18-20z"
          fill="#b73620"
          stroke="#5d1a0f"
          strokeWidth="3"
        />
        <path d="M18 90h84v14H18z" fill="#792414" stroke="#5d1a0f" strokeWidth="3" />
        <path d="M48 30h24M48 42h24" stroke="#f4d7b3" strokeWidth="3" />
      </svg>
    ),
    sticky: (
      <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 110 105" aria-hidden="true" focusable="false">
        <path d="M8 5h94v72l-29 26H8z" fill="#f4dc62" stroke="#8a6a18" strokeWidth="3" />
        <path d="M73 103V77h29" fill="none" stroke="#8a6a18" strokeWidth="3" />
        <path d="M23 30h54M23 47h42" stroke="#7b5b12" strokeWidth="3" />
      </svg>
    ),
  };

  return (
    <div className={`table-props props-${variant}`} aria-hidden="true">
      {(propSets[variant] ?? propSets[0]).map((name) => (
        <span className={`prop ${name}`} key={name}>
          {propArt[name]}
        </span>
      ))}
    </div>
  );
}

function ProtestMarks({ compact = false, hero = false }: { compact?: boolean; hero?: boolean }) {
  return (
    <div
      className={`protest-marks ${compact ? "compact" : ""}${hero ? " hero-stencils" : ""}`}
      aria-hidden="true"
    >
      <span>HUWAG!</span>
      <span>WALANG KONSULTASYON</span>
      <span>LUPA NAMIN ITO</span>
      {hero && (
        <>
          <span>IPAGLABAN</span>
          <span>TUBIG AY BUHAY</span>
          <span>KONSULTA MUNA</span>
          <span>BAHAY NAMIN ITO</span>
          <span>NO TO PAX SILICA</span>
          <span>TULOY ANG LABAN</span>
          <span>HUWAG PABAYAAN</span>
          <span>TAO MUNA</span>
          <span>RESIST!</span>
          <span>TUBIG &gt; DATA</span>
        </>
      )}
    </div>
  );
}

function PetitionIcon() {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className="petition-icon"
      viewBox="0 0 128 76"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 8h52v60H18z" fill="none" stroke={C} strokeWidth="2" />
      <path d="M34 8V3h20v5" fill="none" stroke={C} strokeWidth="2" />
      <path d="M29 26h30M29 36h30M29 46h18" fill="none" stroke={C} strokeWidth="1.5" />
      <path d="m28 25 5 5 8-11" fill="none" stroke="var(--orange)" strokeWidth="2.5" />
      <path
        d="m62 56 21-21 8 8-21 21-11 3z"
        fill="var(--orange)"
        stroke="var(--navy)"
        strokeWidth="2"
      />
      <path d="M80 38l8 8" fill="none" stroke={C} strokeWidth="1.5" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className="checklist-icon"
      viewBox="0 0 60 60"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 4h36v52H12z" fill="none" stroke={C} strokeWidth="2" />
      <path d="M19 18h22M19 29h22M19 40h13" fill="none" stroke={C} strokeWidth="1.5" />
      <path
        d="M18 17l3 3 5-7M18 28l3 3 5-7M18 39l3 3 5-7"
        fill="none"
        stroke="var(--orange)"
        strokeWidth="2"
      />
    </svg>
  );
}

function FinaleStencils() {
  return (
    <div className="finale-stencils" aria-hidden="true">
      <span className="stencil stencil-a">TAMA NA!</span>
      <span className="stencil stencil-b">KONSULTA MUNA!</span>
    </div>
  );
}

function CrowdBoundary() {
  const chants = [
    { text: "TAMA NA!", x: 60, y: 24, width: 150, size: 17, color: C, rotate: -4 },
    { text: "REJECT PAX SILICA", x: 226, y: 12, width: 230, size: 15, color: "#FF7A1A", rotate: 3 },
    { text: "KONSULTA MUNA!", x: 474, y: 28, width: 205, size: 16, color: C, rotate: -3 },
    {
      text: "PHILIPPINES NOT FOR SALE",
      x: 694,
      y: 10,
      width: 300,
      size: 14,
      color: "#FF7A1A",
      rotate: 2,
    },
    { text: "BAHAY NAMIN ITO", x: 1008, y: 24, width: 212, size: 15, color: C, rotate: -3 },
    { text: "GET THE PAX OUT!", x: 1230, y: 14, width: 198, size: 14, color: "#FF7A1A", rotate: 4 },
  ];
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className="crowd-boundary"
      viewBox="0 0 1440 180"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <symbol id="finale-crowd-figure" viewBox="-45 -40 90 130">
          <g fill="none" stroke={C} strokeWidth="2" opacity="0.72">
            <circle cx="0" cy="-22" r="13" />
            <path d="M-18 90V14q0-17 18-17t18 17v76" />
            <path d="M-14 14-35-7l-4-22" strokeWidth="10" strokeLinecap="square" />
            <circle cx="-39" cy="-30" r="8" />
            <path d="M14 18 37 7" strokeWidth="10" strokeLinecap="square" />
            <circle cx="40" cy="5" r="7" />
          </g>
        </symbol>
      </defs>
      <g className="crowd-chants" opacity="0.62">
        {chants.map((chant) => (
          <g
            key={chant.text}
            transform={`translate(${chant.x} ${chant.y}) rotate(${chant.rotate})`}
          >
            <rect
              width={chant.width}
              height="42"
              fill="var(--navy)"
              stroke={chant.color}
              strokeWidth="1.5"
            />
            <text
              x={chant.width / 2}
              y="27"
              textAnchor="middle"
              fill={chant.color}
              fontSize={chant.size}
              fontWeight="800"
            >
              {chant.text}
            </text>
          </g>
        ))}
      </g>
      <g opacity="0.55">
        {[
          [18, 52],
          [118, 68],
          [218, 44],
          [318, 62],
          [418, 38],
          [518, 58],
          [618, 46],
          [718, 66],
          [818, 42],
          [918, 60],
          [1018, 36],
          [1118, 64],
          [1218, 48],
          [1318, 60],
          [1418, 42],
        ].map(([x, y], i) => (
          <use
            key={i}
            href="#finale-crowd-figure"
            x={x}
            y={y}
            width="90"
            height="130"
            opacity={i % 3 === 0 ? 0.85 : 0.6}
          />
        ))}
      </g>
    </svg>
  );
}

function FooterWatermark() {
  return <LogoImage className="footer-watermark" decorative />;
}

function HeroBlueprintFigure() {
  const A: [number, number] = [200, 232];
  const B: [number, number] = [520, 96];
  const E: [number, number] = [832, 226];
  const D: [number, number] = [506, 366];

  const topPoint = (u: number, v: number): [number, number] => [
    A[0] + (B[0] - A[0]) * u + (D[0] - A[0]) * v,
    A[1] + (B[1] - A[1]) * u + (D[1] - A[1]) * v,
  ];
  const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ];
  const fmt = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const chillers: Array<[number, number]> = [
    [0.18, 0.24],
    [0.45, 0.2],
    [0.72, 0.24],
    [0.28, 0.6],
    [0.56, 0.58],
    [0.8, 0.6],
  ];
  const houses: Array<[number, number, number]> = [
    [82, 468, 1],
    [144, 490, 0.86],
    [210, 464, 0.92],
    [116, 534, 0.78],
    [184, 530, 0.74],
  ];

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className="technical-drawing hero-isometric"
      viewBox="0 0 900 620"
      role="img"
      aria-label="Isometric blueprint of a hyperscale data hall, substation, water main, and nearby barangay homes"
    >
      <g
        className="draw-lines"
        fill="none"
        stroke={C}
        strokeWidth="1.4"
        strokeLinejoin="miter"
        strokeLinecap="square"
      >
        {/* Hyperscale data hall: opaque navy roof and walls stop wireframe bleed-through */}
        <path d={`M${fmt(A)} ${fmt(B)} ${fmt(E)} ${fmt(D)}Z`} fill="#031F5A" strokeWidth="2.8" />
        <path d={`M${fmt(A)} ${fmt(D)} 506 516 200 382Z`} fill="#031F5A" strokeWidth="2.2" />
        <path d={`M${fmt(D)} ${fmt(E)} 832 376 506 516Z`} fill="#031F5A" strokeWidth="2.2" />

        {/* Roof seams stay on the roof; elevation mullions stay on their walls. */}
        {Array.from({ length: 4 }).map((_, i) => {
          const t = (i + 1) / 5;
          return (
            <path
              key={`roof-seam-${i}`}
              d={`M${fmt(topPoint(t, 0.08))} ${fmt(topPoint(t, 0.92))}`}
              opacity=".34"
              strokeWidth="1"
            />
          );
        })}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <path
            key={`front-mullion-${i}`}
            d={`M${fmt(topPoint(t, 1))} ${fmt(lerp([200, 382], [506, 516], t))}`}
            opacity=".42"
            strokeWidth="1.1"
          />
        ))}
        {[0.33, 0.66].map((t, i) => (
          <path
            key={`side-mullion-${i}`}
            d={`M${fmt(lerp(D, E, t))} ${fmt(lerp([506, 516], [832, 376], t))}`}
            opacity=".36"
            strokeWidth="1.1"
          />
        ))}

        {/* Tidy rooftop chiller banks with two louvers each */}
        {chillers.map(([u, v], i) => {
          const p = topPoint(u, v);
          return (
            <g key={`chiller-${i}`} transform={`translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`}>
              <path d="M-22 0 0-10 24 0 0 10Z" fill="#031F5A" strokeWidth="1.6" />
              <path
                d="M-22 0v8l22 9V10M0 10l24-10v8L0 18"
                fill="#031F5A"
                strokeWidth="1.3"
              />
              <path d="M-12-1 0-6M-3 3 10-3" opacity=".5" strokeWidth="1" />
            </g>
          );
        })}

        {/* Three clean exhaust stacks, no tangled service lines */}
        {[0.2, 0.5, 0.8].map((t, i) => {
          const p = lerp(B, E, t);
          return (
            <g key={`stack-${i}`} transform={`translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`}>
              <path d="M-10 0 0-5 12 0 2 5Z" fill="#031F5A" strokeWidth="1.5" />
              <path d="M-10 0v-62l12 5V0M2-57l10 5v62" fill="#031F5A" strokeWidth="1.5" />
              <path d="M-7-14l8 4m-8 11 8 4m-8 11 8 4" opacity=".6" strokeWidth="1.2" />
            </g>
          );
        })}

        {/* Compact electrical substation on the right */}
        <path d="M638 412 736 368l92 38-98 46Z" fill="#031F5A" strokeWidth="2" />
        <path
          d="M638 412v62l92 44v-62M730 452l98-46v60l-98 52"
          fill="#031F5A"
          strokeWidth="1.9"
        />
        <path d="M660 420h28v38h-28zM704 400h28v40h-28z" fill="#031F5A" strokeWidth="1.4" />
        <path d="M674 420v38m-14-19h28M718 400v40m-14-20h28" opacity=".55" strokeWidth="1" />
        <path d="M758 370v-34m-9 0h18m-13 8h8m-11 8h14" strokeWidth="1.8" />
        <path
          d="m790 418 14-18-5 19 14-4-18 26 5-20Z"
          fill="var(--orange)"
          stroke="var(--orange)"
          strokeWidth="1.6"
        />

        {/* One underground water main with neat direction arrows */}
        <path d="M92 566h680" stroke="#031F5A" strokeWidth="16" opacity=".92" />
        <path d="M92 566h680" strokeWidth="2.2" strokeDasharray="20 8" />
        <path d="M552 566V452m84 114V438" strokeWidth="1.8" opacity=".7" />
        <path
          d="m278 566 14-7m-14 7 14 7m168-7 14-7m-14 7 14 7m192-7 14-7m-14 7 14 7"
          stroke="var(--orange)"
          strokeWidth="2.6"
        />

        {/* Filipino barangay houses: pitched roofs, doors, windows, solid occlusion */}
        {houses.map(([x, y, s], i) => (
          <g key={`house-${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M0 24 32 7 66 24v54H0Z" fill="#031F5A" strokeWidth="1.7" />
            <path d="M-6 25 32 0l40 25-8 6-32-21-32 21Z" fill="#031F5A" strokeWidth="1.7" />
            <path d="M8 27l24-15m12 0 22 14" opacity=".48" strokeWidth="1" />
            <path d="M13 40h13v14H13zM42 40h12v14H42z" fill="#031F5A" strokeWidth="1.2" />
            <path d="M28 78V56h12v22" fill="#031F5A" strokeWidth="1.2" />
          </g>
        ))}

        {/* Single utility pole with restrained service drops */}
        <path d="M330 382v166M318 398h24" strokeWidth="2" />
        <path d="M318 398q-78 22-154 4M342 398q54 18 104-2" opacity=".5" strokeWidth="1.2" />

        {/* Plain dimension leaders, kept clear of the callout and card title */}
        <path d="M520 62V44M200 232h-28M862 104v318" opacity=".7" />
        <path d="M92 594h152M640 594h152" opacity=".7" />
      </g>

      <g fill={W} fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="1">
        <text x="208" y="44">
          HYPERSCALE DATA HALL
        </text>
        <text x="252" y="66" fill="#3FC8FF" fontSize="10">
          PROPOSED / 1,619 HA HUB
        </text>
        <text x="878" y="250" transform="rotate(-90 878 250)" fontSize="10">
          HEIGHT ~24 m
        </text>
        <text x="612" y="612" fontSize="10">
          WATER DRAW ~1.7M L/DAY
        </text>
        <text x="36" y="616" fontSize="10">
          50 m — NEAREST HOME
        </text>
        <text x="34" y="448" fill="#FF7A1A" fontSize="11">
          BARANGAY HOMES
        </text>
        <text x="700" y="482" fontSize="10">
          SUBSTATION
        </text>
      </g>
    </svg>
  );
}

function NeighborhoodScene({ stage }: { stage: number }) {
  const homes: Array<[number, number, number]> = [
    [74, 306, 0.92],
    [158, 322, 0.78],
    [246, 298, 0.86],
    [332, 324, 0.74],
  ];
  const trees: Array<[number, number, number]> = [
    [42, 372, 0.8],
    [212, 378, 0.7],
    [392, 382, 0.85],
    [724, 374, 0.75],
  ];

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className="neighborhood-scene"
      viewBox="0 0 760 520"
      data-stage={stage}
      role="img"
      aria-label={`Neighborhood conditions at project stage ${stage + 1}`}
    >
      <g className="scene-grid" fill="none" stroke={C} strokeWidth="0.7" opacity="0.18">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={`ng-v-${i}`} d={`M${i * 80 + 20} 20v480`} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={`ng-h-${i}`} d={`M20 ${i * 80 + 30}h720`} />
        ))}
      </g>

      <g className="scene-base" fill="none" stroke={C} strokeWidth="1.5">
        <path d="M20 30h720v462H20z" opacity="0.35" />
        <path d="M20 402h720M20 394v16m720-16v16" strokeWidth="2.2" />
        <path d="M54 402h652" strokeDasharray="24 18" opacity="0.7" />
        <path
          d="M10 462c78-22 132 18 208-4s126-22 194 4 139 23 208-2 108-8 130 2"
          stroke="#7DB35F"
          strokeWidth="3"
        />
        <path
          d="M10 478c82-24 140 18 219-3s129-22 198 4 142 22 213-3 94-7 120 1"
          stroke="#7DB35F"
          strokeDasharray="8 7"
          opacity="0.6"
        />
        <text x="24" y="499" fill="#7DB35F" stroke="none" fontFamily="IBM Plex Mono" fontSize="10">
          SHARED AQUIFER / 45 m DEPTH
        </text>

        {homes.map(([x, y, s], i) => (
          <g key={`home-${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M0 24 34 4l36 20v58H0Z" fill="#031F5A" />
            <path d="M-6 25 34-3l40 28-8 6-32-22-30 22Z" fill="#031F5A" />
            <path d="M-2 32 34 11l34 21M9 29l25-16 23 16" opacity="0.55" />
            <path d="M12 42h15v17H12zM43 42h14v17H43z" fill="#031F5A" />
            <path d="M28 82V59h13v23" fill="#031F5A" />
            <path d="M34 59v23" opacity="0.5" />
          </g>
        ))}

        {trees.map(([x, y, s], i) => (
          <g key={`tree-${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M0 0v-38m0 20-15-18m15 10 16-20" />
            <path
              d="M0-38c-13 0-22 9-20 20-10 4-13 17-3 23 3 9 17 11 23 4 11 5 23-2 21-13 8-7 3-19-7-20-1-8-7-14-14-14Z"
              fill="#031F5A"
            />
          </g>
        ))}

        <path d="M382 196v190M368 216h28M364 244h36" strokeWidth="2.2" />
        <path d="M366 216q-110 28-208 8M398 216q94 26 168-4" opacity="0.85" />
        <path d="M368 244q-94 32-180 12M396 244q80 26 148 4" opacity="0.6" />

        <path
          d="M438 306 608 220l116 50-170 88Z"
          fill="#031F5A"
          opacity="0.86"
          strokeDasharray="9 7"
        />
        <path d="M438 306v54l116 58v-60M724 270v58l-170 90" opacity="0.45" />
        <path d="M480 288h104m-92 18h88m-78 18h68" opacity="0.45" />
        <text x="472" y="204" fill={C} stroke="none" fontFamily="IBM Plex Mono" fontSize="10">
          PROJECT PARCEL / 1,619 HA
        </text>
      </g>

      <g className="scene-construction" fill="none" stroke="#FF7A1A" strokeWidth="1.8">
        <path d="M424 318 610 224l140 60-186 96Z" fill="#031F5A" strokeDasharray="6 6" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`cf-${i}`} d={`M${438 + i * 36} ${310 - i * 9}v22`} opacity="0.8" />
        ))}
        <path d="M596 300V126m-16 0h32M596 126 706 90M596 126l-78-30M584 150h24M584 190h24M584 230h24" />
        <path d="M596 126 706 90m-110 36 70 30M688 94v14m-92 40 58 25" strokeWidth="1.2" />
        <path d="M706 90v62m-14 0h28" />
        <path d="M672 152v-26h28v26M676 126v-10h20v10" fill="#031F5A" />
        <path d="M484 320h92l-12 42h-68Z" fill="#031F5A" />
        <path d="M500 320 486 292h42l14 28M548 320l18-22" fill="#031F5A" />
        <path d="M476 362h108m-96 0v18m86-18v18" fill="#031F5A" />
        <path d="M246 368h88l14 28H232Z" fill="#031F5A" />
        <path d="M268 368v-28h42v28M234 396h102" fill="#031F5A" />
        <circle cx="254" cy="400" r="9" />
        <circle cx="318" cy="400" r="9" />
        <path d="M292 340h18M284 350h34" opacity="0.7" />
        <path
          d="M456 278c18-16 34 8 52-7s34 4 50-9m-72 78c14-11 26 5 40-5s25 3 38-6"
          opacity="0.7"
        />
        <text x="438" y="348" fill="#FF7A1A" stroke="none" fontFamily="IBM Plex Mono" fontSize="10">
          EXCAVATION / 12.0 M
        </text>
      </g>

      <g className="scene-utilities" fill="none" stroke="#FF7A1A" strokeWidth="1.8">
        <path d="M640 318h80v52h-80z" fill="#031F5A" />
        <path d="M652 318v52m16-52v52m16-52v52m16-52v52" opacity="0.7" />
        <path d="M656 306v12m48-12v12M664 300h32" />
        <path d="m708 332 12-12-4 16 12-4-16 22 4-18Z" fill="#031F5A" />
        <path d="M382 196q-92 54-198 22M398 196q96 52 172 16" strokeDasharray="4 5" />
        <path d="M188 370h94l12 30H176Z" fill="#031F5A" />
        <circle cx="196" cy="404" r="10" fill="#031F5A" />
        <circle cx="274" cy="404" r="10" fill="#031F5A" />
        <path d="M206 370v-22h52v22M214 348h36" fill="#031F5A" />
        <path d="M274 340h44v30h-44z" fill="#031F5A" />
        <path d="M282 348h28m-28 10h28m-28 8h18" opacity="0.7" />
        <path d="M92 292h34v26H92zM306 300h32v24h-32z" fill="#031F5A" />
        <path d="M104 298v14m-6-7h12M318 306v12m-6-6h12" />
        <path d="M448 380c54-12 108-12 162 0" strokeDasharray="12 8" />
        <path d="m548 380 12-7m-12 7 12 7" />
        <text x="186" y="332" fill="#FF7A1A" stroke="none" fontFamily="IBM Plex Mono" fontSize="10">
          WATER TRUCK / 40 TRIPS
        </text>
        <text x="640" y="388" fill="#FF7A1A" stroke="none" fontFamily="IBM Plex Mono" fontSize="10">
          LOAD 100.0 MW
        </text>
      </g>

      <g className="scene-damage" fill="none" stroke="#FF7A1A" strokeWidth="2">
        <path
          d="M20 462c78-22 132 18 208-4s126-22 194 4 139 23 208-2 108-8 130 2"
          opacity="0.85"
        />
        <path
          d="M10 486c86-12 140 8 218-10s132-8 200 8 142 10 212-8 94-4 120 4"
          opacity="0.7"
        />
        <path d="M118 448l16 18-10 14 24 16-8 20m292-70-14 20 18 12-12 18 20 14" />
        <path d="M250 456v-26l-16-12m16 12 16-14" />
        <path d="M606 258V172m-12 0h24m-18 22h12m-14 22h16" />
        <path d="M668 240V146m-12 0h24m-18 24h12m-15 24h18" />
        <path d="M594 172c-18-22 14-34 4-54m58-26c-18-22 14-34 4-54" opacity="0.65" />
        <path d="M74 282 34 242m0 40 40-40M158 300l-30-32m0 32 30-32" strokeWidth="3" />
        <path
          d="M42 334c-10-10-14-22-8-34 8 6 13 18 8 34Zm0 0c10-12 22-16 32-10-8 9-19 14-32 10Z"
          stroke="#7DB35F"
        />
        <path
          d="M724 336c-8-12-8-24 0-34 6 8 7 20 0 34Zm0 0c12-8 24-8 32 0-10 6-21 7-32 0Z"
          stroke="#7DB35F"
        />
        <path d="M450 414c26-12 52-12 78 0s52 12 78 0 52-12 78 0" opacity="0.7" />
        <path d="M464 432c24-10 48-10 72 0s48 10 72 0 48-10 72 0" opacity="0.45" />
        <text x="444" y="456" fill="#FF7A1A" stroke="none" fontFamily="IBM Plex Mono" fontSize="10">
          HEAT ISLAND / +3.5 °C
        </text>
      </g>
    </svg>
  );
}

function OpeningGate({
  onOpen,
  onStart,
  onUnrolled,
  handoff,
  figureRef,
}: {
  onOpen: () => void;
  onStart: () => void;
  onUnrolled: () => void;
  handoff: boolean;
  figureRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    setOpening(true);
    onStart();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) window.setTimeout(onOpen, 260);
    else window.setTimeout(onUnrolled, 2600);
  };
  return (
    <div
      className={`opening-gate ${opening ? "is-opening" : ""} ${handoff ? "is-handoff" : ""}`}
    >
      <button className="gate-trigger" onClick={open} disabled={opening} aria-label="Open the plan">
        <span className="pulse-cross">+</span>
        <LogoImage className="gate-logo" />
        <span className="gate-trigger-label">
          {opening ? "UNROLLING DRAWING SET…" : "OPEN THE PLAN ▸"}
        </span>
        <small>PUBLIC REVIEW COPY · REV 01</small>
      </button>
      <div className="unroll-stage" aria-hidden="true">
        <div className="unroll-sheet">
          <div className="unroll-copy">
            <div className="unroll-figure" ref={figureRef}>
              <HeroBlueprintFigure />
            </div>
            <b>PROPOSED / NOT APPROVED</b>
            <LogoImage className="gate-logo unroll-logo" decorative />
          </div>
        </div>
        <span className="unroll-roll" />
      </div>
    </div>
  );
}

type RealityItem = {
  claim: string;
  claimSource: string;
  fieldSummary: string;
  fieldNote: string;
  fieldSource: string;
};

const realityPairs: RealityItem[] = [
  {
    claim: "Pax Silica will generate over 130,000 high-quality jobs for local communities.",
    claimSource: "BCDA / PCO PROJECT BRIEF · 2026",
    fieldSummary:
      "Automated server halls add few lasting jobs—while risking Tarlac farms and Aeta homes.",
    fieldNote:
      "Hyperscale server halls are heavily automated and keep minimal permanent staff after construction—while threatening to displace hundreds of Tarlac farmers and Indigenous Aeta families from productive land.",
    fieldSource: "HARVARD GAZETTE · HRW · CEC PHILIPPINES · 2026",
  },
  {
    claim: "Advanced cooling designs will keep water consumption minimal and safe.",
    claimSource: "PAX SILICA PROMOTIONAL BRIEF · 2026",
    fieldSummary:
      "Evaporative cooling draws 1.7M–18.9M L/day—mostly lost to air—straining local watersheds.",
    fieldNote:
      "Large evaporative-cooled campuses draw 1.7M to 18.9M liters per day—mostly lost to evaporation—prompting Filipino engineers (PROPEL) and AGU Advances researchers to warn of acute watershed stress.",
    fieldSource: "BULATLAT · AGU ADVANCES · EESI · 2026",
  },
  {
    claim: "The hub will modernize Luzon's power grid without raising household bills.",
    claimSource: "LUZON CORRIDOR PITCH · 2026",
    fieldSummary:
      "Ireland's hubs take 20.7% of grid power; Virginia rates jumped 10×, raising home bills.",
    fieldNote:
      "Ireland's data centers already take 20.7% of national metered electricity (6,335 GWh), and Virginia's PJM capacity auction jumped over tenfold—shifting grid upgrade costs directly onto residential bills.",
    fieldSource: "CSO IRELAND 2023 · EHP 2026",
  },
  {
    claim: "Affected Tarlac residents will receive fair, modern resettlement housing.",
    claimSource: "NEW CLARK CITY RELOCATION PLAN · 2026",
    fieldSummary:
      "Aeta leaders rejected 30 sqm 'matchbox' units that sever access to farms, water, and life.",
    fieldNote:
      "Aeta Hungey chieftain Petronila Capiz-Muñoz rejected 30-square-meter 'matchbox' units, stressing that losing ancestral farmland strips communities of water, worship, and generational livelihood.",
    fieldSource: "PHILIPPINE DAILY INQUIRER · HRW · 2026",
  },
  {
    claim: "Data centers are clean, silent digital infrastructure safe beside homes.",
    claimSource: "INDUSTRY SITING NARRATIVE · 2026",
    fieldSummary:
      "24/7 chillers hit 85–90 dB, emit PM2.5/NOx, and MIT tied U.S. hub power to ~650 deaths.",
    fieldNote:
      "24/7 chillers and diesel generators produce continuous hum up to 85–90 dB on-site, emit PM2.5 and NOx, and MIT linked 2023 U.S. data center power demand to ~650 premature deaths downwind.",
    fieldSource: "EHP · EESI · MIT NEWS · 2026",
  },
  {
    claim: "Existing Philippine studies and bilateral agreements already protect the public.",
    claimSource: "PH–US PAX SILICA DECLARATION · APR 2026",
    fieldSummary:
      "CPU warns AI hubs outstrip old studies, yet deals move ahead without FPIC or disclosure.",
    fieldNote:
      "CPU chair Ian Aragoza warned AI-scale hubs introduce unprecedented burdens where old studies fail—yet deals advance amid secretive contracts, quitclaim probes, and missing FPIC.",
    fieldSource: "BULATLAT · INQUIRER · 2026",
  },
];

function RealityFlashcard({
  index,
  depth,
  onZoom,
}: {
  index: number;
  depth: number;
  onZoom: () => void;
}) {
  const folio = String(index + 1).padStart(2, "0");
  const tilt = [-1.1, 0.8, -0.7, 1.1, -0.4, 0.6][index % 6];
  const pair = realityPairs[index];
  return (
    <article
      className={`flashcard-card ${depth === 0 ? "active" : ""}`}
      aria-hidden={depth !== 0}
      style={
        {
          "--depth": depth,
          "--card-tilt": `${tilt}deg`,
        } as React.CSSProperties
      }
    >
      <header className="flashcard-header">
        <small>PAX SILICA · PROJECT BRIEF</small>
        <span>P.{folio}</span>
      </header>
      <section className="flashcard-side flashcard-claim">
        <p>WHAT THEY SAY</p>
        <h3>“{pair.claim}”</h3>
      </section>
      <div className="flashcard-gutter" aria-hidden="true">
        <span>REVERSE / FIELD CONDITION</span>
      </div>
      <section className="flashcard-side flashcard-field" style={{ overflow: "hidden" }}>
        <span className="field-tag">FIELD CONDITION / P.{folio}</span>
        <p>WHAT'S ON THE GROUND</p>
        <h3>{pair.fieldSummary}</h3>
        <small>{pair.fieldSource}</small>
      </section>
      <button
        type="button"
        className="flashcard-zoom-hit"
        onClick={onZoom}
        aria-label={`Zoom claim and field condition card ${folio}`}
      >
        <span className="flashcard-zoom-cue">CLICK TO ZOOM ↗</span>
      </button>
    </article>
  );
}

type CaseStudy = {
  name: string;
  x: number;
  y: number;
  stat: string;
  note: string;
  source: string;
  url: string;
  labelOffset?: [number, number];
};

const cases: CaseStudy[] = [
  {
    name: "Ireland",
    x: 47,
    y: 27,
    stat: "20.7% (6,335 GWh)",
    note: "In 2023, data centers consumed 6,335 GWh—20.7% of Ireland's metered electricity—straining grid capacity and forcing strict connection limits around Dublin.",
    source: "CSO Ireland · 2023",
    url: "https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2023/keyfindings/",
    labelOffset: [16, -28],
  },
  {
    name: "Virginia, US",
    x: 24,
    y: 35,
    stat: "4.4% US · 20.3 GW",
    note: "U.S. data centers used 176,000 GWh (4.4% of national power) in 2023. Northern Virginia alone holds ~20.3 GW, driving 10× regional capacity price spikes and local health concerns.",
    source: "LBNL 2024 · Frontiers in Climate 2026",
    url: "https://escholarship.org/uc/item/32d6m0d1",
  },
  {
    name: "Arizona, US",
    x: 17,
    y: 45,
    stat: "1.46B L/YR DIRECT",
    note: "Phoenix-area data centers draw ~385M gallons (~1.46B L) yearly for direct cooling plus ~2.9B gallons indirectly through power plants, even after Maricopa County curbed home permits over groundwater scarcity.",
    source: "Ceres · Environmental Health Project · 2026",
    url: "https://www.environmentalhealthproject.org/post/the-dangers-of-data-centers",
  },
  {
    name: "Netherlands",
    x: 51,
    y: 29,
    stat: "4.19% → 4.6% · 9 MO",
    note: "Data centers used ~4,133 GWh (4.19%) in 2023 and 5,100 GWh (4.6%) in 2024. The Dutch government imposed a 9-month national moratorium on hyperscale hubs (>10 ha, ≥70 MW) to enforce zoning rules.",
    source: "Statistics Netherlands (CBS) · 2025",
    url: "https://www.cbs.nl/en-gb/news/2025/51/data-centres-consume-4-6-percent-of-the-netherlands-electricity",
    labelOffset: [20, 26],
  },
  {
    name: "France",
    x: 49,
    y: 34,
    stat: "1–1.5% (4–6 TWh)",
    note: "Roughly 460 facilities consuming over 1 GWh annually drew 4,000–6,000 GWh (1–1.5% of national electricity) in 2023, prompting tighter national audits on energy and land footprints.",
    source: "French Ministry of Ecological Transition · 2023",
    url: "https://www.statistiques.developpement-durable.gouv.fr/la-consommation-delectricite-des-centres-de-donnees-entre-2018-et-2023?list-chiffres=true",
    labelOffset: [-26, 30],
  },
  {
    name: "Chile",
    x: 31,
    y: 73,
    stat: "7.6M L/DAY HALTED",
    note: "A Chilean environmental court halted Google's Cerrillos data center in Santiago after local residents challenged its proposed 7.6 million liters/day groundwater draw during a severe drought.",
    source: "Chilean Environmental Court · BHRRC · 2024",
    url: "https://www.business-humanrights.org/en/latest-news/chile-google-to-halt-data-centre-project-in-santiago-to-address-environmental-concerns/",
  },
  {
    name: "Singapore",
    x: 79,
    y: 58,
    stat: ">10% · 3 YR FREEZE",
    note: "Facilities consumed ~6,500 GWh—just over 10% of national electricity in 2024—after a 3-year moratorium (2019–2022) imposed over acute land and power constraints.",
    source: "Singapore MDDI · 2024",
    url: "https://www.mddi.gov.sg/newsroom/closing-speech-by-sms-tan-kiat-how-for-the-second-reading-of-the-digital-infrastructure-bill/",
  },
];

type ResearchItem = {
  category: "News" | "Academic" | "Policy";
  kind:
    | "news"
    | "paper"
    | "memo"
    | "xerox"
    | "map"
    | "folder"
    | "sticky"
    | "email"
    | "notebook"
    | "bill"
    | "photo";
  title: string;
  source: string;
  date: string;
  note: string;
  body: string;
  sourceNote: string;
  url: string;
  x: number;
  y: number;
  w: number;
  r: number;
  z: number;
};

const researchPaperLayouts = [
  { x: 2.5, y: 75, partX: -70, partY: -135 },
  { x: 17.8, y: 55, partX: -34, partY: -150 },
  { x: 33.1, y: 45, partX: -12, partY: -155 },
  { x: 47.9, y: 55, partX: 8, partY: -155 },
  { x: 62.7, y: 75, partX: 26, partY: -150 },
  { x: 76.3, y: 55, partX: 70, partY: -135 },
  { x: 7.6, y: 330, partX: -150, partY: -32 },
  { x: 15.3, y: 455, partX: -230, partY: -8 },
  { x: 7.6, y: 580, partX: -150, partY: 24 },
  { x: 72.5, y: 330, partX: 160, partY: -32 },
  { x: 68.6, y: 455, partX: 188, partY: -8 },
  { x: 72.5, y: 580, partX: 163, partY: 24 },
  { x: 17.8, y: 575, partX: -40, partY: 140 },
  { x: 33.1, y: 555, partX: -10, partY: 155 },
  { x: 47.9, y: 575, partX: 10, partY: 155 },
  { x: 62.7, y: 555, partX: 40, partY: 140 },
];

const research: ResearchItem[] = [
  {
    category: "News",
    kind: "news",
    title: "Experts Challenge Gov't Claims on Pax Silica",
    source: "Bulatlat",
    date: "Aug 2026",
    note: "CPU chair Ian Aragoza and PROPEL engineers warn Pax Silica exports water, power, and land burdens to Filipinos while bypassing independent review.",
    body: "Filipino technologists and engineers challenged government assurances surrounding the proposed 1,619-hectare Pax Silica hub in New Clark City, Tarlac. Computer Professionals' Union chairperson Ian Aragoza warned that AI-native hyperscale facilities differ sharply from legacy enterprise centers, rendering older impact studies obsolete. PROPEL engineers further questioned cooling-water claims and warned that soaring electricity demand could accelerate land conversion and force untested energy proposals without public debate.",
    sourceNote:
      "Shan Kenshin Ecaldre, Bulatlat (August 7, 2026). Interviews with CPU and PROPEL.",
    url: "https://www.bulatlat.com/2026/08/07/experts-challenge-govt-claims-on-pax-silica/",
    x: 0,
    y: 1,
    w: 22,
    r: -7,
    z: 5,
  },
  {
    category: "Academic",
    kind: "paper",
    title: "Health Implications of Rapid Data Center Rise in Virginia",
    source: "Frontiers in Climate",
    date: "2026",
    note: "Gour, Ortiz, & Maibach assess air pollution, water stress, 24/7 noise hazards to children, and rural land loss across Virginia's data center boom.",
    body: "This peer-reviewed exploratory assessment examines how rapid data center expansion in Virginia creates compounding public health harms: fossil-fuel and diesel backup emissions linked to cardiovascular and respiratory illness, intensive freshwater cooling demands, chronic low-frequency noise affecting sleep and childhood development, and large-scale conversion of farmland and green space. The authors urge strict industrial zoning, water caps, and mandatory public hearings.",
    sourceNote:
      "Gour, N., Ortiz, L., & Maibach, E. (2026). Frontiers in Climate, 8, 1648912.",
    url: "https://doi.org/10.3389/fclim.2026.1648912",
    x: 26,
    y: 0,
    w: 22,
    r: 5,
    z: 4,
  },
  {
    category: "Policy",
    kind: "memo",
    title: "Pax Silica Declaration (PH–US Signed Text)",
    source: "Board of Investments (BOI)",
    date: "Apr 2026",
    note: "Official April 16, 2026 bilateral declaration linking the Philippines to the U.S.-led AI, semiconductor, and critical minerals corridor.",
    body: "Signed on April 16, 2026, the Pax Silica Declaration formalizes Philippine participation in the U.S.-led economic security coalition launched in December 2025. The framework prioritizes allied supply chains for AI infrastructure, semiconductors, and critical minerals, centering on a proposed 1,619-hectare (4,000-acre) AI-native industrial acceleration hub in New Clark City, Tarlac, within the Luzon Economic Corridor—raising major questions over sovereignty, land rights, and public oversight.",
    sourceNote:
      "Philippines–United States Pax Silica Declaration, signed April 16, 2026. Published by BOI Philippines.",
    url: "https://boi.gov.ph/wp-content/uploads/2026/05/Pax-Silica-Declaration-PH-US-signed-04-16-26_.pdf",
    x: 52,
    y: 1,
    w: 22,
    r: -4,
    z: 7,
  },
  {
    category: "News",
    kind: "xerox",
    title: "Aeta Farmers Face Displacement Over Pax Silica Hub",
    source: "Inquirer / HRW",
    date: "Nov 2026",
    note: "Aeta chieftain Petronila Capiz-Muñoz and Tarlac farmers reject 30 sqm relocation units threatening ancestral lands, water, and livelihoods.",
    body: "Reporting on Human Rights Watch findings in Capas, Tarlac, this investigation highlights resistance from Indigenous Aeta Hungey communities and local farmers whose ancestral farmlands overlap the proposed Pax Silica zone. Chieftain Petronila Capiz-Muñoz objected to cramped 30-square-meter relocation units, emphasizing that their community depends on ancestral lands for farming, clean water, worship, and survival—not cash buyouts or urban tenements.",
    sourceNote:
      "Philippine Daily Inquirer / Human Rights Watch (2026). Field interviews in Capas, Tarlac.",
    url: "https://newsinfo.inquirer.net/2343678/aeta-farmers-face-displacement-over-pax-silica-hub-hrw",
    x: 78,
    y: 2,
    w: 21,
    r: 9,
    z: 3,
  },
  {
    category: "Academic",
    kind: "paper",
    title: "Data Centers Water Footprint: Need for Transparency",
    source: "AGU Advances",
    date: "2026",
    note: "Privette, Barros, & Cai warn that AI expansion intensifies watershed stress and call for mandatory public water metering and disclosure.",
    body: "Publishing in AGU Advances, University of Illinois hydrologists analyze the multi-faceted direct and indirect water footprint of AI data centers. Because operators rarely disclose facility-level cooling volumes or embedded power-plant water consumption, local planners cannot assess drought resilience. The authors call for comprehensive monitoring, transparent public reporting, and resilient watershed governance before new campuses are approved.",
    sourceNote:
      "Privette, A. P., Barros, A., & Cai, X. (2026). AGU Advances, 7(2), e2025AV002140.",
    url: "https://doi.org/10.1029/2025av002140",
    x: 1,
    y: 28,
    w: 22,
    r: 6,
    z: 6,
  },
  {
    category: "Policy",
    kind: "map",
    title: "SITE REF / 50 m BUFFER CONFLICT",
    source: "7NEWS Australia",
    date: "2026",
    note: "Melbourne resident Sebastian Leith challenges a hyperscale facility built 50 meters from his front door over constant noise, scale, and pollution.",
    body: "In West Footscray, Melbourne, resident Sebastian Leith voiced shock at the towering industrial scale, persistent hum, and exhaust pollution of a data center constructed just 50 meters from his front door—likening unchecked hyperscale siting to a modern gold rush. Affected neighbors are demanding compensation and stricter setback rules, demonstrating why residential zones must remain legally buffered from heavy compute plants.",
    sourceNote:
      "7NEWS Australia (2026). Living in the shadow of a data centre: Residents demand compensation.",
    url: "https://7news.com.au/technology/living-in-the-shadow-of-a-data-centre-residents-demand-compensation-c-23153055",
    x: 27,
    y: 26,
    w: 22,
    r: -5,
    z: 8,
  },
  {
    category: "News",
    kind: "photo",
    title: "Why More Residents Are Saying 'No' to AI Data Centers",
    source: "NPR",
    date: "Jul 2025",
    note: "Chesapeake, Virginia homeowners confront developers at town halls: 'How am I going to relax with something buzzing at me 24/7?'",
    body: "NPR documents grassroots pushback across Virginia's sprawling data center corridor, where residents pack local town halls to oppose rezoning near homes and schools. One Chesapeake homeowner captured nationwide frustration when confronting developers over round-the-clock mechanical buzzing, asking why operators never site these massive server farms in their own neighborhoods.",
    sourceNote: "NPR (July 17, 2025). Why More Residents Are Saying 'No' to AI Data Centers.",
    url: "https://www.npr.org/2025/07/17/nx-s1-5469933/virginia-data-centers-residents-saying-no",
    x: 53,
    y: 27,
    w: 22,
    r: 7,
    z: 4,
  },
  {
    category: "Academic",
    kind: "paper",
    title: "Study Reveals Long-Distance Damage to Air Quality",
    source: "MIT News",
    date: "Nov 2026",
    note: "MIT researchers estimate U.S. data center electricity demand in 2023 caused ~650 premature deaths across downwind states.",
    body: "Modeling hour-by-hour generation across more than 10,000 power plants alongside atmospheric chemical transport, MIT researchers found that additional nitrogen oxide and sulfur dioxide pollution from 2023 U.S. data center electricity demand led to roughly 650 premature deaths nationwide—about 5.3% of all electricity-related mortality. Crucially, the worst health burdens often fell on downwind communities far outside the server hubs themselves.",
    sourceNote:
      "Zewe, A., MIT News (November 19, 2026), covering Selin & Chen in Environmental Research Letters.",
    url: "https://news.mit.edu/2026/study-reveals-data-centers-long-distance-damage-air-quality-1119",
    x: 79,
    y: 28,
    w: 20,
    r: -7,
    z: 15,
  },
  {
    category: "Policy",
    kind: "folder",
    title: "City of Lancaster Data Center Zoning Ordinance",
    source: "City of Lancaster, PA",
    date: "Oct 2025",
    note: "First-draft municipal ordinance amending Chapter 300 zoning code to classify computer data centers as uses requiring special regulation.",
    body: "Responding to rapid developer interest, the City of Lancaster drafted Administrative Ordinance No. 2025 amending Chapter 300 of its municipal zoning code to explicitly define computer data centers as a distinct, high-impact industrial use. Rather than letting server campuses slip through commercial or office loopholes, the draft mandates special regulatory review, strict acoustic controls, and spatial buffers from residential neighborhoods.",
    sourceNote:
      "City of Lancaster, PA (October 6, 2025). Data Center Zoning Ordinance — First Draft.",
    url: "https://www.cityoflancasterpa.gov/wp-content/uploads/2025/10/Data-Center-Zoning-Ordinance_First-Draft_10-6-25.pdf",
    x: 0,
    y: 54,
    w: 22,
    r: -9,
    z: 11,
  },
  {
    category: "Policy",
    kind: "sticky",
    title: "Communities Raising Noise Pollution Concerns",
    source: "EESI",
    date: "Mar 2026",
    note: "Outdated local noise ordinances fail to curb 24/7 chiller and generator hum, prompting calls to restrict data centers to industrial zones.",
    body: "The Environmental and Energy Study Institute documents how constant low-frequency tonal noise from rooftop chillers, cooling towers, and diesel generators disrupts nearby households and lowers property values. Because most municipal ordinances were written for short-term street noise rather than 24/7 industrial hum, EESI highlights better site planning—keeping facilities far from residential 'quiet zones' and reclassifying them as heavy industrial uses.",
    sourceNote:
      "Yañez-Barnuevo, M., Environmental and Energy Study Institute (March 23, 2026).",
    url: "https://www.eesi.org/articles/view/communities-are-raising-noise-pollution-concernsabout-data-centers",
    x: 26,
    y: 52,
    w: 22,
    r: 6,
    z: 9,
  },
  {
    category: "Policy",
    kind: "email",
    title: "Secret NDAs & Redacted Data Center Deals",
    source: "Harvard Gazette",
    date: "Apr 2026",
    note: "Policy scholar Ben Green warns secretive contracts, heavy redactions, tax giveaways, and scant local jobs fuel legitimate community pushback.",
    body: "In an interview with the Harvard Gazette, tech policy expert Ben Green explains why public skepticism toward hyperscale data centers is well founded. Developers routinely require officials to sign nondisclosure agreements, redact utility terms, and promise windfalls while delivering server warehouses with minimal local employment—leaving host communities to shoulder surging electricity bills and heavy water consumption.",
    sourceNote:
      "Mineo, L., Harvard Gazette (April 9, 2026). Interview with policy scholar Ben Green.",
    url: "https://news.harvard.edu/gazette/story/2026/04/why-are-communities-pushing-back-against-data-centers/",
    x: 52,
    y: 53,
    w: 22,
    r: -5,
    z: 4,
  },
  {
    category: "Academic",
    kind: "notebook",
    title: "Global Data Center Expansion & Human Health",
    source: "Eco-Environment & Health",
    date: "2025",
    note: "Tao & Gao call for urgent empirical health monitoring of particulate emissions, heat islands, and chemical runoff from server farms.",
    body: "This peer-reviewed commentary underscores a critical research gap: while global AI compute infrastructure is expanding at unprecedented speed, empirical epidemiological monitoring of nearby residents lags far behind. Tao and Gao outline key exposure pathways—from backup diesel exhaust and cooling-tower chemicals to urban heat islands and e-waste—and urge baseline health impact assessments prior to siting.",
    sourceNote:
      "Tao, Y., & Gao, P. (2025). Eco-Environment & Health, 4(3), 100157.",
    url: "https://doi.org/10.1016/j.eehl.2025.100157",
    x: 78,
    y: 54,
    w: 19,
    r: 8,
    z: 15,
  },
  {
    category: "News",
    kind: "bill",
    title: "20.7% GRID / BILL SHOCK",
    source: "CSO Ireland · LBNL",
    date: "2024",
    note: "Ireland's data centers hit 6,335 GWh (20.7% of metered power) and U.S. demand hit 176 TWh (4.4%), driving sharp utility rate pressure on households.",
    body: "Official national grid statistics prove that hyperscale demand rapidly reshapes national electricity systems. Ireland's Central Statistics Office recorded 6,335 GWh of data center electricity consumption in 2023 (20.7% of total metered electricity), while Lawrence Berkeley National Laboratory estimated 176 TWh (4.4%) in the U.S. and Singapore's MDDI reported ~6.5 TWh (>10%) in 2024—demonstrating why grid capacity and residential tariff protection must come first.",
    sourceNote:
      "CSO Ireland (2023); LBNL (2024); CBS Netherlands (2025); Singapore MDDI (2024).",
    url: "https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2023/keyfindings/",
    x: 1,
    y: 80,
    w: 22,
    r: 10,
    z: 10,
  },
  {
    category: "News",
    kind: "news",
    title: "The Dangers of Data Centers: Noise, Air & Bills",
    source: "Environmental Health Project",
    date: "Feb 2026",
    note: "Pavlinich catalogs >85–90 dB on-site noise, all-night circadian light pollution, NOx/PM2.5 emissions, and rising residential energy rates.",
    body: "Environmental Health Project researcher Emma Pavlinich details five core hazards imposed on communities near hyperscale sites: harmful noise levels exceeding 85–90 dB on-site, all-night security lighting disrupting human sleep and wildlife migration, fine particulate and NOx emissions from power plants and diesel backups, daily cooling draws up to 5 million gallons, and higher household electricity rates.",
    sourceNote:
      "Justice Pavlinich, E. P., Environmental Health Project (February 27, 2026).",
    url: "https://www.environmentalhealthproject.org/post/the-dangers-of-data-centers",
    x: 27,
    y: 78,
    w: 22,
    r: -8,
    z: 14,
  },
  {
    category: "Academic",
    kind: "memo",
    title: "5 Ways Data Centers Endanger Local Communities",
    source: "Gour, Maibach, & Ortiz",
    date: "2026",
    note: "Policy synthesis breaking down five systemic threats: air pollution, water depletion, 24/7 noise, land conversion, and rising energy costs.",
    body: "Distilling empirical health and climate data for local policymakers, Gour, Maibach, and Ortiz trace five interlocking ways unrestrained data center expansion harms both host towns and broader nations. They emphasize that marginalized and rural communities shoulder disproportionate cumulative burdens—from higher utility bills to lost green space—unless enforceable zoning, emissions, and transparency rules are enacted beforehand.",
    sourceNote: "Gour, N., Maibach, E., & Ortiz, L. (2026). DOI: 10.64628/aai.hke7hq75u.",
    url: "https://doi.org/10.64628/aai.hke7hq75u",
    x: 53,
    y: 79,
    w: 22,
    r: 6,
    z: 13,
  },
  {
    category: "News",
    kind: "photo",
    title: "Taps Run Dry After 40 Years of Reliable Well Water",
    source: "Yahoo News",
    date: "2026",
    note: "Pennsylvania retiree Steve Hacker went 39 days without running water after his 1983 well ran dry, questioning who compensates drained towns.",
    body: "East Vincent Township retiree Steve Hacker lost running water for 39 days after his private well—reliable since 1983—ran dry amid growing groundwater anxiety over proposed high-volume cooling draws. 'They want to pull millions of gallons out,' Hacker asked local officials. 'Who is responsible if all the wells in my town dry out? Who is going to compensate us?'",
    sourceNote:
      "Yahoo News (2026). Residents in US community outraged over massive data center water demands.",
    url: "https://www.yahoo.com/news/articles/residents-us-community-outraged-learning-163000638.html",
    x: 79,
    y: 80,
    w: 22,
    r: -5,
    z: 2,
  },
];

type MythItem = {
  claim: string;
  fact: string;
  source: string;
  debunkNote: string;
  verifiedDate: string;
};

const myths: MythItem[] = [
  {
    claim: "Data centers bring massive permanent employment to host towns.",
    fact: "Most jobs are short-term construction roles; finished server warehouses are heavily automated and employ very few permanent local staff while risking farm livelihoods.",
    source: "Harvard Gazette · CEC Philippines · 2026",
    debunkNote:
      "While BCDA projects over 130,000 jobs across the wider corridor, Harvard policy research shows server halls produce scant local employment—and Tarlac farmers face permanent loss of arable land.",
    verifiedDate: "VERIFIED · NOV 2026",
  },
  {
    claim: "Modern cooling systems barely affect neighborhood water supplies.",
    fact: "Evaporative cooling at large AI campuses consumes 1.7M to 18.9M liters daily—up to 80% lost to evaporation—sparking aquifer conflicts from Arizona to Chile.",
    source: "LBNL 2024 · AGU Advances 2026",
    debunkNote:
      "Filipino engineers (PROPEL) and AGU Advances hydrologists warn that tropical heat elevates direct cooling demand and indirect power-plant water use, yet facility metering stays undisclosed.",
    verifiedDate: "VERIFIED · NOV 2026",
  },
  {
    claim: "The cloud is clean, silent infrastructure safe beside residential homes.",
    fact: "24/7 chillers and diesel backups create continuous hum up to 85–90 dB on-site, emit PM2.5 and NOx, and disrupt sleep with all-night security lighting.",
    source: "EHP · EESI · MIT News · 2026",
    debunkNote:
      "MIT researchers linked 2023 U.S. data center power demand to ~650 premature deaths downwind, while Frontiers in Climate flags developmental and cardiovascular risks for nearby households.",
    verifiedDate: "VERIFIED · NOV 2026",
  },
  {
    claim: "Hyperscale hubs lower local electricity bills by upgrading the grid.",
    fact: "Round-the-clock industrial baseload forces costly substations and generation buildouts whose capacity charges flow straight onto ordinary household bills.",
    source: "CSO Ireland 2023 · EHP 2026",
    debunkNote:
      "In Northern Virginia's PJM grid, capacity prices jumped over tenfold by 2026/27; in Ireland, data centers hit 20.7% of metered power, forcing grid connection limits.",
    verifiedDate: "VERIFIED · NOV 2026",
  },
  {
    claim: "Relocation packages fairly compensate displaced Tarlac and Aeta families.",
    fact: "Aeta Hungey leaders rejected 30-square-meter 'matchbox' units that sever Indigenous communities from ancestral farms, clean water, worship sites, and livelihoods.",
    source: "Inquirer · Human Rights Watch · 2026",
    debunkNote:
      "Human Rights Watch documented widespread resistance from Capas farmers and Aeta chieftain Petronila Capiz-Muñoz, and Malacañang ordered an investigation into disputed quitclaims in November 2026.",
    verifiedDate: "VERIFIED · NOV 2026",
  },
  {
    claim: "Older Philippine data center studies prove Pax Silica is already safe.",
    fact: "AI-native hyperscale hubs draw far more power, cooling water, and land than legacy enterprise centers, making past environmental studies insufficient.",
    source: "Bulatlat · Computer Professionals' Union · 2026",
    debunkNote:
      "Both Singapore (3-year freeze) and the Netherlands (9-month national moratorium) paused hyperscale approvals to rewrite planning laws; the Philippines still lacks an independent food and watershed EIA.",
    verifiedDate: "VERIFIED · NOV 2026",
  },
];

type RecipientProfile = {
  office: string;
  address: string;
  ref: string;
  subject: string;
  body: string;
};

const recipientProfiles: Record<string, RecipientProfile> = {
  Mayor: {
    office: "OFFICE OF THE CITY / MUNICIPAL MAYOR",
    address: "LOCAL GOVERNMENT UNIT · TARLAC / LUZON CORRIDOR",
    ref: "REF. NO. ADC-LGU-2026-01 · 2026",
    subject: "Urgent Request: Public Consultation & Zoning Safeguards on Pax Silica",
    body: `Dear Honorable Mayor,

I am writing as a concerned resident to request an immediate pause on any local land-use endorsements, zoning variances, or permits tied to the proposed 1,619-hectare Pax Silica AI industrial hub and adjacent hyperscale data center sites.

Global evidence—from Ireland (20.7% national grid share) to Chile (halted over 7.6M L/day water draw)—and warnings from Filipino scientists show that hyperscale campuses place severe strain on local aquifers, power tariffs, and residential quiet zones. We urge your office to uphold RA 7160, reject residential or agricultural land conversion, and hold transparent public hearings with affected barangays and Aeta communities.

Respectfully,
A Concerned Citizen · #NoToPaxSilica`,
  },
  Councilor: {
    office: "OFFICE OF THE SANGGUNIANG PANLUNGSOD / BAYAN",
    address: "COMMITTEE ON ENVIRONMENT & LAND USE · PHILIPPINES",
    ref: "REF. NO. ADC-SP-2026-02 · 2026",
    subject: "Call for Local Data Center Zoning Ordinance & Public Oversight",
    body: `Dear Honorable Councilor,

I urge the Sanggunian to exercise its oversight authority over the proposed Pax Silica industrial hub and any hyperscale data center applications affecting residential, agricultural, or ancestral lands.

Following municipal models such as Lancaster's Data Center Zoning Ordinance and national moratoria in Singapore and the Netherlands, we ask the Council to pass strict industrial-only siting rules, enforce residential setback and acoustic buffers, and mandate public disclosure of all contracts, water allocations, and quitclaim records before any CLUP amendment is considered.

Respectfully,
A Concerned Constituent · #NoToPaxSilica`,
  },
  DENR: {
    office: "DEPARTMENT OF ENVIRONMENT AND NATURAL RESOURCES (DENR-EMB)",
    address: "VISAYAS AVENUE, DILIMAN, QUEZON CITY · PHILIPPINES",
    ref: "REF. NO. ADC-DENR-2026-03 · 2026",
    subject: "Demand for Independent EIA, Watershed Audit & FPIC Compliance on Pax Silica",
    body: `Dear DENR Environmental Management Bureau Director,

We respectfully request full public disclosure of all Environmental Impact Assessments (EIA), groundwater extraction studies, and Environmental Compliance Certificate (ECC) applications linked to the proposed 1,619-hectare Pax Silica hub in New Clark City, Tarlac.

Peer-reviewed findings in AGU Advances, Frontiers in Climate, and MIT News document severe evaporative cooling water loss, diesel particulate emissions, and long-distance air quality damage from AI-scale facilities. Under PD 1586 and RA 8371 (IPRA), no ECC or land clearance should be granted without independent watershed modeling, cumulative air-noise studies, and verifiable Free, Prior, and Informed Consent from Aeta ancestral domain holders.

Respectfully,
A Concerned Citizen · #NoToPaxSilica`,
  },
  DOE: {
    office: "DEPARTMENT OF ENERGY (DOE)",
    address: "ENERGY CENTER, RIZAL DRIVE, BGC, TAGUIG CITY · PHILIPPINES",
    ref: "REF. NO. ADC-DOE-2026-04 · 2026",
    subject: "Request for Grid Capacity & Ratepayer Protection Study on Pax Silica",
    body: `Dear Secretary of Energy,

I am writing to request a transparent, publicly accessible Luzon grid-impact and consumer-tariff study before any power allocation or interconnection priority is granted to the proposed Pax Silica AI industrial acceleration hub.

National statistics from Ireland (20.7% of metered electricity), Singapore (>10%), and Northern Virginia's tenfold PJM capacity price surge demonstrate that unbuffered hyperscale loads strain reserve margins and pass transmission and generation costs onto ordinary households. Filipino families deserve binding guarantees that industrial AI loads will not trigger brownouts, fossil-fuel lock-in, or higher residential electricity bills.

Respectfully,
A Concerned Ratepayer · #NoToPaxSilica`,
  },
};

function useFlipSpring(target: number) {
  const elementRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef({ angle: 0, velocity: 0, target: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const motion = motionRef.current;
    const element = elementRef.current;
    if (!element) return;

    motion.target = target;
    const write = () => {
      element.style.setProperty("--flip-angle", `${motion.angle.toFixed(2)}deg`);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      motion.angle = target;
      motion.velocity = 0;
      write();
      return;
    }

    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const displacement = motion.angle - motion.target;
      const acceleration = -220 * displacement - 24 * motion.velocity;
      motion.velocity += acceleration * dt;
      motion.angle += motion.velocity * dt;

      if (Math.abs(motion.target - motion.angle) < 0.08 && Math.abs(motion.velocity) < 0.08) {
        motion.angle = motion.target;
        motion.velocity = 0;
        write();
        frameRef.current = null;
        return;
      }

      write();
      frameRef.current = requestAnimationFrame(step);
    };

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [target]);

  return elementRef;
}

function MythFlipCard({
  item,
  index,
  flipped,
  onFlip,
  onExpand,
}: {
  item: MythItem;
  index: number;
  flipped: boolean;
  onFlip: () => void;
  onExpand: () => void;
}) {
  const innerRef = useFlipSpring(flipped ? 180 : 0);
  const stopAndExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onExpand();
  };

  return (
    <article className={`myth-card ${flipped ? "is-flipped" : ""}`}>
      <div
        ref={innerRef}
        className="myth-card-inner"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`Flip myth card ${index + 1} ${flipped ? "back to the claim" : "to reveal the field note"}`}
        onClick={onFlip}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onFlip();
          }
        }}
      >
        <div className="myth-face myth-face-front" aria-hidden={flipped}>
          <span className="myth-stamp">MYTH</span>
          <b className="myth-prompt">{item.claim}</b>
          <small className="myth-cta">CLICK CARD TO FLIP</small>
          <button
            type="button"
            className="myth-expand myth-expand-front"
            aria-haspopup="dialog"
            tabIndex={flipped ? -1 : 0}
            onClick={stopAndExpand}
            onKeyDown={(event) => event.stopPropagation()}
          >
            EXPAND ↗
          </button>
        </div>
        <div className="myth-face myth-face-back" aria-hidden={!flipped}>
          <span className="myth-stamp fact-stamp">FACT</span>
          <b className="myth-prompt">{item.fact}</b>
          <small className="myth-cta">{item.source}</small>
          <button
            type="button"
            className="myth-expand myth-expand-back"
            aria-haspopup="dialog"
            tabIndex={flipped ? 0 : -1}
            onClick={stopAndExpand}
            onKeyDown={(event) => event.stopPropagation()}
          >
            EXPAND / READ FULL FACT ↗
          </button>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [gateOpening, setGateOpening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hotspot, setHotspot] = useState(0);
  const [reality, setReality] = useState(0);
  const [kitStatus, setKitStatus] = useState<number | null>(null);
  const [scenario, setScenario] = useState(0);
  const [selectedCase, setSelectedCase] = useState(cases[0]);
  const [centers, setCenters] = useState(3);
  const [population, setPopulation] = useState(50);
  const [filter, setFilter] = useState("All");
  const [article, setArticle] = useState<ResearchItem | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [paperPositions, setPaperPositions] = useState<Record<number, { x: number; y: number }>>(
    {},
  );
  const [letterOpen, setLetterOpen] = useState(false);
  const [policy, setPolicy] = useState(0);
  const [activeMyth, setActiveMyth] = useState<number | null>(null);
  const [flippedMyth, setFlippedMyth] = useState<number | null>(null);
  const [zoomedReality, setZoomedReality] = useState<number | null>(null);
  const [stories, setStories] = useState(127);
  const [storyStatus, setStoryStatus] = useState("");
  const [signatures, setSignatures] = useState(18427);
  const [petitionStatus, setPetitionStatus] = useState("");
  const [recipient, setRecipient] = useState("Mayor");
  const [copied, setCopied] = useState(false);
  const [flight, setFlight] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    dx: number;
    dy: number;
    scale: number;
  } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const protestAudioRef = useRef<HTMLAudioElement>(null);
  const unrollFigureRef = useRef<HTMLDivElement>(null);
  const heroFigureSlotRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);
  const flightDoneRef = useRef(false);
  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    moved: boolean;
  } | null>(null);
  const mythCloseRef = useRef<HTMLButtonElement>(null);
  const realityCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      if (heroRef.current) {
        const rx = (e.clientX / window.innerWidth - 0.5) * 12;
        const ry = (e.clientY / window.innerHeight - 0.5) * 8;
        heroRef.current.style.setProperty("--px", `${rx}px`);
        heroRef.current.style.setProperty("--py", `${ry}px`);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const audio = protestAudioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    if (soundOn) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [soundOn]);

  useEffect(() => {
    if (activeMyth === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMyth(null);
    };
    window.addEventListener("keydown", onKeyDown);
    mythCloseRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMyth]);

  useEffect(() => {
    if (zoomedReality === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomedReality(null);
    };
    window.addEventListener("keydown", onKeyDown);
    realityCloseRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomedReality]);

  const beginFigureHandoff = () => {
    flightDoneRef.current = false;
    const fromEl = unrollFigureRef.current;
    const toEl = heroFigureSlotRef.current;
    if (!fromEl || !toEl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    const from = fromEl.getBoundingClientRect();
    const to = toEl.getBoundingClientRect();
    if (!from.width || !from.height || !to.width || !to.height) {
      setEntered(true);
      return;
    }
    const scale = Math.min(to.width / from.width, to.height / from.height);
    setFlight({
      left: from.left,
      top: from.top,
      width: from.width,
      height: from.height,
      dx: to.left + (to.width - from.width * scale) / 2 - from.left,
      dy: to.top + (to.height - from.height * scale) / 2 - from.top,
      scale,
    });
  };

  const finishFigureHandoff = useCallback(() => {
    if (flightDoneRef.current) return;
    flightDoneRef.current = true;
    setFlight(null);
    setEntered(true);
  }, []);

  useEffect(() => {
    if (!flight || !flightRef.current) return;
    const el = flightRef.current;
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        el.style.transform = `translate3d(${flight.dx}px, ${flight.dy}px, 0) scale(${flight.scale})`;
      });
    });
    const fallback = window.setTimeout(finishFigureHandoff, 900);
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
      window.clearTimeout(fallback);
    };
  }, [flight, finishFigureHandoff]);

  const scenarioNotes = [
    "Heavy excavation, piling, and earthmoving push daytime site noise past 80 dB while fencing off ancestral Tarlac farmlands and snarling barangay access roads.",
    "Round-the-clock chiller hum, substation load spikes, and daily evaporative cooling draw down local water tables while grid upgrade costs creep onto household bills.",
    "Sustained groundwater depletion, impervious concrete heat islands, diesel backup exhaust, and irreversible land conversion lock nearby neighborhoods into chronic ecological stress.",
  ];
  const meters = [
    { name: "NOISE", value: [82, 67, 58][scenario], unit: "dB" },
    { name: "WATER LEVEL", value: [92, 69, 41][scenario], unit: "%" },
    { name: "LOCAL TEMP", value: [31, 33, 36][scenario], unit: "°C" },
    { name: "MONTHLY BILL", value: [4200, 5300, 7100][scenario], unit: "₱" },
  ];
  const waterHomes = useMemo(() => centers * 2800, [centers]);
  const powerHomes = useMemo(() => centers * 18500, [centers]);
  const communityHouseholds = useMemo(() => Math.round((population * 1000) / 4.2), [population]);
  const waterSharePct = useMemo(
    () => Math.round((waterHomes / communityHouseholds) * 100),
    [waterHomes, communityHouseholds],
  );
  const powerSharePct = useMemo(
    () => Math.round((powerHomes / communityHouseholds) * 100),
    [powerHomes, communityHouseholds],
  );
  const affectedFamilies = useMemo(
    () => Math.round(centers * 85 * (0.6 + population / 125)),
    [centers, population],
  );
  const liveImpactMeters = useMemo(
    () => [
      {
        name: "WATER",
        value: waterSharePct,
        max: 150,
        displayValue: `${(centers * 1.7).toFixed(1)}M L/DAY`,
        source: "LBNL · EESI",
        comparison: `≈ ${waterHomes.toLocaleString()} homes (${waterSharePct}% of ${population}K town)`,
      },
      {
        name: "POWER",
        value: powerSharePct,
        max: 800,
        displayValue: `${(centers * 150).toLocaleString()} MWh/DAY`,
        source: "LBNL 2024",
        comparison: `≈ ${powerHomes.toLocaleString()} homes (${powerSharePct}% of ${population}K town)`,
      },
      {
        name: "LAND",
        value: centers * 15,
        max: 150,
        displayValue: `${centers * 15} HA`,
        source: "NL · TARLAC REF",
        comparison: `≈ ${centers * 21} city blocks (${Math.max(1, Math.round(((centers * 15) / 1619) * 100))}% of Pax Silica)`,
      },
      {
        name: "LIVELIHOOD",
        value: affectedFamilies,
        max: 1800,
        displayValue: `~${affectedFamilies.toLocaleString()}`,
        source: "HRW · TARLAC",
        comparison: `farming & barangay families at risk in ${population}K zone`,
      },
    ],
    [centers, population, waterHomes, powerHomes, waterSharePct, powerSharePct, affectedFamilies],
  );
  const activeRecipient = recipientProfiles[recipient] ?? recipientProfiles.Mayor;
  const emailText = activeRecipient.body;
  const selectedPinX = (selectedCase.x / 100) * 900;
  const selectedPinY = (selectedCase.y / 100) * 460;
  const totalRealityCards = realityPairs.length;
  const nextReality = () => setReality((current) => (current + 1) % totalRealityCards);
  const previousReality = () =>
    setReality((current) => (current - 1 + totalRealityCards) % totalRealityCards);
  const playStamp = () => {
    if (!soundOn) return;
    const audio = protestAudioRef.current;
    if (!audio || !audio.paused) return;
    void audio.play().catch(() => {});
  };
  const flipMyth = (index: number) => {
    playStamp();
    setFlippedMyth((current) => (current === index ? null : index));
  };
  const expandMyth = (index: number) => {
    playStamp();
    setActiveMyth(index);
  };
  const dragPaper = (e: React.PointerEvent<HTMLButtonElement>, id: number) => {
    if (!dragRef.current || dragRef.current.id !== id) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 6) dragRef.current.moved = true;
    setPaperPositions((p) => ({
      ...p,
      [id]: { x: dragRef.current!.baseX + dx, y: dragRef.current!.baseY + dy },
    }));
  };
  const submitStory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setStories(stories + 1);
    setStoryStatus("Salamat. Your story is queued for community review.");
    e.currentTarget.reset();
  };
  const submitPetition = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setSignatures(signatures + 1);
    setPetitionStatus("Signature recorded. Salamat for standing with affected communities!");
    e.currentTarget.reset();
  };
  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div
      className={`app ${gateOpening ? "gate-opening" : ""} ${entered ? "gate-complete" : ""} ${
        flight ? "figure-in-flight" : ""
      }`}
    >
      <InkFilter />
      <audio
        ref={protestAudioRef}
        src="/1122.mp3"
        loop
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      {!entered && (
        <OpeningGate
          onOpen={finishFigureHandoff}
          onStart={() => setGateOpening(true)}
          onUnrolled={beginFigureHandoff}
          handoff={Boolean(flight)}
          figureRef={unrollFigureRef}
        />
      )}
      {flight && (
        <div
          className="figure-flight"
          ref={flightRef}
          style={{
            left: flight.left,
            top: flight.top,
            width: flight.width,
            height: flight.height,
          }}
          onTransitionEnd={(event) => {
            if (event.propertyName === "transform") finishFigureHandoff();
          }}
          aria-hidden="true"
        >
          <HeroBlueprintFigure />
        </div>
      )}
      <div
        className="cursor-cross"
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        aria-hidden="true"
      />
      <div className="cursor-coords" aria-hidden="true">
        X {String(cursor.x).padStart(4, "0")} · Y {String(cursor.y).padStart(4, "0")}
      </div>
      <div style={{ position: "sticky", top: 0, zIndex: 45 }}>
        <nav
          className="nav"
          aria-label="Main navigation"
          style={{ position: "relative", zIndex: 2 }}
        >
          <button className="brand" onClick={() => scrollTo("top")}>
            <LogoImage />
            <span className="brand-wordmark">
              <b>A DROP IN THE CLOUD</b>
              <small>OPPOSING THE PAX SILICA PROJECT</small>
            </span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            MENU {menuOpen ? "×" : "+"}
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <div className="nav-drop">
              <button onClick={() => scrollTo("issue")}>
                The Issue <span>⌄</span>
              </button>
              <div>
                <button onClick={() => scrollTo("overview")}>Overview</button>
                <button onClick={() => scrollTo("reality")}>Reality Check</button>
                <button onClick={() => scrollTo("scenarios")}>Future Scenarios</button>
              </div>
            </div>
            <div className="nav-drop">
              <button onClick={() => scrollTo("data")}>
                Data &amp; Global Impact <span>⌄</span>
              </button>
              <div>
                <button onClick={() => scrollTo("case-studies")}>Global Case Studies</button>
                <button onClick={() => scrollTo("simulator")}>What We Stand to Lose</button>
              </div>
            </div>
            <button onClick={() => scrollTo("research")}>Research &amp; Literature</button>
            <button onClick={() => scrollTo("voices")}>Voices of the People</button>
            <button onClick={() => scrollTo("policy")}>Policy Explainer</button>
            <button className="orange-button compact-button" onClick={() => scrollTo("action")}>
              Take Action ↗
            </button>
          </div>
        </nav>
        <div
          className="protest-ticker"
          style={{ position: "relative", top: "auto", zIndex: 1 }}
        >
          <div className="ticker-track" aria-hidden="true">
            <span>
              TUBIG AY BUHAY • KURYENTE SA BAYAN • LUPA NAMIN ITO • KABUHAYAN AY IPAGLABAN • KONSULTA
              MUNA • HUWAG IPAGPALIT ANG TAHANAN • WALANG KONSULTASYON, WALANG PAX SILICA • NO TO PAX
              SILICA •&nbsp;
            </span>
            <span>
              TUBIG AY BUHAY • KURYENTE SA BAYAN • LUPA NAMIN ITO • KABUHAYAN AY IPAGLABAN • KONSULTA
              MUNA • HUWAG IPAGPALIT ANG TAHANAN • WALANG KONSULTASYON, WALANG PAX SILICA • NO TO PAX
              SILICA •&nbsp;
            </span>
          </div>
          <button
            className={`sound-toggle ${soundOn ? "on" : ""}`}
            onClick={() => setSoundOn((on) => !on)}
            aria-pressed={soundOn}
          >
            SOUND {soundOn ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      <main id="top" style={{ position: "relative", zIndex: 1 }}>
        <div className="world-one blueprint-surface">
          <section className="hero blueprint-section" ref={heroRef}>
            <DraftMarks sheet="A-001" />
            <span className="hero-grain" aria-hidden="true" />
            <ProtestMarks hero />
            <div
              className="hero-placard placard-one hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "520ms" } as React.CSSProperties}
            >
              <span>
                TUBIG
                <br />
                NAMIN ITO!
              </span>
            </div>
            <div
              className="hero-placard placard-two hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "560ms" } as React.CSSProperties}
            >
              <span>
                KONSULTA
                <br />
                MUNA!
              </span>
            </div>
            <div
              className="hero-placard placard-three hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "600ms" } as React.CSSProperties}
            >
              <span>Lupa sa Magsasaka!</span>
            </div>
            <div
              className="hero-placard placard-four hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "640ms" } as React.CSSProperties}
            >
              <span>
                Lupang Ninuno,
                <br />
                Dipensahan
              </span>
            </div>
            <div
              className="hero-placard placard-five hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "680ms" } as React.CSSProperties}
            >
              <span>Tuloy ang laban!</span>
            </div>
            <div className="hero-copy">
              <div
                className="stamps hero-reveal hero-reveal-up"
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              >
                <span>PUBLIC REVIEW COPY</span>
                <span>NOT APPROVED</span>
              </div>
              <p
                className="eyebrow hero-reveal hero-reveal-up"
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                A DROP IN THE CLOUD · OPPOSING THE PAX SILICA PROJECT · PHILIPPINES · REV 01
              </p>
              <div className="hero-title-row">
                <h1
                  className="hero-reveal hero-reveal-up"
                  style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
                >
                  A DROP IN
                  <br />
                  <i>THE CLOUD</i>
                </h1>
                <div
                  className="title-block hero-reveal hero-reveal-up"
                  style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
                >
                  <b className="sheet-docket">
                    A DROP IN THE CLOUD · SHEET A-001 · SCALE NTS · DRAWN BY: THE PEOPLE
                  </b>
                  <span>DRAWN BY</span>
                  <b>THE PEOPLE</b>
                  <span>STATUS</span>
                  <b>FOR PUBLIC ACTION</b>
                  <span>REV</span>
                  <b>ONGOING</b>
                </div>
              </div>
              <p
                className="hero-kicker hero-reveal hero-reveal-up"
                style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
              >
                Protect our homes, water, and future.
              </p>
              <div
                className="hero-actions hero-reveal hero-reveal-up"
                style={{ "--reveal-delay": "460ms" } as React.CSSProperties}
              >
                <button className="orange-button" onClick={() => scrollTo("petition")}>
                  Sign the Petition →
                </button>
                <button className="line-button" onClick={() => scrollTo("data")}>
                  See the Impact Data ↓
                </button>
              </div>
              <div
                className="dimension hero-reveal hero-reveal-up"
                style={{ "--reveal-delay": "520ms" } as React.CSSProperties}
              >
                <span>0</span>
                <b />
                <span>120 m</span>
                <b />
                <span>240 m</span>
              </div>
            </div>
            <div className="hero-drawing">
              <div className="hero-figure-slot" ref={heroFigureSlotRef}>
                <HeroBlueprintFigure />
              </div>
              <div
                className="hazard-note hero-reveal hero-reveal-up"
                style={{ "--reveal-delay": "560ms" } as React.CSSProperties}
              >
                ⚠ INDUSTRIAL SCALE
                <br />
                <small>inside a residential fabric?</small>
              </div>
            </div>
            <div
              className="hazard-divider hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "620ms" } as React.CSSProperties}
              aria-hidden="true"
            />
            <div
              className="crowd-line hero-reveal hero-reveal-bottom"
              style={{ "--reveal-delay": "680ms" } as React.CSSProperties}
              aria-hidden="true"
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <i key={i}>
                  <b />
                </i>
              ))}
            </div>
          </section>

          <section id="issue" className="blueprint-section issue-intro">
            <DraftMarks sheet="A-101" />
            <SectionTitle
              no="01"
              eyebrow="THE ISSUE / SITE CONFLICT"
              title="What is Pax Silica — and why residential zones?"
              description="Pax Silica is a U.S.-led multilateral economic security initiative launched in December 2025 to secure global supply chains for artificial intelligence (AI), semiconductors, and critical minerals among allied nations. Following the Philippines' formal signing of the Pax Silica Declaration in April 2026, the initiative centers on developing a proposed 1,619-hectare (4,000-acre) AI-native industrial acceleration hub in New Clark City, Tarlac, within the Luzon Economic Corridor."
            />
            <div id="overview" className="site-plan">
              <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 800 500"
                role="img"
                aria-label="Architectural cross-section of a proposed data center between a barangay road and an electrical substation, above a shared aquifer"
              >
                <path d="M28 279h744v188H28z" fill="#031F5A" />
                <g
                  fill="none"
                  stroke={C}
                  strokeWidth="1.2"
                  strokeLinejoin="miter"
                  strokeLinecap="square"
                >
                  {/* Ground datum: one clean cut between the built fabric and the aquifer. */}
                  <path d="M28 278h744" strokeWidth="2.4" />
                  <path d="M28 278v-14m744 14v-14" opacity="0.7" />
                  <path d="M28 332h744M28 386h744M28 440h744" opacity="0.16" />

                  {/* Barangay road and homes, kept left of the proposed footprint. */}
                  <path d="M34 246h178v32H34z" fill="#031F5A" strokeWidth="1.5" />
                  <path d="M34 262h178" strokeDasharray="16 12" opacity="0.7" />
                  {[
                    [54, 176, 0.86],
                    [116, 182, 0.78],
                    [176, 174, 0.84],
                  ].map(([x, y, s], i) => (
                    <g key={`section-home-${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
                      <path d="M0 26h58v48H0z" fill="#031F5A" strokeWidth="1.5" />
                      <path
                        d="M-6 27 29 3l35 24-7 6-28-19-28 19Z"
                        fill="#031F5A"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 38h14v15H10zM36 38h13v15H36z"
                        fill="#031F5A"
                        strokeWidth="1.1"
                      />
                      <path d="M25 74V55h12v19" fill="#031F5A" strokeWidth="1.1" />
                    </g>
                  ))}

                  {/* Proposed data hall: one figure so every line switches highlight together. */}
                  <g className={hotspot === 0 ? "hotspot-figure hot-line" : "hotspot-figure"}>
                    <path d="M276 142h276v136H276z" fill="#031F5A" strokeWidth="2.6" />
                    <path
                      d="M276 142l18-16h276l-18 16M552 142l18-16v136l-18 16"
                      fill="#031F5A"
                      strokeWidth="1.6"
                    />
                    <path d="M276 88v12M552 88v12M276 94h276" opacity="0.8" />
                    <path
                      d="m276 94 10-5m-10 5 10 5m266-5-10-5m10 5-10 5"
                      opacity="0.8"
                    />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <g key={`section-vent-${i}`} transform={`translate(${298 + i * 49} 198)`}>
                        <path d="M0 0h32v38H0z" fill="#031F5A" strokeWidth="1.2" />
                        <path d="M4 8h24m-24 8h24m-24 8h24m-24 8h24" opacity="0.55" />
                      </g>
                    ))}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <path
                        key={`section-roof-unit-${i}`}
                        d={`M${300 + i * 78} 128h52v14h-52z`}
                        fill="#031F5A"
                        strokeWidth="1.2"
                      />
                    ))}
                  </g>

                  {/* Electrical substation: fenced yard, two transformers and a pylon. */}
                  <g className={hotspot === 1 ? "hotspot-figure hot-line" : "hotspot-figure"}>
                    <path d="M600 168h166v110H600z" fill="#031F5A" strokeWidth="2.2" />
                    <path
                      d="M620 190h52v62h-52zM698 190h48v62h-48z"
                      fill="#031F5A"
                      strokeWidth="1.5"
                    />
                    <path d="M646 190v62m-26-31h52M722 190v62m-24-31h48" opacity="0.55" />
                    <path d="M684 168V96m-24 0h48m-42 16h36m-30 16h24" strokeWidth="2.2" />
                    <path d="M676 112h16M742 190v54m-12 0h24" strokeWidth="1.6" />
                  </g>

                  {/* Shared aquifer: both pipes and arrows recolor as one water figure. */}
                  <g className={hotspot === 2 ? "hotspot-figure hot-line" : "hotspot-figure"}>
                    <path
                      d="M40 356c92-20 184 20 276 0s184 20 276 0 132 18 168 0"
                      opacity="0.45"
                      strokeWidth="2"
                    />
                    <path
                      d="M40 402c92-20 184 20 276 0s184 20 276 0 132 18 168 0"
                      opacity="0.24"
                      strokeWidth="1.6"
                    />
                    <path d="M414 278v68H122" stroke="#031F5A" strokeWidth="15" />
                    <path d="M414 278v68H122" strokeWidth="2.4" />
                    <path d="M474 278v92" stroke="#031F5A" strokeWidth="13" />
                    <path d="M474 278v92" strokeWidth="2.2" />
                    <path
                      d="m148 346-12-7m12 7-12 7m326-7 12-7m-12 7 12 7"
                      stroke="#FF7A1A"
                      strokeWidth="2.4"
                    />
                  </g>
                </g>

                <g fill={W} fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="1">
                  <text x="40" y="258">
                    BARANGAY ROAD
                  </text>
                  <text x="276" y="76">
                    PROPOSED DATA CENTER FOOTPRINT
                  </text>
                  <text x="276" y="110" fill={C} fontSize="11">
                    1,619 ha HUB (NEW CLARK CITY)
                  </text>
                  <text x="600" y="160">
                    ELECTRICAL SUBSTATION
                  </text>
                  <text x="40" y="438">
                    AQUIFER / SHARED WATER
                  </text>
                  <text x="480" y="322" fill="#FF7A1A" fontSize="10">
                    DRAW ~1.7M L/DAY
                  </text>
                </g>

                {[
                  ["1", 414, 132],
                  ["2", 684, 132],
                  ["3", 148, 372],
                ].map(([n, x, y], i) => (
                  <g
                    key={n}
                    onMouseEnter={() => setHotspot(i)}
                    onFocus={() => setHotspot(i)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Highlight site issue ${n}`}
                  >
                    <circle
                      className={i === hotspot ? "site-marker active" : "site-marker"}
                      cx={Number(x)}
                      cy={Number(y)}
                      r="18"
                      fill="#031F5A"
                      stroke={i === hotspot ? "#FF7A1A" : C}
                      strokeWidth="1.6"
                    />
                    <text
                      x={Number(x)}
                      y={Number(y) + 6}
                      textAnchor="middle"
                      fill={W}
                      fontSize="17"
                    >
                      {n}
                    </text>
                  </g>
                ))}
              </svg>
              <ol className="plan-legend">
                {[
                  {
                    n: 0,
                    label: "Industrial footprint",
                    marker: "①",
                    detail:
                      "1,619 hectares in New Clark City, Tarlac overlap ancestral Aeta domains and active farmlands—threatening hundreds of families with displacement into 30 sqm units.",
                  },
                  {
                    n: 1,
                    label: "24/7 pressure",
                    marker: "②",
                    detail:
                      "Continuous AI server loads require high-voltage substations, noisy rooftop chillers, and diesel backups that drive up power bills and downwind air pollution.",
                  },
                  {
                    n: 2,
                    label: "Shared resources",
                    marker: "③",
                    detail:
                      "Evaporative cooling can pull millions of liters daily from local watersheds—competing directly with barangay wells, irrigation, and household taps.",
                  },
                ].map((item) => (
                  <li
                    key={item.n}
                    className={hotspot === item.n ? "active" : ""}
                    onMouseEnter={() => setHotspot(item.n)}
                    onFocus={() => setHotspot(item.n)}
                    onClick={() => setHotspot(item.n)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setHotspot(item.n);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={hotspot === item.n}
                  >
                    <b>
                      {item.marker} {item.label}
                    </b>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ol>
              <div className="north-arrow">
                N<br />↑
              </div>
            </div>
          </section>

          <section id="reality" className="blueprint-section reality-section">
            <DraftMarks sheet="A-201" />
            <SectionTitle
              no="01.B"
              eyebrow="CLAIM / FIELD CONDITION"
              title="The reality check"
              description="Compare official Pax Silica promises against documented field conditions in Tarlac and hyperscale corridors abroad."
            />
            <div className="flashcard-stack" aria-label="Claim and field-condition flashcards">
              {realityPairs.map((_, i) => (
                <RealityFlashcard
                  key={i}
                  index={i}
                  depth={(i - reality + totalRealityCards) % totalRealityCards}
                  onZoom={() => setZoomedReality(i)}
                />
              ))}
            </div>
            <div className="flashcard-controls" aria-label="Flashcard controls">
              <button className="flashcard-nav" onClick={previousReality} aria-label="Previous card">
                ← PREV
              </button>
              <span className="flashcard-counter" aria-live="polite">
                CARD {String(reality + 1).padStart(2, "0")} /{" "}
                {String(totalRealityCards).padStart(2, "0")}
              </span>
              <button className="flashcard-nav" onClick={nextReality} aria-label="Next card">
                NEXT →
              </button>
            </div>
            <div className="flashcard-dots" aria-label="Choose a flashcard">
              {realityPairs.map((_, i) => (
                <button
                  key={i}
                  className={reality === i ? "active" : ""}
                  onClick={() => setReality(i)}
                  aria-label={`Go to card ${i + 1}`}
                  aria-current={reality === i ? "true" : undefined}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="flashcard-note">PREV / NEXT LIFTS THE NEXT CARD TO THE TOP.</p>
          </section>

          <section id="scenarios" className="blueprint-section scenarios-section">
            <DraftMarks sheet="A-301" />
            <SectionTitle
              no="01.C"
              eyebrow="PROJECTED CONDITIONS / EHP · EESI · AGU ADVANCES · FRONTIERS IN CLIMATE"
              title="Drag the future into view"
            />
            <div className="scenario-grid">
              <div className={`neighborhood stage-${scenario}`}>
                <NeighborhoodScene stage={scenario} />
                <div className="heat-lines">)))</div>
                <span className="stage-label">
                  {["CONSTRUCTION ZONE", "UTILITY STRESS", "ECOLOGICAL DAMAGE"][scenario]}
                </span>
              </div>
              <div className="scenario-controls">
                <div className="scenario-meter">
                  <input
                    aria-label="Future scenario from short to long term"
                    type="range"
                    min="0"
                    max="100"
                    step="50"
                    value={scenario * 50}
                    style={{ "--meter-progress": `${scenario * 50}%` } as React.CSSProperties}
                    onChange={(e) => setScenario(Math.round(Number(e.target.value) / 50))}
                  />
                  <div className="snap-stops">
                    {[
                      ["SHORT TERM", "(0-2 YRS) · 0%"],
                      ["MEDIUM TERM", "(3-7 YRS) · 50%"],
                      ["LONG TERM", "(8+ YRS) · 100%"],
                    ].map(([label, detail], i) => (
                      <button
                        key={label}
                        type="button"
                        data-stop={i}
                        className={scenario === i ? "active" : ""}
                        onClick={() => setScenario(i)}
                        aria-pressed={scenario === i}
                        aria-label={`Snap to ${label} ${detail.replace(" · ", ", ")}`}
                      >
                        <i aria-hidden="true" />
                        <b>{label}</b>
                        <span>{detail}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <p>{scenarioNotes[scenario]}</p>
                <div className="live-meters">
                  {meters.map((m) => (
                    <div key={m.name}>
                      <span>{m.name}</span>
                      <b>
                        {m.unit === "₱"
                          ? `₱${m.value.toLocaleString()}`
                          : `${m.value} ${m.unit}`}
                      </b>
                      <i style={{ width: `${m.unit === "₱" ? m.value / 80 : m.value}%` }} />
                    </div>
                  ))}
                </div>
                <small>
                  Illustrative local trajectory modeled from EHP/EESI acoustic readings (55–90 dB),
                  AGU Advances aquifer drawdown findings, urban heat-island studies, and residential
                  power tariff pass-through estimates.
                </small>
              </div>
            </div>
          </section>

          <section id="data" className="blueprint-section data-section">
            <DraftMarks sheet="D-101" />
            <SectionTitle
              no="02"
              eyebrow="DATA & GLOBAL IMPACT"
              title="This is not a hypothetical elsewhere."
              description="Electricity share reflects national metered electricity consumed by data centers—not total energy use. Across Europe, the Americas, and Asia, rapid server-farm growth has already triggered grid caps, court halts, and national moratoria."
            />
            <div id="case-studies" className="world-study">
              <div className="world-map">
                <svg
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 900 460"
                  role="img"
                  aria-label="Blueprint world map with data center case study pins"
                >
                  <g className="map-graticule" fill="none" stroke={C} strokeWidth="0.8">
                    {[70, 130, 190, 250, 310, 370].map((y) => (
                      <path key={`lat-${y}`} d={`M24 ${y}h852`} opacity="0.22" />
                    ))}
                    {[90, 180, 270, 360, 450, 540, 630, 720, 810].map((x) => (
                      <path key={`lon-${x}`} d={`M${x} 28v404`} opacity="0.22" />
                    ))}
                    <path d="M24 230h852M450 28v404" strokeDasharray="4 8" opacity="0.48" />
                    <path d="M24 28h852v404H24z" opacity="0.55" />
                  </g>
                  <g className="map-landmass" fill="#3FC8FF14" stroke={C} strokeWidth="1.6">
                    <path d="M96 96 128 72l56-10 38 14 40-12 44 18 20 28-16 22-26 10-8 26-26 18-8 28-24 14-20-16-14-28-26-10-16-26-30-10-20-22Z" />
                    <path d="m218 228 28 14 22 24-12 16-24-12-20-22Z" />
                    <path d="m330 48 44-10 36 16-12 28-42 10-28-18Z" />
                    <path d="m266 278 34-12 30 16 18 30-8 36-14 34-20 32-22-10-10-36-16-34-6-32Z" />
                    <path d="m430 112 24-16 28 4 18 16-12 16 22 10-14 18-26-2-18 16-20-12-10-22Z" />
                    <path d="m458 82 20-18 26 8 8 24-18 12-22-8Z" />
                    <path d="m438 180 40-10 34 14 22 28-8 38-16 36-22 40-26 14-18-30-12-38-14-40Z" />
                    <path d="m510 104 38-22 42-8 46 10 46-14 46 18 46 18 34 28-12 32-36 14-22 28-38 8-28 28-40-8-26-22-36-6-26-24-24-26-14-26Z" />
                    <path d="m700 250 24 8 14 20-18 8-16-16Zm52 28 20 8-6 16-18-6Z" />
                    <path d="m742 336 40-14 40 14 20 30-16 30-40 8-30-16-18-26Z" />
                    <path d="m850 402 14 12-8 18-12-12Z" />
                    <path d="m798 158 14-10 6 18-10 14Zm-378-40 12-10 6 16-10 12Z" />
                  </g>
                  <path
                    className="case-leader"
                    d={`M${selectedPinX.toFixed(1)} ${selectedPinY.toFixed(1)} L 900 ${Math.max(
                      40,
                      Math.min(410, selectedPinY - 70),
                    ).toFixed(1)}`}
                    fill="none"
                    stroke="#FF7A1A"
                    strokeWidth="1.6"
                    strokeDasharray="8 6"
                  />
                  <circle
                    cx={selectedPinX}
                    cy={selectedPinY}
                    r="8"
                    fill="none"
                    stroke="#FF7A1A"
                    strokeWidth="1.5"
                  />
                  <text
                    x="802"
                    y={Math.max(46, Math.min(404, selectedPinY - 78))}
                    fill="#FF7A1A"
                    fontFamily="IBM Plex Mono"
                    fontSize="10"
                  >
                    CASE FILE {String(cases.indexOf(selectedCase) + 1).padStart(2, "0")}
                  </text>
                  <g fill={W} fontFamily="IBM Plex Mono" fontSize="9" opacity="0.7">
                    <text x="30" y="24">
                      60°N
                    </text>
                    <text x="30" y="236">
                      00°
                    </text>
                    <text x="30" y="430">
                      60°S
                    </text>
                    <text x="812" y="430">
                      NTS · REV 01
                    </text>
                  </g>
                </svg>
                {cases.map((c) => (
                  <button
                    key={c.name}
                    className={`map-pin ${selectedCase.name === c.name ? "active" : ""}`}
                    style={
                      {
                        left: `${c.x}%`,
                        top: `${c.y}%`,
                        "--label-x": `${c.labelOffset?.[0] ?? 0}px`,
                        "--label-y": `${c.labelOffset?.[1] ?? 0}px`,
                      } as React.CSSProperties
                    }
                    onClick={() => setSelectedCase(c)}
                    aria-label={`View ${c.name} case study`}
                  >
                    <span />
                    <b>{c.name}</b>
                  </button>
                ))}
              </div>
              <article className="case-sheet">
                <span>
                  CASE FILE · {String(cases.indexOf(selectedCase) + 1).padStart(2, "0")} ·{" "}
                  {selectedCase.source}
                </span>
                <h3>{selectedCase.name}</h3>
                <strong>{selectedCase.stat}</strong>
                <p>{selectedCase.note}</p>
                <a href={selectedCase.url} target="_blank" rel="noreferrer">
                  OPEN PRIMARY SOURCE ↗
                </a>
                <div className="sheet-fold" />
              </article>
            </div>
            <div className="impact-gauges">
              {liveImpactMeters.map((meter) => {
                const fraction = Math.max(0, Math.min(1, meter.value / meter.max));
                const needleAngle = -180 + fraction * 180;
                return (
                  <div className="gauge" key={meter.name}>
                    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 180 110" aria-hidden="true">
                      <path
                        d="M22 88a68 68 0 0 1 136 0"
                        fill="none"
                        stroke={C}
                        strokeWidth="3"
                        strokeDasharray="8 5"
                      />
                      <g stroke={W} strokeWidth="1" opacity="0.6">
                        {Array.from({ length: 9 }).map((_, t) => {
                          const angle = Math.PI - (t * Math.PI) / 8;
                          const x1 = 90 + Math.cos(angle) * 56;
                          const y1 = 88 - Math.sin(angle) * 56;
                          const x2 = 90 + Math.cos(angle) * 64;
                          const y2 = 88 - Math.sin(angle) * 64;
                          return (
                            <path
                              key={`tick-${t}`}
                              d={`M${x1.toFixed(1)} ${y1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
                            />
                          );
                        })}
                      </g>
                      <g
                        className="gauge-needle"
                        style={{
                          transform: `rotate(${needleAngle.toFixed(2)}deg)`,
                          transformOrigin: "90px 88px",
                          transition: "transform 280ms ease-out",
                        }}
                      >
                        <path
                          d="M90 88 154 88"
                          stroke="#FF7A1A"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </g>
                      <circle cx="90" cy="88" r="6" fill={W} />
                      <path d="M22 88h136" stroke={C} strokeWidth="1" opacity="0.5" />
                    </svg>
                    <span>{meter.name}</span>
                    <b>
                      {meter.displayValue} <small>{meter.source}</small>
                    </b>
                    <p>{meter.comparison}</p>
                  </div>
                );
              })}
            </div>
            <div id="simulator" className="simulator">
              <div>
                <p className="eyebrow">IMPACT SIMULATOR / WORKING ASSUMPTIONS</p>
                <h3>Draw your own demand scenario.</h3>
                <p>
                  Slide the facility count and barangay population to compare typical daily cooling
                  water and electricity draw against local Filipino household demand.
                </p>
              </div>
              <div className="sim-controls">
                <label>
                  NUMBER OF DATA CENTERS <b>{centers}</b>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={centers}
                    onChange={(e) => setCenters(Number(e.target.value))}
                  />
                </label>
                <label>
                  CITY / BARANGAY SIZE <b>{population}K</b>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={population}
                    onChange={(e) => setPopulation(Number(e.target.value))}
                  />
                </label>
              </div>
              <div className="sim-output">
                <span>DAILY WATER ≈</span>
                <strong>{waterSharePct}%</strong>
                <b>
                  OF {population}K TOWN ({waterHomes.toLocaleString()} HOMES)
                </b>
                <i />
                <span>DAILY ELECTRICITY ≈</span>
                <strong>{powerSharePct}%</strong>
                <b>
                  OF {population}K TOWN ({powerHomes.toLocaleString()} HOMES)
                </b>
              </div>
              <small className="formula">
                Baseline per facility: ~1.7M L/day evaporative cooling (~600 L/PH household) and
                ~150 MWh/day electricity (~8.1 kWh/PH household) (LBNL 2024; EESI 2025). For a{" "}
                {population}K-resident community (~{communityHouseholds.toLocaleString()} households),{" "}
                {centers} {centers === 1 ? "facility equals" : "facilities equal"} ~{waterSharePct}%
                of daily household water and ~{powerSharePct}% of residential electricity use.
              </small>
            </div>
          </section>
        </div>

        <div className="world-two drafting-table">
          <div className="table-transition" aria-hidden="true">
            <div className="table-reveal-stage">
              <div className="table-blueprint-sheet blueprint-surface">
                <span className="sheet-rolled-edge" />
              </div>
              <p className="table-settle-caption">
                THE PLAN WAS <em>ON OUR TABLE</em> ALL ALONG
              </p>
            </div>
          </div>

          <div className="table-strip">
            <span className="table-strip-roll" aria-hidden="true" />
            <section id="research" className="blueprint-section table-world research-section">
              <TableProps variant={0} />
              <DraftMarks sheet="R-001" />
              <div className="table-section-label">
                <b>03</b>
                <span>RESEARCH &amp; LITERATURE</span>
              </div>
              <div className="filter-tabs" aria-label="Filter research">
                {["News", "Academic", "Policy", "All"].map((f) => (
                  <button
                    className={filter === f ? "active" : ""}
                    key={f}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="research-stage">
                <div
                  className="takeover-panel"
                  style={{ transform: "translateY(28px)" }}
                >
                  <div className="quote-blueprint">
                    <small>PEOPLE'S ANNOTATION / REV 04</small>
                    <span>A plan drawn</span> <u>without the people</u> <span>is not a plan.</span>{" "}
                    <i>
                      <strong>IT'S A TAKEOVER.</strong>
                    </i>
                  </div>
                  <em>REJECTED</em>
                </div>
                <div className="research-pile">
                  {research.map((r, i) => {
                    const moved = paperPositions[i] || { x: 0, y: 0 };
                    const hidden = filter !== "All" && r.category !== filter;
                    const layout = researchPaperLayouts[i] ?? { x: 24, y: 12, partX: 0, partY: 0 };
                    const mobileX = 24 + r.x * 0.42;
                    const mobileY = 12 + r.y * 0.52;
                    return (
                      <button
                        className={`research-paper paper-${r.kind} ${hidden ? "filtered-out" : ""}`}
                        style={
                          {
                            "--x": `${layout.x}%`,
                            "--y": `${layout.y}px`,
                            "--w": `${r.w}%`,
                            "--mx": `${mobileX}%`,
                            "--my": `${mobileY}%`,
                            "--r": `${r.r}deg`,
                            "--z": r.z,
                            "--dx": `${moved.x}px`,
                            "--dy": `${moved.y}px`,
                            "--part-x": `${layout.partX}px`,
                            "--part-y": `${layout.partY}px`,
                            backgroundImage: r.kind === "paper" ? "none" : undefined,
                          } as React.CSSProperties
                        }
                        key={`${r.category}-${i}`}
                        tabIndex={hidden ? -1 : 0}
                        aria-hidden={hidden || undefined}
                        onPointerDown={(e) => {
                          const pos = paperPositions[i] || { x: 0, y: 0 };
                          dragRef.current = {
                            id: i,
                            startX: e.clientX,
                            startY: e.clientY,
                            baseX: pos.x,
                            baseY: pos.y,
                            moved: false,
                          };
                          e.currentTarget.setPointerCapture(e.pointerId);
                        }}
                        onPointerMove={(e) => dragPaper(e, i)}
                        onPointerUp={(e) => {
                          e.currentTarget.releasePointerCapture(e.pointerId);
                          window.setTimeout(() => {
                            dragRef.current = null;
                          }, 0);
                        }}
                        onClick={() => {
                          if (!dragRef.current?.moved) setArticle(r);
                        }}
                      >
                        <span className="paper-fastener" />
                        {r.kind === "photo" && (
                          <img
                            src={i === 6 ? "/community/market.jpg" : "/community/street.jpg"}
                            alt=""
                          />
                        )}
                        {r.kind === "map" && (
                          <span className="mini-map">
                            ▱ ┈┈ ◯ ┈┈ ▰
                            <br />
                            50 m BUFFER
                          </span>
                        )}
                        {r.kind === "email" && (
                          <span className="redactions">████&nbsp;&nbsp; ███████&nbsp;&nbsp; ███</span>
                        )}
                        <span className="paper-category">
                          {r.category} / {r.date}
                        </span>
                        <h3 style={{ wordBreak: "normal", overflowWrap: "normal" }}>{r.title}</h3>
                        <p
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {r.note}
                        </p>
                        <small>
                          {r.source} · {r.date} · DRAG / OPEN ↗
                        </small>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section id="voices" className="blueprint-section table-world voices-section">
              <TableProps variant={1} />
              <DraftMarks sheet="C-101" />
              <SectionTitle
                no="04"
                eyebrow="VOICES OF THE PEOPLE"
                title="The community wall"
                description={`${stories} NOTES PINNED · Direct testimonies from Tarlac farmlands, Virginia town halls, and frontline neighborhoods.`}
              />
              <div className="community-wall">
                <div className="photo-note note-one">
                  <img
                    src="/community/market.jpg"
                    alt="People gathering in a busy neighborhood market"
                  />
                  <p>
                    “This is what an irresponsible, foreign-oriented project like Pax Silica brings:
                    social and environmental burdens that other countries avoid while Filipinos bear
                    the consequences.”
                  </p>
                  <small>Ian Aragoza, Computer Professionals' Union · Bulatlat · Aug 2026</small>
                </div>
                <div className="photo-note note-two">
                  <img src="/community/children.jpg" alt="Children laughing together" />
                  <p>
                    “How am I going to relax with something buzzing at me 24/7? Why can't we move
                    the data center to your neighborhood?”
                  </p>
                  <small>Chesapeake, Virginia Resident · NPR · Jul 2025</small>
                </div>
                <button
                  className={`open-letter ${letterOpen ? "open" : ""}`}
                  onClick={() => setLetterOpen(!letterOpen)}
                >
                  <span>OPEN LETTER No. 07</span>
                  <b>To our city council &amp; provincial board:</b>
                  <p>
                    {letterOpen
                      ? "We stand with Aeta chieftain Petronila Capiz-Muñoz rejecting 30 sqm relocation units in Tarlac and with homeowners like Steve Hacker whose 1983 well ran dry for 39 days. Pause Pax Silica land conversion, disclose every water and ECC study, and uphold genuine consultation and FPIC."
                      : "CLICK TO UNFOLD"}
                  </p>
                </button>
                <div className="speech-callout">“Consultation is not a checkbox.”</div>
              </div>
              <form className="story-form" onSubmit={submitStory}>
                <div className="story-clip" aria-hidden="true">
                  <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" focusable="false">
                    <path
                      d="M20.5 7.5 10 18a4.5 4.5 0 0 0 6.4 6.4l11-11a7 7 0 0 0-9.9-9.9L6 15.1a9.5 9.5 0 0 0 13.4 13.4l7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>PHOTO / CLIPPING</span>
                </div>
                <p className="eyebrow">ADD YOUR NOTE TO THE WALL</p>
                <h3>Submit your story</h3>
                <div className="field-pair">
                  <label htmlFor="story-name">
                    Name
                    <input id="story-name" name="name" autoComplete="name" required />
                  </label>
                  <label htmlFor="story-place">
                    Barangay / City
                    <input id="story-place" name="place" autoComplete="address-level2" required />
                  </label>
                </div>
                <label htmlFor="story-text">
                  Your story
                  <textarea id="story-text" name="story" rows={4} required />
                </label>
                <label className="file-field" htmlFor="story-photo">
                  Optional photo
                  <input id="story-photo" name="photo" type="file" accept="image/*" />
                </label>
                <label className="check-field" htmlFor="story-consent">
                  <input id="story-consent" name="consent" type="checkbox" required /> I consent to
                  community review and publication of this story.
                </label>
                <button className="line-button" type="submit">
                  PIN MY STORY ↗
                </button>
                <output aria-live="polite">{storyStatus}</output>
              </form>
            </section>

            <section id="policy" className="blueprint-section table-world policy-section">
              <TableProps variant={2} />
              <DraftMarks sheet="P-101" />
              <SectionTitle
                no="05"
                eyebrow="POLICY & ZONING EXPLAINER"
                title="Why residential areas are off-limits"
                description="Philippine land-use, environmental impact, and Indigenous rights statutes prohibit fast-tracking heavy industrial hubs beside homes or ancestral farms."
              />
              <div className="policy-stack">
                {[
                  [
                    "ZONING",
                    "Under the Local Government Code (RA 7160) and municipal CLUPs, hyperscale compute plants are heavy industrial uses requiring buffer zones—not residential or farmland reclassifications.",
                    "LGU zoning review → public notice → hearing → decision",
                  ],
                  [
                    "ECC / ENVIRONMENT",
                    "PD 1586 mandates an Environmental Impact Assessment and DENR-EMB ECC, while RA 8371 (IPRA) requires Free, Prior, and Informed Consent wherever Aeta ancestral domains are affected.",
                    "Project study → DENR review → consultation → monitor",
                  ],
                  [
                    "LGU ACCOUNTABILITY",
                    "Secret NDAs, redacted utility deals, and disputed quitclaims undermine public trust; citizens can demand water, power, and land-conversion records through Sanggunian oversight.",
                    "Records request → council oversight → public answer",
                  ],
                ].map((p, i) => (
                  <button
                    key={p[0]}
                    className={`policy-sheet sheet-${i} ${policy === i ? "active" : ""}`}
                    onClick={() => setPolicy(i)}
                  >
                    <span>0{i + 1} / PLAN LAYER</span>
                    <h3>{p[0]}</h3>
                    <p>{p[1]}</p>
                    <div className="flow">
                      {p[2].split(" → ").map((x, j) => (
                        <span key={x}>
                          {x}
                          {j < 3 && <i>→</i>}
                        </span>
                      ))}
                    </div>
                    <svg
                      preserveAspectRatio="xMidYMid meet"
                      className="flow-mark"
                      viewBox="0 0 240 90"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M8 68c38-4 58-36 92-36 30 0 36 26 64 26 24 0 38-18 68-20" />
                      <path d="m225 34 7 4-8 5" />
                      <circle cx="8" cy="68" r="4" />
                      <circle cx="100" cy="32" r="4" />
                      <circle cx="164" cy="58" r="4" />
                    </svg>
                    {i > 0 && <b className="bypass">BYPASS?</b>}
                  </button>
                ))}
              </div>
              <div className="glossary">
                <b>QUICK GLOSSARY</b>
                <span>
                  <strong>ECC</strong> Environmental Compliance Certificate
                </span>
                <span>
                  <strong>CLUP</strong> Comprehensive Land Use Plan
                </span>
                <span>
                  <strong>LGU</strong> Local Government Unit
                </span>
                <span>
                  <strong>EIA</strong> Environmental Impact Assessment
                </span>
              </div>
            </section>

            <section className="blueprint-section table-world myths-section">
              <TableProps variant={3} />
              <DraftMarks sheet="F-101" />
              <SectionTitle
                no="06"
                eyebrow="MYTH / FACT REGISTER"
                title="Stamp out the sales pitch"
                description="Select each claim to reveal the field note."
              />
              <div className="myth-list">
                {myths.map((m, i) => (
                  <MythFlipCard
                    key={i}
                    item={m}
                    index={i}
                    flipped={flippedMyth === i}
                    onFlip={() => flipMyth(i)}
                    onExpand={() => expandMyth(i)}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="blueprint-rollout" aria-hidden="true">
            <i className="rollout-torn-edge" />
            <i className="rollout-hazard" />
            <b>ROLL OUT THE PEOPLE'S PLAN</b>
            <span className="rollout-roller" />
          </div>
        </div>

        <section id="action" className="blueprint-section action-section">
          <DraftMarks sheet="ACT-01" />
          <ProtestMarks compact />
          <FinaleStencils />
          <SectionTitle
            no="07"
            eyebrow="ISSUED FOR ACTION"
            title="Don't let this plan pass quietly."
            description="Demand an immediate moratorium on Pax Silica land conversion until independent water, grid, and health assessments are disclosed and affected communities give genuine consent."
          />
          <div id="petition" className="petition-block">
            <div className="approval-stamp">
              <span>PEOPLE'S APPROVAL</span>
              <strong>{signatures.toLocaleString()}</strong>
              <b>SIGNATURES</b>
            </div>
            <div className="petition-copy">
              <p className="eyebrow">PETITION No. 001</p>
              <h3 id="petition-heading">
                Demand a pause, full disclosure, and public consultation.
              </h3>
              <div className="progress-ruler">
                <i style={{ width: `${Math.min(100, signatures / 250)}%` }} />
                <span>0</span>
                <span>GOAL 25,000</span>
              </div>
            </div>
            <form onSubmit={submitPetition} aria-labelledby="petition-heading">
              <span className="reg-mark reg-tl" aria-hidden="true" />
              <span className="reg-mark reg-tr" aria-hidden="true" />
              <span className="reg-mark reg-bl" aria-hidden="true" />
              <span className="reg-mark reg-br" aria-hidden="true" />
              <label htmlFor="petition-name">
                <span>FULL NAME</span>
                <input
                  id="petition-name"
                  name="name"
                  required
                  autoComplete="name"
                  enterKeyHint="next"
                />
              </label>
              <label htmlFor="petition-email">
                <span>EMAIL</span>
                <input
                  id="petition-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  enterKeyHint="next"
                />
              </label>
              <label htmlFor="petition-city">
                <span>CITY / MUNICIPALITY</span>
                <input
                  id="petition-city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  enterKeyHint="done"
                />
              </label>
              <div className="petition-submit-row">
                <button type="submit" className="orange-button">
                  SIGN THE PETITION ↗
                </button>
                <PetitionIcon />
              </div>
              <output aria-live="polite">{petitionStatus}</output>
            </form>
          </div>
          <div className="email-rep">
            <div>
              <p className="eyebrow">DIRECT LETTER / CHOOSE RECIPIENT</p>
              <h3>Email your representative</h3>
              <div className="recipient-tabs" aria-label="Choose letter recipient">
                {["Mayor", "Councilor", "DENR", "DOE"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={recipient === r ? "active" : ""}
                    aria-pressed={recipient === r}
                    onClick={() => {
                      setRecipient(r);
                      setCopied(false);
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="letter-sheet">
              <div className="letterhead">
                <b>{activeRecipient.office}</b>
                <span>REPUBLIC OF THE PHILIPPINES · {activeRecipient.address}</span>
                <span>{activeRecipient.ref}</span>
              </div>
              <pre>{emailText}</pre>
              <div className="letter-actions">
                <button
                  type="button"
                  className="line-button"
                  onClick={() => {
                    void navigator.clipboard?.writeText(emailText);
                    setCopied(true);
                  }}
                >
                  {copied ? "COPIED ✓" : "COPY TO CLIPBOARD"}
                </button>
                <a
                  className="orange-button"
                  href={`mailto:?subject=${encodeURIComponent(activeRecipient.subject)}&body=${encodeURIComponent(emailText)}`}
                >
                  OPEN IN EMAIL ↗
                </a>
              </div>
            </div>
          </div>
          <div className="social-kit">
            <p className="eyebrow">SHAREABLE FACT CARDS / TOOLKIT</p>
            <h3>Take the plan beyond this page.</h3>
            <div className="download-grid">
              {[
                {
                  title: "WATER IS A RIGHT",
                  size: "1080 × 1080",
                  type: "SOCIAL CARD",
                  kind: "poster",
                  code: "PRINT-01",
                  caption: "One hyperscale campus can draw ~1.7M liters of cooling water daily.",
                },
                {
                  title: "BAHAY NAMIN",
                  size: "1080 × 1920",
                  type: "STORY POST",
                  kind: "poster",
                  code: "PRINT-02",
                  caption: "Ancestral lands and barangays are homes—not industrial buffer zones.",
                },
                {
                  title: "PUBLIC DOCUMENT REQUEST",
                  size: "A4 / PDF",
                  type: "ECC / RECORDS CHECKLIST",
                  kind: "spec",
                  code: "TK-01",
                  caption: "",
                },
                {
                  title: "BARANGAY MEETING",
                  size: "A4 / PDF",
                  type: "ORGANIZING GUIDE",
                  kind: "spec",
                  code: "TK-02",
                  caption: "",
                },
                {
                  title: "PUBLIC HEARING",
                  size: "A4 / PDF",
                  type: "CHECKLIST DRAWING",
                  kind: "spec",
                  code: "TK-03",
                  caption: "",
                },
              ].map((d, i) => (
                <button
                  key={d.title}
                  type="button"
                  className={`kit-card ${d.kind === "poster" ? "poster-card" : "spec-card"}`}
                  data-poster={d.kind === "poster" ? d.title : undefined}
                  onClick={() => setKitStatus(i)}
                >
                  <span className="kit-index">
                    {d.code} · 0{i + 1}
                  </span>
                  {d.kind === "spec" && <ChecklistIcon />}
                  <b>{d.title}</b>
                  <p>
                    {d.size} · {d.type}
                  </p>
                  {d.kind === "poster" && <span className="poster-caption">{d.caption}</span>}
                  <small aria-live="polite">
                    {kitStatus === i ? "PACKET READY ✓" : "DOWNLOAD ↓"}
                  </small>
                </button>
              ))}
            </div>
            <p className="hashtags">#NoToPaxSilica &nbsp; #BahayNaminHindiDataCenter</p>
          </div>
          <CrowdBoundary />
        </section>
      </main>

      <footer aria-label="Campaign drawing title block">
        <FooterWatermark />
        <div className="title-cell project-cell">
          <LogoImage />
          <span>PROJECT TITLE</span>
          <b>A DROP IN THE CLOUD</b>
          <p>
            OPPOSING THE PAX SILICA PROJECT · A citizen-led public review defending homes,
            ancestral lands, and shared watersheds.
          </p>
          <em className="footer-rejected">REJECTED</em>
        </div>
        <div className="title-cell drawn-cell">
          <span>DRAWN BY</span>
          <b>THE PEOPLE</b>
          <span>REVISION</span>
          <b>ONGOING</b>
          <span>SCALE</span>
          <b>HUMAN</b>
        </div>
        <div className="title-cell contact-cell">
          <span>CONTACT / SOCIAL</span>
          <a href="mailto:contact@adropinthecloud.org">CONTACT ↗</a>
          <a href="#action">#NoToPaxSilica ↗</a>
          <a href="#research">SOURCE REGISTER ↗</a>
          <a href="#action">TAKE ACTION ↗</a>
        </div>
        <div className="title-cell sheet-cell">
          <span>SHEET</span>
          <b>F-001</b>
          <span>STATUS</span>
          <b>FOR PUBLIC ACTION</b>
          <span>DATE</span>
          <b>2026</b>
        </div>
        <div className="title-cell sources-cell">
          <span>DATA SOURCES</span>
          <small>
            BOI PH, CSO Ireland (2023), CBS Netherlands (2025), LBNL (2024), French Ministry of
            Ecological Transition (2023), Singapore MDDI (2024), Frontiers in Climate, AGU Advances,
            MIT News, EESI, EHP, Harvard Gazette, Bulatlat, Inquirer, HRW &amp; NPR. Interactive
            scenarios and simulator figures are working illustrative estimates derived from cited
            benchmarks.
          </small>
        </div>
      </footer>

      {zoomedReality !== null && (
        <div
          className="flashcard-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="flashcard-modal-title"
          onClick={() => setZoomedReality(null)}
        >
          <article className="flashcard-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              ref={realityCloseRef}
              className="flashcard-modal-close"
              onClick={() => setZoomedReality(null)}
              aria-label="Close zoomed flashcard"
            >
              ×
            </button>
            <div className="flashcard-modal-head">
              <span>
                PAX SILICA · PROJECT BRIEF / P.{String(zoomedReality + 1).padStart(2, "0")}
              </span>
              <span>CLAIM / FIELD CONDITION</span>
            </div>
            <h3 id="flashcard-modal-title">{realityPairs[zoomedReality].claim}</h3>
            <div className="flashcard-modal-body">
              <section className="flashcard-modal-side flashcard-modal-claim">
                <small>WHAT THEY SAY</small>
                <p>“{realityPairs[zoomedReality].claim}”</p>
                <span>{realityPairs[zoomedReality].claimSource}</span>
              </section>
              <section className="flashcard-modal-side flashcard-modal-field">
                <small>WHAT'S ON THE GROUND</small>
                <p>{realityPairs[zoomedReality].fieldNote}</p>
                <span>{realityPairs[zoomedReality].fieldSource}</span>
              </section>
            </div>
            <p className="flashcard-modal-note">
              PREV / NEXT LIFTS THE NEXT CARD. CLICK OUTSIDE TO CLOSE.
            </p>
          </article>
        </div>
      )}

      {activeMyth !== null && (
        <div
          className="myth-modal z-[100]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="myth-modal-title"
          onClick={() => setActiveMyth(null)}
        >
          <article className="myth-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              ref={mythCloseRef}
              className="myth-modal-close"
              onClick={() => setActiveMyth(null)}
              aria-label="Close fact"
            >
              ×
            </button>
            <div className="myth-modal-head">
              <span className="myth-modal-stamp">
                MYTH / {String(activeMyth + 1).padStart(2, "0")}
              </span>
              <span className="myth-modal-fact-badge">FACT CHECK / DEBUNK REGISTER</span>
            </div>
            <h3 id="myth-modal-title">{myths[activeMyth].claim}</h3>
            <p className="myth-modal-divider">CLAIM / FIELD CONDITION</p>
            <p className="myth-modal-fact">{myths[activeMyth].fact}</p>
            <div className="myth-modal-grid">
              <span>{myths[activeMyth].source}</span>
              <span>{myths[activeMyth].debunkNote}</span>
              <span>{myths[activeMyth].verifiedDate}</span>
            </div>
            <button className="myth-modal-done" onClick={() => setActiveMyth(null)}>
              CLOSE ×
            </button>
          </article>
        </div>
      )}

      {article && (
        <div
          className="reading-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={article.title}
          onClick={() => setArticle(null)}
        >
          <article onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setArticle(null)} aria-label="Close article">
              CLOSE ×
            </button>
            <span>
              {article.category} · {article.date}
            </span>
            <h2>{article.title}</h2>
            <h3>{article.source}</h3>
            <p className="article-note">{article.note}</p>
            <p>{article.body}</p>
            <p>{article.sourceNote}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              READ ORIGINAL ↗
            </a>
          </article>
        </div>
      )}
    </div>
  );
}