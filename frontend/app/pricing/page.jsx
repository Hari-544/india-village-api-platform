const plans = [
    {
        name: 'Free',
        price: '$0',
        note: 'For development, testing, and demos.',
        quota: '5,000/day',
        burst: '100/min',
        features: ['Single-state access', 'API key access', 'Dashboard usage summary']
    },
    {
        name: 'Premium',
        price: '$49/mo',
        note: 'For small production applications.',
        quota: '50,000/day',
        burst: '500/min',
        featured: true,
        features: ['Up to 5 states', 'Usage analytics', 'Email usage alerts']
    },
    {
        name: 'Pro',
        price: '$199/mo',
        note: 'For growing platforms and operational systems.',
        quota: '300,000/day',
        burst: '2,000/min',
        features: ['All-India access', 'Priority support', 'Advanced API logs']
    },
    {
        name: 'Unlimited',
        price: '$499/mo',
        note: 'For large enterprises with high-volume API traffic.',
        quota: '1,000,000/day',
        burst: '5,000/min',
        features: ['All states', 'SLA support', 'Custom onboarding']
    }
];

export default function PricingPage() {
    return (
        <div className="page-shell">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold text-[var(--brand)]">Plans and limits</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Choose quota that matches your integration.</h1>
                <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                    Every plan includes authenticated API access, standardized address responses, and dashboard visibility.
                </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
                {plans.map((plan) => (
                    <article
                        key={plan.name}
                        className={`rounded-lg border bg-white p-6 shadow-sm ${
                            plan.featured ? 'border-[var(--brand)] ring-2 ring-teal-100' : 'border-[var(--line)]'
                        }`}
                    >
                        {plan.featured && (
                            <p className="mb-4 w-fit rounded-md bg-teal-50 px-3 py-1 text-xs font-bold text-[var(--brand-strong)]">
                                Recommended
                            </p>
                        )}
                        <h2 className="text-2xl font-bold text-slate-950">{plan.name}</h2>
                        <p className="mt-3 text-4xl font-bold text-slate-950">{plan.price}</p>
                        <p className="mt-3 min-h-16 text-sm leading-6 text-[var(--muted)]">{plan.note}</p>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-md border border-[var(--line)] bg-slate-50 p-3">
                                <p className="text-xs font-semibold uppercase text-[var(--muted)]">Daily</p>
                                <p className="mt-1 font-bold text-slate-950">{plan.quota}</p>
                            </div>
                            <div className="rounded-md border border-[var(--line)] bg-slate-50 p-3">
                                <p className="text-xs font-semibold uppercase text-[var(--muted)]">Burst</p>
                                <p className="mt-1 font-bold text-slate-950">{plan.burst}</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {plan.features.map((feature) => (
                                <p key={feature} className="text-sm font-medium text-slate-700">
                                    <span className="mr-2 font-bold text-[var(--brand)]">Included</span>
                                    {feature}
                                </p>
                            ))}
                        </div>
                        <button className="mt-8 w-full rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                            Choose {plan.name}
                        </button>
                    </article>
                ))}
            </div>
        </div>
    );
}
