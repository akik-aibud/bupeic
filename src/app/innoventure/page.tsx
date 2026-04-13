import Link from "next/link";
import Image from "next/image";

const tickerItems = [
  "Innoventure 1.0",
  "BUP EIC Flagship",
  "Dual Track Competition",
  "Innovation × Venture",
  "Register Now",
];

const innovationRounds = [
  { label: "Round 01", text: "Case Challenge" },
  { label: "Round 02", text: "Marketing Innovation + OVC" },
  { label: "Semi Finale", text: "Poster Presentation" },
  { label: "Grand Finale", text: "Product Innovation / SBU Launch", final: true },
];

const ventureRounds = [
  { label: "Round 01", text: "Abstract Submission" },
  { label: "Round 02", text: "Pitch Deck + Video Pitch" },
  { label: "Bootcamp", text: "Pitchbook Preparation" },
  { label: "Grand Finale", text: "Final Showcase", final: true },
];

function Star({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function InnoventurePage() {
  return (
    <>
      {/* TOP BAR */}
      <header className="iv-topbar">
        <Link href="/" className="iv-topbar-brand" aria-label="BUP EIC home">
          <Image
            src="/eic-icon.png"
            alt="BUP Entrepreneurship & Innovation Club"
            width={200}
            height={200}
            className="iv-topbar-logo"
            priority
          />
        </Link>
        <div>Season 01 / Issue 01 · 2026</div>
        <div>Dhaka ↗ Bangladesh</div>
      </header>

      {/* HERO */}
      <section className="iv-hero">
        <div className="iv-sparkle sp-1" aria-hidden>
          <Star size={120} />
        </div>
        <div className="iv-sparkle sp-2" aria-hidden>
          <Star size={70} />
        </div>

        <div className="iv-hero-meta iv-rise iv-d1">
          <span>
            Event <strong>Flagship National</strong>
          </span>
          <span>
            Tracks <strong>Innovation + Venture</strong>
          </span>
          <span>
            Format <strong>Multi-round / Bootcamp</strong>
          </span>
          <span>
            Stage <strong>Registration Open</strong>
          </span>
        </div>

        <h1 className="iv-hero-title">
          <span className="iv-hero-word iv-rise iv-d2">
            Inno<em>venture</em>
          </span>
          <span className="iv-hero-season iv-rise iv-d4">
            <span className="iv-stroke">01.0</span>
          </span>
        </h1>

        <div className="iv-hero-sub iv-rise iv-d5">
          <p className="iv-hero-lede">
            BUP Entrepreneurship &amp; Innovation Club presents its flagship
            national competition — two tracks, real sponsor challenges, and a
            runway from first idea to final showcase.
          </p>
          <p className="iv-hero-tag">
            Turn ideas into impact. <br />
            <b>Your moment starts here.</b>
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div className="iv-ticker" aria-hidden>
        <div className="iv-ticker-track">
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup}>
              {tickerItems.map((t, i) => (
                <span key={`${dup}-${i}`} style={{ gap: "2rem" }}>
                  {t}
                  <Star size={22} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* TRACKS */}
      <section className="iv-section">
        <div className="iv-section-label">02 — The Tracks</div>
        <h2 className="iv-section-heading">
          Two routes. <em>One</em> summit.
        </h2>
        <div className="iv-tracks">
          <article className="iv-track">
            <p className="iv-track-num">01</p>
            <h3 className="iv-track-title">
              Innovation <em>Track</em>
            </h3>
            <p className="iv-track-desc">
              A multi-stage, case-driven track where teams solve sponsor-led
              product challenges and develop market-ready concepts with strong
              strategic and marketing focus.
            </p>
            <ul className="iv-rounds">
              {innovationRounds.map((r) => (
                <li key={r.label} className={r.final ? "final" : ""}>
                  <strong>{r.label}</strong>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="iv-track">
            <p className="iv-track-num">02</p>
            <h3 className="iv-track-title">
              Venture <em>Track</em>
            </h3>
            <p className="iv-track-desc">
              A structured startup track guiding teams from idea to execution —
              refining scalable ventures through validation, mentorship, and
              investor-style pitching.
            </p>
            <ul className="iv-rounds">
              {ventureRounds.map((r) => (
                <li key={r.label} className={r.final ? "final" : ""}>
                  <strong>{r.label}</strong>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* PRIZE */}
      <section className="iv-section">
        <div className="iv-section-label">03 — Grand Prize Pool</div>
        <div className="iv-prize">
          <div>
            <p className="iv-prize-amount">
              <span className="iv-taka">BDT</span>
              <span className="iv-prize-tba">XX</span>
            </p>
            <span className="iv-prize-note">
              Total purse across both tracks · announced soon
            </span>
          </div>
          <p className="iv-prize-copy">
            Cash rewards, mentorship hours, sponsor internships, and a
            fast-lane into <em>real investor rooms</em>. The finale isn&apos;t a
            ceremony — it&apos;s a launchpad.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="iv-cta">
        <h2>
          Ready? <em>Register</em> your team.
        </h2>
        <Link href="/events" className="iv-cta-button">
          Register Now
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden>
            <path d="M0 7 H25 M18 1 L25 7 L18 13" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Link>
        <p className="iv-cta-meta">
          Limited team slots · Rolling selection · BUP Campus, Dhaka
        </p>
      </section>

      {/* SPONSORS */}
      <section className="iv-sponsors">
        <div className="iv-sponsor">
          <span className="iv-sponsor-label">Sponsored by</span>
          <span className="iv-sponsor-name">TBA</span>
          <span className="iv-sponsor-tba">Partner reveal soon</span>
        </div>
        <div className="iv-sponsor">
          <span className="iv-sponsor-label">Co-Sponsored by</span>
          <span className="iv-sponsor-name">TBA</span>
          <span className="iv-sponsor-tba">Partner reveal soon</span>
        </div>
        <div className="iv-sponsor">
          <span className="iv-sponsor-label">Powered by</span>
          <div className="iv-sponsor-brand">
            <Image
              src="/eic-icon.png"
              alt=""
              width={260}
              height={260}
              className="iv-sponsor-icon"
            />
            <Image
              src="/eic-wordmark.png"
              alt="BUP Entrepreneurship & Innovation Club"
              width={420}
              height={120}
              className="iv-sponsor-wordmark"
            />
          </div>
        </div>
      </section>

      {/* FOOT */}
      <footer className="iv-foot">
        <span>© BUP Entrepreneurship &amp; Innovation Club</span>
        <span>
          Back to <Link href="/">bupeic.org</Link>
        </span>
        <span>Innoventure / 1.0 / 2026</span>
      </footer>
    </>
  );
}
