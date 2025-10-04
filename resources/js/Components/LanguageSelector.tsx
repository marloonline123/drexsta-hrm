import React from 'react';
import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/Hooks/use-language';

export function LanguageSelector() {
    const { currentLanguage, changeLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
    ];

    const currentLang = languages.find(lang => lang.code === currentLanguage);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={currentLanguage === lang.code ? 'bg-accent' : ''}
                    >
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}