# Plan de trabajo — M&L Consultores Financieros y Contables

Documento vivo. Complementa la bitácora del proyecto (`Bitacora_Proyecto_MYL.txt`)
con el estado real del código y el orden de trabajo acordado.

- **Repositorio:** https://github.com/Die10z/MYL-Financial-Services
- **Rama:** `main`
- **Actualizado:** 2026-10-30

---

## Paleta de colores (BLOQUEADA — no modificar)

| Token | Hex | Uso |
|---|---|---|
| Azul principal | `#103c73` | header, footer, botones de menú |
| Azul botón | `#003366` | botones primarios |
| Azul hover | `#0055cc` / `#0066cc` | estados hover |
| Texto fuerte | `#1d1d1d` | navegación, marca |
| Texto secundario | `#555` / `#666` | párrafos, lema |
| Borde | `#d9d9d9` | líneas, sombras suaves |
| Fondo | `#ffffff` | base |

Contraste: blanco sobre `#103c73` ≈ 9.4:1 (cumple WCAG AA).

---

## Estado actual del código

Completado:

- Header y footer presentes en las 4 páginas.
- Navegación completa y funcionando.
- Visor del logo (modal) en las 4 páginas.
- Estructura HTML válida (DOCTYPE, `lang="es"`, `body`, cierres).
- Títulos por página, meta charset y viewport.
- Git y GitHub configurados.

Pendiente de contenido (bloqueado por la empresa):

- Textos definitivos de Servicios (4 secciones).
- Textos definitivos de Nosotros.
- Teléfono, correo y redes sociales reales.
- Imágenes adicionales.

---

## Análisis de la bitácora

### Puntos desactualizados

1. "Páginas creadas: **Inicio**" → hoy es `index.html`; `Inicio-MYL.html` fue eliminado.
2. "Problemas resueltos: **Navegación rota**" → seguía rota en las 4 páginas (apuntaban a `Inicio-MYL.html`).
3. "Diseño responsivo (en progreso)" → es el punto más débil; `mobile.css` no colapsa el hero.
4. "Contacto (estructura)" → no existía `<form>`; los inputs no tenían `name`, `label` ni `action`.
5. No registra el remoto de GitHub ni los commits.

### Bugs encontrados (no documentados)

| # | Bug | Estado |
|---|---|---|
| 1 | `script.js` lanzaba `TypeError` en Servicios, Nosotros y Contacto (buscaba IDs que solo existían en index) | ✅ corregido |
| 2 | Enlaces "Inicio" a `Inicio-MYL.html` (archivo inexistente) | ✅ corregido |
| 3 | `img/inicio.jpg` vs `img/Inicio.jpg` (falla en hosting case-sensitive) | ✅ corregido |
| 4 | `<div class="Menu-servicios">` sin cerrar en Servicios | ✅ corregido |
| 5 | HTML incompleto en Servicios, Nosotros y Contacto | ✅ corregido |
| 6 | `<title>Document</title>` en las 4 páginas | ✅ corregido |
| 7 | CSS inválido: `border: radius 8px` y `transition: .3` | ✅ corregido |
| 8 | Secciones de Servicios fuera de `<main>` | ✅ corregido |
| 9 | Header distinto en index vs. el resto | ✅ corregido |
| 10 | `<h2>M&L</h2>` usado como adorno; Nosotros sin `<h1>` | ✅ corregido |
| 11 | CSS muerto: `.logo-grande`, `aside` | ✅ corregido |
| 12 | Hero que no colapsa en móvil | ✅ corregido |
| 13 | Formulario sin `<form>` ni labels | ✅ corregido (falta el ID de Formspree) |
| 14 | Modal sin `Esc`, sin `role="dialog"`, "X" no accesible por teclado | ✅ corregido |
| 15 | `logo-empresa.jpeg` 1254×1254 (102 KB) mostrado a 90×90 | ⬜ pendiente (Paso 7) |

---

## Decisiones registradas

### Mantener HTML/CSS/JS en lugar de migrar a React (2026-10-30)

Se evaluó migrar el sitio a React, a Node o a Astro. Decisión: **seguir con
HTML/CSS/JS**.

Motivos:

- Son 4 páginas estáticas con un modal. No hay estado, rutas dinámicas ni datos.
- React exigiría ~300 dependencias, un paso de build y ~150-200 KB de JS para
  producir exactamente el mismo HTML.
- GitHub Pages sirve HTML directo sin configuración; React necesita build + CI.
- Node es un runtime de servidor: no reemplaza HTML y hoy no hace falta.

Costo real conocido: el header y el footer están duplicados en 4 archivos. Se
acepta por ahora; si el sitio crece, la salida barata es Astro (componentes con
salida estática), no React.

React se aprende como proyecto aparte (Paso 8), según la bitácora.

---

## Plan por pasos (en este orden)

El orden respeta una regla: primero lo que no depende de nadie, después lo que
depende de una decisión propia, al final lo que depende de la empresa y de las
imágenes definitivas. Publicar antes de tener el contenido real obliga a
reindexar después.

### ✅ Paso 0 — Base
Enlaces, estructura HTML, títulos, CSS inválido, `<main>` semántico.
*Commits: `88860c1`, `ac031eb`.*

### ✅ Paso 1 — Consistencia
Header único en las 4 páginas (logo + nombre + lema + visor), `script.js` con
guardas, `<h1>` en Nosotros, `<h2>` de marca convertido a `span`, CSS muerto
eliminado.

