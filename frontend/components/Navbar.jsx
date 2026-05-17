'use client';

import Link from 'next/link';

import { usePathname }
from 'next/navigation';

import {
    useEffect,
    useState
} from 'react';

import {
    logout
} from '../utils/auth';

export default function Navbar() {

    const pathname =
    usePathname();

    const [isLoggedIn, setIsLoggedIn] =
    useState(false);

    const [userEmail, setUserEmail] =
    useState('');

    useEffect(() => {

        const token =
        localStorage.getItem(
            'token'
        );

        const email =
        localStorage.getItem(
            'user_email'
        );

        setIsLoggedIn(!!token);

        if (email) {

            setUserEmail(email);

        }

    }, []);

    const navLink =
    (href, label) => (

        <Link
            href={href}
            className={`
            text-sm
            font-medium
            transition-colors
            ${
                pathname === href

                ? 'text-[var(--brand-strong)]'

                : 'text-slate-600 hover:text-slate-950'
            }
            `}
        >

            {label}

        </Link>

    );

    return (

        <nav className="
        sticky
        top-0
        z-50
        border-b
        border-[var(--line)]
        bg-white/90
        backdrop-blur
        ">

            <div className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-6
            py-4
            ">

                <Link
                    href="/"
                    className="
                    text-xl
                    font-black
                    tracking-tight
                    text-slate-950
                    "
                >

                    VillageAPI

                </Link>

                <div className="
                hidden
                items-center
                gap-6
                md:flex
                ">

                    {navLink('/', 'Overview')}

                    {navLink('/docs', 'Docs')}

                    {navLink('/pricing', 'Pricing')}

                    {navLink('/dashboard', 'Dashboard')}

                    {navLink('/analytics', 'Analytics')}

                </div>

                <div className="
                flex
                items-center
                gap-3
                ">

                    {
                        isLoggedIn ? (

                            <>

                                <div className="
                                hidden
                                rounded-full
                                bg-teal-100
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-teal-800
                                md:block
                                ">

                                    {
                                        userEmail ||
                                        'Signed in'
                                    }

                                </div>

                                <button
                                    onClick={logout}
                                    className="
                                    rounded-xl
                                    border
                                    border-[var(--line)]
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                    "
                                >

                                    Logout

                                </button>

                            </>

                        ) : (

                            <Link
                                href="/login"
                            >

                                <button
                                    className="
                                    rounded-xl
                                    bg-[var(--brand)]
                                    px-5
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:opacity-90
                                    "
                                >

                                    Login

                                </button>

                            </Link>

                        )
                    }

                </div>

            </div>

        </nav>

    );

}