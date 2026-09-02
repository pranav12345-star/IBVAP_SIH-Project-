/**
 * IBVAP Application Bootstrap
 */
import { handleRoute } from './js/router.js';
import { ThemeService } from './js/services/themeService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initial Theme Setup
    ThemeService.init();

    // Initial Route Render
    handleRoute();

    // Hash Change Event Handler
    window.addEventListener('hashchange', () => {
        handleRoute();
    });

    // Clock Ticker
    setInterval(() => {
        const now = new Date();
        const liveClockEl = document.getElementById('header-live-clock');
        const utcClockEl = document.getElementById('header-utc-clock');

        if (liveClockEl) {
            liveClockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
        }
        if (utcClockEl) {
            utcClockEl.textContent = now.toISOString().substring(11, 19) + ' UTC';
        }
    }, 1000);

    // AI Bounding Box Jitter Simulation
    setInterval(() => {
        const boxes = document.querySelectorAll('.cctv-overlay-box');
        boxes.forEach(box => {
            const deltaX = (Math.random() - 0.5) * 5;
            const deltaY = (Math.random() - 0.5) * 4;

            const currentLeft = parseFloat(box.style.left) || 30;
            const currentTop = parseFloat(box.style.top) || 30;

            box.style.left = `${Math.max(10, Math.min(80, currentLeft + deltaX))}%`;
            box.style.top = `${Math.max(15, Math.min(75, currentTop + deltaY))}%`;
        });
    }, 2000);
});
