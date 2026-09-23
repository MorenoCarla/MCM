# Cancionero MCM

Cancionero digital del **Movimiento Consolación para el Mundo (MCM)**.

## Personalizar colores, logo y fondo

| Qué | Dónde |
|-----|--------|
| **Colores** (celeste, amarillo, etc.) | `src/App.css` → variables al inicio (`:root`) |
| **Logo** | Guardá el logo como `public/logo-mcm.png` (también sirve `.jpg`) |
| **Foto de fondo** | Agregá `public/fondo-mcm.jpg` con una foto del movimiento |
| **Categorías** (nombres, siglas, colores) | `src/data/categories.js` |
| **Transparencia del fondo** | `src/App.css` → `--bg-overlay` |

Logo oficial: https://movimientoconsolacion.com/logos/

## Cómo agregar canciones

**Opción 1 — Desde la app (recomendado)**  
Abrí el cancionero → **+ Nueva canción** → pegá letra y acordes.

**Opción 2 — Por este chat**  
Copiá la letra (con o sin acordes) y pasámela **una sola vez**. Decime en qué categorías va:

```
Título: Pan de vida
Categorías: Misa (Comunión), Adoración
Tonalidad: Sol

[G]Pan de vida...
```

No hace falta pasarla dos veces si se usa en Misa y Adoración.

**Opción 3 — Archivo de texto**  
Creá un `.txt` en la carpeta del proyecto y avisame; lo importo.

### Formato de acordes (opcional)

```
[G]Ven Espíritu [Em]Santo
[C]Llena mi [D]corazón
```

Un solo acorde sirve para guitarra y piano.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Publicar en GitHub Pages

```bash
npm run build
```

Subí el contenido de `dist/` a GitHub Pages.
