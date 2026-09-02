/**
 * IBVAP | Border Cameras Module Controller & View Renderer
 * 100% Faithful to IBVAP Stitch Design Language
 */

import { BORDER_CAMERAS_DATA } from '../data/cameraData.js';
import { showToast } from '../components/toast.js';

export function renderBorderCamerasView() {
    return `
        <div class="h-full flex flex-col bg-surface-muted overflow-y-auto font-sans p-4 lg:p-6 space-y-6">
            <!-- Top Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-primary text-2xl">videocam</span>
                        <h1 class="font-headline-lg text-headline-lg font-bold text-primary">Border Cameras</h1>
                        <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-mono font-bold border border-blue-200">
                            48 Camera Nodes Active
                        </span>
                    </div>
                    <p class="text-body-sm text-on-surface-variant">Monitor and manage surveillance cameras deployed across border sectors.</p>
                </div>

                <div class="flex items-center gap-3">
                    <a href="#/border-map" class="flex items-center gap-1.5 px-4 py-2 bg-surface-container hover:bg-surface-variant text-primary text-xs font-bold rounded-lg border border-outline-variant transition-all shadow-sm">
                        <span class="material-symbols-outlined text-sm">map</span>
                        View on Border Map
                    </a>
                    <button id="btn-refresh-cameras" class="flex items-center gap-1.5 px-4 py-2 bg-[#0A192F] hover:bg-blue-900 text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer uppercase tracking-wider">
                        <span class="material-symbols-outlined text-sm" id="icon-refresh-cam">sync</span>
                        Refresh Feeds
                    </button>
                </div>
            </div>

            <!-- Centralized Top KPI Summary Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- TOTAL CAMERAS -->
                <div class="bg-[#0A192F] text-white p-5 rounded-xl border border-blue-900 shadow-sm flex items-center justify-between">
                    <div>
                        <div class="text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">Total Cameras</div>
                        <div class="font-display-kpi text-3xl font-bold tracking-tight">48</div>
                        <div class="text-[10px] text-slate-400 mt-1">4 Sectors Monitored</div>
                    </div>
                    <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <span class="material-symbols-outlined text-2xl">sensors</span>
                    </div>
                </div>

                <!-- ONLINE CAMERAS -->
                <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
                    <div>
                        <div class="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">Online</div>
                        <div class="font-display-kpi text-3xl font-bold text-security-green tracking-tight">42</div>
                        <div class="text-[10px] text-security-green font-semibold mt-1 flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-security-green animate-pulse"></span>
                            87.5% Active Ratio
                        </div>
                    </div>
                    <div class="w-12 h-12 rounded-lg bg-emerald-50 text-security-green flex items-center justify-center border border-emerald-200">
                        <span class="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                </div>

                <!-- OFFLINE CAMERAS -->
                <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
                    <div>
                        <div class="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">Offline</div>
                        <div class="font-display-kpi text-3xl font-bold text-critical-red tracking-tight">6</div>
                        <div class="text-[10px] text-critical-red font-semibold mt-1">Requires Field Maintenance</div>
                    </div>
                    <div class="w-12 h-12 rounded-lg bg-red-50 text-critical-red flex items-center justify-center border border-red-200">
                        <span class="material-symbols-outlined text-2xl">videocam_off</span>
                    </div>
                </div>

                <!-- ACTIVE ALERTS -->
                <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
                    <div>
                        <div class="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">Active Alerts</div>
                        <div class="font-display-kpi text-3xl font-bold text-warning-amber tracking-tight">3</div>
                        <div class="text-[10px] text-warning-amber font-semibold mt-1">2 Warnings • 1 Critical</div>
                    </div>
                    <div class="w-12 h-12 rounded-lg bg-amber-50 text-warning-amber flex items-center justify-center border border-amber-200">
                        <span class="material-symbols-outlined text-2xl">warning</span>
                    </div>
                </div>
            </div>

            <!-- Border Sector Breakdown View -->
            <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                    <h2 class="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm text-primary">domain</span>
                        Border Sector Allocation
                    </h2>
                    <span class="text-[11px] text-outline font-mono">Click a sector to filter grid</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" id="sector-chips-container">
                    <button class="sector-card-btn text-left p-3.5 rounded-lg border border-outline-variant/80 hover:border-primary hover:bg-surface-container transition-all cursor-pointer group bg-surface-bright" data-sector="Sector 01">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-xs text-primary group-hover:text-blue-700">SECTOR 01</span>
                            <span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">11/12 ON</span>
                        </div>
                        <div class="text-[11px] text-on-surface-variant font-medium">Northern Post Sector</div>
                        <div class="flex items-center gap-3 text-[10px] text-outline font-mono mt-2 pt-2 border-t border-outline-variant/40">
                            <span>12 Cameras</span>
                            <span class="text-security-green">11 Online</span>
                            <span class="text-critical-red">1 Offline</span>
                        </div>
                    </button>

                    <button class="sector-card-btn text-left p-3.5 rounded-lg border border-outline-variant/80 hover:border-primary hover:bg-surface-container transition-all cursor-pointer group bg-surface-bright" data-sector="Sector 02">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-xs text-primary group-hover:text-blue-700">SECTOR 02</span>
                            <span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">9/10 ON</span>
                        </div>
                        <div class="text-[11px] text-on-surface-variant font-medium">Border Checkpost Sector</div>
                        <div class="flex items-center gap-3 text-[10px] text-outline font-mono mt-2 pt-2 border-t border-outline-variant/40">
                            <span>10 Cameras</span>
                            <span class="text-security-green">9 Online</span>
                            <span class="text-critical-red">1 Offline</span>
                        </div>
                    </button>

                    <button class="sector-card-btn text-left p-3.5 rounded-lg border border-outline-variant/80 hover:border-primary hover:bg-surface-container transition-all cursor-pointer group bg-surface-bright" data-sector="Sector 03">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-xs text-primary group-hover:text-blue-700">SECTOR 03</span>
                            <span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">13/14 ON</span>
                        </div>
                        <div class="text-[11px] text-on-surface-variant font-medium">River Bed & Wetland</div>
                        <div class="flex items-center gap-3 text-[10px] text-outline font-mono mt-2 pt-2 border-t border-outline-variant/40">
                            <span>14 Cameras</span>
                            <span class="text-security-green">13 Online</span>
                            <span class="text-critical-red">1 Offline</span>
                        </div>
                    </button>

                    <button class="sector-card-btn text-left p-3.5 rounded-lg border border-outline-variant/80 hover:border-primary hover:bg-surface-container transition-all cursor-pointer group bg-surface-bright" data-sector="Sector 04">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-xs text-primary group-hover:text-blue-700">SECTOR 04</span>
                            <span class="px-1.5 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">9/12 ON</span>
                        </div>
                        <div class="text-[11px] text-on-surface-variant font-medium">Perimeter Wall B Zone</div>
                        <div class="flex items-center gap-3 text-[10px] text-outline font-mono mt-2 pt-2 border-t border-outline-variant/40">
                            <span>12 Cameras</span>
                            <span class="text-security-green">9 Online</span>
                            <span class="text-critical-red">3 Offline</span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Filters & Search Toolbar -->
            <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                <div class="relative flex-1 min-w-[220px]">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-sm">search</span>
                    <input id="cam-search-input" class="w-full pl-9 pr-3 py-2 bg-surface-bright border border-outline-variant rounded-lg text-xs focus:outline-none focus:border-primary text-on-surface placeholder:text-outline" placeholder="Search Camera ID, location, or sector..." type="text"/>
                </div>

                <div class="flex flex-wrap items-center gap-2">
                    <select id="filter-sector" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer">
                        <option value="ALL">All Sectors</option>
                        <option value="Sector 01">Sector 01</option>
                        <option value="Sector 02">Sector 02</option>
                        <option value="Sector 03">Sector 03</option>
                        <option value="Sector 04">Sector 04</option>
                    </select>

                    <select id="filter-status" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer">
                        <option value="ALL">All Statuses</option>
                        <option value="ONLINE">Online</option>
                        <option value="OFFLINE">Offline</option>
                        <option value="DEGRADED">Degraded</option>
                    </select>

                    <select id="filter-type" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer">
                        <option value="ALL">All Camera Types</option>
                        <option value="Fixed">Fixed</option>
                        <option value="PTZ">PTZ</option>
                        <option value="Thermal">Thermal</option>
                        <option value="Night Vision">Night Vision</option>
                    </select>

                    <select id="filter-alert" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer">
                        <option value="ALL">All Alert Levels</option>
                        <option value="Normal">Normal</option>
                        <option value="Warning">Warning</option>
                        <option value="Critical">Critical</option>
                    </select>

                    <select id="sort-cameras" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer">
                        <option value="ID">Sort: Camera ID</option>
                        <option value="SECTOR">Sort: Sector</option>
                        <option value="STATUS">Sort: Status</option>
                        <option value="ALERTS">Sort: Active Alerts</option>
                    </select>

                    <button id="btn-reset-filters" class="px-3 py-2 text-xs font-bold text-outline hover:text-primary transition-colors cursor-pointer">
                        RESET
                    </button>
                </div>
            </div>

            <!-- Camera Grid Container -->
            <div id="camera-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            </div>

            <!-- Modal Mount Point -->
            <div id="camera-modal-mount"></div>
        </div>
    `;
}

