/**
 * Live Surveillance View Controller (Multi-Grid CCTV Wall & PTZ Controls)
 */
import { IBVAP_DATA } from '../mockData.js';
import { renderCctvCard } from '../components/cctvCard.js';

export function renderSurveillanceView() {
    const cameras = IBVAP_DATA.cameras;

    const cardsHtml = cameras.map(cam => renderCctvCard(cam, false)).join('');

    return `
        <div class="p-6 flex flex-col gap-6">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm gap-4">
                <div>
                    <h2 class="font-bold text-lg text-primary flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">videocam</span>
                        Live CCTV Surveillance Console (48 Streams)
                    </h2>
                    <p class="text-xs text-on-surface-variant">Real-time H.265 video decoder matrix with AI bounding box overlays</p>
                </div>

                <div class="flex items-center gap-3">
                    <div class="flex bg-surface-container-high rounded p-0.5 border border-outline-variant text-xs">
                        <button class="px-3 py-1 rounded bg-white font-bold text-primary shadow-xs">2x2 GRID</button>
                        <button class="px-3 py-1 rounded text-on-surface-variant hover:text-primary">4x4 GRID</button>
                    </div>
                    <button class="bg-primary text-white text-xs font-bold px-3 py-2 rounded hover:bg-primary/90 transition-colors flex items-center gap-1">
                        <span class="material-symbols-outlined text-base">fullscreen</span> FULLSCREEN WALL
                    </button>
                </div>
            </div>

            <!-- CCTV Grid Matrix -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${cardsHtml}
                ${cardsHtml} /* Multi-grid simulation */
            </div>
        </div>
    `;
}
