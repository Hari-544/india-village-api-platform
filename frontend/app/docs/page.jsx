const endpoints = [
    {
        title: 'List states',
        method: 'GET',
        path: '/api/v1/location/states',
        description: 'Returns distinct state names ordered alphabetically.'
    },
    {
        title: 'List districts',
        method: 'GET',
        path: '/api/v1/location/districts/:state',
        description: 'Returns districts for a selected state.'
    },
    {
        title: 'List sub-districts',
        method: 'GET',
        path: '/api/v1/location/subdistricts/:district',
        description: 'Returns sub-districts for a selected district.'
    },
    {
        title: 'Search villages',
        method: 'GET',
        path: '/api/v1/location/search?q=delhi',
        description: 'Searches village names using a partial query.'
    }
];

export default function DocsPage() {

    return (
        <div className="page-shell">
            <div className="max-w-3xl">
                <p className="text-sm font-semibold text-[var(--brand)]">Developer docs</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">VillageAPI reference</h1>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                    All protected location endpoints require an API key. Sign in, copy your key from the dashboard, and send it with every request.
                </p>
            </div>

            <section className="panel mt-8 p-6">
                <h2 className="text-xl font-bold text-slate-950">Authentication</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">Pass your key as a request header.</p>
                <code className="mt-4 block overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm text-teal-100">
                    x-api-key: sk_live_xxxxxxxxx
                </code>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2">
                {endpoints.map((endpoint) => (
                    <article key={endpoint.path} className="panel p-6">
                        <div className="flex items-center gap-3">
                            <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-bold text-[var(--brand-strong)]">
                                {endpoint.method}
                            </span>
                            <h2 className="font-bold text-slate-950">{endpoint.title}</h2>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{endpoint.description}</p>
                        <code className="mt-4 block overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm text-teal-100">
                            {endpoint.path}
                        </code>
                    </article>
                ))}
            </section>

            <section className="panel mt-8 p-6">
                <h2 className="text-xl font-bold text-slate-950">Example response</h2>
                <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm leading-6 text-teal-100">
{`[
  {
    "state": "ANDHRA PRADESH"
  }
]`}
                </pre>
            </section>
        </div>
    );

}
