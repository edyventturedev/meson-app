// ============================================================
//  i18n — Sistema de idiomas (Español / Inglés)
//  LangProvider expone { lang, setLang, t } vía el hook useLang().
//  No usa JSX (archivo .js) para no depender de configuración extra
//  de Vite/esbuild: se arma el árbol con React.createElement.
// ============================================================
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mm-lang";
const DEFAULT_LANG = "es";

// Diccionario de textos de interfaz que NO viven en data.js
// (los datos de ROOMS, GROUP, AMENITIES, NEARBY, NAV, QUICK y SYSTEM_PROMPT
// se traducen directamente en data.js).
export const translations = {
  es: {
    nav: { concierge: "Concierge", reserve: "Reservar", menu: "Menú", close: "Cerrar menú" },
    dock: { home: "Inicio", rooms: "Cuartos", book: "Reservar", area: "Zona", concierge: "Concierge" },
    lang: { label: "Idioma" },
    hero: {
      eyebrow: "Valladolid · Pueblo Mágico · Yucatán",
      titleBefore: "Una casona del ",
      titleEm: "siglo XVII",
      titleAfter: "reimaginada para hoy.",
      sub: "Cincuenta años de hospitalidad yucateca frente a la Iglesia de San Servacio. Elegancia colonial, comodidad moderna.",
      reserve: "Reservar estancia",
      chat: "Hablar con el concierge",
      travellers: "Travellers' Choice",
      distintivos: "Distintivos H & M",
      roomsBadge: "85 habitaciones",
    },
    booking: {
      arrival: "Llegada",
      departure: "Salida",
      guests: "Huéspedes",
      guest: "huésped",
      guestsPlural: "huéspedes",
      cta: "Ver disponibilidad",
    },
    intro: {
      eyebrow: "La casa",
      title: "El hotel más cálido de Valladolid, por propios y extraños.",
      p1: "Desarrollado en una antigua casona del siglo XVII, el Mesón del Marqués mezcla la elegancia colonial con las comodidades del mundo moderno. Cada habitación es distinta: ninguna repite historia.",
      p2: "Estamos justo en la plaza principal, a un paso de la Calzada de los Frailes y a corta distancia de Chichén Itzá, Ek Balam y las Coloradas.",
      stats: [
        ["50+", "años de historia"],
        ["85", "habitaciones únicas"],
        ["1 min", "a San Servacio"],
        ["ISO", "9001:2015"],
      ],
    },
    rooms: {
      eyebrow: "Hospedaje",
      title: "Habitaciones",
      lead: "Cuatro categorías, ninguna igual a otra. Elija la suya o pregúntele al concierge cuál le conviene.",
      from: "Desde",
      perNight: "MXN / noche",
      reserve: "Reservar",
      ask: "Preguntar",
    },
    group: {
      eyebrow: "Una sola familia",
      title: "Grupo Mesones",
      lead: "El hotel es el corazón, pero la experiencia completa vive en nuestras casas hermanas.",
      cta: "Conocer",
    },
    amenities: {
      eyebrow: "Todo incluido en la casa",
      title: "Amenidades",
    },
    experiences: {
      eyebrow: "Alrededores",
      title: "Valladolid y la Península",
      lead: "Desde nuestra puerta hasta las maravillas del mundo maya.",
    },
    cta: {
      eyebrow: "¿Aún lo piensa?",
      title: "Nuestro concierge le arma la estancia perfecta.",
      lead: "Dígale qué busca y le recomienda habitación, fechas y qué hacer en Valladolid.",
      chat: "Hablar con el concierge",
    },
    footer: {
      address: "Calle 39 #203 x 40 y 42, Col. Centro. CP 97780. Valladolid, Yucatán, México.",
      contact: "Contacto",
      whatsapp: "WhatsApp",
      group: "Grupo Mesones",
      follow: "Síguenos",
      rights: "Todos los derechos reservados",
      redesign: "Rediseño — Audax Project",
    },
    concierge: {
      title: "Concierge",
      dialogLabel: "Concierge",
      welcome: "Bienvenido al Mesón del Marqués. Soy su concierge. ¿Para qué fechas piensa visitarnos, y viene en pareja, familia o por trabajo?",
      placeholder: "Escriba su mensaje…",
      send: "Enviar",
      close: "Cerrar",
      retry: "Disculpe, ¿me lo repite?",
      connectionError: "Tuve un problema de conexión. Puede escribirnos directo por WhatsApp al +52 986 105 1165 y con gusto le atendemos.",
    },
  },
  en: {
    nav: { concierge: "Concierge", reserve: "Book", menu: "Menu", close: "Close menu" },
    dock: { home: "Home", rooms: "Rooms", book: "Book", area: "Area", concierge: "Concierge" },
    lang: { label: "Language" },
    hero: {
      eyebrow: "Valladolid · Magical Town · Yucatán",
      titleBefore: "A ",
      titleEm: "17th-century mansion",
      titleAfter: "reimagined for today.",
      sub: "Fifty years of Yucatecan hospitality facing the Church of San Servacio. Colonial elegance, modern comfort.",
      reserve: "Book your stay",
      chat: "Talk to the concierge",
      travellers: "Travellers' Choice",
      distintivos: "H & M Distinctions",
      roomsBadge: "85 rooms",
    },
    booking: {
      arrival: "Check-in",
      departure: "Check-out",
      guests: "Guests",
      guest: "guest",
      guestsPlural: "guests",
      cta: "Check availability",
    },
    intro: {
      eyebrow: "The house",
      title: "Valladolid's warmest hotel, for locals and visitors alike.",
      p1: "Set in an old 17th-century mansion, Mesón del Marqués blends colonial elegance with modern-world comforts. Every room is different: none repeats the same story.",
      p2: "We're right on the main square, a step from Calzada de los Frailes and a short ride from Chichén Itzá, Ek Balam and Las Coloradas.",
      stats: [
        ["50+", "years of history"],
        ["85", "unique rooms"],
        ["1 min", "to San Servacio"],
        ["ISO", "9001:2015"],
      ],
    },
    rooms: {
      eyebrow: "Stay",
      title: "Rooms",
      lead: "Four categories, no two alike. Choose yours or ask the concierge which one suits you.",
      from: "From",
      perNight: "MXN / night",
      reserve: "Book",
      ask: "Ask",
    },
    group: {
      eyebrow: "One family",
      title: "Mesones Group",
      lead: "The hotel is the heart, but the full experience lives across our sister houses.",
      cta: "Discover",
    },
    amenities: {
      eyebrow: "All included in the house",
      title: "Amenities",
    },
    experiences: {
      eyebrow: "Around town",
      title: "Valladolid and the Peninsula",
      lead: "From our doorstep to the wonders of the Mayan world.",
    },
    cta: {
      eyebrow: "Still thinking it over?",
      title: "Our concierge builds you the perfect stay.",
      lead: "Tell us what you're looking for and we'll recommend a room, dates and what to do in Valladolid.",
      chat: "Talk to the concierge",
    },
    footer: {
      address: "Calle 39 #203 x 40 y 42, Col. Centro. CP 97780. Valladolid, Yucatán, México.",
      contact: "Contact",
      whatsapp: "WhatsApp",
      group: "Mesones Group",
      follow: "Follow us",
      rights: "All rights reserved",
      redesign: "Redesign — Audax Project",
    },
    concierge: {
      title: "Concierge",
      dialogLabel: "Concierge",
      welcome: "Welcome to Mesón del Marqués. I'm your concierge. What dates are you thinking of visiting, and are you coming as a couple, family or for business?",
      placeholder: "Type your message…",
      send: "Send",
      close: "Close",
      retry: "Sorry, could you say that again?",
      connectionError: "I had a connection problem. Feel free to reach us directly on WhatsApp at +52 986 105 1165 and we'll be happy to help.",
    },
  },
};

// Devuelve el valor en `obj` para una ruta tipo "hero.title.before"
function resolvePath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "es" || saved === "en" ? saved : DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // almacenamiento no disponible (modo privado, etc.) — el idioma sigue funcionando en memoria
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang];
    return (path) => {
      const value = resolvePath(dict, path);
      return value !== undefined ? value : path;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return React.createElement(LangContext.Provider, { value }, children);
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}
