import Image from "next/image";
import Link from "next/link";

const cvHref = "/images/Curriculum%20Vitae%20Paul%20Toomey%20120825.pdf";

const identityLines = [
  "Board-certified general surgeon",
  "Robotic & minimally invasive surgery",
  "Bradenton & Sarasota",
];

const whatThisMeansForYou = [
  "Board-certified general surgeon focused on safe, evidence-based care",
  "Robotic and minimally invasive techniques designed to reduce pain and recovery time",
  "Direct access to your surgeon for questions and decision-making",
  "Clear pre-op planning and post-op follow-up coordinated by our care team",
];

const serviceNavigatorLinks = [
  {
    title: "Hernias",
    href: "/services/hernias",
    description: "Inguinal, ventral, incisional, hiatal, and complex repairs.",
  },
  {
    title: "Gallbladder",
    href: "/services/gallbladder-liver-disease",
    description: "Gallstones, biliary colic, cholecystitis, and more.",
  },
  {
    title: "Colorectal",
    href: "/services/colon-rectal-cancer",
    description: "Minimally invasive plans for colon and rectal disease.",
  },
];

export default function ProvidersPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg lg:max-h-[520px]">
            <Image
              src="/images/paul-whitecoat.jpg"
              alt="Dr. Paul Toomey"
              width={1200}
              height={1600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Curriculum vitae</p>
            <p className="mt-2 text-sm text-slate-600">
              View Dr. Toomey&apos;s CV for training, publications, and professional experience.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href={cvHref}
                target="_blank"
                rel="noreferrer"
              >
                View CV (PDF)
              </a>
              <a className="btn btn-outline" href={cvHref} download>
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="eyebrow text-teal-500">Provider</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900">
              Meet Dr. Paul Toomey, MD, FACS
            </h1>
            <div className="grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
              {identityLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="max-w-3xl text-lg text-slate-600">
              You&apos;ll work directly with Dr. Paul Toomey—from your first consult through recovery—receiving
              personalized surgical care focused on clarity, comfort, and minimally invasive outcomes.
            </p>
            <p className="max-w-3xl text-lg text-slate-600">
              His training includes a Bachelor of Science in Biomedical Engineering from Duke University, followed by
              medical school and surgical residency in Florida, giving you a provider who blends rigorous engineering
              thinking with hands-on surgical excellence.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">What this means for you</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {whatThisMeansForYou.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Patient communication and scheduling supported by{" "}
                <a
                  href="https://medreception.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-teal-600 hover:text-teal-700"
                >
                  MedReception.ai
                </a>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Explore services</p>
              <div className="mt-4 space-y-3">
                {serviceNavigatorLinks.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                      </div>
                      <Link
                        href={item.href}
                        className="shrink-0 text-sm font-semibold text-teal-600 hover:text-teal-700"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-sm font-semibold text-slate-900">Need to refer a patient?</p>
            <p className="text-sm text-slate-700">
              Send imaging and referral details to floridasurgicalspecialists@gmail.com and our care team will confirm
              next steps.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contact">
              Schedule a consultation
            </Link>
            <Link className="btn btn-outline" href="/services">
              View service lines
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
