import Image from "next/image";
import Link from "next/link";

const contactInfo = {
  addressHref: "https://goo.gl/maps/5HUFPYt9tK9cfchi7",
  phoneDisplay: "941-216-3602",
  phoneHref: "tel:+19412163602",
};

const officeDetails = {
  addressLines: [
    "607 Manatee Ave. E. Suite 102",
    "Bradenton, FL 34208",
    "Fax: 941.216.3605",
  ],
  email: "floridasurgicalspecialists@gmail.com",
  hours: "Monday-Friday: 8 AM - 5 PM (Closed 12-1 PM)",
  mapSrc:
    "https://maps.google.com/maps?q=607%20Manatee%20Ave.%20E.%20Suite%20102%20Bradenton%2C%20FL%2034208&t=m&z=14&output=embed&iwloc=near",
};

const contactBlocks = [
  {
    label: "Call us",
    value: contactInfo.phoneDisplay,
    href: contactInfo.phoneHref,
    description: "Speak with our care team about availability and next steps.",
  },
  {
    label: "Email",
    value: officeDetails.email,
    href: `mailto:${officeDetails.email}`,
    description: "Send referrals, imaging, or questions to our inbox.",
  },
  {
    label: "Visit",
    value: officeDetails.addressLines[0],
    href: contactInfo.addressHref,
    description: "Conveniently located in Bradenton to serve the Gulf Coast.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-7">
          <div className="space-y-3">
            <p className="eyebrow text-teal-500">Contact</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900">
              Florida Surgical Specialists
            </h1>
            <p className="text-lg text-slate-600">
              Call, email, or request an appointment and our care team will coordinate your visit,
              imaging, and insurance authorizations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactBlocks.map((block) => (
              <div
                key={block.label}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">
                  {block.label}
                </p>
                <a
                  className={`block max-w-full font-semibold leading-snug text-slate-900 hover:text-teal-600 ${
                    block.label === "Email"
                      ? "break-all text-sm sm:text-base"
                      : block.label === "Visit"
                        ? "break-words text-sm sm:text-base"
                        : "text-base sm:text-lg"
                  }`}
                  href={block.href}
                  target={block.label === "Visit" ? "_blank" : undefined}
                  rel={block.label === "Visit" ? "noreferrer" : undefined}
                >
                  {block.value}
                </a>
                <p className="text-sm text-slate-600">{block.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-dashed border-[#18b6a3] bg-[#f0fbf7] px-5 py-4">
            <p className="text-sm font-semibold text-[#0f6f73]">Office hours</p>
            <p className="text-sm text-slate-700">{officeDetails.hours}</p>
          </div>

          <p className="text-sm text-slate-600">
            Scheduling and reminders are powered by{" "}
            <a
              href="https://medreception.ai"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-teal-600 hover:text-teal-700"
            >
              MedReception.ai
            </a>{" "}
            for fast follow-up.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Request appointment
            </Link>
            <a className="btn btn-outline" href={`mailto:${officeDetails.email}`}>
              Email floridasurgicalspecialists@gmail.com
            </a>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <Image
              src="/images/Front-office.jpg"
              alt="Florida Surgical Specialists front office"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Office location</p>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              {officeDetails.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-inner">
            <iframe
              src={officeDetails.mapSrc}
              title="Florida Surgical Specialists Bradenton office"
              className="h-[380px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
