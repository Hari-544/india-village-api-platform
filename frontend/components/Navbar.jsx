'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Overview' },
    { href: '/docs', label: 'Docs' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/analytics', label: 'Analytics' }
];

export default function Navbar() {

    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <Link href="/" className="flex w-fit items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand)] text-sm font-black text-white shadow-sm">
                        VA
                    </span>
                    <span>
                        <span className="block text-base font-bold tracking-tight text-slate-950">VillageAPI</span>
                        <span className="block text-xs font-medium text-[var(--muted)]">India address intelligence</span>
                    </span>
                </Link>

                <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
                    <div className="flex min-w-max items-center gap-1 rounded-md border border-[var(--line)] bg-slate-50 p-1">
                    {links.map((link) => {
                        const active = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded px-3 py-2 text-sm font-medium transition ${
                                    active
                                        ? 'bg-white text-[var(--brand-strong)] shadow-sm'
                                        : 'text-slate-600 hover:text-slate-950'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    </div>

                    <Link
                        href="/login"
                        className="min-w-max rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    );

}
