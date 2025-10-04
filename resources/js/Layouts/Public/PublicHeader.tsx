import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useLanguage } from '@/Hooks/use-language';
import { Company } from '@/Types/companies';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { LanguageSelector } from '@/Components/LanguageSelector';

export default function PublicHeader() {
    const { t } = useLanguage();
    const company = usePage().props.company as Company | undefined;

    return (
        <header className="sticky top-0 z-50 w-full border-b dark:border-gray-800 shadow bg-card backdrop-blur supports-[backdrop-filter]:bg-card/60 mb-8">
            <div className="container flex h-14 items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <Link href={company ? route('jobs.index', { company: company.slug }) : '/'} className="mr-6 flex items-center space-x-2">
                        <ApplicationLogo className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">Drexsta</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {company && (
                            <>
                                <Link href={route('jobs.index', { company: company.slug })} className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    {t('publicJobs.title')}
                                </Link>
                                <Link href={route('about', { company: company.slug })} className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    {t('public.about')}
                                </Link>
                                <Link href={route('contact', { company: company.slug })} className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    {t('public.contact')}
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <ThemeToggle />
                    <LanguageSelector />
                </div>
            </div>
        </header>
    );
}