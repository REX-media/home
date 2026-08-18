# REX Media v4 — Avance y Tareas Pendientes

## Estado Actual
Última actualización: 18 de agosto 2026

## Estructura del Proyecto
```
D:\REX media\web\REXmedia-web_v4\
├── index.html
├── style.css
├── main.js
├── AVANCE.md
├── robots.txt
├── sitemap.xml
├── images/
│   ├── clientes/   (logo_anglo, logo_netaxion, logo_aim, logo_captonecooper, logo_colbun — 210×110px)
│   ├── proyectos/  (01_1..06_3.jpg — 18 imágenes, 3 por proyecto)
│   ├── logo/       (logo.png + favicons: favicon.ico, apple-touch-icon.png, icon-192.png)
│   ├── homepage/   (aeris.jpg/svg, vigilia.jpg/svg, rex.jpg/svg)
│   ├── bg/         (1.png — fondo decorativo sección "Con quién trabajamos")
│   └── slider/     (1-3.jpg + .webp)
├── aeris.html      (próximamente — gemelo digital)
├── vigilia.html    (próximamente — app de seguridad)
└── taller.html     (próximamente — galería 3D)
```

## Completado

### Estructura HTML
- Header fijo con burger pill + menú panel (scale3d, transform-origin top-right)
- Hero con 3 imágenes slider (crossfade automático cada 6s)
- Intro section
- En desarrollo (3fr/2fr hero + 2 stacked)
  - **AERIS**: gemelo digital industrial — hover overlay (aeris.svg color original + viñeta + "Próximamente" amarillo), badge "Próximamente" en body
  - **VIGILIA**: app de seguridad — hover overlay (vigilia.svg + viñeta + "Próximamente" gris oscuro `rgba(255,255,255,.25)`)
  - **Taller de Pruebas**: galería 3D — hover overlay (rex.svg + viñeta + "Próximamente" blanco)
  - Los 3 elementos son `<div>` (no clickeables, subpáginas pendientes)
- Clientes con carrusel infinito (4 grupos para llenado continuo, 40s animación)
- Franja de seguridad animada entre "En desarrollo" y "Proyectos"
- Proyectos grid (3-col, 6 cards `<div data-project>`, hover scale 1.04)
- Sección "Con quién trabajamos" con fondo decorativo (images/bg/1.png)
- Servicios numerados (01-06) con SVGs animados inline y modal
- Video split section
- Testimonio con cita aleatoria de 50 frases de diseño
- CTA / Formulario de contacto (reCAPTCHA v2)
- Footer con copyright "REX MEDIA SpA"

### Iconos SVG de Servicios (inline, animados CSS)
- Multimedia 3D: horizonte animado con scroll infinito
- Aplicaciones: teléfono con puntos pulsantes
- Representaciones 3D: ciclo secuencial cubo→esfero→cono (JS interval 1800ms)
- Procesos Industriales: engranaje giratorio
- Interactivos 3D: cursor con onda de expansión
- Realidad Virtual: headset con líneas de escaneo VR

### Modal de Servicios
- Click en servicio abre modal inline (no smooth scroll)
- Comparte datos SVG con `svcAnims`, `svcSvgList`, `svcSvgModal`
- Clip-path IDs únicos por contexto (`svcClipL1` para lista, `vfClip` para modal)
- `smoothScroll()` salta elementos con `data-service`

### Modal de Proyectos
- Click en card de proyecto abre modal inline (no navega a subpágina)
- Galería de imágenes con crossfade automático cada 5s (loop infinito)
- Dots de navegación clickeables (closure fix para `var` en loop)
- Datos: categoría, título, descripción, formatos (tags con pills)
- 6 proyectos con datos en `projData` en JS
- CTA "Hablemos de tu proyecto" cierra modal y lleva a #contacto

### Hover en Cards "En desarrollo"
- AERIS: SVG overlay (aeris.svg, color original) al 70% en hover, viñeta radial, "Próximamente" amarillo
- VIGILIA: SVG overlay (vigilia.svg, colores originales) al 70% en hover, viñeta radial, "Próximamente" gris oscuro
- Taller de Pruebas: SVG overlay (rex.svg) al 70% en hover, viñeta radial, "Próximamente" blanco

