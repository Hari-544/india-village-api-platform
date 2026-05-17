import Link from 'next/link';

const metrics = [
    { label: 'Village records indexed', value: '6L+' },
    { label: 'Districts covered', value: '700+' },
    { label: 'Target API latency', value: '<150ms' },
    { label: 'Free daily requests', value: '100' }
];

const workflows = [
    {
        title: 'Address onboarding',
        text: 'Power structured state, district, sub-district, and village selectors in customer forms.'
    },
    {
        title: 'Search experiences',
        text: 'Add village autocomplete with consistent administrative context for every returned record.'
    },
    {
        title: 'Operations dashboards',
        text: 'Track usage, limits, and endpoint demand from client-ready analytics pages.'
    }
];

const endpoints = [
    ['GET', '/api/v1/location/states'],
    ['GET', '/api/v1/location/districts/:state'],
    ['GET', '/api/v1/location/subdistricts/:district'],
    ['GET', '/api/v1/location/search?q=delhi']
];

export default function HomePage() {

    return (
        <div>
            <section className="border-b border-[var(--line)] bg-white">
                <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
                    <div className="flex flex-col justify-center">
                        <p className="mb-4 w-fit rounded-md border border-teal-100 bg-teal-50 px-3 py-2 text-sm font-semibold text-[var(--brand-strong)]">
                            Production-ready address APIs for India
                        </p>
                        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            Reliable village data for forms, search, and location products.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                            VillageAPI gives teams clean geographic endpoints, API-key security, usage limits, and analytics without maintaining spreadsheets or custom import jobs.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/docs" className="rounded-md bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-strong)]">
                                Explore documentation
                            </Link>
                            <Link href="/pricing" className="rounded-md border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                                Compare plans
                            </Link>
                        </div>
                    </div>

                    <div className="panel overflow-hidden">
                        <div className="border-b border-[var(--line)] bg-slate-50 px-5 py-4">
                            <p className="text-sm font-semibold text-slate-950">Live API shape</p>
                            <p className="mt-1 text-sm text-[var(--muted)]">Protected by your dashboard API key.</p>
                        </div>
                        <div className="bg-slate-950 p-5">
                            <pre className="overflow-auto text-sm leading-7 text-teal-100">
{`const response = await fetch('/api/v1/location/search?q=Rampur', {
  headers: {
    'x-api-key': 'sk_live_your_key'
  }
});

const villages = await response.json();`}
                            </pre>
                        </div>
                        <div className="grid grid-cols-2 border-t border-[var(--line)] bg-white">
                            <div className="border-r border-[var(--line)] p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Auth</p>
                                <p className="mt-1 font-semibold text-slate-950">API key header</p>
                            </div>
                            <div className="p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Format</p>
                                <p className="mt-1 font-semibold text-slate-950">JSON responses</p>
                            </div>
                        </div>
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
                    <p className="text-sm font-semibold text-[var(--brand)]">Use cases</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Built for repeated operational workflows</h2>
                    <p className="mt-4 text-[var(--muted)]">
                        The interface is intentionally simple: developers get clean docs, business users get usage visibility, and teams get predictable API behavior.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {workflows.map((workflow) => (
                        <article key={workflow.title} className="panel p-5">
                            <h3 className="font-semibold text-slate-950">{workflow.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{workflow.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="border-y border-[var(--line)] bg-white">
                <div className="page-shell">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[var(--brand)]">API reference</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-950">Core endpoints</h2>
                        </div>
                        <Link href="/docs" className="text-sm font-semibold text-[var(--brand-strong)] hover:underline">
                            View complete docs
                        </Link>
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {endpoints.map(([method, path]) => (
                            <div key={path} className="flex items-center gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3">
                                <span className="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-[var(--brand-strong)]">{method}</span>
                                <code className="overflow-auto font-mono text-sm text-slate-800">{path}</code>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );

}
