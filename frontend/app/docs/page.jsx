const endpoints = [
    {
        title: 'Search villages',
        method: 'GET',
        path: '/api/v1/location/search',
        query: 'q, state, district, subDistrict, limit',
        description: 'Returns dropdown-ready village matches with complete administrative hierarchy.'
    },
    {
        title: 'Autocomplete',
        method: 'GET',
        path: '/api/v1/location/autocomplete',
        query: 'q, limit',
        description: 'Optimized typeahead endpoint for contact forms and onboarding flows.'
    },
    {
        title: 'List states',
        method: 'GET',
        path: '/api/v1/location/states',
        query: 'none',
        description: 'Returns state options for top-level selectors.'
    },
    {
        title: 'Districts by state',
        method: 'GET',
        path: '/api/v1/location/states/{state}/districts',
        query: 'none',
        description: 'Returns district options scoped to a selected state.'
    },
    {
        title: 'Sub-districts by district',
        method: 'GET',
        path: '/api/v1/location/districts/{district}/subdistricts',
        query: 'none',
        description: 'Returns block, taluka, or sub-district options scoped to a district.'
    },
    {
        title: 'Villages by sub-district',
        method: 'GET',
        path: '/api/v1/location/subdistricts/{subdistrict}/villages',
        query: 'page, limit',
        description: 'Returns paginated village options for large administrative areas.'
    }
];

const errors = [
    ['400', 'INVALID_QUERY', 'Search query too short or invalid.'],
    ['401', 'INVALID_API_KEY', 'API key missing or invalid.'],
    ['403', 'ACCESS_DENIED', 'User is not authorized for the requested area.'],
    ['404', 'NOT_FOUND', 'Requested resource does not exist.'],
    ['429', 'RATE_LIMITED', 'Daily quota exceeded.'],
    ['500', 'INTERNAL_ERROR', 'Unexpected server error.']
];

export default function DocsPage() {
    return (
        <div className="page-shell">
            <div className="max-w-3xl">
                <p className="text-sm font-semibold text-[var(--brand)]">Developer documentation</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">VillageAPI reference</h1>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                    Use the location API to power village autocomplete, dependent dropdowns, and standardized Indian
                    address capture. Send your API key with every protected request.
                </p>
            </div>

            <section className="panel mt-8 p-6">
                <h2 className="text-xl font-bold text-slate-950">Authentication</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                    Dashboard sessions use JWT. Programmatic API calls use an API key header, with API secrets reserved
                    for future write operations and key rotation flows.
                </p>
                <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm leading-6 text-teal-100">
{`X-API-Key: ak_your_32_character_key
X-API-Secret: as_your_secret_for_write_operations`}
                </pre>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2">
                {endpoints.map((endpoint) => (
                    <article key={endpoint.path} className="panel p-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-bold text-[var(--brand-strong)]">
                                {endpoint.method}
                            </span>
                            <h2 className="font-bold text-slate-950">{endpoint.title}</h2>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{endpoint.description}</p>
                        <code className="mt-4 block overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm text-teal-100">
                            {endpoint.path}
                        </code>
                        <p className="mt-3 text-xs font-semibold uppercase text-[var(--muted)]">Query parameters</p>
                        <p className="mt-1 text-sm text-slate-700">{endpoint.query}</p>
                    </article>
                ))}
            </section>

            <section className="panel mt-8 p-6">
                <h2 className="text-xl font-bold text-slate-950">Standard response</h2>
                <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm leading-6 text-teal-100">
{`{
  "success": true,
  "count": 1,
  "data": [
    {
      "value": "village_maharashtra_nandurbar_akkalkuwa_manibeli",
      "label": "Manibeli",
      "fullAddress": "Manibeli, Akkalkuwa, Nandurbar, Maharashtra, India"
    }
  ],
  "meta": {
    "requestId": "req_xxx",
    "responseTime": 47,
    "rateLimit": {
      "remaining": 4850,
      "limit": 5000,
      "reset": "2026-05-19T00:00:00.000Z"
    }
  }
}`}
                </pre>
            </section>

            <section className="panel mt-8 overflow-hidden">
                <div className="border-b border-[var(--line)] p-6">
                    <h2 className="text-xl font-bold text-slate-950">Error codes</h2>
                </div>
                <div className="overflow-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-[var(--muted)]">
                            <tr>
                                <th className="px-6 py-3">HTTP</th>
                                <th className="px-6 py-3">Code</th>
                                <th className="px-6 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--line)]">
                            {errors.map(([http, code, description]) => (
                                <tr key={code}>
                                    <td className="px-6 py-4 font-semibold text-slate-950">{http}</td>
                                    <td className="px-6 py-4 font-mono text-slate-800">{code}</td>
                                    <td className="px-6 py-4 text-[var(--muted)]">{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
