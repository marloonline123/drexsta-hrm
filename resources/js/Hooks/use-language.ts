import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
    const { i18n, t } = useTranslation();

    const isRTL = i18n.language === 'ar';
    const currentLanguage = i18n.language;

    const changeLanguage = useCallback(async (lng: string) => {
        // Change i18n language
        await i18n.changeLanguage(lng);
        
        // Set document direction and language
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
        
        // Update body classes for styling
        document.body.classList.toggle('rtl', lng === 'ar');
        document.body.classList.toggle('ltr', lng !== 'ar');
        
        // Store in localStorage
        localStorage.setItem('language', lng);
        
        // Force a component update by refreshing the page
        // This ensures all components re-render with new translations
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }, [i18n]);

    useEffect(() => {
        // Initialize direction and language on component mount
        const savedLanguage = localStorage.getItem('language') || 'en';
        
        if (savedLanguage !== currentLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
        
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = savedLanguage;
        document.body.classList.toggle('rtl', savedLanguage === 'ar');
        document.body.classList.toggle('ltr', savedLanguage !== 'ar');
    }, [currentLanguage, i18n]);

    return {
        t,
        isRTL,
        currentLanguage,
        changeLanguage,
    };
}