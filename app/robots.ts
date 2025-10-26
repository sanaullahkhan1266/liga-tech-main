export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://lega-tech.example/sitemap.xml",
  };
}
