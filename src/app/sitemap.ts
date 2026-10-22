import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smasantamaria1bdg.sch.id";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/daftarosis",
    "/hasilseleksi",
    "/news",
    "/link",
    "/masukan",
    "/logos",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: (route === "" || route === "/news" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
