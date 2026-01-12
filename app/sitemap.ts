import type { MetadataRoute } from "next";

import { abdominalPainSlugs } from "./abdominal-pain/_data/pages";
import { getGallbladderSlugs } from "./gallbladder/gallbladder-data";
import { getAllHerniaSlugs } from "./hernia/_lib/hernia-content";
import { lumpsAndBumpsSlugs } from "./lumps-and-bumps/_data/pages";
import { getRoboticSlugs } from "./robotic-surgery/_lib/roboticPages";
import { serviceDetails } from "./services/service-data";

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.floridasurgicalspecialists.com").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPaths = [
    "/",
    "/about",
    "/providers",
    "/hernia",
    "/services",
    "/media",
    "/contact",
    "/request-appointment",
    "/gallbladder",
    "/lumps-and-bumps",
    "/abdominal-pain",
    "/robotic-surgery",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceDetails.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const herniaRoutes: MetadataRoute.Sitemap = getAllHerniaSlugs().map((slug) => ({
    url: `${siteUrl}/hernia/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const gallbladderRoutes: MetadataRoute.Sitemap = getGallbladderSlugs()
    .filter((slug) => slug !== "index")
    .map((slug) => ({
      url: `${siteUrl}/gallbladder/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const lumpRoutes: MetadataRoute.Sitemap = lumpsAndBumpsSlugs.map((slug) => ({
    url: `${siteUrl}/lumps-and-bumps/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const abdominalPainRoutes: MetadataRoute.Sitemap = abdominalPainSlugs.map((slug) => ({
    url: `${siteUrl}/abdominal-pain/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const roboticSlugs = await getRoboticSlugs();
  const roboticRoutes: MetadataRoute.Sitemap = roboticSlugs.map((slug) => ({
    url: `${siteUrl}/robotic-surgery/${slug === "index" ? "" : slug}`.replace(/\/$/, ""),
    lastModified,
    changeFrequency: "weekly",
    priority: slug === "index" ? 0.8 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...herniaRoutes,
    ...gallbladderRoutes,
    ...lumpRoutes,
    ...abdominalPainRoutes,
    ...roboticRoutes,
  ];
}
