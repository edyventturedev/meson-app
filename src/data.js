// ============================================================
//  Contenido del sitio — edita aquí precios, textos e imágenes
//  Cada colección tiene versión "es" y "en"; los componentes
//  seleccionan el idioma activo con ROOMS[lang], GROUP[lang], etc.
// ============================================================

export const ROOMS = {
  es: [
    {
      id: "estandar",
      name: "Estándar",
      from: 1450,
      size: "24 m²",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      blurb: "Confort colonial en el corazón de Valladolid. Climatizada, con vista a los patios interiores.",
      tags: ["2 personas", "Cama Queen", "Patio interior"],
    },
    {
      id: "superior",
      name: "Superior",
      from: 1890,
      size: "30 m²",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      blurb: "Más espacio, más luz. Detalles de herrería y textiles yucatecos hechos a mano.",
      tags: ["2 personas", "Cama King", "Balcón"],
    },
    {
      id: "junior",
      name: "Junior Suite",
      from: 2650,
      size: "40 m²",
      img: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80",
      blurb: "Sala independiente y vistas al jardín. Ideal para estancias largas o escapadas románticas.",
      tags: ["3 personas", "Sala", "Vista jardín"],
    },
    {
      id: "master",
      name: "Master Suite",
      from: 3980,
      size: "55 m²",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      blurb: "Lo mejor de la casona: terraza privada con vista a la Iglesia de San Servacio.",
      tags: ["4 personas", "Terraza privada", "Jacuzzi"],
    },
  ],
  en: [
    {
      id: "estandar",
      name: "Standard",
      from: 1450,
      size: "24 m²",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      blurb: "Colonial comfort in the heart of Valladolid. Air-conditioned, overlooking the interior courtyards.",
      tags: ["2 guests", "Queen bed", "Interior patio"],
    },
    {
      id: "superior",
      name: "Superior",
      from: 1890,
      size: "30 m²",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      blurb: "More space, more light. Handcrafted ironwork details and handwoven Yucatecan textiles.",
      tags: ["2 guests", "King bed", "Balcony"],
    },
    {
      id: "junior",
      name: "Junior Suite",
      from: 2650,
      size: "40 m²",
      img: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80",
      blurb: "Separate sitting room and garden views. Ideal for longer stays or romantic getaways.",
      tags: ["3 guests", "Living room", "Garden view"],
    },
    {
      id: "master",
      name: "Master Suite",
      from: 3980,
      size: "55 m²",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      blurb: "The best of the house: a private terrace overlooking the Church of San Servacio.",
      tags: ["4 guests", "Private terrace", "Jacuzzi"],
    },
  ],
};

