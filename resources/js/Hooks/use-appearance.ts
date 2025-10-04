import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function useAppearance() {
    const [theme, setThemeState] = useState<Theme>('system');

    useEffect(() => {
        const isDark =
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        setThemeState(localStorage.theme || 'system');
    }, []);

    const setTheme = (newTheme: Theme) => {
        if (newTheme === 'system') {
            localStorage.removeItem('theme');
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        } else {
            localStorage.theme = newTheme;
            document.documentElement.classList[newTheme === 'dark' ? 'add' : 'remove']('dark');
        }
        setThemeState(newTheme);
    };

    return { theme, setTheme };
}

export function initializeTheme() {
    const isDark =
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
}