### Estilos (style.css)
- Paleta: fondo #30383f, bg2 #272f35, acento #eca400
- Header: glassmorphism pill en scroll, auto-hide on scroll
- Burger → X animation, menú panel con scale3d
- Scroll reveal animations con IntersectionObserver + stagger delays
- Float labels en formulario
- Carrusel de logos: 4 grupos, 40s, fade en bordes
- Services: 2-col split, filas horizontales
- Franja de seguridad: paralelogramos amarillos animados
- Projects grid: repeat(3,1fr), gap 12px, bg #1e2830
- Project modals: gallery 16/7, dots, format pills, crossfade 5s
- En desarrollo: cards con hover overlay, viñeta, texto Próximamente

### JavaScript (main.js)
- Header auto-hide on scroll (requestAnimationFrame, passive)
- Menu open/close con trigger, overlay y Escape
- Scroll reveal con IntersectionObserver
- Smooth scroll para links internos
- Hero slider crossfade (3 imágenes, 6s)
- Testimonio random de 50 frases
- Service list icons injection + shape cycle
- Service modal (shared data objects)
- Project modal (dynamic: gallery, dots, meta, formats)
- Contact form con reCAPTCHA v2 → fetch POST
- Back-to-top button

### SEO
- Meta tags Open Graph + Twitter Card
- Canonical: https://rex-media.cl/
- robots.txt y sitemap.xml
- Favicon + apple-touch-icon + icon-192
- Preload hero image

### Optimización de imágenes
- Slider: WebP con fallback JPG
- Proyectos: JPG 1600×700 (2x retina)
- Homepage: aeris.jpg, vigilia.jpg, rex.jpg para cards "En desarrollo"

### Limpieza de código ( Ago 2026)
- Eliminadas referencias "Avocado360" de comentarios (HTML, CSS, JS)
- Copyright footer: "REX MEDIA SpA"
- Eliminado CSS muerto: `.testimonial__label`, `.prod-card__img picture`, `.prod-card__link`, `.proj-card__img picture`, reglas duplicadas
- Eliminado `!important` — specificity corregida con selectores más específicos
- Inline styles de `prod-card__desc` movidos a `.prod-card--sm .prod-card__desc`
- Eliminados 18 archivos no usados:
  - `images/icon/` completa (12 PNGs — reemplazados por SVGs inline)
  - `images/logo/`: logo_full.png, RM-isologo-color.png, top.png
  - `images/slider/`: thumbnail-1.png, thumbnail-2.png, thumbnail-3.png

---

## Bugs Corregidos

| Fecha | Bug | Solución |
|-------|-----|----------|
| Ago 2026 | `transform-origin;top right;` (punto y coma) | Corregido a `transform-origin:top right;` |
| Ago 2026 | Dots de galería no funcionaban (closure `var`) | Wrap con IIFE `(function(idx){...})(i)` |
| Ago 2026 | Imágenes de proyectos apuntaban a archivos eliminados | Migrados a `0X_Y.jpg` |
| Ago 2026 | Carrusel logos con huecos después del último grupo | Agregados 4 grupos + duración 40s |

---

## Pendiente

### Siguiente paso — GitHub y deploy
- [ ] Sincronizar proyecto con GitHub (repo existente o crear nuevo)
- [ ] Subir commit con toda la versión actual de la web
- [ ] Verificar deploy en rex-media.cl

### Pendientes post-deploy (una vez conectado al servidor)
- [ ] Crear archivo `enviar_contacto.php` (backend del formulario de contacto)
- [ ] Verificar/reconfigurar reCAPTCHA v2 en producción
- [ ] Investigar video YouTube que no carga (embed `Zv6cXSczov4`)
- [ ] Crear contenido para subpáginas: `aeris.html`, `vigilia.html`, `taller.html`

### Optimización recomendada
- [ ] **Split JS**: separar `main.js` en `main.js` (compartido) y `main-home.js` (solo index)
- [ ] **Quitar reCAPTCHA de subpáginas**: cargan script de Google sin tener formulario
- [ ] **Agregar `@media (prefers-reduced-motion: reduce)`** para desactivar animaciones
- [ ] **Consolidar CSS de animaciones SVG**: reglas duplicadas entre lista y modal

### Contenido
- [ ] Revisar textos finales de servicios (descripciones, redacción)
- [ ] Verificar responsive mobile (<480px)
- [ ] Definir textos finales para modal de proyectos (descripciones actuales son genéricas)

### Mejoras futuras
- [ ] Agregar structured data (JSON-LD): Organization en index, CreativeWork en proyectos
- [ ] SVG favicon para navegadores modernos
- [ ] YouTube embed con click-to-play (evita cargar iframe innecesariamente)
- [ ] .htaccess con compresión gzip/brotli, cache headers, security headers
