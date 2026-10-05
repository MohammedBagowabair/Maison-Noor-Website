import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
console.log("Wrote dist/404.html");
