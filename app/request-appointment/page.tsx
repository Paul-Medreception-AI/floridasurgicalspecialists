import Image from "next/image";
import Link from "next/link";

import AppointmentForm from "@/app/request-appointment/AppointmentForm";

const contactInfo = {
  addressHref: "https://goo.gl/maps/5HUFPYt9tK9cfchi7",
  phoneDisplay: "941-216-3602",
  phoneHref: "tel:+19412163602",
};

const prepSteps = [
  "Have your insurance card handy so we can verify coverage.",
  "Share any recent imaging or lab work to speed scheduling.",
  "Tell us your preferred dates—we aim for fast openings.",
];

export default function RequestAppointmentPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell grid gap-10 py-14 lg:grid-cols-[1.1fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="eyebrow text-teal-500">Request Appointment</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900">
              Schedule with Florida Surgical Specialists
            </h1>
            <p className="text-lg text-slate-600">
              Our care team will coordinate your visit, imaging, and authorizations. Call or submit your request through the form
              below and we will confirm the earliest available time.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Call us</p>
              <a className="mt-1 block text-xl font-semibold text-slate-900 hover:text-teal-600" href={contactInfo.phoneHref}>
                {contactInfo.phoneDisplay}
              </a>
              <p className="mt-1 text-sm text-slate-600">Speak with our care team about availability and next steps.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Visit</p>
              <a
                className="mt-1 block text-xl font-semibold text-slate-900 hover:text-teal-600"
                href={contactInfo.addressHref}
                target="_blank"
                rel="noreferrer"
              >
                607 Manatee Ave. E. Suite 102
              </a>
              <p className="mt-1 text-sm text-slate-600">Convenient Bradenton location serving the Gulf Coast.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Request via form</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 hover:text-teal-600">Submit below</p>
              <p className="mt-1 text-sm text-slate-600">Share dates, details, and we’ll follow up quickly.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-[#18b6a3] bg-[#f0fbf7] px-5 py-4">
            <p className="text-sm font-semibold text-[#0f6f73]">What to have ready</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {prepSteps.map((step) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#18b6a3]" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
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
            to keep your visit on track.
          </p>

          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary" href={contactInfo.phoneHref}>
              Call now
            </a>
            <Link className="btn btn-outline" href="#appointment-form">
              Submit request
            </Link>
            <Link className="btn btn-outline" href="/contact">
              View contact details
            </Link>
          </div>

          <div id="appointment-form" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <p className="text-sm font-semibold text-teal-600">Appointment request</p>
            <AppointmentForm />
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
            <p className="text-sm font-semibold text-slate-700">Clinic location</p>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>607 Manatee Ave. E. Suite 102</p>
              <p>Bradenton, FL 34208</p>
              <p>Fax: 941.216.3605</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-inner">
            <iframe
              src="https://maps.google.com/maps?q=607%20Manatee%20Ave.%20E.%20Suite%20102%20Bradenton%2C%20FL%2034208&t=m&z=14&output=embed&iwloc=near"
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
