// Trim + strip trailing slash so a stray newline or trailing "/" in the env
// var can't corrupt every URL we emit (sitemap, robots, OG, canonical, JSON-LD).
const RAW = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const SITE_URL = RAW || "https://patina.cloud";
