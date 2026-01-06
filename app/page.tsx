import Image from "next/image";
import Link from "next/link";

const heroContent = {
  badge: "Personalized Surgical Care",
  title: "The Very Best Robotic Surgery Solutions!",
  subtitle: "Less pain. Faster recovery.",
  paragraph:
    "The future of medicine has become today's reality. Together with his staff, Dr. Paul Toomey delivers advanced robotic and minimally invasive surgical care for Bradenton, Sarasota, and the surrounding Gulf Coast.",
  primaryCta: { label: "Contact Us", href: "/contact" },
  secondaryCta: {
    label: "Request Appointment",
    href: "/request-appointment",
  },
  heroImage: "/images/Paul2SRC.png",
};

const locationContent = {
  heading: "Our Location",
  description:
    "With multiple office locations in Sarasota and Bradenton, patients no longer need to travel far from home to obtain the best surgical care. Dr. Paul Toomey is a staff surgeon at Manatee Memorial Hospital and Lakewood Ranch Medical Center. Outpatient procedures are performed at Manatee Surgical Center.",
  addressLines: [
    "607 Manatee Ave. E. Suite 102",
    "Bradenton, FL 34208",
    "Phone: 941.216.3602",
    "Fax: 941.216.3605",
    "Email: floridasurgicalspecialists@gmail.com",
    "Monday-Friday: 8 AM - 5 PM (Closed 12-1 PM)",
  ],
  mapSrc:
    "https://maps.google.com/maps?q=607%20Manatee%20Ave.%20E.%20Suite%20102%20Bradenton%2C%20FL%2034208&t=m&z=14&output=embed&iwloc=near",
  contactHref: "/contact",
};

const testimonials = [
  {
    quote:
      "Dr. Toomey is an excellent surgeon. He's very professional, knowledgeable, kind and has a sense of humor. I recovered quickly from my surgery with little pain. His nurse, Christie, returned all my calls in a timely manner. His Lakewood Ranch office is clean and beautiful. I would definitely refer Dr. Toomey to my family and friends. Thank you also to the nurses and the front desk receptionist in the Manatee Surgical Care for their outstanding care.",
    name: "Mahalia A.",
  },
  {
    quote:
      "Recently being diagnosed with breast cancer has been overwhelming to say the least. Dr. Toomey and his staff always take their time to explain what to expect and are always reassuring. I know I can call at any time the need arises. I was so impressed with his surgical skills as I was terrified to look after surgery, but wow! Nice work :) Lastly, they always make me smile even if my reason for being there is nothing to smile about. Thank you for that.",
    name: "Tamra T.",
  },
  {
    quote:
      "Walking into Dr Toomey's office was like a breath of fresh air. His front office staff made you feel welcome. His nurses and back office staff was friendly. Dr. Toomey instantly put your mind at ease. He took his time explaining my condition and gave me time to ask any questions or address any of my concerns. I will highly recommend him.",
    name: "Lydia C.M.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col bg-white text-slate-900">
      {/* hero */}
      <section className="hero-gradient">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={heroContent.heroImage}
              alt="Paul Toomey, MD"
              width={1280}
              height={900}
              className="h-auto w-full object-cover"
            />
            <div className="absolute left-6 top-6 rounded-full bg-slate-900/85 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur">
              Paul Toomey, MD
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl bg-slate-900/95 px-8 py-10 text-white shadow-2xl backdrop-blur">
            <div className="text-xs uppercase tracking-[0.3em] text-teal-300">
              {heroContent.badge}
            </div>
            <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">
              {heroContent.title}
            </h1>
            <p className="text-lg font-semibold text-teal-200">{heroContent.subtitle}</p>
            <p className="text-sm text-slate-200">{heroContent.paragraph}</p>
            <p className="text-sm text-slate-200">
              Focused on inguinal hernia repair, gallbladder surgery, and colorectal care—plus colonoscopy,
              breast disease, ventral/abdominal wall cases, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={heroContent.primaryCta.href}
                className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-400"
              >
                {heroContent.primaryCta.label}
              </Link>
              <a
                href={heroContent.secondaryCta.href}
                className="rounded-full border border-[#18b6a3] px-6 py-3 text-sm font-semibold text-[#18b6a3] transition hover:bg-[#18b6a3] hover:text-white"
              >
                {heroContent.secondaryCta.label}
              </a>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-[#18b6a3]">✓</span>
                Board-Certified General Surgeon
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#18b6a3]">✓</span>
                Robotic &amp; Minimally Invasive Specialist
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#18b6a3]">✓</span>
                Sarasota–Bradenton Trusted Care
              </li>
            </ul>
            <ul className="mt-4 space-y-2 text-sm text-teal-200">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#18b6a3]" />
                Most patients are seen within a week — not months.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#18b6a3]" />
                Every call is answered immediately, even when our staff is with patients.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#18b6a3]" />
                Prompt scheduling for consults and procedures.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* locations */}
      <section className="mx-auto max-w-6xl grid gap-8 px-4 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-500">
            {locationContent.heading}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Bradenton, FL</h2>
          <p className="mt-5 text-slate-600">{locationContent.description}</p>
          <div className="mt-6 space-y-2 text-sm text-slate-700">
            {locationContent.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <Link
            href={locationContent.contactHref}
            className="mt-6 inline-flex rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Contact Us
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <iframe
            src={locationContent.mapSrc}
            title="Florida Surgical Specialists Bradenton office"
            className="h-[420px] w-full"
            loading="lazy"
          />
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-6 py-4">
            <a
              href={locationContent.mapSrc.replace("&output=embed", "")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-400"
            >
              View Larger Map
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=607+Manatee+Ave+E+Suite+102+Bradenton+FL+34208"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Get Directions
            </a>
            <a
              href="tel:+19412163602"
              className="text-sm font-semibold text-teal-600 hover:text-teal-500"
            >
              Call 941-216-3602 →
            </a>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300">
              Our Patients Love Us!
            </p>
            <p className="mt-3 text-lg text-slate-100">
              Hundreds of five-star reviews celebrate the warmth of our staff, the clarity of
              our communication, and the results achieved by our surgeons.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-lg"
              >
                <blockquote className="flex-1 text-sm text-slate-100">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4 text-base font-semibold text-white">
                  {testimonial.name}
                </figcaption>
                <span className="text-xs uppercase tracking-[0.3em] text-teal-300">
                  Verified Patient
                </span>
              </figure>
            ))}
          </div>
          <a
            href="https://www.google.com/maps/place/Florida+Surgical+Specialists/@27.495411,-82.55735,16z/data=!4m7!3m6!1s0x0:0x4d19fa1870d6cd8a!8m2!3d27.4954158!4d-82.5573502!9m1!1b1?hl=en-US"
            target="_blank"
            rel="noreferrer"
            className="mx-auto inline-flex rounded-full border border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            View All Reviews on Google
          </a>
        </div>
      </section>
    </main>
  );
}