export function attachBorderCamerasInteractions() {
    const searchInput = document.getElementById('cam-search-input');
    const filterSector = document.getElementById('filter-sector');
    const filterStatus = document.getElementById('filter-status');
    const filterType = document.getElementById('filter-type');
    const filterAlert = document.getElementById('filter-alert');
    const sortDropdown = document.getElementById('sort-cameras');
    const btnReset = document.getElementById('btn-reset-filters');
    const gridContainer = document.getElementById('camera-grid-container');
    const btnRefresh = document.getElementById('btn-refresh-cameras');

    let activeCamerasList = [...BORDER_CAMERAS_DATA];

    function applyFiltersAndRender() {
        if (!gridContainer) return;

        const query = (searchInput?.value || '').toLowerCase().trim();
        const sectorVal = filterSector?.value || 'ALL';
        const statusVal = filterStatus?.value || 'ALL';
        const typeVal = filterType?.value || 'ALL';
        const alertVal = filterAlert?.value || 'ALL';
        const sortVal = sortDropdown?.value || 'ID';

        let filtered = BORDER_CAMERAS_DATA.filter(cam => {
            // Search match
            const matchesQuery = !query || 
                cam.id.toLowerCase().includes(query) ||
                cam.name.toLowerCase().includes(query) ||
                cam.sector.toLowerCase().includes(query) ||
                cam.location.toLowerCase().includes(query);

            // Sector match
            const matchesSector = sectorVal === 'ALL' || cam.sector === sectorVal;

            // Status match
            const matchesStatus = statusVal === 'ALL' || cam.status === statusVal;

            // Type match
            const matchesType = typeVal === 'ALL' || cam.type === typeVal;

            // Alert match
            const matchesAlert = alertVal === 'ALL' || cam.alertStatus === alertVal;

            return matchesQuery && matchesSector && matchesStatus && matchesType && matchesAlert;
        });

        // Sorting
        filtered.sort((a, b) => {
            if (sortVal === 'SECTOR') return a.sector.localeCompare(b.sector);
            if (sortVal === 'STATUS') return a.status.localeCompare(b.status);
            if (sortVal === 'ALERTS') {
                const alertWeight = { Critical: 3, Warning: 2, Normal: 1 };
                return (alertWeight[b.alertStatus] || 0) - (alertWeight[a.alertStatus] || 0);
            }
            return a.id.localeCompare(b.id);
        });

        activeCamerasList = filtered;

        if (filtered.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-span-full py-16 text-center bg-surface-container-lowest rounded-xl border border-outline-variant">
                    <span class="material-symbols-outlined text-4xl text-outline mb-2">videocam_off</span>
                    <h3 class="font-bold text-sm text-primary">No Matching Cameras Found</h3>
                    <p class="text-xs text-on-surface-variant mt-1">Try adjusting your search terms or filters.</p>
                    <button id="btn-clear-empty-filters" class="mt-4 px-4 py-2 bg-[#0A192F] text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-all shadow-sm">
                        Reset Filters
                    </button>
                </div>
            `;
            document.getElementById('btn-clear-empty-filters')?.addEventListener('click', resetFilters);
            return;
        }

        gridContainer.innerHTML = filtered.map(cam => createCameraCardHtml(cam)).join('');

        // Attach Card Click Handlers
        gridContainer.querySelectorAll('.btn-open-camera-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const camId = btn.getAttribute('data-cam-id');
                const camObj = BORDER_CAMERAS_DATA.find(c => c.id === camId);
                if (camObj) openCameraModal(camObj);
            });
        });

        gridContainer.querySelectorAll('.btn-retry-connection').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const camId = btn.getAttribute('data-cam-id');
                showToast(`🔄 Attempting to re-establish signal connection to ${camId}...`, 'info');
            });
        });
    }

    function createCameraCardHtml(cam) {
        const isOffline = cam.status === 'OFFLINE';
        const isDegraded = cam.status === 'DEGRADED';
        const hasAlert = cam.activeAlert !== null;

        // Status Badge styling
        let statusBadgeHtml = '';
        if (isOffline) {
            statusBadgeHtml = `<span class="px-2 py-0.5 bg-red-100 text-red-800 rounded font-mono text-[10px] font-bold border border-red-200">🔴 OFFLINE</span>`;
        } else if (isDegraded) {
            statusBadgeHtml = `<span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-mono text-[10px] font-bold border border-amber-200">🟡 DEGRADED</span>`;
        } else {
            statusBadgeHtml = `<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px] font-bold border border-emerald-200">🟢 ONLINE</span>`;
        }

        // Active AI Detection tags
        const detectionsList = [];
        if (cam.aiDetections.person > 0) detectionsList.push(`PERSON (${cam.aiDetections.person})`);
        if (cam.aiDetections.vehicle > 0) detectionsList.push(`VEHICLE (${cam.aiDetections.vehicle})`);
        if (cam.aiDetections.plate > 0) detectionsList.push(`PLATE (${cam.aiDetections.plate})`);
        if (cam.aiDetections.intrusion > 0) detectionsList.push(`INTRUSION (${cam.aiDetections.intrusion})`);
        if (cam.aiDetections.nightMovement > 0) detectionsList.push(`NIGHT MOVEMENT (${cam.aiDetections.nightMovement})`);

        const aiTagsHtml = detectionsList.length > 0
            ? detectionsList.slice(0, 2).map(tag => `<span class="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold font-mono">${tag}</span>`).join(' ')
            : `<span class="text-[10px] text-outline font-mono">No Active AI Detection</span>`;

        if (isOffline) {
            return `
                <div class="bg-surface-container-lowest rounded-xl border border-red-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <!-- CCTV Offline Frame -->
                    <div class="relative h-44 bg-slate-900 flex flex-col items-center justify-center text-center p-4">
                        <span class="material-symbols-outlined text-4xl text-red-500 mb-1">videocam_off</span>
                        <div class="text-xs font-bold text-red-400 uppercase tracking-wider">OFFLINE - VIDEO FEED UNAVAILABLE</div>
                        <div class="text-[10px] text-slate-400 font-mono mt-1">Last Heartbeat: ${cam.lastHeartbeat}</div>
                        <div class="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] font-mono">
                            ${cam.id}
                        </div>
                    </div>

                    <!-- Card Details Footer -->
                    <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <h3 class="font-bold text-xs text-primary truncate" title="${cam.name}">${cam.name}</h3>
                                ${statusBadgeHtml}
                            </div>
                            <div class="text-[11px] text-on-surface-variant font-medium">${cam.location}</div>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="px-1.5 py-0.5 bg-surface-muted text-outline font-mono text-[10px] rounded border border-outline-variant">${cam.sector}</span>
                                <span class="px-1.5 py-0.5 bg-surface-muted text-outline font-mono text-[10px] rounded border border-outline-variant">${cam.type}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 pt-2 border-t border-outline-variant/50">
                            <button class="btn-open-camera-modal flex-1 py-1.5 bg-surface-container hover:bg-surface-variant text-primary text-xs font-bold rounded transition-colors text-center cursor-pointer" data-cam-id="${cam.id}">
                                VIEW DETAILS
                            </button>
                            <button class="btn-retry-connection py-1.5 px-3 bg-red-50 hover:bg-red-100 text-critical-red text-xs font-bold rounded border border-red-200 transition-colors cursor-pointer" data-cam-id="${cam.id}" title="Retry Signal Connection">
                                RETRY
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <!-- CCTV Live Preview Frame -->
                <div class="relative h-44 bg-slate-950 overflow-hidden group cursor-pointer btn-open-camera-modal" data-cam-id="${cam.id}">
                    <img alt="${cam.name}" class="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" src="${cam.image}"/>
                    
                    <!-- Bounding Box Simulation for Active Detections -->
                    ${cam.aiDetections.intrusion > 0 || hasAlert ? `
                        <div class="absolute top-[25%] left-[30%] w-[40%] h-[50%] border-2 border-critical-red bg-critical-red/10 rounded flex flex-col justify-between p-1 animate-pulse">
                            <span class="bg-critical-red text-white text-[9px] font-mono font-bold px-1 rounded w-fit">INTRUSION DETECTED</span>
                            <span class="text-[9px] text-white font-mono self-end bg-black/70 px-1 rounded">94.2% CONF</span>
                        </div>
                    ` : ''}

                    <!-- Top Bar Badges -->
                    <div class="absolute top-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                        <span class="px-2 py-0.5 bg-black/70 text-white rounded font-mono text-[10px] font-bold backdrop-blur">
                            ${cam.id}
                        </span>
                        <span class="px-2 py-0.5 bg-emerald-950/80 text-security-green rounded font-mono text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30 backdrop-blur">
                            <span class="w-1.5 h-1.5 bg-security-green rounded-full animate-pulse"></span> LIVE
                        </span>
                    </div>

                    <!-- Bottom Bar Badges -->
                    <div class="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                        <span class="px-2 py-0.5 bg-black/70 text-slate-300 rounded font-mono text-[9px]">
                            ${cam.type}
                        </span>
                        <span class="px-2 py-0.5 bg-black/70 text-slate-300 rounded font-mono text-[9px]">
                            ${cam.resolution}
                        </span>
                    </div>
                </div>

                <!-- Card Details Body -->
                <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="font-bold text-xs text-primary truncate" title="${cam.name}">${cam.name}</h3>
                            ${statusBadgeHtml}
                        </div>
                        <div class="text-[11px] text-on-surface-variant font-medium">${cam.location}</div>
                        
                        <div class="flex items-center gap-1.5 mt-2.5 flex-wrap">
                            <span class="px-1.5 py-0.5 bg-surface-container-high text-primary font-mono text-[10px] font-semibold rounded">${cam.sector}</span>
                            ${aiTagsHtml}
                        </div>

                        ${hasAlert ? `
                            <div class="mt-2.5 p-2 bg-red-50 border border-red-200 rounded text-[11px] font-bold text-critical-red flex items-center justify-between">
                                <span class="flex items-center gap-1 truncate">
                                    <span class="material-symbols-outlined text-sm">warning</span>
                                    <span class="truncate">${cam.activeAlert.title}</span>
                                </span>
                                <span class="text-[10px] font-mono shrink-0">${cam.activeAlert.time}</span>
                            </div>
                        ` : ''}
                    </div>

                    <div class="flex items-center gap-2 pt-2 border-t border-outline-variant/50">
                        <button class="btn-open-camera-modal flex-1 py-1.5 bg-[#0A192F] hover:bg-blue-900 text-white text-xs font-bold rounded transition-colors text-center cursor-pointer uppercase tracking-wider" data-cam-id="${cam.id}">
                            VIEW PREVIEW
                        </button>
                        <a href="#/border-map?cam=${cam.id}" class="py-1.5 px-3 bg-surface-container hover:bg-surface-variant text-primary text-xs font-bold rounded border border-outline-variant transition-colors flex items-center gap-1" title="View on Border Map">
                            <span class="material-symbols-outlined text-sm">map</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function resetFilters() {
        if (searchInput) searchInput.value = '';
        if (filterSector) filterSector.value = 'ALL';
        if (filterStatus) filterStatus.value = 'ALL';
        if (filterType) filterType.value = 'ALL';
        if (filterAlert) filterAlert.value = 'ALL';
        if (sortDropdown) sortDropdown.value = 'ID';
        applyFiltersAndRender();
        showToast('Camera filters reset to default view.');
    }

    // Attach Event Listeners
    if (searchInput) searchInput.addEventListener('input', applyFiltersAndRender);
    if (filterSector) filterSector.addEventListener('change', applyFiltersAndRender);
    if (filterStatus) filterStatus.addEventListener('change', applyFiltersAndRender);
    if (filterType) filterType.addEventListener('change', applyFiltersAndRender);
    if (filterAlert) filterAlert.addEventListener('change', applyFiltersAndRender);
    if (sortDropdown) sortDropdown.addEventListener('change', applyFiltersAndRender);
    if (btnReset) btnReset.addEventListener('click', resetFilters);

    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            const icon = document.getElementById('icon-refresh-cam');
            if (icon) icon.classList.add('animate-spin');
            setTimeout(() => {
                if (icon) icon.classList.remove('animate-spin');
                showToast('🔄 Camera feeds refreshed successfully.', 'success');
                applyFiltersAndRender();
            }, 600);
        });
    }

    // Sector Card Click Filtering
    document.querySelectorAll('.sector-card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sector = btn.getAttribute('data-sector');
            if (filterSector) {
                filterSector.value = sector;
                applyFiltersAndRender();
                showToast(`Filtered camera grid for ${sector}`, 'info');
            }
        });
    });

    // Initial Render
    applyFiltersAndRender();
}

/**
 * Open Detailed Live Camera Viewer & Controls Modal
 */
function openCameraModal(cam) {
    const modalMount = document.getElementById('camera-modal-mount');
    if (!modalMount) return;

    const isOffline = cam.status === 'OFFLINE';
    const isDegraded = cam.status === 'DEGRADED';
    const hasAlert = cam.activeAlert !== null;

    let statusBadgeHtml = '';
    if (isOffline) {
        statusBadgeHtml = `<span class="px-2.5 py-1 bg-red-100 text-red-800 rounded font-mono text-xs font-bold border border-red-200">🔴 OFFLINE</span>`;
    } else if (isDegraded) {
        statusBadgeHtml = `<span class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded font-mono text-xs font-bold border border-amber-200">🟡 DEGRADED</span>`;
    } else {
        statusBadgeHtml = `<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-mono text-xs font-bold border border-emerald-200">🟢 ONLINE</span>`;
    }

    modalMount.innerHTML = `
        <div id="camera-modal-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:p-6">
            <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                <!-- Modal Header -->
                <div class="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-high/50 sticky top-0 bg-surface-container-lowest z-10">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary text-2xl">videocam</span>
                        <div>
                            <div class="flex items-center gap-2">
                                <h2 class="font-bold text-lg text-primary">${cam.id} — ${cam.name}</h2>
                                ${statusBadgeHtml}
                            </div>
                            <p class="text-xs text-on-surface-variant font-medium">${cam.location} • ${cam.sector}</p>
                        </div>
                    </div>

                    <button id="btn-close-modal" class="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-muted transition-colors cursor-pointer">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <!-- Modal Main Content (Split 2 Columns) -->
                <div class="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                    <!-- Left 2 Cols: Live CCTV Feed Player & Interactive Controls -->
                    <div class="lg:col-span-2 space-y-4">
                        <div id="cctv-player-frame" class="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-outline-variant shadow-md">
                            ${isOffline ? `
                                <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900 text-slate-300">
                                    <span class="material-symbols-outlined text-6xl text-critical-red mb-3">videocam_off</span>
                                    <h3 class="font-bold text-base text-white">OFFLINE — VIDEO FEED UNAVAILABLE</h3>
                                    <p class="text-xs text-slate-400 mt-1 max-w-sm">Signal disconnected. Last heartbeat recorded ${cam.lastHeartbeat}.</p>
                                    <button class="mt-4 px-4 py-2 bg-critical-red text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors shadow">
                                        RETRY CONNECTION
                                    </button>
                                </div>
                            ` : `
                                <img alt="${cam.name}" class="w-full h-full object-cover opacity-90" src="${cam.image}"/>
                                
                                <!-- Bounding Box Overlays -->
                                ${cam.aiDetections.person > 0 ? `
                                    <div class="absolute top-[30%] left-[40%] w-[120px] h-[180px] border-2 border-security-green bg-security-green/10 rounded flex flex-col justify-between p-1">
                                        <span class="bg-security-green text-white text-[9px] font-mono font-bold px-1 rounded w-fit">PERSON 98.4%</span>
                                        <span class="text-[9px] text-white font-mono bg-black/70 px-1 rounded self-end">ID: T-84</span>
                                    </div>
                                ` : ''}

                                ${cam.aiDetections.vehicle > 0 ? `
                                    <div class="absolute top-[50%] left-[65%] w-[160px] h-[100px] border-2 border-warning-amber bg-warning-amber/10 rounded flex flex-col justify-between p-1">
                                        <span class="bg-warning-amber text-black text-[9px] font-mono font-bold px-1 rounded w-fit">VEHICLE 94.2%</span>
                                    </div>
                                ` : ''}

                                <!-- Top Overlay Info Bar -->
                                <div class="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                                    <div class="px-2.5 py-1 bg-black/75 backdrop-blur text-white rounded font-mono text-xs font-bold flex items-center gap-2 border border-white/10">
                                        <span class="w-2 h-2 rounded-full bg-security-green animate-pulse"></span>
                                        <span>LIVE STREAM</span>
                                        <span class="text-slate-400">|</span>
                                        <span id="modal-cctv-time">${new Date().toLocaleTimeString()}</span>
                                    </div>
                                    <div class="px-2.5 py-1 bg-black/75 backdrop-blur text-slate-300 rounded font-mono text-xs border border-white/10">
                                        ${cam.fps} FPS • ${cam.resolution}
                                    </div>
                                </div>

                                <!-- Bottom Threat Overlay Badge -->
                                <div class="absolute bottom-3 left-3 pointer-events-none">
                                    <div class="px-3 py-1.5 ${hasAlert ? 'bg-critical-red text-white' : 'bg-black/75 text-security-green'} rounded-lg font-mono text-xs font-bold border border-white/20 backdrop-blur flex items-center gap-2 shadow">
                                        <span class="material-symbols-outlined text-sm">${hasAlert ? 'warning' : 'shield'}</span>
                                        <span>${hasAlert ? `THREAT: ${cam.activeAlert.title}` : 'THREAT LEVEL: NORMAL (SECURE)'}</span>
                                    </div>
                                </div>
                            `}
                        </div>

                        <!-- Interactive Control Toolbar -->
                        <div class="p-3 bg-surface-container-high/60 rounded-xl border border-outline-variant/80 flex flex-wrap items-center justify-between gap-3">
                            <!-- Left Controls: PTZ Pad -->
                            <div class="flex items-center gap-1">
                                <span class="text-xs font-bold text-primary mr-2 uppercase tracking-wider">PTZ Controls:</span>
                                <button class="btn-ptz-action p-2 bg-surface-bright hover:bg-surface-container rounded border border-outline-variant text-primary text-xs font-bold cursor-pointer" data-dir="UP" title="Pan Up">
                                    <span class="material-symbols-outlined text-sm">arrow_upward</span>
                                </button>
                                <button class="btn-ptz-action p-2 bg-surface-bright hover:bg-surface-container rounded border border-outline-variant text-primary text-xs font-bold cursor-pointer" data-dir="DOWN" title="Pan Down">
                                    <span class="material-symbols-outlined text-sm">arrow_downward</span>
                                </button>
                                <button class="btn-ptz-action p-2 bg-surface-bright hover:bg-surface-container rounded border border-outline-variant text-primary text-xs font-bold cursor-pointer" data-dir="LEFT" title="Pan Left">
                                    <span class="material-symbols-outlined text-sm">arrow_back</span>
                                </button>
                                <button class="btn-ptz-action p-2 bg-surface-bright hover:bg-surface-container rounded border border-outline-variant text-primary text-xs font-bold cursor-pointer" data-dir="RIGHT" title="Pan Right">
                                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                                <button class="btn-ptz-action p-2 bg-surface-bright hover:bg-surface-container rounded border border-outline-variant text-primary text-xs font-bold cursor-pointer" data-dir="ZOOM_IN" title="Zoom In">
                                    <span class="material-symbols-outlined text-sm">zoom_in</span>
                                </button>
                            </div>

                            <!-- Right Controls: Action Buttons -->
                            <div class="flex items-center gap-2">
                                <button id="btn-snapshot" class="px-3 py-1.5 bg-surface-bright hover:bg-surface-container text-primary text-xs font-bold rounded border border-outline-variant transition-all flex items-center gap-1 cursor-pointer" title="Take Snapshot">
                                    <span class="material-symbols-outlined text-sm">photo_camera</span>
                                    <span>Snapshot</span>
                                </button>
                                <button id="btn-toggle-fullscreen" class="px-3 py-1.5 bg-surface-bright hover:bg-surface-container text-primary text-xs font-bold rounded border border-outline-variant transition-all flex items-center gap-1 cursor-pointer" title="Toggle Fullscreen">
                                    <span class="material-symbols-outlined text-sm">fullscreen</span>
                                    <span>Fullscreen</span>
                                </button>
                            </div>
                        </div>

                        <!-- Active Security Alert Container (If Alert Active) -->
                        ${hasAlert ? `
                            <div class="p-4 bg-red-50 border border-red-300 rounded-xl space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2 text-critical-red font-bold text-xs uppercase tracking-wider">
                                        <span class="material-symbols-outlined text-lg">warning</span>
                                        ACTIVE SECURITY ALERT: ${cam.activeAlert.severity}
                                    </div>
                                    <span class="text-xs font-mono font-bold text-red-700">${cam.activeAlert.time}</span>
                                </div>
                                <h4 class="font-bold text-sm text-primary">${cam.activeAlert.title}</h4>
                                <p class="text-xs text-on-surface-variant">Automated virtual fence crossing detected by AI engine on camera ${cam.id}.</p>
                                
                                <div class="flex items-center gap-3 pt-2">
                                    <a href="#/alerts/${cam.activeAlert.id}" class="px-4 py-2 bg-critical-red text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors shadow">
                                        VIEW ALERT (${cam.activeAlert.id})
                                    </a>
                                    <button id="btn-acknowledge-alert" class="px-4 py-2 bg-white text-primary text-xs font-bold rounded-lg border border-outline-variant hover:bg-surface-muted transition-colors">
                                        ACKNOWLEDGE ALERT
                                    </button>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Right Column: Camera Specifications & AI Analytics Panel -->
                    <div class="space-y-6">
                        <!-- Specifications Table -->
                        <div class="bg-surface-bright p-4 rounded-xl border border-outline-variant space-y-3">
                            <h3 class="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5 border-b border-outline-variant pb-2">
                                <span class="material-symbols-outlined text-sm">info</span>
                                Camera Node Metadata
                            </h3>

                            <div class="space-y-2 text-xs">
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Camera ID:</span>
                                    <span class="font-mono font-bold text-primary">${cam.id}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Sector:</span>
                                    <span class="font-semibold text-primary">${cam.sectorName}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Coordinates:</span>
                                    <span class="font-mono text-primary">${cam.lat}, ${cam.lng}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Sensor Type:</span>
                                    <span class="font-semibold text-primary">${cam.type}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Resolution:</span>
                                    <span class="font-mono text-primary">${cam.resolution}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Frame Rate:</span>
                                    <span class="font-mono text-primary">${cam.fps} FPS</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Last Heartbeat:</span>
                                    <span class="font-mono text-primary">${cam.lastHeartbeat}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">Installation:</span>
                                    <span class="font-mono text-primary">${cam.installationDate}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-on-surface-variant">AI Analytics:</span>
                                    <span class="font-mono font-bold ${cam.aiStatus === 'ACTIVE' ? 'text-security-green' : 'text-critical-red'}">${cam.aiStatus}</span>
                                </div>
                            </div>
                        </div>

                        <!-- AI Analytics Detection Breakdown -->
                        <div class="bg-surface-bright p-4 rounded-xl border border-outline-variant space-y-3">
                            <h3 class="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5 border-b border-outline-variant pb-2">
                                <span class="material-symbols-outlined text-sm">psychology</span>
                                Live AI Detections
                            </h3>

                            <div class="grid grid-cols-2 gap-2">
                                <div class="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60">
                                    <div class="text-[10px] text-outline uppercase font-mono">Person</div>
                                    <div class="font-bold text-lg text-primary">${cam.aiDetections.person}</div>
                                </div>
                                <div class="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60">
                                    <div class="text-[10px] text-outline uppercase font-mono">Vehicles</div>
                                    <div class="font-bold text-lg text-primary">${cam.aiDetections.vehicle}</div>
                                </div>
                                <div class="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60">
                                    <div class="text-[10px] text-outline uppercase font-mono">Plates</div>
                                    <div class="font-bold text-lg text-primary">${cam.aiDetections.plate}</div>
                                </div>
                                <div class="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/60">
                                    <div class="text-[10px] text-outline uppercase font-mono">Intrusion</div>
                                    <div class="font-bold text-lg ${cam.aiDetections.intrusion > 0 ? 'text-critical-red font-bold' : 'text-primary'}">${cam.aiDetections.intrusion}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer Link Button -->
                        <a href="#/border-map?cam=${cam.id}" class="w-full py-3 bg-[#0A192F] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all shadow flex items-center justify-center gap-2 uppercase tracking-wider">
                            <span class="material-symbols-outlined text-sm">map</span>
                            View Location on Border Map
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Modal Control Handlers
    const backdrop = document.getElementById('camera-modal-backdrop');
    const closeBtn = document.getElementById('btn-close-modal');

    function closeModal() {
        if (modalMount) modalMount.innerHTML = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });
    }

    // PTZ Control Buttons
    document.querySelectorAll('.btn-ptz-action').forEach(btn => {
        btn.addEventListener('click', () => {
            const dir = btn.getAttribute('data-dir');
            showToast(`🎮 PTZ Command Executed: ${dir} on ${cam.id}`, 'info');
        });
    });

    // Snapshot Button
    const btnSnapshot = document.getElementById('btn-snapshot');
    if (btnSnapshot) {
        btnSnapshot.addEventListener('click', () => {
            showToast(`📸 Snapshot captured from ${cam.id} & saved to Audit Log`, 'success');
        });
    }

    // Fullscreen Button
    const btnFullscreen = document.getElementById('btn-toggle-fullscreen');
    const playerFrame = document.getElementById('cctv-player-frame');
    if (btnFullscreen && playerFrame) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                playerFrame.requestFullscreen().catch(err => {
                    showToast('Fullscreen mode engaged');
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // Acknowledge Alert Button
    const btnAck = document.getElementById('btn-acknowledge-alert');
    if (btnAck) {
        btnAck.addEventListener('click', () => {
            showToast(`✅ Alert ${cam.activeAlert.id} Acknowledged by Command Officer`, 'success');
            btnAck.disabled = true;
            btnAck.textContent = 'ACKNOWLEDGED';
            btnAck.className = 'px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300';
        });
    }
}
