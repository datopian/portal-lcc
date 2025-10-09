//Expose /__routes.json API route to auto-discover static routes for scanning.

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(process.cwd(), "pages");
const OUT = path.join(process.cwd(), "public", "__routes.json");

// consider only these file extensions as pages
const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);

function isPageFile(file) {
  return exts.has(path.extname(file));
}

function toRoute(relPath) {
  // strip extension
  const noExt = relPath.replace(/\.(t|j)sx?$/, "");
  // remove index
  let route = noExt.replace(/\/index$/, "");
  // ignore underscore pages (_app, _document, _error)
  if (path.basename(route).startsWith("_")) return null;
  // ignore anything in /api
  if (route.startsWith("api/")) return null;
  // ignore dynamic routes [param]
  if (route.includes("[")) return null;

  route = "/" + route.replace(/\\/g, "/");
  return route === "/." ? "/" : route;
}

function collectRoutes(dir) {
  const routes = new Set();
  function walk(d, prefix = "") {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(d, ent.name);
      const rel = path.relative(PAGES_DIR, full).replace(/\\/g, "/");
      if (ent.isDirectory()) {
        walk(full, path.join(prefix, ent.name));
      } else if (isPageFile(ent.name)) {
        const r = toRoute(rel);
        if (r) routes.add(r === "/." ? "/" : r);
      }
    }
  }
  walk(dir);
  // Ensure at least common pages exist if present in project
  // (this repo already has these pages, so the scan should find them)
  return Array.from(routes).sort();
}

const routes = collectRoutes(PAGES_DIR);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ routes }, null, 2));
console.log(`Wrote ${OUT} with ${routes.length} routes`);
