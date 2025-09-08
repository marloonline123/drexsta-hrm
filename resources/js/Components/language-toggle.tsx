import { Button } from '@/Components/Ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/Ui/dropdown-menu';
import { useLanguage } from '@/Hooks/use-language';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
    const { currentLanguage, changeLanguage, t } = useLanguage();

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    ];

    const currentLang = languages.find(lang => lang.code === currentLanguage);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem 
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={currentLanguage === language.code ? 'bg-accent' : ''}
                    >
                        <span className="flex items-center gap-2">
                            <span>{language.flag}</span>
                            {language.name}
                        </span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}