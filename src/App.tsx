import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Category,
  Project,
  awards,
  categories,
  faqs,
  founderImage,
  heroImage,
  heroImageMobile,
  materials,
  nav,
  press,
  process,
  projects,
  services,
  site,
  studioImage,
  team,
  testimonials,
} from "./data";

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Re-observe reveal nodes whenever depsKey changes (keeps filtered cards visible). */
function useReveal(depsKey: string | number) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach((n) => {
      if (!n.classList.contains("is-visible")) io.observe(n);
    });
    requestAnimationFrame(() => {
      nodes.forEach((n) => {
        if (n.classList.contains("is-visible")) return;
        const r = n.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) * 0.96 && r.bottom > 0) {
          n.classList.add("is-visible");
          io.unobserve(n);
        }
      });
    });
    return () => io.disconnect();
  }, [depsKey]);
}

/** Tracks which child of a horizontal scroller is closest to the left edge. */
function useRailIndex(count: number, resetKey?: string) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setIndex(0);
    el.scrollTo({ left: 0 });
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (!kids.length) return;
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const base = el.getBoundingClientRect().left + pad;
      let best = 0;
      let bestD = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.getBoundingClientRect().left - base);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = kids.length - 1;
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, resetKey]);
  const go = (i: number) => {
    const el = ref.current;
    const kid = el?.children[i] as HTMLElement | undefined;
    if (!el || !kid) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const delta = kid.getBoundingClientRect().left - el.getBoundingClientRect().left - pad;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  };
  return { ref, index, go };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}

