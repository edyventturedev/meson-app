import React, { useState, useRef, useEffect } from "react";
import { Ico } from "./icons.jsx";
import {
  ROOMS, GROUP, AMENITIES, NEARBY, NAV, HERO_VIDEO_ID, SYSTEM_PROMPT, QUICK,
} from "./data.js";
import { useLang } from "./i18n.js";

// ============================================================
//  HOTEL MESÓN DEL MARQUÉS — v2 · Apple / Liquid Glass
//  Grupo Mesones · Valladolid, Yucatán · por Audax Project
// ============================================================

// --- Selector de idioma (pill glass, ES / EN) ----------------

function LangSwitch({ className = "" }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t("lang.label")}>
      {/* Thumb deslizante: se mueve entre ES/EN con resorte tipo iOS */}
      <span className="lang-thumb" aria-hidden="true" style={{ transform: lang === "en" ? "translateX(100%)" : "translateX(0%)" }} />
      <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")} aria-pressed={lang === "es"}>ES</button>
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
    </div>
  );
}

// --- Booking bar (glass) ------------------------------------

function BookingBar({ onReserve }) {
  const { t } = useLang();
  const today = new Date();
  const fmt = (d) => d.toISOString().slice(0, 10);
  const [ci, setCi] = useState(fmt(new Date(today.getTime() + 86400000)));
  const [co, setCo] = useState(fmt(new Date(today.getTime() + 3 * 86400000)));
  const [g, setG] = useState(2);

  return (
    <div className="bookbar glass">
      <div className="bb-field">
        <label><Ico.cal s={15} /> {t("booking.arrival")}</label>
        <input type="date" value={ci} min={fmt(today)} onChange={(e) => setCi(e.target.value)} />
      </div>
      <div className="bb-field">
        <label><Ico.cal s={15} /> {t("booking.departure")}</label>
        <input type="date" value={co} min={ci} onChange={(e) => setCo(e.target.value)} />
      </div>
      <div className="bb-field">
        <label><Ico.users s={15} /> {t("booking.guests")}</label>
        <select value={g} onChange={(e) => setG(+e.target.value)}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? t("booking.guest") : t("booking.guestsPlural")}</option>
          ))}
        </select>
      </div>
      <button className="pill pill-dark bb-cta" onClick={() => onReserve({ ci, co, g })}>
        {t("booking.cta")} <Ico.arrow />
      </button>
    </div>
  );
}

// --- AI Concierge -------------------------------------------

function Concierge({ open, onClose }) {
  const { lang, t } = useLang();
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: t("concierge.welcome") },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, busy]);

  // Si el idioma cambia antes de que la conversación arranque, refrescamos el saludo
  useEffect(() => {
    setMsgs((m) => (m.length === 1 && m[0].role === "assistant" ? [{ role: "assistant", content: t("concierge.welcome") }] : m));
  }, [lang]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    const next = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT[lang],
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      setMsgs((m) => [...m, { role: "assistant", content: reply || t("concierge.retry") }]);
    } catch (e) {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: t("concierge.connectionError") },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className={`cx-scrim ${open ? "on" : ""}`} onClick={onClose} />
      <aside className={`cx glass-strong ${open ? "on" : ""}`} role="dialog" aria-label={t("concierge.dialogLabel")}>
        <header className="cx-head">
          <div className="cx-brand">
            <span className="cx-mark"><Ico.spark s={16} /></span>
            <div>
              <strong>{t("concierge.title")}</strong>
              <small>Mesón del Marqués</small>
            </div>
          </div>
          <button className="cx-x" onClick={onClose} aria-label={t("concierge.close")}><Ico.close /></button>
        </header>

        <div className="cx-body" ref={scrollRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`cx-msg ${m.role}`}>{m.content}</div>
          ))}
          {busy && (
            <div className="cx-msg assistant">
              <span className="cx-typing"><i /><i /><i /></span>
            </div>
          )}
        </div>

        {msgs.length <= 2 && (
          <div className="cx-quick">
            {QUICK[lang].map((q) => (
              <button key={q} className="pill pill-soft" onClick={() => send(q)}>{q}</button>
            ))}
          </div>
        )}

        <div className="cx-input glass">
          <input
            value={input}
            placeholder={t("concierge.placeholder")}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button onClick={() => send()} disabled={busy} aria-label={t("concierge.send")}><Ico.send /></button>
        </div>
      </aside>
    </>
  );
}

// --- Sections -----------------------------------------------