### ✅ Paso 2 — Responsive
- `.hero` a una sola columna (antes las dos columnas se aplastaban).
- Header: logo, "M&L" y lema apilados y centrados a 375px.
- Footer: grilla de dos columnas (Contacto | Redes) con la marca arriba y
  el copyright abajo; altura reducida a la mitad.
- Eliminadas las reglas muertas `section { flex-direction; order }` y `aside`.
- Verificado a 375 × 667 con capturas.

### ✅ Paso 3 — Accesibilidad
- `alt` en todas las imágenes (3 que faltaban).
- Formulario: `<label for>` + `id` + `name` + `autocomplete` + `required`.
  Se corrigió además el layout: los campos estaban en una fila horizontal
  (los `input` son inline) y sin estilos; ahora es una columna de 520px.
- Modal: `role="dialog"`, `aria-modal`, `aria-label`, cierre con `Esc`,
  foco al abrir, foco de vuelta al logo al cerrar, y `<button>` en lugar
  del `<span>X</span>`. El logo es `role="button" tabindex="0"` y responde
  a Enter y Espacio.
- `aria-current="page"` en el enlace activo del nav.
- `:focus-visible` con anillo azul de la paleta en todo el sitio.
- Los `<h4>` del pie pasaron a `<h2>` (jerarquía de encabezados) con el
  mismo tamaño visual.

### ✅ Paso 4 — Contacto funcional

Decisión: **Formspree** (plan free: 50 envíos/mes, 1 formulario).

Implementado:
- `<form action="https://formspree.io/f/REEMPLAZAR" method="POST">` con
  labels, `required` y `autocomplete`.
- Campo trampa `_gotcha` oculto (anti-spam) y `_subject` para el asunto.
- Envío por `fetch` con `Accept: application/json`: mensaje de éxito o de
  error en la misma página, sin recargar (mejora progresiva: sin JS el
  formulario igual hace el POST normal).
- Estado accesible con `role="status"` y `aria-live="polite"`.

**Pendiente:** reemplazar `REEMPLAZAR` por el ID real del formulario de
Formspree. Mientras siga el placeholder, el envío se bloquea con un aviso
en vez de fallar.

### ⬜ Paso 5 — Contenido real
Textos de Servicios y Nosotros, teléfono/correo/redes oficiales, imágenes.
Bloqueado por la empresa.

### ✅ Paso 6 — Publicación

- Repo **público** y GitHub Pages activo desde `main` / `(root)`.
- `.nojekyll` para que Pages sirva los archivos sin procesarlos con Jekyll.
- **Sitio live:** https://die10z.github.io/MYL-Financial-Services/
- Verificado tras el deploy: las 4 páginas y los 9 recursos responden 200,
  el header unificado, `aria-current`, `role="dialog"` y el `action` del
  formulario apuntando a `https://formspree.io/f/xzeearqo`.
- Deploy automático: cada `git push` a `main` republica en ~1-3 minutos.

### ✅ Paso 7 — SEO y optimización

- **Imágenes** (peso del home: ~166 KB → 56 KB, -66%):
  - `logo-empresa.webp` 180×180 → **4.8 KB** (antes 102 KB de 1254×1254).
  - `logo-grande.webp` 600×600 → 29.4 KB, para el visor.
  - `Inicio.webp` 738×414 q75 → 32.7 KB (antes 44.7 KB).
  - `favicon.png` 64×64 y `apple-touch-icon.png` 180×180.
  - `width`/`height` en las imágenes para evitar saltos de layout (CLS).
- **SEO:** `meta description` única por página, Open Graph completo
  (`og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`,
  `og:url`, `og:image`), favicon y apple-touch-icon en las 4 páginas.
- **`noindex` temporal:** `robots.txt` con `Disallow: /` +
  `<meta name="robots" content="noindex, nofollow">` en las 4 páginas.
  **Quitar ambos cuando el contenido real esté publicado.**
- `mobile.css` acota el visor del logo a 320px (medía 600px fijos y se
  salía de pantalla).

Pendiente para cuando haya contenido real: `sitemap.xml` y quitar el
`noindex`.

### ✅ Paso 8 — Pulido visual de la interfaz

Estética "smooth and fresh", seria e interactiva, **sin tocar la paleta**.

- **Tipografía Inter** (variable, self-hosted, 47 KB WOFF2, subconjunto
  latin) con `preload`. Reemplaza a Arial. Escala con `line-height: 1.65`
  y titulares con `letter-spacing` negativo.
- **Navegación:** enlace activo con subrayado permanente vía
  `aria-current="page"`.
- **Profundidad:** sombras en capas en botones, tarjetas, header e imagen
  del hero; borde suave en las tarjetas.
- **Movimiento:** hover con elevación de 2px en botones y 3px en tarjetas,
  sombra del header al scrollear, y aparición suave de bloques con
  `IntersectionObserver`.
- **Detalles:** fondo del hero con degradado del mismo azul al 5%,
  subrayado de acento bajo los títulos de servicio, anillo de foco en los
  campos del formulario.
- Todo respeta `prefers-reduced-motion`, y sin JavaScript el contenido se
  ve igual (las clases de animación se agregan desde el JS).

### ⬜ Paso 9 — Largo plazo (proyecto aparte)
Portafolio personal, JavaScript avanzado, React (recrear el sitio), Node.js.

---

## Convenciones

- La paleta de la sección superior no se toca.
- Un commit por paso, con mensaje en español.
- Los cambios visuales se validan con captura de pantalla del navegador.
