import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useLanguage } from '@/Hooks/use-language';
import { Company } from '@/Types/companies';

interface AboutProps {
    company: Company;
}

export default function About({ company }: AboutProps) {
    const { t } = useLanguage();

    return (
        <PublicLayout>
            <Head title={t('public.about') + ' | ' + company.name} />
            <div className="space-y-8">
                <section className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        {t('about.title')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {t('about.subtitle')}
                    </p>
                </section>

                <section>
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                        alt="Our Team" 
                        className="rounded-lg shadow-lg w-full h-96 object-cover"
                    />
                </section>

                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary">{t('about.missionTitle')}</h2>
                        <p className="mt-4 text-muted-foreground">
                            {t('about.missionText')}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-primary">{t('about.visionTitle')}</h2>
                        <p className="mt-4 text-muted-foreground">
                            {t('about.visionText')}
                        </p>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}