function Hero({ onReserve, onChat }) {
  const { t } = useLang();
  return (
    <section id="inicio" className="hero">
      <div className="hero-video-wrap" aria-hidden="true">
        <iframe
          className="hero-video"
          src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
          title="Video de fondo — Mesón del Marqués"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
      </div>
      <div className="hero-veil" />
      <div className="hero-inner">
        <span className="eyebrow light">{t("hero.eyebrow")}</span>
        <h1 className="hero-title">
          {t("hero.titleBefore")}<em>{t("hero.titleEm")}</em>,<br />{t("hero.titleAfter")}
        </h1>
        <p className="hero-sub">{t("hero.sub")}</p>
        <div className="hero-actions">
          <button className="pill pill-gold lg" onClick={onReserve}>{t("hero.reserve")}</button>
          <button className="pill pill-glass lg" onClick={onChat}>
            <Ico.spark s={16} /> {t("hero.chat")}
          </button>
        </div>
        <div className="hero-badges glass-chip">
          <span className="stars"><Ico.star /><Ico.star /><Ico.star /><Ico.star /></span>
          {t("hero.travellers")}
          <span className="dot" />
          {t("hero.distintivos")}
          <span className="dot" />
          {t("hero.roomsBadge")}
        </div>
      </div>
    </section>
  );
}

function BookingAnchor({ onReserve }) {
  return (
    <section id="reservar" className="book-anchor">
      <div className="wrap"><BookingBar onReserve={onReserve} /></div>
    </section>
  );
}

