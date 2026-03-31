export const SITE_NAME = "Web Material";
export const BASE_URL = "https://webmaterial.org";
export const DEFAULT_OG_IMAGE = "https://webmaterial.org/og-default.png";

export function toSlug(name: string, id: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${id}`;
}

export function parseSlug(slug: string): { fileId: string } {
  const parts = slug.split("-");
  const fileId = parts[parts.length - 1];
  return { fileId };
}

export function buildDownloadUrl(name: string, id: string): string {
  return `/download/${toSlug(name, id)}`;
}