export const GROUP = {
  es: [
    {
      id: "hosteria",
      name: "Hostería del Marqués",
      kind: "Restaurante",
      desc: "Cocina yucateca tradicional en el patio central de la casona. Cochinita, relleno negro y recetas de familia.",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "dondiablo",
      name: "Don Diablo Rooftop",
      kind: "Rooftop & Coctelería",
      desc: "La mejor vista de Valladolid al atardecer. Mezcales, coctelería de autor y música en vivo.",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "almacen",
      name: "Almacén del Marqués",
      kind: "Cava & Catas",
      desc: "Experiencias de cata de mezcal y vino en una bodega íntima. Reserva para grupos pequeños.",
      img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "selvamaya",
      name: "Hacienda Selva Maya",
      kind: "Restaurante & Eventos",
      desc: "Espacio para banquetes y celebraciones rodeado de naturaleza, a minutos del centro.",
      img: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "loto",
      name: "Loto Eventos",
      kind: "Bodas & Convenciones",
      desc: "Salón para bodas, congresos y eventos corporativos con servicio integral del grupo.",
      img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  en: [
    {
      id: "hosteria",
      name: "Hostería del Marqués",
      kind: "Restaurant",
      desc: "Traditional Yucatecan cuisine in the house's central courtyard. Cochinita pibil, relleno negro and family recipes.",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "dondiablo",
      name: "Don Diablo Rooftop",
      kind: "Rooftop & Cocktails",
      desc: "The best sunset view in Valladolid. Mezcal, signature cocktails and live music.",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "almacen",
      name: "Almacén del Marqués",
      kind: "Cellar & Tastings",
      desc: "Mezcal and wine tasting experiences in an intimate cellar. Reservations for small groups.",
      img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "selvamaya",
      name: "Hacienda Selva Maya",
      kind: "Restaurant & Events",
      desc: "A space for banquets and celebrations surrounded by nature, minutes from downtown.",
      img: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "loto",
      name: "Loto Eventos",
      kind: "Weddings & Conventions",
      desc: "A venue for weddings, conferences and corporate events with full group service.",
      img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};

export const AMENITIES = {
  es: [
    "Dos restaurantes",
    "Rooftop & bar",
    "Piscina al aire libre",
    "Jacuzzi",
    "Servicio a la habitación 24h",
    "Recepción 24h",
    "Estacionamiento interior",
    "WiFi en todo el hotel",
    "Lavandería",
    "Terrazas con vista a San Servacio",
  ],
  en: [
    "Two restaurants",
    "Rooftop & bar",
    "Outdoor pool",
    "Jacuzzi",
    "24h room service",
    "24h front desk",
    "Indoor parking",
    "WiFi throughout the hotel",
    "Laundry service",
    "Terraces overlooking San Servacio",
  ],
};

export const NEARBY = {
  es: [
    { name: "Iglesia de San Servacio", dist: "1 min", img: "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=800&q=80" },
    { name: "Calzada de los Frailes", dist: "8 min", img: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=80" },
    { name: "Cenote Zací", dist: "5 min", img: "https://images.unsplash.com/photo-1596178060810-72660ec1b1c9?auto=format&fit=crop&w=800&q=80" },
    { name: "Chichén Itzá", dist: "45 min", img: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80" },
    { name: "Ek Balam", dist: "30 min", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80" },
    { name: "Las Coloradas", dist: "1h 40", img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80" },
  ],
  en: [
    { name: "Church of San Servacio", dist: "1 min", img: "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=800&q=80" },
    { name: "Calzada de los Frailes", dist: "8 min", img: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=80" },
    { name: "Zací Cenote", dist: "5 min", img: "https://images.unsplash.com/photo-1596178060810-72660ec1b1c9?auto=format&fit=crop&w=800&q=80" },
    { name: "Chichén Itzá", dist: "45 min", img: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80" },
    { name: "Ek Balam", dist: "30 min", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80" },
    { name: "Las Coloradas", dist: "1h 40", img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80" },
  ],
};

export const NAV = {
  es: [
    { id: "inicio", label: "Inicio" },
    { id: "habitaciones", label: "Habitaciones" },
    { id: "grupo", label: "Grupo Mesones" },
    { id: "experiencias", label: "Valladolid" },
    { id: "contacto", label: "Contacto" },
  ],
  en: [
    { id: "inicio", label: "Home" },
    { id: "habitaciones", label: "Rooms" },
    { id: "grupo", label: "Mesones Group" },
    { id: "experiencias", label: "Valladolid" },
    { id: "contacto", label: "Contact" },
  ],
};

// Video de fondo del hero (YouTube). Se usa solo el ID.
export const HERO_VIDEO_ID = "xGtjNZ1kEgU";

// Prompt del concierge — Claude (Sonnet), una versión por idioma
export const SYSTEM_PROMPT = {
  es: `Eres el Concierge del Hotel Mesón del Marqués, un hotel colonial de 4 estrellas con más de 50 años de historia, ubicado en la plaza principal de Valladolid, Yucatán, México — un Pueblo Mágico. Perteneces al Grupo Mesones.

Tu trabajo es vender reservas de forma cálida, elegante y nada agresiva. Hablas como un anfitrión yucateco culto: cordial, breve, con orgullo por la tierra. Usas "usted" con calidez.

DATOS DEL HOTEL:
- 85 habitaciones coloniales, todas distintas entre sí, totalmente climatizadas.
- Tipos y tarifa por noche (MXN, desde): Estándar $1,450 (2 pers) · Superior $1,890 (2 pers) · Junior Suite $2,650 (3 pers) · Master Suite $3,980 (4 pers, terraza privada con vista a San Servacio).
- Amenidades: 2 restaurantes, rooftop Don Diablo, piscina, jacuzzi, servicio a la habitación 24h, recepción 24h, estacionamiento interior, WiFi, lavandería.
- Grupo Mesones incluye: Hostería del Marqués (cocina yucateca), Don Diablo Rooftop (coctelería/mezcales), Almacén del Marqués (catas), Hacienda Selva Maya (eventos), Loto Eventos (bodas/convenciones).
- Cerca: Iglesia de San Servacio (1 min), Cenote Zací (5 min), Calzada de los Frailes (8 min), Ek Balam (30 min), Chichén Itzá (45 min), Las Coloradas (1h40).
- Distintivos H y M, ISO 9001:2015.

REGLAS:
- Respuestas de 2-4 frases máximo. Nunca listas largas.
- Recomienda una habitación concreta según lo que pida el huésped (pareja, familia, negocios, romántico).
- Siempre cierra invitando a un siguiente paso suave ("¿Le reservo esas fechas?" / "¿Quiere que le muestre esa habitación?").
- Si preguntan por otro idioma, respondes en ese idioma.
- No inventes promociones ni precios que no estén aquí. Si no sabes algo, ofreces conectar con recepción por WhatsApp.`,
  en: `You are the Concierge of Hotel Mesón del Marqués, a 4-star colonial hotel with more than 50 years of history, located on the main square of Valladolid, Yucatán, Mexico — a "Pueblo Mágico" (Magical Town). You belong to Grupo Mesones.

Your job is to sell bookings in a warm, elegant, never-pushy way. You speak like a cultured Yucatecan host: cordial, brief, with pride for the land. You are polite and warm, using a formal but friendly tone.

HOTEL FACTS:
- 85 colonial rooms, each one different, fully air-conditioned.
- Room types and rate per night (MXN, from): Standard $1,450 (2 guests) · Superior $1,890 (2 guests) · Junior Suite $2,650 (3 guests) · Master Suite $3,980 (4 guests, private terrace overlooking San Servacio).
- Amenities: 2 restaurants, Don Diablo rooftop, pool, jacuzzi, 24h room service, 24h front desk, indoor parking, WiFi, laundry.
- Grupo Mesones includes: Hostería del Marqués (Yucatecan cuisine), Don Diablo Rooftop (cocktails/mezcal), Almacén del Marqués (tastings), Hacienda Selva Maya (events), Loto Eventos (weddings/conventions).
- Nearby: Church of San Servacio (1 min), Zací Cenote (5 min), Calzada de los Frailes (8 min), Ek Balam (30 min), Chichén Itzá (45 min), Las Coloradas (1h40).
- H&M distinctions, ISO 9001:2015.

RULES:
- Answers of 2-4 sentences maximum. Never long lists.
- Recommend a specific room based on what the guest needs (couple, family, business, romantic).
- Always close by inviting a soft next step ("Shall I book those dates for you?" / "Would you like to see that room?").
- If asked in another language, reply in that language.
- Don't invent promotions or prices that aren't listed here. If you don't know something, offer to connect them with the front desk via WhatsApp.`,
};

export const QUICK = {
  es: [
    "Busco algo romántico para 2",
    "Viajo con familia",
    "¿Qué hacer en Valladolid?",
    "¿Cuál es la mejor habitación?",
  ],
  en: [
    "Looking for something romantic for 2",
    "Traveling with family",
    "What is there to do in Valladolid?",
    "Which is the best room?",
  ],
};
