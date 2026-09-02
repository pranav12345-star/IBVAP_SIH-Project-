/**
 * IBVAP | Global Dark Mode / Light Mode Theme Service
 * Manages theme persistence, system preferences, and non-flashing theme initialization
 */

export const ThemeService = {
    getTheme() {
        try {
            if (typeof localStorage !== 'undefined') {
                const saved = localStorage.getItem('ibvap_theme');
                if (saved) return saved;
            }
            if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        } catch (e) {}
        return 'light';
    },

    setTheme(theme) {
        try {
            if (typeof document !== 'undefined') {
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                }
            }
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('ibvap_theme', theme);
            }
        } catch (e) {}

        // Update UI icons across navbar/header if mounted
        this.updateToggleUi(theme);

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('ibvapThemeChanged', { detail: { theme } }));
        }
    },

    toggleTheme() {
        const current = this.getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
        return next;
    },

    updateToggleUi(theme) {
        if (typeof document === 'undefined') return;
        const iconEl = document.getElementById('dark-mode-icon');
        const textEl = document.getElementById('dark-mode-text');
        const toggleBtn = document.getElementById('dark-mode-toggle');

        if (iconEl) {
            iconEl.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
        if (textEl) {
            textEl.textContent = theme === 'dark' ? '☀ Light' : '🌙 Dark';
        }
        if (toggleBtn) {
            toggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
        }
    },

    init() {
        const theme = this.getTheme();
        this.setTheme(theme);
    }
};

// Immediate Non-flashing Initialization Script
(function() {
    if (typeof window !== 'undefined') {
        ThemeService.init();
    }
})();
