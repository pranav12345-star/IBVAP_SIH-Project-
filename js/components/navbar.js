/**
 * Navbar Component for IBVAP Shell
 * 100% Faithful Reproduction of Stitch Project ID: 12963321699944751718
 */
import { AuthService } from '../services/auth.js';
import { ThemeService } from '../services/themeService.js';

export function renderNavbar() {
    const sessionOfficer = AuthService.getOfficer();
    const officerImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBoxD6P0Wv1Ik6H7Qwj4Qm8mxRnY73osIDoPsbDNs0TfL4dGQVx9oHwLAlMggJRLr3LRRtRRlmHyFRjeCO2G7K2R_UpYYB3jqSyjhd1vxLuc_FlhE6uDYhgYb-DTnAECV5R6GdffiSmeVYgUoI-XDRBMadBm9lykCoJ1lZ2TvDJZq-iOSo0h9h1TScg9rEnj8QJFIPq1i5rTJAmJINzzdcZGITaERCJeGrdvDsunlcnxR3t1nbzmpfWMw";

    const currentTheme = ThemeService.getTheme();
    const isDark = currentTheme === 'dark';

    return `
        <header class="bg-surface-container-lowest flex justify-between items-center w-full px-edge-margin-desktop h-16 border-b border-outline-variant shrink-0 z-50">
            <div class="flex items-center gap-4">
                <a href="#/dashboard" class="font-headline-md text-headline-md font-bold text-primary tracking-tight">IBVAP</a>
            </div>

            <div class="flex items-center gap-6">
                <!-- Global Search Input -->
                <div class="relative hidden md:flex items-center">
                    <span class="material-symbols-outlined absolute left-3 text-outline-variant">search</span>
                    <input id="global-search-input" class="pl-10 pr-4 py-1.5 bg-surface-muted border border-outline-variant rounded-DEFAULT w-64 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Search resources, cameras, or alerts..." type="text"/>
                </div>

                <div class="flex items-center gap-3">
                    <!-- AI Assistant Launcher Button -->
                    <a href="#/ai-chat" class="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A192F] hover:bg-blue-900 text-white transition-colors rounded text-xs font-bold shadow-sm" title="AI Tactical Assistant">
                        <span class="material-symbols-outlined text-sm">smart_toy</span>
                        <span class="hidden sm:inline">AI ASSISTANT</span>
                    </a>

                    <!-- Theme Toggle Button (Light ☀ / Dark 🌙) -->
                    <button id="dark-mode-toggle" class="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-muted hover:bg-surface-container border border-outline-variant text-on-surface transition-all rounded text-xs font-bold cursor-pointer" title="Toggle Light / Dark Theme">
                        <span class="material-symbols-outlined text-sm" id="dark-mode-icon">${isDark ? 'light_mode' : 'dark_mode'}</span>
                        <span id="dark-mode-text" class="hidden sm:inline">${isDark ? '☀ Light' : '🌙 Dark'}</span>
                    </button>

                    <!-- Notifications Bell -->
                    <button class="text-on-surface-variant hover:bg-surface-muted transition-colors p-2 rounded-full relative group">
                        <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-critical-red rounded-full"></span>
                    </button>

                    <!-- Schedule Button -->
                    <button class="text-on-surface-variant hover:bg-surface-muted transition-colors p-2 rounded-full group" title="Schedule">
                        <span class="material-symbols-outlined" data-icon="schedule">schedule</span>
                    </button>

                    <!-- Officer Profile Image -->
                    <div class="flex items-center gap-3">
                        <div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer active:opacity-80" title="${sessionOfficer ? sessionOfficer.badgeId : 'Cmdr. A. Vance'}">
                            <img alt="Officer Profile" class="w-full h-full object-cover" src="${officerImg}"/>
                        </div>
                        
                        <button id="btn-logout" class="text-xs font-bold text-critical-red hover:bg-error-container/50 px-2 py-1 rounded transition-colors border border-critical-red/20" title="Logout Session">
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}
