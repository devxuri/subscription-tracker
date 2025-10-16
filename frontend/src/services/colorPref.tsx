export function setDark(): void {
    try {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark'); // match your Tailwind custom variant
        }
        if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'dark');
    } catch (e) { /* ignore */ }
}

export function setLight(): void {
    try {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('dark');
            document.documentElement.removeAttribute('data-theme');
        }
        if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'light');
    } catch (e) { /* ignore */ }
}

export function useSystemPreference(): void {
    try {
        if (typeof localStorage !== 'undefined') localStorage.removeItem('theme');
        const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', prefersDark);
            if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
            else document.documentElement.removeAttribute('data-theme');
        }
    } catch (e) { /* ignore */ }
}

export function initThemeFromStorage(): void {
    try {
        const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('theme') : null;
        const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const useDark = saved === 'dark' || (saved === null && prefersDark);
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', !!useDark);
            if (useDark) document.documentElement.setAttribute('data-theme', 'dark');
            else document.documentElement.removeAttribute('data-theme');
        }
    } catch (e) { /* ignore */ }
}