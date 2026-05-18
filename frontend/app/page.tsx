import Link from 'next/link';

const metrics = [
    { label: 'Village and locality records', value: '600K+' },
    { label: 'District coverage target', value: '700+' },
    { label: 'Daily free-tier quota', value: '5K' },
    { label: 'Enterprise quota ceiling', value: '1M/day' }
];

const stack = [
    ['Runtime', 'Node.js + Express'],
    ['Database', 'Neon PostgreSQL'],
    ['Caching', 'Upstash Redis'],
    ['Authentication', 'JWT + API keys'],
    ['Dashboard', 'Next.js + Recharts'],
    ['Hosting', 'Vercel']
];

const flows = [
    'Validate API key and quota before each data request.',
    'Return dropdown-ready village, sub-district, district, state, and country hierarchy.',
    'Record usage for analytics, rate-limit visibility, and plan enforcement.'
];

const endpoints = [
    ['GET', '/api/v1/location/search?q=Manibeli'],
    ['GET', '/api/v1/location/autocomplete?q=Ma'],
    ['GET', '/api/v1/location/states'],
    ['GET', '/api/v1/location/states/Maharashtra/districts']
];

export default function HomePage() {
    return (
        <div>
            <section className="border-b border-[var(--line)] bg-white">
                <div className="page-shell grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold text-[var(--brand)]">VillageAPI platform</p>
                        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                            Structured Indian village data for production forms, search, and B2B integrations.
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                            A secure API layer over MDDS-style location data, with dashboard analytics, API-key access,
                            plan limits, and standardized address responses for client applications.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/docs" className="rounded-md bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-strong)]">
                                Read API docs
                            </Link>
                            <Link href="/login" className="rounded-md border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                                Open dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="panel overflow-hidden">
                        <div className="border-b border-[var(--line)] bg-slate-50 px-5 py-4">
                            <p className="text-sm font-semibold text-slate-950">Dropdown response shape</p>
                            <p className="mt-1 text-sm text-[var(--muted)]">Designed for direct use in address forms.</p>
                        </div>
                        <pre className="overflow-auto bg-slate-950 p-5 font-mono text-sm leading-7 text-teal-100">
{`{
  "value": "village_maharashtra_nandurbar_akkalkuwa_manibeli",
  "label": "Manibeli",
  "fullAddress": "Manibeli, Akkalkuwa, Nandurbar, Maharashtra, India",
  "hierarchy": {
    "village": "Manibeli",
    "subDistrict": "Akkalkuwa",
    "district": "Nandurbar",
    "state": "Maharashtra",
    "country": "India"
  }
}`}
                        </pre>
                    </div>
                </div>
            </section>

            <section className="page-shell">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="panel p-5">
                            <p className="text-3xl font-bold text-slate-950">{metric.value}</p>
                            <p className="mt-1 text-sm font-medium text-[var(--muted)]">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-shell grid gap-8 pt-0 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                    <p className="text-sm font-semibold text-[var(--brand)]">Architecture</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Built as a secure API product, not a spreadsheet wrapper.</h2>
                    <p className="mt-4 leading-7 text-[var(--muted)]">
                        The current implementation keeps the stack lean while matching the target platform direction:
                        serverless-ready Node APIs, PostgreSQL-backed data, dashboard authentication, usage logging,
                        and Recharts analytics.
                    </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    {stack.map(([label, value]) => (
                        <div key={label} className="rounded-md border border-[var(--line)] bg-white p-4">
                            <p className="text-xs font-semibold uppercase text-[var(--muted)]">{label}</p>
                            <p className="mt-2 font-semibold text-slate-950">{value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y border-[var(--line)] bg-white">
                <div className="page-shell grid gap-8 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold text-[var(--brand)]">Request flow</p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-950">From API key to formatted address.</h2>
                        <div className="mt-5 space-y-3">
                            {flows.map((flow, index) => (
                                <div key={flow} className="flex gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-4">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-white text-sm font-bold text-[var(--brand)]">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm leading-6 text-slate-700">{flow}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-[var(--brand)]">Core endpoints</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-950">Developer-ready surface.</h2>
                            </div>
                            <Link href="/docs" className="text-sm font-semibold text-[var(--brand-strong)] hover:underline">
                                Full docs
                            </Link>
                        </div>
                        <div className="mt-5 grid gap-3">
                            {endpoints.map(([method, path]) => (
                                <div key={path} className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3">
                                    <span className="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-[var(--brand-strong)]">{method}</span>
                                    <code className="overflow-auto font-mono text-sm text-slate-800">{path}</code>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
