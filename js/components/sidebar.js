/**
 * Sidebar Navigation Component for IBVAP Shell
 * 100% Faithful Reproduction of Stitch Project ID: 12963321699944751718
 */

export function renderSidebar(currentRoute = '/dashboard') {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { path: '/surveillance', label: 'Live Surveillance', icon: 'videocam' },
        { path: '/border-cameras', label: 'Border Cameras', icon: 'sensors', badge: '48', badgeBg: 'bg-blue-600 text-white' },
        { path: '/video-analysis', label: 'Video Analysis', icon: 'movie', badge: 'AI', badgeBg: 'bg-emerald-600 text-white' },
        { path: '/alerts', label: 'Alerts', icon: 'warning', badge: '3', badgeBg: 'bg-critical-red text-white' },
        { path: '/border-map', label: 'Border Map', icon: 'map' },
        { path: '/human-analytics', label: 'AI Analytics', icon: 'psychology' },
        { path: '/ai-chat', label: 'AI Chat Assistant', icon: 'smart_toy', badge: 'STREAM', badgeBg: 'bg-blue-600 text-white' },
        { path: '/events', label: 'Event Logs', icon: 'history' },
        { path: '/reports', label: 'Reports', icon: 'description' },
        { divider: true },
        { path: '/system-health', label: 'System Health', icon: 'health_and_safety' },
        { path: '/login', label: 'Access Control', icon: 'lock' }
    ];

    const linksHtml = navItems.map(item => {
        if (item.divider) {
            return `<div class="h-px bg-outline-variant my-2 mx-3"></div>`;
        }

        const isActive = currentRoute === item.path || (item.path === '/alerts' && currentRoute.startsWith('/alerts'));
        const activeClass = isActive 
            ? 'text-primary font-bold bg-surface-container-high border-l-4 border-primary' 
            : 'text-on-surface-variant hover:bg-surface-container';

        return `
            <a href="#${item.path}" class="flex items-center gap-3 px-3 py-2 rounded-DEFAULT transition-all cursor-pointer active:scale-95 group ${activeClass}">
                <span class="material-symbols-outlined ${isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'}">${item.icon}</span>
                <span class="font-label-caps text-label-caps flex-1">${item.label}</span>
                ${item.badge ? `<span class="${item.badgeBg || 'bg-surface-container text-on-surface'} text-[10px] font-bold px-1.5 py-0.5 rounded-sm">${item.badge}</span>` : ''}
            </a>
        `;
    }).join('');

    return `
        <nav class="bg-surface-container-lowest w-64 h-full border-r border-outline-variant flex flex-col py-density-standard shrink-0 overflow-y-auto hidden md:flex">
            <!-- Header Block -->
            <div class="px-6 mb-6">
                <div class="flex items-center gap-3 mb-1">
                    <div class="w-2.5 h-2.5 bg-security-green rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span class="font-label-caps text-label-caps text-security-green">OPERATIONAL</span>
                </div>
                <div class="text-body-sm text-on-surface-variant font-medium">Command Center Alpha</div>
            </div>

            <!-- Navigation Links -->
            <div class="flex-1 flex flex-col gap-1 px-3">
                ${linksHtml}
            </div>

            <!-- Session Data Footer -->
            <div class="px-6 mt-auto">
                <div class="text-[10px] text-outline uppercase tracking-wider mb-1">Session Data</div>
                <div class="font-metadata-mono text-metadata-mono text-on-surface-variant">ID: 8847-X-BOP</div>
                <div class="font-metadata-mono text-metadata-mono text-on-surface-variant">Uptime: 24d 14h 22m</div>
            </div>
        </nav>
    `;
}
