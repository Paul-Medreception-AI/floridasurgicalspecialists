import type { MetadataRoute } from "next";

import { getAllHerniaSlugs } from "./hernia/_lib/hernia-content";
import { getGallbladderSlugs } from "./gallbladder/gallbladder-data";
import { serviceDetails } from "./services/service-data";

const SITE_URL = "https://floridasurgicalspecialists.com";

function url(pathname: string) {
  return `${SITE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: url("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: url("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/providers"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/hernia"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("/media"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/request-appointment"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/gallbladder"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceDetails.map((service) => ({
    url: url(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const herniaRoutes: MetadataRoute.Sitemap = getAllHerniaSlugs().map((slug) => ({
    url: url(`/hernia/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const gallbladderRoutes: MetadataRoute.Sitemap = getGallbladderSlugs()
    .filter((slug) => slug !== "index")
    .map((slug) => ({
      url: url(`/gallbladder/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...serviceRoutes, ...herniaRoutes, ...gallbladderRoutes];
}
