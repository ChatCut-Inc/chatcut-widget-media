import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const catalog = JSON.parse(await readFile(path.join(root, "avatar-catalog.json"), "utf8"));
const entries = Object.entries(catalog.entries);
if (!entries.length) throw new Error("The public avatar catalog is empty");
for (const [look, entry] of entries) {
  if (!/^[a-f0-9-]{36}$/.test(entry.mediaKey) || entry.image !== "poster.jpg" ||
      (entry.video !== null && entry.video !== "preview.mp4")) {
    throw new Error(`Invalid published media path for ${look}`);
  }
  for (const name of [entry.image, entry.video].filter(Boolean)) {
    const file = path.join(root, "widget-media/avatars", entry.mediaKey, name);
    if ((await stat(file)).size === 0) throw new Error(`Empty preview for ${look}`);
  }
}

const sourceFile = process.argv[2];
if (sourceFile) {
  const source = JSON.parse(await readFile(sourceFile, "utf8"));
  if (!source.success || source.truncated || source.rowCount !== source.rows.length) {
    throw new Error("Require a complete successful public-catalog export");
  }
  const missing = [];
  for (const row of source.rows) {
    if (!row.enabled || row.visibility !== "public" || row.ownerless !== true) {
      throw new Error("The source export contains a disabled or private identity");
    }
    const entry = catalog.entries[row.active_look_id];
    if (!entry || !entry.image || (row.preview_video_url && !entry.video)) {
      missing.push(row.active_look_id);
    }
  }
  if (missing.length) throw new Error(`Missing public previews: ${missing.join(", ")}`);
  console.log(`Full live catalog coverage: ${source.rows.length}/${source.rowCount}`);
}
console.log(`Published files verified for ${entries.length} public avatars`);
