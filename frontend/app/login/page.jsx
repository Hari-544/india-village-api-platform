'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';

export default function LoginPage() {

    const router = useRouter();
    const [email, setEmail] = useState('hari@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const loginUser = async (event) => {

        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_email', res.data.user.email);

            if (res.data.user?.api_key) {
                localStorage.setItem('api_key', res.data.user.api_key);
            }

            router.push('/dashboard');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to sign in. Check that the backend is running on port 8000.'
            );
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="page-shell grid min-h-[calc(100vh-137px)] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="hidden lg:block">
                <p className="text-sm font-semibold text-[var(--brand)]">Account access</p>
                <h1 className="mt-2 max-w-xl text-4xl font-bold tracking-tight text-slate-950">
                    Manage keys, monitor usage, and keep address workflows moving.
                </h1>
                <div className="mt-8 grid max-w-xl gap-3">
                    {['Secure JWT session for dashboard access', 'API key authentication for data endpoints', 'Usage analytics for operational visibility'].map((item) => (
                        <div key={item} className="panel p-4 text-sm font-medium text-slate-700">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <form
                onSubmit={loginUser}
                className="panel mx-auto w-full max-w-md p-8"
                suppressHydrationWarning
            >
                <p className="text-sm font-semibold text-[var(--brand)]">Client access</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Sign in to VillageAPI</h1>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    Manage your API key, view usage, and inspect analytics from the client dashboard.
                </p>

                {error && (
                    <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </div>
                )}

                <label className="mt-6 block text-sm font-semibold text-slate-800" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    className="mt-2 w-full rounded-md border border-[var(--line)] bg-white px-3 py-3 text-slate-950 outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-teal-100"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    suppressHydrationWarning
                />

                <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    className="mt-2 w-full rounded-md border border-[var(--line)] bg-white px-3 py-3 text-slate-950 outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-teal-100"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    suppressHydrationWarning
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    suppressHydrationWarning
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );

}
