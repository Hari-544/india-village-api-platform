'use client';

import { useEffect, useState }
from 'react';

import Link from 'next/link';

import {
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Area,
    AreaChart
} from 'recharts';

import api
from '../../services/api';

import ProtectedRoute
from '../../components/ProtectedRoute';

export default function AnalyticsPage() {

    const [analytics, setAnalytics] =
    useState(null);

    const [error, setError] =
    useState('');

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {

        const fetchAnalytics =
        async () => {

            try {

                const res =
                await api.get(
                    '/analytics'
                );

                setAnalytics(
                    res.data.analytics
                );

            } catch (err) {

                setError(

                    err.response?.data
                    ?.message ||

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

            <ProtectedRoute>

                <div className="
                page-shell
                ">

                    <div className="
                    panel
                    p-6
                    text-[var(--muted)]
                    ">

                        Loading analytics...

                    </div>

                </div>

            </ProtectedRoute>

        );

    }

    if (error) {

        return (

            <ProtectedRoute>

                <div className="
                page-shell
                max-w-3xl
                ">

                    <div className="
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    p-6
                    ">

                        <h1 className="
                        text-xl
                        font-bold
                        text-red-800
                        ">

                            Analytics unavailable

                        </h1>

                        <p className="
                        mt-2
                        text-sm
                        text-red-700
                        ">

                            {error}

                        </p>

                        <Link
                            href="/login"
                            className="
                            mt-5
                            inline-block
                            rounded-md
                            bg-red-700
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            "
                        >

                            Go to login

                        </Link>

                    </div>

                </div>

            </ProtectedRoute>

        );

    }

    const dailyUsage =
    [...analytics.daily_usage]
    .reverse();

    const peakDay =
    dailyUsage.reduce(

        (max, current) =>

            Number(current.count) >
            Number(max.count)

                ? current

                : max,

        dailyUsage[0] || {
            count: 0
        }

    );

    return (

        <ProtectedRoute>

            <div className="
            page-shell
            ">

                <div className="
                border-b
                border-[var(--line)]
                pb-8
                ">

                    <p className="
                    text-sm
                    font-semibold
                    text-[var(--brand)]
                    ">

                        Usage analytics

                    </p>

                    <h1 className="
                    mt-2
                    text-4xl
                    font-bold
                    tracking-tight
                    text-slate-950
                    ">

                        API performance overview

                    </h1>

                    <p className="
                    mt-2
                    text-[var(--muted)]
                    ">

                        Track request volume,
                        endpoint usage,
                        and API activity trends.

                    </p>

                </div>

                <div className="
                mt-8
                grid
                gap-4
                md:grid-cols-3
                ">

                    <section className="
                    panel
                    p-6
                    ">

                        <p className="
                        text-sm
                        font-medium
                        text-[var(--muted)]
                        ">

                            Total requests

                        </p>

                        <p className="
                        mt-3
                        text-5xl
                        font-bold
                        text-slate-950
                        ">

                            {
                                analytics
                                .total_requests
                            }

                        </p>

                    </section>

                    <section className="
                    panel
                    p-6
                    ">

                        <p className="
                        text-sm
                        font-medium
                        text-[var(--muted)]
                        ">

                            Top endpoint

                        </p>

                        <p className="
                        mt-3
                        text-lg
                        font-bold
                        text-slate-950
                        break-all
                        ">

                            {
                                analytics
                                .top_endpoints?.[0]
                                ?.endpoint ||

                                'No usage data'
                            }

                        </p>

                    </section>

                    <section className="
                    panel
                    p-6
                    ">

                        <p className="
                        text-sm
                        font-medium
                        text-[var(--muted)]
                        ">

                            Peak day requests

                        </p>

                        <p className="
                        mt-3
                        text-5xl
                        font-bold
                        text-slate-950
                        ">

                            {
                                peakDay.count || 0
                            }

                        </p>

                    </section>

                </div>

                <section className="
                panel
                mt-8
                p-6
                ">

                    <div className="
                    flex
                    items-center
                    justify-between
                    ">

                        <div>

                            <h2 className="
                            text-xl
                            font-bold
                            text-slate-950
                            ">

                                Daily usage trend

                            </h2>

                            <p className="
                            mt-1
                            text-sm
                            text-[var(--muted)]
                            ">

                                Last 7 days
                                request activity

                            </p>

                        </div>

                    </div>

                    <div className="
                    mt-6
                    h-[360px]
                    ">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <AreaChart
                                data={dailyUsage}
                            >

                                <defs>

                                    <linearGradient
                                        id="usageGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="5%"
                                            stopColor="#0f766e"
                                            stopOpacity={0.4}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#0f766e"
                                            stopOpacity={0}
                                        />

                                    </linearGradient>

                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#dfe4ec"
                                />

                                <XAxis
                                    dataKey="day"
                                    tick={{
                                        fill: '#657083',
                                        fontSize: 12
                                    }}
                                />

                                <YAxis
                                    tick={{
                                        fill: '#657083',
                                        fontSize: 12
                                    }}
                                    allowDecimals={false}
                                />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#0f766e"
                                    fillOpacity={1}
                                    fill="url(#usageGradient)"
                                    strokeWidth={3}
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>

                </section>

                <section className="
                panel
                mt-8
                p-6
                ">

                    <div className="
                    flex
                    items-center
                    justify-between
                    ">

                        <h2 className="
                        text-xl
                        font-bold
                        text-slate-950
                        ">

                            Top endpoints

                        </h2>

                        <span className="
                        text-sm
                        text-[var(--muted)]
                        ">

                            Most requested APIs

                        </span>

                    </div>

                    <div className="
                    mt-6
                    space-y-3
                    ">

                        {
                            analytics
                            .top_endpoints
                            .length === 0 && (

                                <p className="
                                text-sm
                                text-[var(--muted)]
                                ">

                                    No endpoint usage
                                    recorded yet.

                                </p>

                            )
                        }

                        {
                            analytics
                            .top_endpoints
                            .map((item) => (

                                <div
                                    key={item.endpoint}
                                    className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    rounded-xl
                                    border
                                    border-[var(--line)]
                                    bg-slate-50
                                    px-4
                                    py-4
                                    "
                                >

                                    <div>

                                        <code className="
                                        block
                                        overflow-auto
                                        font-mono
                                        text-sm
                                        text-slate-800
                                        ">

                                            {
                                                item.endpoint
                                            }

                                        </code>

                                    </div>

                                    <span className="
                                    shrink-0
                                    rounded-md
                                    bg-teal-100
                                    px-3
                                    py-1
                                    text-sm
                                    font-bold
                                    text-teal-800
                                    ">

                                        {
                                            item.count
                                        } calls

                                    </span>

                                </div>

                            ))
                        }

                    </div>

                </section>

            </div>

        </ProtectedRoute>

    );

}
