import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{ path: string; priority: number }> = [
    { path: "/homepage", priority: 1 },
    { path: "/casa-campeche", priority: 0.9 },
    { path: "/casa-palmas", priority: 0.9 },
    { path: "/booking", priority: 0.8 },
    { path: "/contact", priority: 0.5 },
    { path: "/prensa", priority: 0.5 },
    { path: "/faq", priority: 0.3 },
    { path: "/terminos", priority: 0.3 },
    { path: "/aviso-de-privacidad", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
