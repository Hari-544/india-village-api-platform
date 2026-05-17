'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../services/api';

export default function DashboardPage() {

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {
                const res = await api.get('/dashboard');
                setDashboard(res.data.dashboard);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Unable to load dashboard. Please sign in again.'
                );
            } finally {
                setLoading(false);
            }

        };

        fetchDashboard();

    }, []);

    if (loading) {
        return (
            <div className="page-shell">
                <div className="panel p-6 text-[var(--muted)]">Loading dashboard...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-shell max-w-3xl">
                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                    <h1 className="text-xl font-bold text-red-800">Dashboard unavailable</h1>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                    <Link href="/login" className="mt-5 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white">
                        Go to login
                    </Link>
                </div>
            </div>
        );
    }

    const user = dashboard.user;

    return (
        <div className="page-shell">
            <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-semibold text-[var(--brand)]">Client dashboard</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{user.business_name}</h1>
                    <p className="mt-2 text-[var(--muted)]">{user.email}</p>
                </div>
                <span className="w-fit rounded-md bg-amber-50 px-3 py-2 text-sm font-semibold capitalize text-amber-800">
                    {user.plan || 'free'} plan
                </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="panel p-5">
                    <p className="text-sm font-medium text-[var(--muted)]">Total requests</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{dashboard.total_requests}</p>
                </div>
                <div className="panel p-5">
                    <p className="text-sm font-medium text-[var(--muted)]">Role</p>
                    <p className="mt-2 text-3xl font-bold capitalize text-slate-950">{user.role}</p>
                </div>
                <div className="panel p-5">
                    <p className="text-sm font-medium text-[var(--muted)]">Daily limit</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{user.plan === 'pro' ? '10,000' : '100'}</p>
                </div>
            </div>

            <section className="panel mt-8 p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-950">API key</h2>
                        <p className="mt-1 text-sm text-[var(--muted)]">Use this in the x-api-key header for location endpoints.</p>
                    </div>
                    <Link href="/docs" className="text-sm font-semibold text-[var(--brand-strong)] hover:underline">
                        View docs
                    </Link>
                </div>
                <code className="mt-5 block overflow-auto rounded-md bg-slate-950 p-4 font-mono text-sm text-teal-100">
                    {user.api_key || 'No API key found for this account'}
                </code>
            </section>
        </div>
    );

}
