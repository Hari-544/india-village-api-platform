const plans = [
    {
        name: 'Free',
        price: 'INR 0',
        note: 'For prototypes and internal testing.',
        features: ['100 requests per day', 'API key access', 'Community support']
    },
    {
        name: 'Pro',
        price: 'INR 499/mo',
        note: 'For production applications with steady usage.',
        featured: true,
        features: ['10,000 requests per day', 'Usage analytics', 'Priority support']
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        note: 'For high-volume platforms and custom needs.',
        features: ['Custom limits', 'Dedicated support', 'Integration assistance']
    }
];

export default function PricingPage() {

    return (
        <div className="page-shell">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold text-[var(--brand)]">Pricing</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Choose the right API limit</h1>
                <p className="mt-4 text-lg text-[var(--muted)]">
                    Start free, upgrade when your application needs higher request volume and richer analytics.
                </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
                {plans.map((plan) => (
                    <article
                        key={plan.name}
                        className={`rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
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
                        <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--muted)]">{plan.note}</p>
                        <div className="mt-6 space-y-3">
                            {plan.features.map((feature) => (
                                <p key={feature} className="text-sm font-medium text-slate-700">
                                    <span className="mr-2 text-[var(--brand)]">✓</span>
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
