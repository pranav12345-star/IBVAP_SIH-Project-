/**
 * Reusable CCTV Feed Card Component with AI Target Overlays
 */

export function renderCctvCard(camera, isLarge = false) {
    const colSpan = isLarge ? 'lg:col-span-8' : 'lg:col-span-4';
    const height = isLarge ? 'h-96' : 'h-44';

    const detectionsHtml = (camera.detections || []).map(det => {
        let boxClass = 'cctv-overlay-box';
        let labelClass = 'cctv-overlay-label';
        if (det.status === 'WARNING') {
            boxClass += ' cctv-overlay-box-person';
            labelClass += ' cctv-overlay-label-person';
        }
        if (det.status === 'SAFE') {
            boxClass += ' cctv-overlay-box-safe';
            labelClass += ' cctv-overlay-label-safe';
        }

        return `
            <div class="${boxClass}" style="top: ${det.box.top}; left: ${det.box.left}; width: ${det.box.width}; height: ${det.box.height};">
                <div class="${labelClass}">${det.type} [${det.confidence}%]</div>
            </div>
        `;
    }).join('');

    return `
        <div class="${colSpan} bg-surface-container-lowest border border-outline-variant rounded overflow-hidden flex flex-col cctv-card shadow-sm">
            <div class="bg-primary text-white px-3.5 py-2 flex justify-between items-center text-xs font-mono">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${camera.threat === 'CRITICAL' ? 'bg-critical-red animate-ping' : 'bg-security-green'}"></span>
                    <span class="font-bold ${camera.threat === 'CRITICAL' ? 'text-critical-red' : 'text-security-green'}">${camera.status}</span>
                    <span class="truncate font-semibold">${camera.id} (${camera.sector})</span>
                </div>
                <div class="flex gap-1">
                    <button class="hover:bg-white/20 px-2 py-0.5 rounded transition-colors text-[11px] font-sans ptz-btn" title="PTZ Controls">PTZ</button>
                    <a href="#/alerts/EV-8847" class="hover:bg-white/20 px-2 py-0.5 rounded transition-colors text-[11px] font-sans">INSPECT</a>
                </div>
            </div>

            <div class="relative bg-black ${height} flex items-center justify-center overflow-hidden group">
                <img src="${camera.image}" alt="${camera.name}" class="w-full h-full object-cover opacity-80 filter brightness-90 contrast-125"/>
                
                <!-- CCTV Grid Lines -->
                <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

                <!-- AI Overlays -->
                ${detectionsHtml}

                <!-- Camera Telemetry Overlay -->
                <div class="absolute bottom-2 left-2 bg-black/70 text-white px-2.5 py-1 rounded text-[10px] font-mono backdrop-blur-sm">
                    <span>FPS: ${camera.fps}</span> | <span>LATENCY: ${camera.latency}</span> | <span>${camera.coordinates}</span>
                </div>
            </div>

            <div class="p-2.5 bg-surface-container-low flex justify-between items-center text-xs border-t border-outline-variant">
                <span class="font-medium text-on-surface truncate">${camera.type}</span>
                <span class="text-on-surface-variant font-mono text-[10px]">ENCRYPTION: AES-256</span>
            </div>
        </div>
    `;
}
