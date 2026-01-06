import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const contactInfo = {
  address: "607 Manatee Ave. E. Suite 102 Bradenton, FL",
  addressHref: "https://goo.gl/maps/5HUFPYt9tK9cfchi7",
  phoneDisplay: "941-216-3602",
  phoneHref: "tel:+19412163602",
};

const followLinks = [
  { label: "Facebook", href: "https://www.facebook.com/floridasurgicalspecialists/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCCwzTn5neI7-UDo9MeTx4GA" },
];

const followIcons = {
  Facebook,
  Instagram,
  Twitter,
  YouTube: Youtube,
} as const;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Provider", href: "/providers" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <>
      <div className="bg-[#f1f5f9] text-xs text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold">📍</span>
            <a
              href={contactInfo.addressHref}
              className="transition hover:text-[#0f172a]"
              target="_blank"
              rel="noreferrer"
            >
              {contactInfo.address}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={contactInfo.phoneHref}
              className="font-semibold transition hover:text-[#0f172a]"
            >
              Call: {contactInfo.phoneDisplay}
            </a>
            <div className="hidden items-center gap-3 text-slate-500 sm:flex">
              <span className="font-semibold uppercase tracking-wide">Follow Us!</span>
              {followLinks.map((link) => {
                const Icon = followIcons[link.label as keyof typeof followIcons];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <header className="border-b border-slate-900 bg-slate-900 text-white shadow">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full bg-white/10 p-1">
              <Image
                src="/images/uploads/2020/05/307947044_520550740071514_761583.png"
                alt="Florida Surgical Specialists logo"
                fill
                className="object-contain"
                sizes="48px"
                priority
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                Florida Surgical Specialists
              </p>
              <p className="text-lg font-semibold text-white">Advanced Surgical Care</p>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-white">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/request-appointment"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-teal-600 shadow hover:bg-white/90"
            >
              Appointments
            </Link>
            <a
              href="https://square.link/u/t4id4zLl"
              className="rounded-full border border-white px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Pay Online
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
