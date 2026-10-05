import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Category,
  awards,
  categories,
  faqs,
  founderImage,
  heroImage,
  materials,
  nav,
  press,
  process,
  projects,
  services,
  site,
  studioImage,
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

/** Re-observe reveal nodes whenever depsKey changes (fixes filter remount bug). */
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
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach((n) => {
      if (!n.classList.contains("is-visible")) io.observe(n);
    });
    requestAnimationFrame(() => {
      nodes.forEach((n) => {
        if (n.classList.contains("is-visible")) return;
        const r = n.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        if (r.top < vh * 0.96 && r.bottom > 0) {
          n.classList.add("is-visible");
          io.unobserve(n);
        }
      });
    });
    return () => io.disconnect();
  }, [depsKey]);
}

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Category>("All");
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  useReveal(`${filter}:${filtered.length}`);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const type = String(fd.get("type") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = encodeURIComponent(`Project inquiry — ${name || "Client"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`
    );
    setFormStatus("Opening your email client…");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : "is-top"} ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <div className="header-inner">
          <a className="logo" href="#top" aria-label="Maison Noor home">
            <span className="logo-mark" aria-hidden="true">
              ن
            </span>
            <span className="logo-text">
              Maison <em>Noor</em>
              <span className="logo-ar" lang="ar">
                {site.arabic}
              </span>
            </span>
          </a>
          <nav className="nav-desktop" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Start a project
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
      >
        <div className="mobile-menu-inner">
          <p className="eyebrow">Navigate</p>
          <nav aria-label="Mobile">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                style={{ transitionDelay: `${0.05 + i * 0.04}s` }}
              >
                <span className="menu-index">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <a href={`mailto:${site.email}`} onClick={closeMenu}>
              {site.email}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              WhatsApp · {site.whatsappDisplay}
            </a>
            <p>{site.location}</p>
          </div>
        </div>
      </div>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-media">
            <img
              src={heroImage}
              alt="Sunlit living room with limestone walls and soft brass accents"
            />
            <div className="hero-veil" />
            <div className="hero-grain" aria-hidden="true" />
          </div>
          <div className="hero-content">
            <p className="eyebrow brass" data-reveal>
              Architectural interiors · Est. {site.founded} · Riyadh
            </p>
            <h1 data-reveal>
              Quiet rooms.
              <span> Honest materials.</span>
              <span className="hero-line3"> Gulf light.</span>
            </h1>
            <p className="lede" data-reveal>
              {site.name} is a Riyadh studio designing architectural interiors
              and custom furniture for homes and hospitality — material honesty,
              measured colour, and light that belongs to this climate.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="btn btn-primary" href="#work">
                View selected work
              </a>
              <a className="btn btn-ghost" href="#studio">
                Meet the studio
              </a>
            </div>
            <div className="hero-meta" data-reveal>
              <div>
                <strong>60+</strong>
                <span>projects delivered</span>
              </div>
              <div>
                <strong>8</strong>
                <span>years of practice</span>
              </div>
              <div>
                <strong>4</strong>
                <span>cities served</span>
              </div>
            </div>
          </div>
          <a className="scroll-hint" href="#work" aria-label="Scroll to work">
            <span />
            Scroll
          </a>
        </section>

        <div className="press-bar" data-reveal>
          <p className="press-label">As seen in</p>
          <div className="press-names">
            {press.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>

        <section className="section work" id="work">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Spaces with quiet conviction.</h2>
            </div>
            <p className="section-note">
              Residential, hospitality, retail, and bespoke furniture — composed
              around daylight and tactile materials across the Gulf and London.
            </p>
          </div>

          <div
            className="filters"
            role="tablist"
            aria-label="Project filters"
            data-reveal
          >
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
              </button>
            ))}
          </div>

          <p className="filter-count" aria-live="polite">
            {filtered.length} project{filtered.length === 1 ? "" : "s"}
            {filter !== "All" ? ` · ${filter}` : ""}
          </p>

          <div className="work-grid" key={filter}>
            {filtered.map((p, i) => (
              <article
                className={`work-card ${i % 4 === 0 ? "is-feature" : ""}`}
                key={p.id}
                data-reveal
              >
                <div className="work-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="work-overlay">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
                <div className="work-body">
                  <div className="work-meta-row">
                    <h3>{p.title}</h3>
                    {p.area && <span className="work-area">{p.area}</span>}
                  </div>
                  <p className="work-loc">
                    {p.location} · {p.year}
                  </p>
                  <p>{p.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section studio" id="studio">
          <div className="studio-layout">
            <div className="studio-visual" data-reveal>
              <img
                src={studioImage}
                alt="Maison Noor studio interior with natural light"
              />
              <figure className="founder-card">
                <img
                  src={founderImage}
                  alt="Layla Al-Noor, founder of Maison Noor"
                />
                <figcaption>
                  <strong>Layla Al-Noor</strong>
                  <span>Founder & Creative Director</span>
                </figcaption>
              </figure>
            </div>
            <div className="studio-copy" data-reveal>
              <p className="eyebrow">Studio</p>
              <h2>
                We design for the way light
                <em> moves through a Gulf day.</em>
              </h2>
              <p>
                Founded by Layla Al-Noor in 2017, Maison Noor is an interior
                architecture practice working from Riyadh with projects across
                Jeddah, Dubai, and London. We favour honest materials, measured
                colour, and rooms that feel settled rather than staged.
              </p>
              <p>
                Layla trained in architecture at King Saud University and
                completed postgraduate studies in interior architecture in
                Milan. Before founding the studio, she led hospitality interiors
                for a regional developer — learning that calm is a discipline,
                not an aesthetic.
              </p>
              <p>
                Every project begins with site and sun path. Then plan, joinery,
                and atmosphere follow. Quiet luxury is not excess — it is
                clarity.
              </p>
              <dl className="studio-facts">
                <div>
                  <dt>Founder</dt>
                  <dd>Layla Al-Noor</dd>
                </div>
                <div>
                  <dt>Studios</dt>
                  <dd>{site.location}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Homes · Hotels · Retail · Furniture</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2>What we make with you.</h2>
            </div>
            <p className="section-note">
              From first sketch to custom furniture install — one studio, one
              material language.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <article className="service-tile" key={s.num} data-reveal>
                <span className="service-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
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
              Four clear steps from first conversation to first light — swipe on
              mobile, timeline on desktop.
            </p>
          </div>

          <div
            className="process-rail"
            aria-label="How we work — swipe for each step"
            data-reveal
          >
            {process.map((p) => (
              <article className="process-card" key={`rail-${p.step}`}>
                <div className="process-card-top">
                  <span className="service-num">{p.step}</span>
                  <span className="process-pill">Step {p.step}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>

          <ol className="process-timeline" data-reveal>
            {process.map((p) => (
              <li key={`tl-${p.step}`}>
                <span className="timeline-marker" aria-hidden="true">
                  <span className="timeline-dot" />
                </span>
                <div className="timeline-body">
                  <span className="service-num">{p.step}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section materials" id="materials">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Palette</p>
              <h2>Materials we return to.</h2>
            </div>
            <p className="section-note">
              Limestone, brass, linen, cedar, sage plaster — a vocabulary of
              tactility tuned to Gulf light.
            </p>
          </div>
          <div className="materials-strip">
            {materials.map((m) => (
              <figure key={m.name} data-reveal>
                <div
                  className="material-swatch"
                  style={{ background: m.tone }}
                  aria-hidden="true"
                />
                <img src={m.image} alt={m.name} loading="lazy" />
                <figcaption>{m.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section awards" id="awards">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Recognition</p>
              <h2>Awards & press.</h2>
            </div>
          </div>
          <ul className="awards-list">
            {awards.map((a) => (
              <li key={`${a.year}-${a.title}`} data-reveal>
                <span className="award-year">{a.year}</span>
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.org}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section testimonials" id="voices">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Client voices</p>
              <h2>What it feels like to work with us.</h2>
            </div>
          </div>
          <div className="testimonial-rail">
            {testimonials.map((t) => (
              <blockquote key={t.name} data-reveal>
                <p>“{t.quote}”</p>
                <footer>
                  <cite>{t.name}</cite>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
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
              <div
                className={`faq-item ${openFaq === i ? "is-open" : ""}`}
                key={f.q}
              >
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
              <h2>Tell us about the space you imagine.</h2>
              <p className="lede-sm">
                Share a brief, a site, or a feeling. We reply within two business
                days — WhatsApp or email, whichever you prefer.
              </p>
              <ul className="contact-list">
                <li>
                  <span>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {site.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <span>Studio</span>
                  <a href={site.mapsUrl} target="_blank" rel="noreferrer">
                    {site.address}
                  </a>
                </li>
                <li>
                  <span>Presence</span>
                  <span>{site.location}</span>
                </li>
              </ul>
            </div>
            <form className="contact-form" onSubmit={onSubmit} data-reveal>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@studio.com"
                  autoComplete="email"
                />
              </label>
              <label>
                Project type
                <select name="type" defaultValue="Residential">
                  <option>Residential</option>
                  <option>Hospitality</option>
                  <option>Retail</option>
                  <option>Custom furniture</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Site, timeline, atmosphere…"
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send inquiry
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
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Riyadh · Designed for light · Built with care</p>
        </div>
      </footer>

      <div className="sticky-bar">
        <a
          className="sticky-wa"
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a className="sticky-cta" href="#contact">
          Start a project
        </a>
      </div>
    </>
  );
}
