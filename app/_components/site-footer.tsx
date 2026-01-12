import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="section-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Florida Surgical Specialists</p>
          <p className="text-2xl font-semibold text-white">Robotic, minimally invasive surgical care.</p>
          <p className="text-sm text-slate-400">
            Serving patients across Bradenton, Palmetto, Parrish, Lakewood Ranch, and Sarasota.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Patient Services</p>
          <div className="flex flex-col gap-2">
            <Link className="text-slate-300 hover:text-white" href="/request-appointment">
              Request an appointment
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/contact">
              Contact the practice
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/services">
              View services
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Silos</p>
          <div className="flex flex-col gap-2">
            <Link className="text-slate-300 hover:text-white" href="/gallbladder">
              Gallbladder
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/hernia">
              Hernia
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/robotic-surgery">
              Robotic surgery
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/lumps-and-bumps">
              Lumps &amp; bumps
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/abdominal-pain">
              Abdominal pain
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Gallbladder Resources</p>
          <div className="flex flex-col gap-2">
            <Link className="text-slate-300 hover:text-white" href="/gallbladder">
              Gallbladder overview
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/hernia">
              Hernia care
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/gallbladder/gallstones">
              Gallstones
            </Link>
            <Link className="text-slate-300 hover:text-white" href="/gallbladder/gallbladder-removal">
              Gallbladder removal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
