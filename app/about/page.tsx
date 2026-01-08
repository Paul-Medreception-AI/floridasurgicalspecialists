import Link from "next/link";
import Image from "next/image";

const pillars = [
  {
    title: "Robotic & laparoscopic expertise",
    copy: "We prioritize minimally invasive approaches to reduce pain, shorten hospital stays, and speed recovery whenever possible.",
  },
  {
    title: "Personalized care coordination",
    copy: "Our team aligns imaging, authorizations, and follow-up so patients and referring providers stay in sync from consult through recovery.",
  },
  {
    title: "Innovation & academic focus",
    copy: "We combine practical clinical experience with a commitment to research, education, and modern systems that reduce friction for patients and staff.",
  },
];

const identityLines = [
  "Board-Certified General Surgeon",
  "Robotic & Minimally Invasive Surgery",
  "Bradenton & Sarasota",
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-5">
          <p className="eyebrow text-teal-500">About Us</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">
            Meet Dr. Paul Toomey, MD, FACS
          </h1>
          <div className="grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
            {identityLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="max-w-3xl space-y-4 text-lg text-slate-600">
            <p>
              You&apos;ll work directly with Dr. Paul Toomey—from your first consult through recovery—receiving personalized
              surgical care focused on clarity, comfort, and minimally invasive outcomes.
            </p>
            <p>
              Florida Surgical Specialists pairs advanced robotics with a personal, high-touch experience. Our team
              delivers complex abdominal, colorectal, breast, and hernia care with meticulous planning and rapid
              recovery pathways.
            </p>
            <p>
              As CEO and founder of MedReception AI, Dr. Toomey is on a mission to streamline medical workplace
              operations to improve patient care and reduce costs.
            </p>
            <p className="text-sm text-slate-600">
              Scheduling, reminders, and follow-up are powered by{" "}
              <a
                href="https://medreception.ai"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                MedReception.ai
              </a>{" "}
              to keep patients and providers connected.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-teal-600">Training & research</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <p>Established Florida Surgical Specialists in 2015. Originally from Hagerstown, Maryland.</p>
              <p>Completed training at the University of South Florida and Florida Hospital Tampa.</p>
              <p>
                Active in academic research with 26 publications (including a book chapter) and 63 presentations
                spanning cancer immunology, melanoma, robotic surgery, and pancreatic cancer.
              </p>
              <p>Proud Duke alum, husband, and father of two daughters.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/services">
              Explore our services
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <Image
              src="/images/paul1.jpg"
              alt="Dr. Paul Toomey portrait"
              width={1200}
              height={1600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-slate-100 lg:h-44">
              <Image
                src="/images/paul-whitecoat.jpg"
                alt="Dr. Paul Toomey in white coat"
                fill
                sizes="(min-width: 1024px) 220px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="text-sm text-slate-700">
              Care coordination ensures imaging, authorizations, and follow-up are lined up so patients can focus
              on healing. Our team keeps a close connection with referring providers from consult through recovery.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell space-y-6 pb-12">
        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <p className="text-sm font-semibold text-teal-600">{pillar.title}</p>
              <p className="mt-2 text-sm text-slate-700">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
