import Image from "next/image";
import Link from "next/link";
import { serviceDetails } from "./service-data";

export default function ServicesPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell space-y-6 py-14">
        <p className="eyebrow text-teal-500">Services</p>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900">
          Comprehensive surgical care built around you
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Florida Surgical Specialists pairs board-certified expertise with robotic platforms, advanced
          endoscopy, and enhanced recovery protocols so every patient gets a focused plan for their condition.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/request-appointment">
            Request appointment
          </Link>
          <Link className="btn btn-outline" href="/contact">
            Talk with our team
          </Link>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {serviceDetails.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <Image
                    src={service.heroImage}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">
                  Surgical Excellence
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
                <p className="text-slate-600">{service.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {service.conditions.slice(0, 4).map((condition) => (
                    <span
                      key={condition}
                      className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Link className="font-semibold text-teal-600 hover:text-teal-700" href={`/services/${service.slug}`}>
                  View full list
                </Link>
                <Link className="btn btn-outline" href="/contact">
                  Schedule a consult
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
