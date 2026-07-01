# Hotel Mesón del Marqués — Rediseño v2

Sitio web premium para el **Hotel Mesón del Marqués** (Grupo Mesones · Valladolid, Yucatán).
Estética Apple / *liquid glass*, canal directo de reservas y concierge con IA.

Por **Audax Project**.

---

## Cómo abrirlo en VS Code

1. Abre la carpeta `meson-app` en VS Code (`Archivo → Abrir carpeta…`).
2. Abre una terminal integrada (`Ctrl + ñ` o `Terminal → Nueva terminal`).
3. Instala dependencias:

   ```bash
   npm install
   ```

4. Levanta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Se abre solo en `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build      # genera la carpeta /dist
npm run preview    # previsualiza el build
```

---

## Estructura

```
meson-app/
├─ index.html            → HTML raíz + fuentes (Fraunces, Instrument Sans)
├─ package.json          → dependencias y scripts
├─ vite.config.js        → configuración de Vite
├─ public/
│  └─ favicon.svg        → monograma "M"
└─ src/
   ├─ main.jsx           → punto de entrada
   ├─ App.jsx            → componentes y secciones del sitio
   ├─ data.js            → ⭐ TEXTOS, PRECIOS E IMÁGENES (edita aquí)
   ├─ icons.jsx          → iconos SVG
   └─ styles.css         → ⭐ TODO EL DISEÑO (glass, colores, tipografía)
```

**Para editar contenido** (precios, descripciones, fotos): `src/data.js`.
**Para editar el diseño** (colores, radios, glass): las variables `:root` al inicio de `src/styles.css`.

---

## El concierge con IA

El chatbot usa la API de Claude (modelo Sonnet). En este entorno de prototipo funciona
sin llave. Para producción hay que enrutar la llamada por un backend propio con la
`ANTHROPIC_API_KEY` para no exponerla en el navegador — te dejo el punto exacto marcado
en `src/App.jsx` (función `send` dentro de `Concierge`).

---

## Pendientes antes de mostrar al hotel

- **Fotografía real**: las imágenes son placeholders. Los cuartos, el rooftop Don Diablo
  y las terrazas necesitan fotos propias del hotel.
- **Tarifas**: validar los precios por categoría con recepción.
- **Motor de reservas**: conectar la barra de reservas al sistema actual (Cloudbeds).
```
