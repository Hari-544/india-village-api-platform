'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import api from '../../services/api';
import ProtectedRoute from '../../components/ProtectedRoute';

const planLimits = {
    free: 5000,
    premium: 50000,
    pro: 300000,
    unlimited: 1000000
};

const maskKey = (key = '') => {
    if (!key) {
        return 'No API key issued';
    }

    if (key.length <= 12) {
        return key;
    }

    return `${key.slice(0, 6)}****${key.slice(-4)}`;
};

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/dashboard');
                setDashboard(res.data.dashboard);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load dashboard. Please sign in again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const user = dashboard?.user;

    const plan = useMemo(() => (user?.plan || 'free').toLowerCase(), [user?.plan]);
    const dailyLimit = planLimits[plan] || planLimits.free;
    const totalRequests = Number(dashboard?.total_requests || 0);
    const usagePercent = Math.min(Math.round((totalRequests / dailyLimit) * 100), 100);

    const copyApiKey = async () => {
        if (!user?.api_key) {
            return;
        }

        try {
            await navigator.clipboard.writeText(user.api_key);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="page-shell">
                    <div className="panel p-6 text-[var(--muted)]">Loading dashboard...</div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error) {
        return (
            <ProtectedRoute>
                <div className="page-shell max-w-3xl">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                        <h1 className="text-xl font-bold text-red-800">Dashboard unavailable</h1>
                        <p className="mt-2 text-sm text-red-700">{error}</p>
                        <Link href="/login" className="mt-5 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white">
                            Go to login
                        </Link>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="page-shell">
                <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-[var(--brand)]">B2B user portal</p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                            {user.business_name || 'VillageAPI client'}
                        </h1>
                        <p className="mt-2 text-[var(--muted)]">{user.email}</p>
                    </div>

                    <span className="w-fit rounded-md bg-amber-50 px-3 py-2 text-sm font-semibold capitalize text-amber-800">
                        {plan} plan
                    </span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                    <div className="panel p-5">
                        <p className="text-sm font-medium text-[var(--muted)]">Total requests</p>
                        <p className="mt-2 text-3xl font-bold text-slate-950">{totalRequests.toLocaleString()}</p>
                    </div>
                    <div className="panel p-5">
                        <p className="text-sm font-medium text-[var(--muted)]">Daily limit</p>
                        <p className="mt-2 text-3xl font-bold text-slate-950">{dailyLimit.toLocaleString()}</p>
                    </div>
                    <div className="panel p-5">
                        <p className="text-sm font-medium text-[var(--muted)]">Usage level</p>
                        <p className="mt-2 text-3xl font-bold text-slate-950">{usagePercent}%</p>
                    </div>
                    <div className="panel p-5">
                        <p className="text-sm font-medium text-[var(--muted)]">Role</p>
                        <p className="mt-2 text-3xl font-bold capitalize text-slate-950">{user.role}</p>
                    </div>
                </div>

                <section className="panel mt-8 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-950">API credential</h2>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                                Send this key in the X-API-Key header for location endpoints.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={copyApiKey}
                                disabled={!user.api_key}
                                className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {copied ? 'Copied' : 'Copy key'}
                            </button>
                            <Link href="/docs" className="rounded-md border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--brand-strong)] hover:bg-slate-50">
                                View docs
                            </Link>
                        </div>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-md border border-[var(--line)]">
                        <div className="grid gap-3 bg-slate-50 p-4 text-sm md:grid-cols-[1fr_1.5fr_1fr]">
                            <div>
                                <p className="text-xs font-semibold uppercase text-[var(--muted)]">Key name</p>
                                <p className="mt-1 font-semibold text-slate-950">Primary integration</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase text-[var(--muted)]">API key</p>
                                <code className="mt-1 block overflow-auto font-mono text-slate-900">{maskKey(user.api_key)}</code>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase text-[var(--muted)]">Status</p>
                                <p className="mt-1 font-semibold text-emerald-700">{user.api_key ? 'Active' : 'Pending'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-8 grid gap-4 lg:grid-cols-3">
                    {['Autocomplete requests', 'Dependent dropdowns', 'Usage monitoring'].map((workflow) => (
                        <div key={workflow} className="panel p-5">
                            <h3 className="font-bold text-slate-950">{workflow}</h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                Configured for secure B2B integrations with request tracking and predictable response
                                formats.
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </ProtectedRoute>
    );
}
