import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lega-tech.example";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/#expert-services`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#how`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#clients`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#talents`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
