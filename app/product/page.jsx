"use client"
import UserDashboardLayout from "@/componont/UserDashbordLayout/UserDashboardLayout";



export function LevelProgressBar() {
  return (
    <section className="rounded-2xl border bg-white px-4 py-3 md:px-6 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-6 items-center">
        {/* left small progress */}
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <div className="text-xs text-slate-500">Your Level 01</div>

            <div className="mt-1 flex items-center gap-3">
              <div className="h-2 w-40 max-w-[170px] rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-[70%] rounded-full bg-sky-500" />
              </div>
              <div className="text-xs font-semibold text-sky-600">70%</div>
            </div>
          </div>
        </div>

        {/* vertical divider + text */}
        <div className="md:border-l md:pl-6 text-sm text-slate-600 leading-relaxed">
          After completing your current level, your next level will be unlocked
          automatically. As your level increases, your profits will also
          increase. Keep investing.
        </div>
      </div>
    </section>
  );
}
export function ProductShowcase() {
  return (
    <section className="rounded-2xl border bg-white p-4 md:p-6">
      <div className="text-sm font-semibold text-slate-700">
        All Products Level 01
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[120px_1fr_320px] gap-4 lg:gap-6">
        {/* left thumbnails */}
        <div className="flex lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible pb-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <button
              key={i}
              className={`shrink-0 h-20 w-20 rounded-lg border bg-white flex items-center justify-center hover:bg-slate-50 ${
                i === 0 ? "border-sky-400 ring-2 ring-sky-100" : ""
              }`}
            >
              <div className="h-12 w-12 rounded bg-slate-200" />
            </button>
          ))}
        </div>

        {/* center big preview */}
        <div className="rounded-xl bg-slate-100 border flex items-center justify-center min-h-[260px]">
          <div className="h-48 w-48 rounded-2xl bg-slate-300" />
        </div>

        {/* right details */}
        <div className="rounded-xl border bg-white p-4 md:p-5">
          <div className="text-lg font-bold text-slate-900 leading-snug">
            Blackview Airbuds 8 (Display Screen - Bluetooth 5.3) Black
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            <div className="text-amber-500">★★★★★</div>
            <div className="text-slate-400">(150 Reviews)</div>
            <div className="text-emerald-600 font-semibold ml-2">In Stock</div>
          </div>

          <div className="mt-3 text-xl font-bold text-slate-900">$192.00</div>

          <ul className="mt-3 text-xs text-slate-600 space-y-1 list-disc pl-4">
            <li>Bluetooth 5.3 Headphones</li>
            <li>Active noise reduction</li>
            <li>Touch control with microphone</li>
            <li>Up to 6.8 hours of listening time</li>
          </ul>

          <div className="my-4 border-t" />

          {/* colors */}
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-700">Colours:</div>
            <div className="flex items-center gap-2">
              <button className="h-6 w-6 rounded-full bg-black ring-2 ring-white border" />
              <button className="h-6 w-6 rounded-full bg-rose-600 ring-2 ring-white border" />
              <button className="h-6 w-6 rounded-full bg-slate-200 ring-2 ring-white border" />
            </div>
          </div>

          {/* sizes */}
          <div className="mt-4 flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-700">Size:</div>
            <div className="flex flex-wrap gap-2">
              {["X", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className={`h-8 w-8 rounded-md border text-xs font-semibold ${
                    s === "M"
                      ? "bg-sky-500 text-white border-sky-500"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* quantity + invest */}
          <div className="mt-5 flex items-center gap-3">
            <div className="inline-flex items-center rounded-lg border overflow-hidden">
              <button className="h-9 w-9 hover:bg-slate-50">−</button>
              <div className="h-9 w-12 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <button className="h-9 w-9 bg-sky-500 text-white hover:bg-sky-600">
                +
              </button>
            </div>

            <button className="flex-1 h-9 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600">
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export function AllLevelGrid() {
  const levels = [
    { label: "Level-01", active: true, locked: false },
    { label: "Level-02", active: false, locked: true },
    { label: "Level-03", active: false, locked: false },
    { label: "Level-04", active: false, locked: true },
    { label: "Level-02", active: false, locked: true },
    { label: "Level-02", active: false, locked: true },
    { label: "Level-03", active: false, locked: false },
    { label: "Level-04", active: false, locked: true },
  ];

  return (
    <section className="rounded-2xl border bg-white p-4 md:p-6">
      <div className="text-sm font-semibold text-slate-700">All Level</div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {levels.map((l, idx) => (
          <button
            key={idx}
            className={`
              relative rounded-xl border px-4 py-10 text-center font-semibold
              ${l.active ? "bg-sky-50 border-sky-200 text-slate-900" : "bg-white text-slate-700"}
              hover:bg-slate-50
            `}
          >
            <span className="text-lg">{l.label}</span>

            {l.locked && (
              <span className="absolute top-3 right-3 text-slate-400">
                🔒
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function LuxbissDashboard() {
  

  return (
    <UserDashboardLayout>
          <LevelProgressBar />
          <ProductShowcase />
          <AllLevelGrid /> 
    </UserDashboardLayout>
  );
}
