import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, serviceDetails } from "../service-data";

type Params = { slug: string };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found | Florida Surgical Specialists",
    };
  }

  return {
    title: `${service.title} | Florida Surgical Specialists`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5 text-white">
            <p className="eyebrow text-teal-200">Surgical Expertise</p>
            <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">{service.title}</h1>
            <p className="max-w-2xl text-lg text-slate-100">{service.summary}</p>
            <div className="grid gap-3 text-sm text-slate-100">
              <div className="flex items-start gap-2">
                <span className="mt-1 text-teal-200">✓</span>
                <p>Robotic and minimally invasive options prioritized whenever safe.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-teal-200">✓</span>
                <p>Care team scheduling with pre-op education and next-day call-backs.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-teal-200">✓</span>
                <p>Close follow-up with referring providers and rapid imaging coordination.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/request-appointment">
                Request appointment
              </Link>
              <Link className="btn btn-outline border-white text-white hover:bg-white/10" href="/contact">
                Talk with our team
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur">
            <Image
              src={service.slug === "hernias" ? "/images/Paul2SRC.png" : service.heroImage}
              alt={service.imageAlt}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow text-teal-600">Conditions Treated</p>
              <p className="text-xl font-semibold text-slate-900">
                Tailored plans for {service.conditions.length}+ related diagnoses
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-outline" href="/services">
                Back to services
              </Link>
              <Link className="btn btn-primary" href="/contact">
                Schedule a consult
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {service.conditions.map((condition) => (
              <div
                key={condition}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <span className="mt-1 text-teal-600">•</span>
                <p className="font-medium text-slate-800">{condition}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 p-4 shadow-sm">
              <p className="text-sm font-semibold text-teal-600">Preparing for surgery</p>
              <p className="text-sm text-slate-600">
                We align imaging, labs, and clearances in advance so your operative day runs smoothly with minimal
                downtime.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4 shadow-sm">
              <p className="text-sm font-semibold text-teal-600">Enhanced recovery</p>
              <p className="text-sm text-slate-600">
                Multimodal pain control, early mobility, and nutrition protocols shorten hospital stays and reduce pain.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4 shadow-sm">
              <p className="text-sm font-semibold text-teal-600">Communication</p>
              <p className="text-sm text-slate-600">
                Your surgeon and navigator keep you and your referring providers updated at every milestone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
