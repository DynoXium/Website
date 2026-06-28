import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dynoxium.com";

  // Base and hub pages
  const staticPages = [
    "",
    "/blog",
    "/game",
    "/tools",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service, company, support, and legal pages
  const dynamicSlugs = [
    "vps",
    "rdp",
    "web",
    "bot",
    "free",
    "about",
    "team",
    "partnership",
    "infrastructure",
    "knowledgebase",
    "faq",
    "contact",
    "terms",
    "privacy",
    "refund",
    "aup",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Individual game pages
  const gameSlugs = [
    "minecraft",
    "rust",
    "fivem",
    "ark",
    "terraria",
    "valheim",
    "palworld",
    "cs2",
    "hytale",
  ].map((slug) => ({
    url: `${baseUrl}/game/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Individual developer tools pages
  const toolSlugs = [
    "mc-status",
    "motd",
    "uuid",
    "skin",
    "circle",
    "whitelist",
    "nbt",
    "server-properties",
    "coordinate-calculator",
    "tick-calculator",
  ].map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Blog articles
  const blogSlugs = [
    "introducing-dynoxium-cloud-hosting",
    "achieving-ultra-low-latency-minecraft",
    "deploying-nextjs-apps-git-integration",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...dynamicSlugs,
    ...gameSlugs,
    ...toolSlugs,
    ...blogSlugs,
  ];
}
