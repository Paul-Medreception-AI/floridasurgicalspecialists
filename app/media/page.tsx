const mediaItems = [
  {
    title: "LINX hiatal hernia repair",
    url: "https://youtu.be/W05pWbA4_gI",
    description:
      "Dr. Paul Toomey demonstrates a reduced-port laparoscopic hiatal hernia repair with LINX implantation.",
  },
  {
    title: "LESS cholecystectomy",
    url: "https://youtu.be/9USxZfjGApQ",
    description:
      "Laparo-Endoscopic Single Site (LESS) cholecystectomy presented at Minimally Invasive Surgery Week 2014.",
  },
  {
    title: "LESS Toupet fundoplication",
    url: "https://youtu.be/MVy-p9zGoqY",
    description:
      "Single-site Toupet fundoplication recognized at Minimally Invasive Surgery Week for surgical video quality.",
  },
];

export default function MediaPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="section-shell space-y-6 py-12">
        <p className="eyebrow text-teal-500">Media</p>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900">Videos & educational clips</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Watch how the Florida Surgical Specialists team approaches minimally invasive procedures, reflux solutions,
          and pelvic floor therapies.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {mediaItems.map((item) => (
            <article
              key={item.url}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Featured Video</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-700">{item.description}</p>
              <a
                href={item.url}
                className="mt-4 inline-flex items-center gap-2 font-semibold text-teal-600 hover:text-teal-700"
                target="_blank"
                rel="noreferrer"
              >
                Watch now <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
