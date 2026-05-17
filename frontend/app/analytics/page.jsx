'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import api from '../../services/api';

export default function AnalyticsPage() {

    const [analytics, setAnalytics] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {
                const res = await api.get('/analytics');
                setAnalytics(res.data.analytics);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Unable to load analytics. Please sign in again.'
                );
            } finally {
                setLoading(false);
            }

        };

        fetchAnalytics();

    }, []);

    if (loading) {
        return (
            <div className="page-shell">
                <div className="panel p-6 text-[var(--muted)]">Loading analytics...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-shell max-w-3xl">
                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                    <h1 className="text-xl font-bold text-red-800">Analytics unavailable</h1>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                    <Link href="/login" className="mt-5 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white">
                        Go to login
                    </Link>
                </div>
            </div>
        );
    }

    const dailyUsage = [...analytics.daily_usage].reverse();

    return (
        <div className="page-shell">
            <div className="border-b border-[var(--line)] pb-8">
                <p className="text-sm font-semibold text-[var(--brand)]">Usage analytics</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">API performance overview</h1>
                <p className="mt-2 text-[var(--muted)]">Track total calls, popular endpoints, and the last seven days of usage.</p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
                <section className="panel p-6">
                    <p className="text-sm font-medium text-[var(--muted)]">Total requests</p>
                    <p className="mt-3 text-5xl font-bold text-slate-950">{analytics.total_requests}</p>
                </section>

                <section className="panel p-6">
                    <h2 className="text-xl font-bold text-slate-950">Top endpoints</h2>
                    <div className="mt-5 space-y-3">
                        {analytics.top_endpoints.length === 0 && (
                            <p className="text-sm text-[var(--muted)]">No endpoint usage has been recorded yet.</p>
                        )}
                        {analytics.top_endpoints.map((item) => (
                            <div key={item.endpoint} className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-4 py-3">
                                <code className="overflow-auto font-mono text-sm text-slate-800">{item.endpoint}</code>
                                <span className="shrink-0 text-sm font-bold text-[var(--brand-strong)]">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="panel mt-8 p-6">
                <h2 className="text-xl font-bold text-slate-950">Daily usage</h2>
                <div className="mt-6 h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyUsage}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#dfe4ec" />
                            <XAxis dataKey="day" tick={{ fill: '#657083', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#657083', fontSize: 12 }} allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );

}
