/**
 * IBVAP | Border Operations Command & Control Map Controller
 * Interactive AI-Powered Tactical Surveillance Map with Sector Filters,
 * Layer Controls, Camera/Threat Popups, Mini CCTV Previews, and Live Ticker.
 */
import { SECTORS, MAP_CAMERAS, MAP_BOPS, MAP_THREATS, PERSON_DETECTIONS, VEHICLE_DETECTIONS, RECENT_MAP_EVENTS } from '../data/mapData.js';
import { ThemeService } from '../services/themeService.js';

let activeSectorId = 'ALL';
let activeLayers = {
    cameras: true,
    bops: true,
    threats: true,
    persons: true,
    vehicles: true,
    fence: true,
    radar: true,
    patrol: true
};
let mapZoomScale = 1;
let isFullscreen = false;

export function renderMapView() {
    const mapImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBb9K2qHixplvhuYO-4WOsR1fT6KbguZwVMeQFbPmKjUp5k1lqJh1psFk-uz3fP0oE-W5Gu4hAuzhQvutPCSVjAHR-NIYA5epKEIn961Q8QEHf3sZ7pP_CsWtodfLcKT2bMV_tk4vgNBMoWU2TDQ4GFJErv662Ml2LsgbjssxYHThxxQuGf3tH1yStizikA7C0qIl7GXoPNfGEojIU_0iAqZMeS9gVc7t2sZa2swW_-cQUBO0IK22td-Q";

    const currentTheme = ThemeService.getTheme();
    const isDark = currentTheme === 'dark';

    const selectedSector = SECTORS.find(s => s.id === activeSectorId) || SECTORS[0];

    return `
        <div class="flex-1 flex flex-col min-w-0 h-full relative font-sans text-on-surface bg-surface-muted select-none" id="border-map-container">
            <!-- Top Sub-Header & Operational Statistics Bar -->
            <div class="flex flex-col lg:flex-row justify-between items-center w-full px-4 lg:px-edge-margin-desktop py-2 lg:py-0 min-h-14 bg-surface-container-lowest border-b border-outline-variant shrink-0 z-20 gap-2">
                <div class="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-xl">map</span>
                        <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">BORDER MAP</span>
                    </div>
                    <div class="h-5 w-px bg-outline-variant hidden sm:block"></div>
                    
                    <!-- Sector Selector Dropdown -->
                    <select id="map-sector-selector" class="px-3 py-1 bg-surface-bright border border-outline-variant rounded-lg text-xs font-bold text-primary focus:outline-none focus:border-primary cursor-pointer">
                        ${SECTORS.map(sec => `
                            <option value="${sec.id}" ${sec.id === activeSectorId ? 'selected' : ''}>
                                ${sec.name} (${sec.activeThreats} THREATS)
                            </option>
                        `).join('')}
                    </select>
                </div>

                <!-- Top KPI Ticker -->
                <div class="flex items-center gap-4 text-xs font-mono overflow-x-auto w-full lg:w-auto py-1 justify-start lg:justify-end">
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-bright border border-outline-variant rounded-lg">
                        <span class="text-outline">CAMERAS:</span>
                        <span class="font-bold text-security-green">${selectedSector.onlineCameras} / ${selectedSector.totalCameras} ONLINE</span>
                    </div>

                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-error-container text-on-error-container rounded-lg border border-critical-red/30">
                        <span class="material-symbols-outlined text-sm text-critical-red">warning</span>
                        <span class="font-bold">THREATS: ${selectedSector.activeThreats}</span>
                    </div>

                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-bright border border-outline-variant rounded-lg hidden sm:flex">
                        <span class="text-outline">BOPS:</span>
                        <span class="font-bold text-primary">12 OPERATIONAL</span>
                    </div>

                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-bright border border-outline-variant rounded-lg hidden md:flex">
                        <span class="w-2 h-2 rounded-full bg-security-green animate-pulse"></span>
                        <span class="font-bold text-security-green">AI ENGINE: ONLINE</span>
                    </div>

                    <div class="text-[11px] text-outline hidden lg:block">
                        SYNC: 2s ago
                    </div>
                </div>
            </div>

            <!-- Tactical Map Viewport & Main Interactive Grid -->
            <div class="flex-1 flex flex-col lg:flex-row relative overflow-hidden bg-primary-container min-h-[550px]" id="map-viewport">
                
                <!-- Left/Center Tactical Canvas Frame -->
                <div class="flex-1 relative overflow-hidden isolate" id="map-canvas-frame">
                    <!-- Base Map Background Image -->
                    <div id="map-bg-image" class="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out ${isDark ? 'brightness-75 contrast-125' : 'opacity-90'}" style="background-image: url('${mapImg}'); transform: scale(${mapZoomScale});"></div>
                    
                    <!-- Tactical Grid Lines Overlay -->
                    <div class="absolute inset-0 pointer-events-none opacity-25" style="background-image: linear-gradient(to right, #44474d 1px, transparent 1px), linear-gradient(to bottom, #44474d 1px, transparent 1px); background-size: 64px 64px;"></div>

                    <!-- FLOATING MAP CONTROLS BAR (Top Left) -->
                    <div class="absolute top-4 left-4 z-40 flex flex-col gap-2">
                        <div class="flex items-center bg-surface-container-lowest/90 backdrop-blur border border-outline-variant rounded-xl p-1 shadow-lg">
                            <button id="btn-zoom-in" class="p-2 hover:bg-surface-bright rounded-lg text-primary transition-colors cursor-pointer" title="Zoom In (+)">
                                <span class="material-symbols-outlined text-sm">add</span>
                            </button>
                            <button id="btn-zoom-out" class="p-2 hover:bg-surface-bright rounded-lg text-primary transition-colors cursor-pointer" title="Zoom Out (-)">
                                <span class="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <div class="w-px h-5 bg-outline-variant mx-1"></div>
                            <button id="btn-map-recenter" class="p-2 hover:bg-surface-bright rounded-lg text-primary transition-colors cursor-pointer" title="Recenter View">
                                <span class="material-symbols-outlined text-sm">my_location</span>
                            </button>
                            <button id="btn-fit-sector" class="p-2 hover:bg-surface-bright rounded-lg text-primary transition-colors cursor-pointer" title="Fit Active Sector">
                                <span class="material-symbols-outlined text-sm">crop_free</span>
                            </button>
                            <div class="w-px h-5 bg-outline-variant mx-1"></div>
                            <button id="btn-toggle-layers-popover" class="flex items-center gap-1 px-2.5 py-1.5 hover:bg-surface-bright rounded-lg text-primary transition-colors text-xs font-bold cursor-pointer" title="Map Layers">
                                <span class="material-symbols-outlined text-sm">layers</span>
                                <span>Layers</span>
                            </button>
                            <button id="btn-toggle-fullscreen" class="p-2 hover:bg-surface-bright rounded-lg text-primary transition-colors cursor-pointer" title="Toggle Fullscreen">
                                <span class="material-symbols-outlined text-sm" id="fullscreen-icon">fullscreen</span>
                            </button>
                        </div>

                        <!-- LAYERS POPOVER CARD -->
                        <div id="layers-popover-card" class="hidden bg-surface-container-lowest/95 backdrop-blur border border-outline-variant rounded-xl p-3 shadow-2xl w-56 text-xs font-mono space-y-2 z-50">
                            <div class="font-bold text-primary pb-1 border-b border-outline-variant flex justify-between items-center">
                                <span>MAP LAYERS</span>
                                <span class="text-[10px] text-outline">TOGGLE ACTIVE</span>
                            </div>
                            <div class="space-y-1.5">
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-primary">📹 Cameras</span>
                                    <input type="checkbox" data-layer="cameras" ${activeLayers.cameras ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-primary">🏰 BOP Outposts</span>
                                    <input type="checkbox" data-layer="bops" ${activeLayers.bops ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-critical-red font-bold">🚨 Active Threats</span>
                                    <input type="checkbox" data-layer="threats" ${activeLayers.threats ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-warning-amber font-bold">🚶 Person Detection</span>
                                    <input type="checkbox" data-layer="persons" ${activeLayers.persons ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-blue-500 font-bold">🚘 Vehicle Detection</span>
                                    <input type="checkbox" data-layer="vehicles" ${activeLayers.vehicles ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-critical-red">⚡ Virtual Fence</span>
                                    <input type="checkbox" data-layer="fence" ${activeLayers.fence ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-security-green">📡 Radar Sweep</span>
                                    <input type="checkbox" data-layer="radar" ${activeLayers.radar ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                                <label class="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-1 rounded">
                                    <span class="flex items-center gap-1.5 text-outline">🚚 Patrol Routes</span>
                                    <input type="checkbox" data-layer="patrol" ${activeLayers.patrol ? 'checked' : ''} class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- SVG VIRTUAL FENCES & PATROL VECTORS LAYER -->
                    <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
                        ${activeLayers.fence ? `
                            <!-- Main Virtual Fence Boundary Line -->
                            <path class="opacity-80" d="M 80,750 L 250,520 L 500,420 L 750,320 L 1150,220" fill="none" stroke="#EF4444" stroke-dasharray="10 6" stroke-width="3"></path>
                            <!-- Sector 04 Alert Vector Segment -->
                            <path class="opacity-100" d="M 750,320 L 1150,220" fill="none" stroke="#EF4444" stroke-width="5" filter="drop-shadow(0 0 6px rgba(239,68,68,0.8))"></path>
                        ` : ''}

                        ${activeLayers.patrol ? `
                            <!-- Tactical Patrol Route Vector -->
                            <path class="opacity-60" d="M 220,680 L 420,580 L 680,620 L 820,480" fill="none" stroke="#F59E0B" stroke-dasharray="4 4" stroke-width="2"></path>
                        ` : ''}

                        ${activeLayers.radar ? `
                            <!-- Sector 04 Radar Sector Circle -->
                            <circle cx="75%" cy="32%" r="90" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.4)" stroke-dasharray="3 3" stroke-width="1.5"/>
                            <circle cx="42%" cy="28%" r="70" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.3)" stroke-dasharray="3 3" stroke-width="1"/>
                        ` : ''}
                    </svg>

                    <!-- DYNAMIC MAP MARKERS LAYER -->
                    <div class="absolute inset-0 z-20 pointer-events-auto" id="map-markers-layer">

                        <!-- 1. CAMERAS MARKERS -->
                        ${activeLayers.cameras ? MAP_CAMERAS.filter(c => activeSectorId === 'ALL' || c.sector === activeSectorId).map(cam => {
                            const isCritical = cam.status === 'CRITICAL';
                            const isDegraded = cam.status === 'DEGRADED';
                            const statusBg = isCritical ? 'bg-critical-red text-white border-red-500' : isDegraded ? 'bg-warning-amber text-black border-amber-500' : 'bg-security-green text-white border-emerald-500';
                            
                            return `
                                <div class="absolute flex flex-col items-center group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110" style="left: ${cam.x}%; top: ${cam.y}%;" data-camera-id="${cam.id}">
                                    <div class="bg-surface-container-lowest/90 backdrop-blur border border-outline-variant px-2 py-0.5 rounded shadow mb-1 text-[11px] font-mono font-bold whitespace-nowrap text-on-surface group-hover:border-primary flex items-center gap-1">
                                        <span class="w-2 h-2 rounded-full ${cam.status === 'ONLINE' ? 'bg-security-green' : isCritical ? 'bg-critical-red animate-ping' : 'bg-warning-amber'}"></span>
                                        <span>${cam.id}</span>
                                    </div>

                                    <div class="relative w-8 h-8 rounded-full ${statusBg} flex items-center justify-center border-2 shadow-lg">
                                        ${isCritical ? '<div class="absolute inset-0 bg-critical-red rounded-full animate-ping opacity-50"></div>' : ''}
                                        <span class="material-symbols-outlined text-sm">${isCritical ? 'videocam_off' : 'videocam'}</span>
                                    </div>
                                </div>
                            `;
                        }).join('') : ''}

                        <!-- 2. BOP OUTPOST MARKERS -->
                        ${activeLayers.bops ? MAP_BOPS.filter(b => activeSectorId === 'ALL' || b.sector === activeSectorId).map(bop => `
                            <div class="absolute flex flex-col items-center group cursor-pointer transform -translate-x-1/2 -translate-y-1/2" style="left: ${bop.x}%; top: ${bop.y}%;" data-bop-id="${bop.id}">
                                <div class="bg-surface-container-lowest/90 border border-outline-variant px-2 py-0.5 rounded shadow mb-1 text-[11px] font-mono font-bold text-primary">
                                    🏰 ${bop.id}
                                </div>
                                <div class="w-7 h-7 bg-primary text-white rounded-md flex items-center justify-center border border-white shadow">
                                    <span class="material-symbols-outlined text-xs">fort</span>
                                </div>
                            </div>
                        `).join('') : ''}

                        <!-- 3. THREAT MARKERS -->
                        ${activeLayers.threats ? MAP_THREATS.filter(t => activeSectorId === 'ALL' || t.sector === activeSectorId).map(threat => `
                            <div class="absolute flex flex-col items-center group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-30" style="left: ${threat.x}%; top: ${threat.y}%;" data-threat-id="${threat.id}">
                                <div class="bg-critical-red text-white px-2 py-0.5 rounded shadow mb-1 font-mono text-[10px] font-bold tracking-wider animate-bounce flex items-center gap-1">
                                    <span class="material-symbols-outlined text-xs">emergency</span>
                                    <span>${threat.severity} THREAT</span>
                                </div>
                                <div class="relative w-9 h-9 bg-critical-red text-white rounded-full flex items-center justify-center border-2 border-white shadow-xl">
                                    <div class="absolute -inset-2 bg-critical-red opacity-30 rounded-full animate-ping"></div>
                                    <span class="material-symbols-outlined text-sm">my_location</span>
                                </div>
                            </div>
                        `).join('') : ''}

                        <!-- 4. PERSON DETECTION MARKERS -->
                        ${activeLayers.persons ? PERSON_DETECTIONS.filter(p => activeSectorId === 'ALL' || p.sector === activeSectorId).map(p => `
                            <div class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" style="left: ${p.x}%; top: ${p.y}%;">
                                <div class="bg-warning-amber text-black font-mono font-bold px-1.5 py-0.5 rounded text-[10px] shadow border border-black/20 whitespace-nowrap">
                                    🚶 PERSON ${p.trackId} (${p.confidence}%)
                                </div>
                            </div>
                        `).join('') : ''}

                        <!-- 5. VEHICLE DETECTION MARKERS -->
                        ${activeLayers.vehicles ? VEHICLE_DETECTIONS.filter(v => activeSectorId === 'ALL' || v.sector === activeSectorId).map(v => `
                            <div class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" style="left: ${v.x}%; top: ${v.y}%;">
                                <div class="bg-blue-600 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[10px] shadow border border-white/20 whitespace-nowrap">
                                    🚘 ${v.type} (${v.plate})
                                </div>
                            </div>
                        `).join('') : ''}
                    </div>

                    <!-- CAMERA / THREAT INSPECTION POPUP MODAL CARD (DYNAMIC OVERLAY) -->
                    <div id="map-info-popup-card" class="hidden absolute top-4 right-4 z-50 w-96 bg-surface-container-lowest/95 backdrop-blur border border-outline-variant rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                        <!-- Card content injected dynamically via JS -->
                    </div>
                </div>

                <!-- RIGHT-SIDE ACTIVE THREATS & LIVE EVENT FEED PANEL -->
                <div class="w-full lg:w-80 bg-surface-container-lowest border-t lg:border-t-0 lg:border-l border-outline-variant flex flex-col shrink-0 overflow-y-auto max-h-[500px] lg:max-h-none">
                    
                    <!-- ACTIVE THREATS HEADER -->
                    <div class="p-3 border-b border-outline-variant bg-error-container text-on-error-container flex items-center justify-between shrink-0">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-critical-red text-base">emergency</span>
                            <span class="font-bold text-xs uppercase tracking-wide">Active Threats (${MAP_THREATS.length})</span>
                        </div>
                        <span class="px-2 py-0.5 bg-critical-red text-white text-[10px] font-mono font-bold rounded-full">DEFCON 2</span>
                    </div>

                    <!-- ACTIVE THREATS LIST -->
                    <div class="p-3 space-y-2 border-b border-outline-variant max-h-60 overflow-y-auto shrink-0">
                        ${MAP_THREATS.map(t => `
                            <div class="p-2.5 bg-surface-bright border border-outline-variant rounded-xl space-y-1 hover:border-critical-red transition-all cursor-pointer threat-list-item" data-threat-id="${t.id}">
                                <div class="flex justify-between items-center text-xs">
                                    <span class="px-2 py-0.5 bg-critical-red text-white font-mono font-bold text-[10px] rounded uppercase">${t.severity}</span>
                                    <span class="font-mono text-[10px] text-outline">${t.timestamp}</span>
                                </div>
                                <h4 class="font-bold text-xs text-primary leading-tight">${t.title}</h4>
                                <div class="flex justify-between items-center text-[11px] font-mono text-on-surface-variant pt-1 border-t border-outline-variant/50">
                                    <span>📷 ${t.cameraId}</span>
                                    <span class="text-critical-red font-bold">INSPECT →</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- LIVE EVENT STREAM TICKER -->
                    <div class="flex-1 p-3 flex flex-col min-h-0 bg-surface-muted/50">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-security-green animate-ping"></span>
                                <span class="font-bold text-xs text-primary uppercase tracking-wide">Live Event Feed</span>
                            </div>
                            <span class="font-mono text-[10px] text-outline">REALTIME</span>
                        </div>

                        <div class="space-y-2 overflow-y-auto flex-1 font-mono text-[11px]">
                            ${RECENT_MAP_EVENTS.map(ev => `
                                <div class="p-2 bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col gap-0.5 hover:border-primary transition-colors">
                                    <div class="flex justify-between text-outline text-[10px]">
                                        <span>${ev.time}</span>
                                        <span class="font-bold text-primary">${ev.type}</span>
                                    </div>
                                    <p class="text-on-surface leading-tight font-medium">${ev.detail}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
}

export function attachMapInteractions() {
    // 1. Sector Selector Handler
    const sectorSelect = document.getElementById('map-sector-selector');
    if (sectorSelect) {
        sectorSelect.addEventListener('change', (e) => {
            activeSectorId = e.target.value;
            const app = document.getElementById('main-content-area');
            if (app) {
                app.innerHTML = renderMapView();
                attachMapInteractions();
            }
        });
    }

    // 2. Zoom In / Out Handlers
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const mapBg = document.getElementById('map-bg-image');

    if (btnZoomIn && mapBg) {
        btnZoomIn.addEventListener('click', () => {
            mapZoomScale = Math.min(2.5, mapZoomScale + 0.25);
            mapBg.style.transform = `scale(${mapZoomScale})`;
        });
    }
    if (btnZoomOut && mapBg) {
        btnZoomOut.addEventListener('click', () => {
            mapZoomScale = Math.max(1, mapZoomScale - 0.25);
            mapBg.style.transform = `scale(${mapZoomScale})`;
        });
    }

    // 3. Recenter & Fit Sector Handlers
    const btnRecenter = document.getElementById('btn-map-recenter');
    const btnFitSector = document.getElementById('btn-fit-sector');

    if (btnRecenter && mapBg) {
        btnRecenter.addEventListener('click', () => {
            mapZoomScale = 1;
            mapBg.style.transform = `scale(1)`;
        });
    }
    if (btnFitSector && mapBg) {
        btnFitSector.addEventListener('click', () => {
            mapZoomScale = 1.35;
            mapBg.style.transform = `scale(1.35)`;
        });
    }

    // 4. Layers Popover Toggle
    const btnLayersToggle = document.getElementById('btn-toggle-layers-popover');
    const layersCard = document.getElementById('layers-popover-card');

    if (btnLayersToggle && layersCard) {
        btnLayersToggle.addEventListener('click', () => {
            layersCard.classList.toggle('hidden');
        });
    }

    // Layer Checkbox Change Handlers
    document.querySelectorAll('#layers-popover-card input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const layerKey = e.target.getAttribute('data-layer');
            if (layerKey && activeLayers.hasOwnProperty(layerKey)) {
                activeLayers[layerKey] = e.target.checked;
                const app = document.getElementById('main-content-area');
                if (app) {
                    app.innerHTML = renderMapView();
                    attachMapInteractions();
                    document.getElementById('layers-popover-card')?.classList.remove('hidden');
                }
            }
        });
    });

    // 5. Fullscreen Toggle
    const btnFullscreen = document.getElementById('btn-toggle-fullscreen');
    const mapViewport = document.getElementById('border-map-container');
    const fsIcon = document.getElementById('fullscreen-icon');

    if (btnFullscreen && mapViewport) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                mapViewport.requestFullscreen?.();
                if (fsIcon) fsIcon.textContent = 'fullscreen_exit';
            } else {
                document.exitFullscreen?.();
                if (fsIcon) fsIcon.textContent = 'fullscreen';
            }
        });
    }

    // 6. Camera Marker Click Handler (Show Camera Popup with Mini CCTV Preview)
    document.querySelectorAll('[data-camera-id]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.stopPropagation();
            const camId = elem.getAttribute('data-camera-id');
            const camera = MAP_CAMERAS.find(c => c.id === camId);
            if (camera) openCameraPopup(camera);
        });
    });

    // 7. Threat Marker Click Handler (Show Threat Details Popup)
    document.querySelectorAll('[data-threat-id]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.stopPropagation();
            const threatId = elem.getAttribute('data-threat-id');
            const threat = MAP_THREATS.find(t => t.id === threatId);
            if (threat) openThreatPopup(threat);
        });
    });
}

/**
 * Render Camera Information Popup Card with Mini CCTV Preview & Navigation Actions
 */
function openCameraPopup(cam) {
    const popupContainer = document.getElementById('map-info-popup-card');
    if (!popupContainer) return;

    popupContainer.innerHTML = `
        <!-- Popup Header -->
        <div class="p-3 bg-surface-bright border-b border-outline-variant flex justify-between items-center">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ${cam.status === 'CRITICAL' ? 'bg-critical-red animate-ping' : 'bg-security-green'}"></span>
                <span class="font-bold text-xs text-primary font-mono">${cam.id}</span>
                <span class="px-2 py-0.5 bg-surface-container text-on-surface-variant font-mono text-[10px] rounded">${cam.sectorName}</span>
            </div>
            <button id="btn-close-popup" class="p-1 hover:bg-surface-muted rounded-full text-outline hover:text-primary cursor-pointer">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        </div>

        <!-- Popup Body: Mini CCTV Feed Frame -->
        <div class="relative w-full h-44 bg-black overflow-hidden flex items-center justify-center">
            <img src="${cam.cctvUrl}" alt="${cam.name}" class="w-full h-full object-cover opacity-85"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            <!-- Bounding Box Computer Vision Overlay -->
            <div class="cctv-overlay-box cctv-overlay-box-person" style="top: 25%; left: 35%; width: 28%; height: 50%;">
                <div class="cctv-overlay-label cctv-overlay-label-person">PERSON 96.8%</div>
            </div>

            <!-- Top Frame Status -->
            <div class="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-white">
                <span class="w-2 h-2 rounded-full bg-critical-red animate-pulse"></span>
                <span>REC • ${cam.type}</span>
            </div>

            <!-- Bottom Frame Coordinate -->
            <div class="absolute bottom-2 left-2 text-[10px] font-mono text-slate-300">
                ${cam.coordinates}
            </div>
        </div>

        <!-- Camera Telemetry Metrics -->
        <div class="p-3 space-y-2 text-xs font-mono bg-surface-container-lowest">
            <div class="flex justify-between border-b border-outline-variant/60 pb-1">
                <span class="text-outline">LOCATION:</span>
                <span class="font-bold text-primary">${cam.name}</span>
            </div>
            <div class="flex justify-between border-b border-outline-variant/60 pb-1">
                <span class="text-outline">PERSONS DETECTED:</span>
                <span class="font-bold text-warning-amber">${cam.persons} TARGETS</span>
            </div>
            <div class="flex justify-between border-b border-outline-variant/60 pb-1">
                <span class="text-outline">VEHICLES DETECTED:</span>
                <span class="font-bold text-blue-500">${cam.vehicles} VEHICLES</span>
            </div>
            <div class="flex justify-between pb-1">
                <span class="text-outline">AI THREAT STATUS:</span>
                <span class="font-bold ${cam.status === 'CRITICAL' ? 'text-critical-red' : 'text-security-green'}">${cam.lastDetection}</span>
            </div>
        </div>

        <!-- Actions Bar -->
        <div class="p-3 bg-surface-bright border-t border-outline-variant flex items-center gap-2">
            <a href="#/border-cameras" class="flex-1 py-2 bg-primary hover:bg-blue-900 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl text-center shadow transition-all">
                VIEW LIVE CCTV
            </a>
            <a href="#/video-analysis" class="py-2 px-3 bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[11px] uppercase tracking-wider rounded-xl border border-outline-variant text-center transition-all">
                AI ANALYSIS
            </a>
        </div>
    `;

    popupContainer.classList.remove('hidden');

    document.getElementById('btn-close-popup')?.addEventListener('click', () => {
        popupContainer.classList.add('hidden');
    });
}

/**
 * Render Threat Inspection Popup Card
 */
function openThreatPopup(threat) {
    const popupContainer = document.getElementById('map-info-popup-card');
    if (!popupContainer) return;

    popupContainer.innerHTML = `
        <!-- Popup Header -->
        <div class="p-3 bg-error-container text-on-error-container border-b border-critical-red/30 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-critical-red text-base">warning</span>
                <span class="font-bold text-xs uppercase tracking-wide">${threat.severity} THREAT</span>
            </div>
            <button id="btn-close-popup" class="p-1 hover:bg-red-200/50 rounded-full text-critical-red cursor-pointer">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        </div>

        <!-- Threat Telemetry Content -->
        <div class="p-4 space-y-3 text-xs font-mono bg-surface-container-lowest">
            <div>
                <h4 class="font-bold text-sm text-primary leading-tight mb-1">${threat.title}</h4>
                <p class="text-on-surface-variant text-[11px] font-sans leading-relaxed">${threat.details}</p>
            </div>

            <div class="space-y-1.5 pt-2 border-t border-outline-variant">
                <div class="flex justify-between">
                    <span class="text-outline">SOURCE CAMERA:</span>
                    <span class="font-bold text-primary">${threat.cameraId}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-outline">COORDINATES:</span>
                    <span class="font-bold text-primary">${threat.coordinates}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-outline">AI CONFIDENCE:</span>
                    <span class="font-bold text-security-green">${threat.confidence}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-outline">TIMESTAMP:</span>
                    <span class="font-bold text-primary">${threat.timestamp}</span>
                </div>
            </div>
        </div>

        <!-- Threat Action Buttons -->
        <div class="p-3 bg-surface-bright border-t border-outline-variant flex flex-col gap-2">
            <a href="#/alerts/${threat.alertId || 'EV-8847'}" class="w-full py-2.5 bg-critical-red hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow transition-all">
                INSPECT ALERT ${threat.alertId || 'EV-8847'}
            </a>
            <div class="flex items-center gap-2">
                <a href="#/border-cameras" class="flex-1 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[11px] uppercase tracking-wider rounded-lg border border-outline-variant text-center transition-all">
                    VIEW CAMERA
                </a>
                <button id="btn-ack-threat" class="flex-1 py-1.5 bg-surface-bright hover:bg-surface-container text-security-green font-bold text-[11px] uppercase tracking-wider rounded-lg border border-security-green/30 text-center transition-all cursor-pointer">
                    ACKNOWLEDGE
                </button>
            </div>
        </div>
    `;

    popupContainer.classList.remove('hidden');

    document.getElementById('btn-close-popup')?.addEventListener('click', () => {
        popupContainer.classList.add('hidden');
    });

    document.getElementById('btn-ack-threat')?.addEventListener('click', () => {
        alert(`Threat ${threat.id} acknowledged by Command Officer.`);
        popupContainer.classList.add('hidden');
    });
}