function RailDots({
  count,
  index,
  go,
  label,
  dark,
}: {
  count: number;
  index: number;
  go: (i: number) => void;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={`rail-dots ${dark ? "is-dark" : ""}`} aria-label={label}>
      <span className="rail-count">
        {String(index + 1).padStart(2, "0")}
        <i>/</i>
        {String(count).padStart(2, "0")}
      </span>
      <div className="rail-track" aria-hidden="true">
        <span style={{ width: `${((index + 1) / count) * 100}%` }} />
      </div>
      <div className="rail-arrows">
        <button type="button" aria-label="Previous" disabled={index === 0} onClick={() => go(index - 1)}>
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={index >= count - 1}
          onClick={() => go(index + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}

const Icon = {
  work: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>
  ),
  studio: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V9l8-5 8 5v11"/><path d="M9.5 20v-6h5v6"/></svg>
  ),
  process: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/></svg>
  ),
};

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Category>("All");
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    projects.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
    return c;
  }, []);

  useReveal(`${filter}:${filtered.length}`);
  const workRail = useRailIndex(filtered.length, filter);
  const processRail = useRailIndex(process.length);
  const voiceRail = useRailIndex(testimonials.length);
  const active = useActiveSection(["top", "work", "studio", "services", "process", "faq", "contact"]);

  const overlay = menuOpen || !!selected;
  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [overlay]);

  const closeMenu = () => setMenuOpen(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const subject = encodeURIComponent(`Project enquiry — ${get("name") || "Client"}`);
    const body = encodeURIComponent(
      `Name: ${get("name")}\nEmail: ${get("email")}\nPhone: ${get("phone")}\nProject type: ${get(
        "type"
      )}\nCity: ${get("city")}\nApprox. size: ${get("size")}\n\n${get("message")}`
    );
    setFormStatus("Opening your email app… we reply within 48 hours.");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const dock = [
    { href: "#work", id: "work", label: "Work", icon: Icon.work },
    { href: "#studio", id: "studio", label: "Studio", icon: Icon.studio },
    { href: "#process", id: "process", label: "Process", icon: Icon.process },
  ];

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : "is-top"} ${menuOpen ? "menu-open" : ""}`}
      >
        <div className="header-inner">
          <a className="logo" href="#top" aria-label="Maison Noor home" onClick={closeMenu}>
            <span className="logo-mark" aria-hidden="true">
              ن
            </span>
            <span className="logo-text">
              Maison <em>Noor</em>
            </span>
          </a>
          <nav className="nav-desktop" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={active === item.href.slice(1) ? "is-active" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Book a consultation
          </a>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          <p className="menu-status">
            <span className="status-dot" /> {site.booking}
          </p>
          <nav aria-label="Mobile">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                style={{ transitionDelay: menuOpen ? `${0.06 + i * 0.04}s` : "0s" }}
              >
                <span className="menu-index">0{i + 1}</span>
                <span className="menu-label">{item.label}</span>
                <span className="menu-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>
          <div className="menu-card">
            <div>
              <strong>Visit the studio</strong>
              <span>{site.address}</span>
              <span>{site.hours}</span>
            </div>
            <div className="menu-card-actions">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                WhatsApp
              </a>
              <a href={`mailto:${site.email}`} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-media">
            <picture>
              <source media="(max-width: 700px)" srcSet={heroImageMobile} />
              <img
                src={heroImage}
                alt="Living room with a long clerestory window, limestone tones and brass lighting"
                fetchPriority="high"
              />
            </picture>
            <div className="hero-veil" />
          </div>
          <div className="hero-content">
            <p className="hero-status" data-reveal>
              <span className="status-dot" /> {site.booking}
            </p>
            <h1 data-reveal>
              Homes that stay calm
              <span> long after the reveal.</span>
            </h1>
            <p className="lede" data-reveal>
              We’re a 14-person interior architecture studio in Riyadh. Since {site.founded}{" "}
              we’ve handed over 63 villas, apartments, hotels and stores — designed around how
              families here actually live, and built to the budget we agree on day one.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="btn btn-primary" href="#work">
                See 12 projects
              </a>
              <a className="btn btn-ghost" href="#contact">
                Book a consultation
              </a>
            </div>
          </div>
          <div className="hero-strip" data-reveal>
            {team.map((t) => (
              <div key={t.v}>
                <strong>{t.k}</strong>
                <span>{t.v}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="press-bar" aria-label="Featured in">
          <p className="press-label">Featured in</p>
          <div className="press-marquee">
            <div className="press-names">
              {[...press, ...press].map((name, i) => (
                <span key={`${name}-${i}`} aria-hidden={i >= press.length}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="section work" id="work">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Selected work · 2023–2025</p>
              <h2>Twelve recent projects.</h2>
            </div>
            <p className="section-note">
              Real briefs, real constraints: a 40-guest majlis, a salt-air beach house, a hotel
              prototype that changed eleven details. Tap any project for the full story.
            </p>
          </div>

          <div className="filters-wrap">
            <div className="filters" role="tablist" aria-label="Project filters">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  className={filter === c ? "is-active" : ""}
                  onClick={() => setFilter(c)}
                >
                  {c}
                  <sup>{counts[c] || 0}</sup>
                </button>
              ))}
            </div>
          </div>

          <div className="work-grid" key={filter} ref={workRail.ref}>
            {filtered.map((p) => (
              <article className="work-card" key={p.id} data-reveal>
                <button
                  type="button"
                  className="work-hit"
                  onClick={() => setSelected(p)}
                  aria-label={`Open ${p.title} project details`}
                >
                  <div className="work-image">
                    <img src={p.thumb} alt={`${p.title}, ${p.location}`} loading="lazy" width={640} height={480} />
                    <span className="work-tag">{p.category}</span>
                  </div>
                  <div className="work-body">
                    <div className="work-meta-row">
                      <h3>{p.title}</h3>
                      <span className="work-year">{p.year}</span>
                    </div>
                    <p className="work-loc">
                      {p.location} · {p.area}
                    </p>
                    <p className="work-blurb">{p.blurb}</p>
                    <span className="work-more">
                      View project <i aria-hidden="true">→</i>
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
          <div className="mobile-only">
            <RailDots
              count={filtered.length}
              index={workRail.index}
              go={workRail.go}
              label="Project slider position"
            />
          </div>
        </section>

        <section className="section studio" id="studio">
          <div className="studio-layout">
            <div className="studio-visual" data-reveal>
              <img src={studioImage} alt="Maison Noor studio on Al Takhassusi Road" loading="lazy" />
              <figure className="founder-card">
                <img src={founderImage} alt="Layla Al-Noor, founder of Maison Noor" loading="lazy" />
                <figcaption>
                  <strong>Layla Al-Noor</strong>
                  <span>Founder & Creative Director</span>
                </figcaption>
              </figure>
            </div>
            <div className="studio-copy" data-reveal>
              <p className="eyebrow">Studio</p>
              <h2>
                Small enough to answer the phone.
                <em> Large enough to run a hotel.</em>
              </h2>
              <p>
                Layla Al-Noor started the studio in 2017 after eight years leading hospitality
                interiors for a regional developer. Today we’re fourteen people: interior
                architects, a joinery designer, a lighting specialist, two site managers and a
                procurement lead.
              </p>
              <p>
                We take around twelve projects a year so the same designer stays with you from
                first sketch to handover. Every project starts on site — with the sun path, the
                plumbing and the way your family uses each room.
              </p>
              <blockquote className="studio-quote">
                “A room should still feel calm on an ordinary Tuesday, with the kids home and
                guests at eight.”
                <cite>— Layla Al-Noor</cite>
              </blockquote>
              <dl className="studio-facts">
                <div>
                  <dt>Team</dt>
                  <dd>14 in Riyadh</dd>
                </div>
                <div>
                  <dt>Projects / year</dt>
                  <dd>~12</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>Arabic · English · Italian</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Services & fees</p>
              <h2>What we do, and what it costs.</h2>
            </div>
            <p className="section-note">
              Clear starting fees so you know if we’re a fit before the first meeting. Every
              project gets a written, fixed proposal.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <article className="service-tile" key={s.num} data-reveal>
                <span className="service-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="service-from">{s.from}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section process" id="process">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">How we work</p>
              <h2>How we work with you.</h2>
            </div>
            <p className="section-note">
              Four stages, fixed deliverables, and a clear sign-off at each one. Most villa
              projects reach site in 16 weeks.
            </p>
          </div>

          <div className="process-rail" ref={processRail.ref} aria-label="How we work — swipe for each step">
            {process.map((p) => (
              <article className="process-card" key={p.step}>
                <div className="process-card-top">
                  <span className="process-step">{p.step}</span>
                  <span className="process-pill">{p.time}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <p className="process-deliverable">
                  <span>You receive</span>
                  {p.deliverable}
                </p>
              </article>
            ))}
          </div>
          <div className="mobile-only">
            <RailDots
              count={process.length}
              index={processRail.index}
              go={processRail.go}
              label="Process step position"
              dark
            />
          </div>
        </section>

        <section className="section materials" id="materials">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Material library</p>
              <h2>Materials we return to.</h2>
            </div>
            <p className="section-note">
              Six materials appear in most of our projects. Samples live in the studio — come and
              touch them.
            </p>
          </div>
          <div className="materials-strip">
            {materials.map((m) => (
              <figure key={m.name} data-reveal>
                <div className="material-swatch" style={{ background: m.texture }} aria-hidden="true" />
                <figcaption>
                  <strong>{m.name}</strong>
                  <span>{m.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section testimonials" id="voices">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Client voices</p>
              <h2>In our clients’ words.</h2>
            </div>
          </div>
          <div className="testimonial-rail" ref={voiceRail.ref}>
            {testimonials.map((t) => (
              <blockquote key={t.name}>
                <p>“{t.quote}”</p>
                <footer>
                  <span className="t-avatar" aria-hidden="true">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <cite>{t.name}</cite>
                    <span>{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mobile-only">
            <RailDots
              count={testimonials.length}
              index={voiceRail.index}
              go={voiceRail.go}
              label="Testimonial position"
            />
          </div>

          <ul className="awards-list">
            {awards.map((a) => (
              <li key={`${a.year}-${a.title}`}>
                <span className="award-year">{a.year}</span>
                <strong>{a.title}</strong>
                <span>{a.org}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section faq" id="faq">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">FAQ</p>
              <h2>Questions, answered plainly.</h2>
            </div>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "is-open" : ""}`} key={f.q}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-grid">
            <div data-reveal>
              <p className="eyebrow">Contact</p>
              <h2>Tell us about your space.</h2>
              <p className="lede-sm">
                A floor plan, a few photos, or just a voice note on WhatsApp is enough to start. We
                reply within 48 hours with a short call slot and a fee range.
              </p>
              <ul className="contact-list">
                <li>
                  <span>WhatsApp</span>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                    {site.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span>Studio</span>
                  <a href={site.mapsUrl} target="_blank" rel="noreferrer">
                    {site.address}
                  </a>
                </li>
                <li>
                  <span>Hours</span>
                  <span>{site.hours}</span>
                </li>
              </ul>
            </div>
            <form className="contact-form" onSubmit={onSubmit} data-reveal>
              <div className="form-row">
                <label>
                  Name
                  <input name="name" type="text" required placeholder="Your name" autoComplete="name" />
                </label>
                <label>
                  Phone
                  <input name="phone" type="tel" placeholder="+966" autoComplete="tel" inputMode="tel" />
                </label>
              </div>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>
              <div className="form-row">
                <label>
                  Project type
                  <select name="type" defaultValue="Villa / home">
                    <option>Villa / home</option>
                    <option>Apartment</option>
                    <option>Single room / majlis</option>
                    <option>Hospitality</option>
                    <option>Retail</option>
                    <option>Custom furniture</option>
                  </select>
                </label>
                <label>
                  City
                  <select name="city" defaultValue="Riyadh">
                    <option>Riyadh</option>
                    <option>Jeddah</option>
                    <option>Khobar / Dammam</option>
                    <option>Dubai</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <fieldset className="size-chips">
                <legend>Approx. size</legend>
                {["< 150 m²", "150–400 m²", "400–800 m²", "800 m² +"].map((s, i) => (
                  <label key={s}>
                    <input type="radio" name="size" value={s} defaultChecked={i === 1} />
                    <span>{s}</span>
                  </label>
                ))}
              </fieldset>
              <label>
                Message
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Timeline, budget range, what isn’t working today…"
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send enquiry
              </button>
              {formStatus && <p className="form-status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <p className="logo-text">
              Maison <em>Noor</em>
              <span className="logo-ar" lang="ar">
                {" "}
                {site.arabic}
              </span>
            </p>
            <p className="footer-tag">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-social">
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.name} Interiors. CR 1010XXXXXX · Riyadh, KSA
          </p>
          <p>{site.address}</p>
        </div>
      </footer>

      {/* Mobile floating dock */}
      <nav className={`dock ${scrolled && !overlay ? "is-visible" : ""}`} aria-label="Quick navigation">
        {dock.map((d) => (
          <a key={d.id} href={d.href} className={active === d.id ? "is-active" : ""}>
            {d.icon}
            <span>{d.label}</span>
          </a>
        ))}
        <a
          className="dock-wa"
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          {Icon.chat}
          <span>Chat</span>
        </a>
        <a className="dock-cta" href="#contact">
          Enquire
        </a>
      </nav>

      {/* Project detail sheet */}
      <div
        className={`sheet-backdrop ${selected ? "is-open" : ""}`}
        onClick={() => setSelected(null)}
        aria-hidden="true"
      />
      <div
        className={`sheet ${selected ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={selected ? `${selected.title} details` : "Project details"}
        aria-hidden={!selected}
      >
        {selected && (
          <>
            <div className="sheet-grab" aria-hidden="true" />
            <button type="button" className="sheet-close" onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>
            <div className="sheet-scroll">
              <div className="sheet-image">
                <img src={selected.image} alt={`${selected.title}, ${selected.location}`} />
              </div>
              <div className="sheet-body">
                <p className="eyebrow brass">
                  {selected.category} · {selected.year}
                </p>
                <h3>{selected.title}</h3>
                <p className="sheet-loc">{selected.location}</p>
                <dl className="sheet-facts">
                  <div>
                    <dt>Size</dt>
                    <dd>{selected.area}</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>{selected.duration}</dd>
                  </div>
                  <div className="wide">
                    <dt>Scope</dt>
                    <dd>{selected.scope}</dd>
                  </div>
                </dl>
                <p className="sheet-story">{selected.story}</p>
                <div className="sheet-materials">
                  {selected.materials.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <p className="sheet-credit">{selected.credit}</p>
                <a className="btn btn-primary sheet-cta" href="#contact" onClick={() => setSelected(null)}>
                  Start a similar project
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