function Intro() {
  const { t } = useLang();
  return (
    <section className="intro">
      <div className="wrap intro-grid">
        <div className="intro-copy">
          <span className="eyebrow gold">{t("intro.eyebrow")}</span>
          <h2 className="h2">{t("intro.title")}</h2>
          <p>{t("intro.p1")}</p>
          <p>{t("intro.p2")}</p>
        </div>
        <div className="intro-stats">
          {t("intro.stats").map(([n, l]) => (
            <div key={l} className="stat glass-card">
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rooms({ onReserve, onChat }) {
  const { lang, t } = useLang();
  const locale = lang === "en" ? "en-US" : "es-MX";
  return (
    <section id="habitaciones" className="rooms">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow gold">{t("rooms.eyebrow")}</span>
          <h2 className="h2">{t("rooms.title")}</h2>
          <p className="sec-lead">{t("rooms.lead")}</p>
        </div>
        <div className="room-grid">
          {ROOMS[lang].map((r) => (
            <article key={r.id} className="room glass-card">
              <div className="room-img" style={{ backgroundImage: `url(${r.img})` }}>
                <span className="room-size glass-chip">{r.size}</span>
              </div>
              <div className="room-body">
                <div className="room-top">
                  <h3>{r.name}</h3>
                  <div className="room-price">
                    <small>{t("rooms.from")}</small>
                    <strong>${r.from.toLocaleString(locale)}</strong>
                    <small>{t("rooms.perNight")}</small>
                  </div>
                </div>
                <p>{r.blurb}</p>
                <div className="room-tags">
                  {r.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="room-actions">
                  <button className="pill pill-gold sm" onClick={onReserve}>{t("rooms.reserve")}</button>
                  <button className="pill pill-line sm" onClick={onChat}>{t("rooms.ask")}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Group() {
  const { lang, t } = useLang();
  const group = GROUP[lang];
  const [active, setActive] = useState(group[0].id);
  const cur = group.find((g) => g.id === active) || group[0];
  return (
    <section id="grupo" className="group">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow gold">{t("group.eyebrow")}</span>
          <h2 className="h2 light">{t("group.title")}</h2>
          <p className="sec-lead light">{t("group.lead")}</p>
        </div>
        <div className="group-layout">
          <div className="group-tabs">
            {group.map((g) => (
              <button key={g.id} className={`gtab glass ${active === g.id ? "on" : ""}`} onClick={() => setActive(g.id)}>
                <span className="gtab-kind">{g.kind}</span>
                <span className="gtab-name">{g.name}</span>
                <Ico.arrow />
              </button>
            ))}
          </div>
          <div className="group-feature" style={{ backgroundImage: `url(${cur.img})` }}>
            <div className="gf-veil" />
            <div className="gf-body glass-panel">
              <span className="gf-kind">{cur.kind}</span>
              <h3>{cur.name}</h3>
              <p>{cur.desc}</p>
              <button className="pill pill-gold sm">{t("group.cta")} <Ico.arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  const { lang, t } = useLang();
  return (
    <section className="amen">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow gold">{t("amenities.eyebrow")}</span>
          <h2 className="h2">{t("amenities.title")}</h2>
        </div>
        <div className="amen-grid">
          {AMENITIES[lang].map((label) => (
            <div key={label} className="amen-pill glass-card">{label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  const { lang, t } = useLang();
  return (
    <section id="experiencias" className="exp">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow gold">{t("experiences.eyebrow")}</span>
          <h2 className="h2">{t("experiences.title")}</h2>
          <p className="sec-lead">{t("experiences.lead")}</p>
        </div>
        <div className="exp-grid">
          {NEARBY[lang].map((n) => (
            <article key={n.name} className="exp-card" style={{ backgroundImage: `url(${n.img})` }}>
              <div className="exp-veil" />
              <div className="exp-body">
                <span className="exp-dist glass-chip">{n.dist}</span>
                <h3>{n.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ onChat }) {
  const { t } = useLang();
  return (
    <section className="cta-band">
      <div className="wrap cta-inner glass-panel">
        <div>
          <span className="eyebrow gold">{t("cta.eyebrow")}</span>
          <h2 className="h2 light">{t("cta.title")}</h2>
          <p className="sec-lead light">{t("cta.lead")}</p>
        </div>
        <button className="pill pill-gold lg" onClick={onChat}>
          <Ico.spark s={18} /> {t("cta.chat")}
        </button>
      </div>
    </section>
  );
}

function Footer() {
  const { lang, t } = useLang();
  return (
    <footer id="contacto" className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <div className="foot-logo">
            <small>HOTEL</small>
            <strong>Mesón del Marqués</strong>
            <small>VALLADOLID</small>
          </div>
          <p>{t("footer.address")}</p>
        </div>
        <div className="foot-col">
          <h4>{t("footer.contact")}</h4>
          <a href="tel:+529858563042">+52 (985) 856 3042</a>
          <a href="mailto:reservaciones@mesondelmarques.com">reservaciones@mesondelmarques.com</a>
          <a href="https://wa.link/89xi0e" target="_blank" rel="noreferrer">{t("footer.whatsapp")} · +52 986 105 1165</a>
        </div>
        <div className="foot-col">
          <h4>{t("footer.group")}</h4>
          {GROUP[lang].map((g) => <a key={g.id} href="#grupo">{g.name}</a>)}
        </div>
        <div className="foot-col">
          <h4>{t("footer.follow")}</h4>
          <a href="https://www.instagram.com/hotelmesondelmarques/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/HotelMesondelMarques/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="#" rel="noreferrer">TripAdvisor</a>
        </div>
      </div>
      <div className="foot-base">
        <span>© {new Date().getFullYear()} Grupo Mesones · {t("footer.rights")}</span>
        <span>{t("footer.redesign")}</span>
      </div>
    </footer>
  );
}

// --- Shell --------------------------------------------------

function Nav({ scrolled, onChat, active, go }) {
  const { lang, t } = useLang();
  const [openM, setOpenM] = useState(false);
  const nav = (id) => { setOpenM(false); go(id); };
  return (
    <>
      <header className={`nav ${scrolled ? "solid glass" : ""}`}>
        <div className="wrap nav-in">
          <button className="brand" onClick={() => nav("inicio")}>
            <small>HOTEL</small>
            <strong>Mesón del Marqués</strong>
          </button>
          <nav className="nav-links">
            {NAV[lang].map((n) => (
              <button key={n.id} className={active === n.id ? "on" : ""} onClick={() => nav(n.id)}>{n.label}</button>
            ))}
          </nav>
          <div className="nav-right">
            <button className="pill pill-line sm hide-mob" onClick={onChat}>{t("nav.concierge")}</button>
            <LangSwitch />
            <button className="pill pill-gold sm" onClick={() => nav("reservar")}>{t("nav.reserve")}</button>
            <button className="burger" onClick={() => setOpenM((v) => !v)} aria-label={t("nav.menu")}><span /><span /><span /></button>
          </div>
        </div>
      </header>
      <div className={`mobmenu glass-strong ${openM ? "on" : ""}`}>
        {NAV[lang].map((n) => <button key={n.id} onClick={() => nav(n.id)}>{n.label}</button>)}
        <div className="mobmenu-lang">
          <LangSwitch className="lg" />
        </div>
        <button className="mob-chat" onClick={() => { setOpenM(false); onChat(); }}>
          <Ico.spark s={16} /> {t("nav.concierge")}
        </button>
      </div>
    </>
  );
}

function Dock({ onChat, active, go }) {
  const { t } = useLang();
  const items = [
    { id: "inicio", label: t("dock.home"), ico: Ico.grid },
    { id: "habitaciones", label: t("dock.rooms"), ico: Ico.bed },
    { id: "reservar", label: t("dock.book"), ico: Ico.cal, primary: true },
    { id: "experiencias", label: t("dock.area"), ico: Ico.pin },
    { id: "chat", label: t("dock.concierge"), ico: Ico.spark, chat: true },
  ];
  return (
    <nav className="dock glass-strong">
      {items.map((it) => (
        <button key={it.id} className={`dock-btn ${it.primary ? "primary" : ""} ${active === it.id ? "on" : ""}`}
          onClick={() => (it.chat ? onChat() : go(it.id))}>
          <it.ico s={22} />
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["inicio", "habitaciones", "grupo", "experiencias", "contacto"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const openChat = () => setChatOpen(true);
  const reserve = () => go("reservar");

  return (
    <div className="site">
      <Nav scrolled={scrolled} onChat={openChat} active={active} go={go} />
      <main>
        <Hero onReserve={reserve} onChat={openChat} />
        <BookingAnchor onReserve={() => openChat()} />
        <Intro />
        <Rooms onReserve={reserve} onChat={openChat} />
        <Group />
        <Amenities />
        <Experiences />
        <CTA onChat={openChat} />
      </main>
      <Footer />
      <Dock onChat={openChat} active={active} go={go} />
      <button className="fab glass-strong" onClick={openChat} aria-label="Concierge"><Ico.spark s={20} /></button>
      <Concierge open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
