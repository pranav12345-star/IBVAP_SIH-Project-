/**
 * IBVAP | Security Event Investigation & Audit Center View Controller
 * Connected to live CCTV, Cameras, Threats, ANPR, Maps & Video Analysis
 */
import { SECURITY_EVENTS_DATA } from '../data/eventData.js';
import { showToast } from '../components/toast.js';

let filteredEvents = [...SECURITY_EVENTS_DATA];
let selectedEvent = SECURITY_EVENTS_DATA[0];
let currentPage = 1;
const pageSize = 8;

export function renderEventsView() {
    const totalEventsCount = 248;
    const criticalCount = 3;
    const warningCount = 12;
    const activeInvestigationsCount = 5;
    const resolvedCount = 230;

    return `
        <div class="p-4 lg:p-6 flex flex-col gap-5 font-sans bg-surface-muted min-h-full">
            <!-- Header & Telemetry Status Bar -->
            <div class="bg-surface-container-lowest p-4 lg:p-5 rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <span class="material-symbols-outlined text-2xl">policy</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2.5">
                            <h1 class="font-headline-sm text-headline-sm font-bold text-primary">Security Event Investigation & Audit Center</h1>
                            <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full text-[11px] font-mono font-bold flex items-center gap-1 border border-blue-200">
                                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                ● LIVE EVENT STREAM
                            </span>
                        </div>
                        <p class="text-xs text-on-surface-variant font-mono">System generated immutable audit log • Last sync 2s ago</p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button id="btn-toggle-filters" class="flex items-center gap-1.5 px-3 py-2 bg-surface-bright hover:bg-surface-container text-xs font-bold text-on-surface rounded-xl border border-outline-variant transition-all cursor-pointer shadow-sm">
                        <span class="material-symbols-outlined text-sm">tune</span>
                        <span>ADVANCED FILTERS</span>
                    </button>
                    <button id="btn-export-csv" class="flex items-center gap-1.5 px-4 py-2 bg-[#0A192F] hover:bg-blue-900 text-white text-xs font-bold font-mono rounded-xl transition-all shadow cursor-pointer uppercase">
                        <span class="material-symbols-outlined text-sm">download</span>
                        <span>EXPORT AUDIT REPORT (CSV)</span>
                    </button>
                </div>
            </div>

            <!-- TOP KPI SUMMARY SECTION -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                    <div class="text-[11px] font-mono font-bold text-outline uppercase tracking-wider">TOTAL EVENTS</div>
                    <div class="text-2xl lg:text-3xl font-extrabold text-primary font-mono mt-1">${totalEventsCount}</div>
                    <div class="text-[10px] text-outline font-mono mt-1">24h System Logging</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded-2xl border border-critical-red/30 shadow-sm flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-mono font-bold text-critical-red uppercase tracking-wider">CRITICAL</span>
                        <span class="w-2.5 h-2.5 rounded-full bg-critical-red animate-pulse"></span>
                    </div>
                    <div class="text-2xl lg:text-3xl font-extrabold text-critical-red font-mono mt-1">0${criticalCount}</div>
                    <div class="text-[10px] text-critical-red/80 font-mono mt-1">Immediate Action Required</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded-2xl border border-amber-400/40 shadow-sm flex flex-col justify-between">
                    <div class="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">WARNING</div>
                    <div class="text-2xl lg:text-3xl font-extrabold text-amber-700 dark:text-amber-300 font-mono mt-1">${warningCount}</div>
                    <div class="text-[10px] text-amber-700/80 dark:text-amber-300/80 font-mono mt-1">Monitoring Queue</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded-2xl border border-blue-400/40 shadow-sm flex flex-col justify-between">
                    <div class="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">INVESTIGATIONS</div>
                    <div class="text-2xl lg:text-3xl font-extrabold text-blue-700 dark:text-blue-300 font-mono mt-1">0${activeInvestigationsCount}</div>
                    <div class="text-[10px] text-blue-700/80 dark:text-blue-300/80 font-mono mt-1">Active Command Track</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded-2xl border border-security-green/40 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
                    <div class="text-[11px] font-mono font-bold text-security-green uppercase tracking-wider">RESOLVED</div>
                    <div class="text-2xl lg:text-3xl font-extrabold text-security-green font-mono mt-1">${resolvedCount}</div>
                    <div class="text-[10px] text-security-green/80 font-mono mt-1">Verified Audit Cleared</div>
                </div>
            </div>

            <!-- SEARCH & ADVANCED FILTER DRAWER PANEL -->
            <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-4">
                <!-- Search Field -->
                <div class="flex items-center gap-3">
                    <div class="relative flex-1">
                        <span class="material-symbols-outlined absolute left-3.5 top-2.5 text-outline text-lg">search</span>
                        <input id="event-search-input" type="text" class="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-outline" placeholder="Search Event ID (EV-8847), Camera (CAM-014-NORTH), Event Type (Virtual Fence)..."/>
                    </div>
                </div>

                <!-- Advanced Filters Panel (Hidden by default, toggleable) -->
                <div id="advanced-filters-panel" class="hidden pt-3 border-t border-outline-variant/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <div class="space-y-1">
                        <label class="text-[11px] font-mono font-bold text-outline uppercase">Sector</label>
                        <select id="filter-sector" class="w-full px-3 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-xs font-mono text-on-surface">
                            <option value="ALL">All Sectors</option>
                            <option value="Sector 01">Sector 01</option>
                            <option value="Sector 02">Sector 02</option>
                            <option value="Sector 03">Sector 03</option>
                            <option value="Sector 04">Sector 04</option>
                            <option value="Sector 07">Sector 07</option>
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="text-[11px] font-mono font-bold text-outline uppercase">Camera</label>
                        <select id="filter-camera" class="w-full px-3 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-xs font-mono text-on-surface">
                            <option value="ALL">All Cameras</option>
                            <option value="CAM-014-NORTH">CAM-014-NORTH</option>
                            <option value="CAM-BOP-033">CAM-BOP-033</option>
                            <option value="CAM-031-RIVER">CAM-031-RIVER</option>
                            <option value="CAM-022-GATE">CAM-022-GATE</option>
                            <option value="CAM-008-NORTH">CAM-008-NORTH</option>
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="text-[11px] font-mono font-bold text-outline uppercase">Event Type</label>
                        <select id="filter-event-type" class="w-full px-3 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-xs font-mono text-on-surface">
                            <option value="ALL">All Event Types</option>
                            <option value="Intrusion">Intrusion</option>
                            <option value="Person Detection">Person Detection</option>
                            <option value="Vehicle Detection">Vehicle Detection</option>
                            <option value="ANPR">ANPR</option>
                            <option value="Thermal Anomaly">Thermal Anomaly</option>
                            <option value="Camera Health">Camera Health</option>
                            <option value="Patrol Event">Patrol Event</option>
                            <option value="System Event">System Event</option>
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="text-[11px] font-mono font-bold text-outline uppercase">Severity</label>
                        <select id="filter-severity" class="w-full px-3 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-xs font-mono text-on-surface">
                            <option value="ALL">All Severities</option>
                            <option value="CRITICAL">CRITICAL</option>
                            <option value="HIGH">HIGH</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="LOW">LOW</option>
                            <option value="INFO">INFO</option>
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="text-[11px] font-mono font-bold text-outline uppercase">Status</label>
                        <select id="filter-status" class="w-full px-3 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-xs font-mono text-on-surface">
                            <option value="ALL">All Statuses</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="UNDER INVESTIGATION">UNDER INVESTIGATION</option>
                            <option value="MONITORING">MONITORING</option>
                            <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
                            <option value="RESOLVED">RESOLVED</option>
                        </select>
                    </div>

                    <div class="flex items-end gap-2">
                        <button id="btn-apply-filters" class="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-all shadow cursor-pointer uppercase">
                            Apply Filter
                        </button>
                        <button id="btn-clear-filters" class="px-3 py-2 bg-surface-bright text-on-surface text-xs font-bold rounded-lg border border-outline-variant hover:bg-surface-container transition-all cursor-pointer">
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <!-- SECURITY EVENT AUDIT TABLE -->
            <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead class="bg-surface-container-high text-on-surface font-bold font-mono border-b border-outline-variant">
                            <tr>
                                <th class="px-4 py-3.5">EVENT ID</th>
                                <th class="px-4 py-3.5">TIMESTAMP</th>
                                <th class="px-4 py-3.5">CAMERA</th>
                                <th class="px-4 py-3.5">EVENT TYPE</th>
                                <th class="px-4 py-3.5">DESCRIPTION</th>
                                <th class="px-4 py-3.5">SEVERITY</th>
                                <th class="px-4 py-3.5">AI CONFIDENCE</th>
                                <th class="px-4 py-3.5">STATUS</th>
                                <th class="px-4 py-3.5 text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody id="events-table-body">
                            <!-- Rows injected via JS -->
                        </tbody>
                    </table>
                </div>

                <!-- Table Pagination Footer -->
                <div class="p-4 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-outline">
                    <div id="pagination-info">Showing 1–8 of 248 events</div>
                    <div class="flex items-center gap-1.5">
                        <button id="btn-page-prev" class="px-3 py-1.5 bg-surface-bright hover:bg-surface-container rounded-lg border border-outline-variant text-on-surface font-bold transition-all disabled:opacity-50 cursor-pointer">
                            Previous
                        </button>
                        <div id="page-numbers-container" class="flex gap-1"></div>
                        <button id="btn-page-next" class="px-3 py-1.5 bg-surface-bright hover:bg-surface-container rounded-lg border border-outline-variant text-on-surface font-bold transition-all disabled:opacity-50 cursor-pointer">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- RIGHT-SIDE EVENT DETAILS DRAWER MODAL -->
        <div id="event-drawer-backdrop" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300"></div>
        
        <div id="event-details-drawer" class="fixed top-0 right-0 h-full w-full max-w-xl bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col overflow-hidden">
            <!-- Drawer Header -->
            <div class="p-4 lg:p-5 bg-surface-container-high border-b border-outline-variant flex items-center justify-between shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 shadow-sm">
                        <span class="material-symbols-outlined text-xl">policy</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span id="drawer-event-id" class="font-mono text-base font-bold text-primary">EV-8847</span>
                            <span id="drawer-status-badge" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase">ACTIVE INVESTIGATION</span>
                        </div>
                        <p id="drawer-event-title" class="text-xs text-on-surface-variant font-medium">Virtual Fence Intrusion Detected</p>
                    </div>
                </div>
                <button id="btn-close-drawer" class="p-2 text-outline hover:text-primary rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            <!-- Drawer Body Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
                <!-- Metadata Telemetry Box -->
                <div class="p-4 bg-surface-bright border border-outline-variant rounded-2xl grid grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                        <div class="text-[10px] text-outline uppercase font-bold">CAMERA NODE</div>
                        <div id="drawer-camera" class="font-bold text-primary mt-0.5">CAM-014-NORTH</div>
                    </div>
                    <div>
                        <div class="text-[10px] text-outline uppercase font-bold">BORDER SECTOR</div>
                        <div id="drawer-sector" class="font-bold text-primary mt-0.5">Sector 04</div>
                    </div>
                    <div>
                        <div class="text-[10px] text-outline uppercase font-bold">TIMESTAMP</div>
                        <div id="drawer-timestamp" class="font-bold text-primary mt-0.5">12:24:18 AM (2026-08-31)</div>
                    </div>
                    <div>
                        <div class="text-[10px] text-outline uppercase font-bold">AI CONFIDENCE</div>
                        <div id="drawer-confidence" class="font-bold text-security-green mt-0.5">96.8% █████████░</div>
                    </div>
                    <div class="col-span-2">
                        <div class="text-[10px] text-outline uppercase font-bold">GEO COORDINATES</div>
                        <div id="drawer-coords" class="font-bold text-primary mt-0.5">28.6139° N, 70.2193° E</div>
                    </div>
                </div>

                <!-- EVIDENCE SECTION -->
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xs font-bold font-mono uppercase text-primary tracking-wider flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-sm text-blue-600">videocam</span>
                            CCTV Evidence Snapshot
                        </h3>
                        <span class="text-[10px] font-mono text-outline">AUTHENTICATED FRAME</span>
                    </div>

                    <div id="drawer-evidence-container" class="relative rounded-2xl overflow-hidden border border-outline-variant bg-black min-h-[200px] flex items-center justify-center">
                        <img id="drawer-evidence-img" src="" alt="CCTV Evidence Frame" class="w-full h-56 object-cover"/>
                        <div class="absolute bottom-2 left-2 px-2.5 py-1 bg-black/80 backdrop-blur rounded text-[10px] font-mono text-white flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-critical-red animate-pulse"></span>
                            <span>EV-8847 TARGET LOCK</span>
                        </div>
                    </div>

                    <!-- Direct Action Buttons Connected to App Modules -->
                    <div class="grid grid-cols-2 gap-2 pt-1">
                        <a id="btn-drawer-camera" href="#/border-cameras" class="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0A192F] hover:bg-blue-900 text-white font-mono text-xs font-bold rounded-xl shadow uppercase transition-all">
                            <span>📹</span> VIEW LIVE CAMERA
                        </a>
                        <a id="btn-drawer-map" href="#/border-map" class="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0A192F] hover:bg-blue-900 text-white font-mono text-xs font-bold rounded-xl shadow uppercase transition-all">
                            <span>🗺️</span> SHOW ON MAP
                        </a>
                        <a id="btn-drawer-footage" href="#/video-analysis" class="flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs font-bold rounded-xl border border-outline-variant uppercase transition-all">
                            <span>🎬</span> VIEW FOOTAGE
                        </a>
                        <a id="btn-drawer-alert" href="#/alerts/EV-8847" class="flex items-center justify-center gap-1.5 px-3 py-2 bg-critical-red hover:bg-red-600 text-white font-mono text-xs font-bold rounded-xl shadow uppercase transition-all">
                            <span>🚨</span> INSPECT ALERT
                        </a>
                    </div>
                </div>

                <!-- INCIDENT TIMELINE SECTION -->
                <div class="space-y-3 pt-2 border-t border-outline-variant/60">
                    <h3 class="text-xs font-bold font-mono uppercase text-primary tracking-wider flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-blue-600">timeline</span>
                        Incident Audit Timeline
                    </h3>
                    <div id="drawer-timeline" class="space-y-3 pl-2 border-l-2 border-outline-variant/60 font-mono text-xs">
                        <!-- Timeline nodes injected dynamically -->
                    </div>
                </div>

                <!-- INVESTIGATION STATUS UPDATE CONTROL -->
                <div class="p-4 bg-surface-bright border border-outline-variant rounded-2xl space-y-3">
                    <label class="text-xs font-bold font-mono text-primary uppercase block">Update Investigation Status</label>
                    <div class="flex gap-2">
                        <select id="drawer-status-select" class="flex-1 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs font-mono text-on-surface">
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="UNDER INVESTIGATION">UNDER INVESTIGATION</option>
                            <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
                            <option value="RESOLVED">RESOLVED</option>
                        </select>
                        <button id="btn-update-status" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-all uppercase font-mono shadow cursor-pointer">
                            UPDATE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function attachEventsInteractions() {
    const tableBody = document.getElementById('events-table-body');
    const searchInput = document.getElementById('event-search-input');
    const filterPanel = document.getElementById('advanced-filters-panel');
    const btnToggleFilters = document.getElementById('btn-toggle-filters');
    const btnApplyFilters = document.getElementById('btn-apply-filters');
    const btnClearFilters = document.getElementById('btn-clear-filters');
    const btnExportCsv = document.getElementById('btn-export-csv');

    // Drawer Elements
    const drawerBackdrop = document.getElementById('event-drawer-backdrop');
    const drawer = document.getElementById('event-details-drawer');
    const btnCloseDrawer = document.getElementById('btn-close-drawer');

    // Filter Toggle
    if (btnToggleFilters && filterPanel) {
        btnToggleFilters.addEventListener('click', () => {
            filterPanel.classList.toggle('hidden');
        });
    }

    // Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyCurrentFilters();
        });
    }

    if (btnApplyFilters) {
        btnApplyFilters.addEventListener('click', () => {
            applyCurrentFilters();
            showToast('Event audit filters applied.', 'info');
        });
    }

    if (btnClearFilters) {
        btnClearFilters.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            document.getElementById('filter-sector').value = 'ALL';
            document.getElementById('filter-camera').value = 'ALL';
            document.getElementById('filter-event-type').value = 'ALL';
            document.getElementById('filter-severity').value = 'ALL';
            document.getElementById('filter-status').value = 'ALL';
            applyCurrentFilters();
            showToast('Event audit filters reset.', 'info');
        });
    }

    // Export CSV Handler
    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', () => {
            exportAuditCsv(filteredEvents);
        });
    }

    // Drawer Close Listeners
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    function openDrawer(evtRecord) {
        selectedEvent = evtRecord;
        document.getElementById('drawer-event-id').textContent = evtRecord.id;
        document.getElementById('drawer-event-title').textContent = evtRecord.title;
        document.getElementById('drawer-camera').textContent = evtRecord.camera;
        document.getElementById('drawer-sector').textContent = evtRecord.sector;
        document.getElementById('drawer-timestamp').textContent = `${evtRecord.timestamp} (${evtRecord.date})`;
        document.getElementById('drawer-confidence').textContent = `${evtRecord.confidence} █████████░`;
        document.getElementById('drawer-coords').textContent = evtRecord.coordinates || '28.6139° N, 70.2193° E';

        const statusBadge = document.getElementById('drawer-status-badge');
        if (statusBadge) {
            statusBadge.textContent = evtRecord.status;
        }

        const statusSelect = document.getElementById('drawer-status-select');
        if (statusSelect) statusSelect.value = evtRecord.status;

        const evidenceImg = document.getElementById('drawer-evidence-img');
        const evidenceContainer = document.getElementById('drawer-evidence-container');
        if (evtRecord.evidenceFrame) {
            if (evidenceImg) evidenceImg.src = evtRecord.evidenceFrame;
            if (evidenceContainer) evidenceContainer.classList.remove('hidden');
        } else {
            if (evidenceContainer) {
                evidenceContainer.innerHTML = '<div class="p-8 text-xs font-mono text-outline text-center">📷 No physical evidence attached to audit record.</div>';
            }
        }

        // Timeline rendering
        const timelineContainer = document.getElementById('drawer-timeline');
        if (timelineContainer && evtRecord.timeline) {
            timelineContainer.innerHTML = evtRecord.timeline.map(item => `
                <div class="relative pl-4 pb-2">
                    <span class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border border-white"></span>
                    <div class="font-bold text-primary text-[11px]">${item.time}</div>
                    <div class="text-on-surface-variant text-[11px]">${item.event}</div>
                </div>
            `).join('');
        }

        // Action button route links
        document.getElementById('btn-drawer-alert').href = `#/alerts/${evtRecord.id}`;

        if (drawerBackdrop && drawer) {
            drawerBackdrop.classList.remove('hidden');
            setTimeout(() => {
                drawerBackdrop.classList.remove('opacity-0');
                drawer.classList.remove('translate-x-full');
            }, 10);
        }
    }

    function closeDrawer() {
        if (drawerBackdrop && drawer) {
            drawer.classList.add('translate-x-full');
            drawerBackdrop.classList.add('opacity-0');
            setTimeout(() => {
                drawerBackdrop.classList.add('hidden');
            }, 300);
        }
    }

    // Status Update Listener
    document.getElementById('btn-update-status')?.addEventListener('click', () => {
        const newStatus = document.getElementById('drawer-status-select')?.value;
        if (selectedEvent && newStatus) {
            selectedEvent.status = newStatus;
            document.getElementById('drawer-status-badge').textContent = newStatus;
            showToast(`Event ${selectedEvent.id} status updated to ${newStatus}`, 'success');
            renderTableRows();
        }
    });

    function applyCurrentFilters() {
        const query = (searchInput?.value || '').toLowerCase().trim();
        const sectorVal = document.getElementById('filter-sector')?.value || 'ALL';
        const cameraVal = document.getElementById('filter-camera')?.value || 'ALL';
        const typeVal = document.getElementById('filter-event-type')?.value || 'ALL';
        const severityVal = document.getElementById('filter-severity')?.value || 'ALL';
        const statusVal = document.getElementById('filter-status')?.value || 'ALL';

        filteredEvents = SECURITY_EVENTS_DATA.filter(evt => {
            const matchesQuery = !query || 
                evt.id.toLowerCase().includes(query) ||
                evt.camera.toLowerCase().includes(query) ||
                evt.eventType.toLowerCase().includes(query) ||
                evt.title.toLowerCase().includes(query) ||
                evt.description.toLowerCase().includes(query);

            const matchesSector = sectorVal === 'ALL' || evt.sector === sectorVal;
            const matchesCamera = cameraVal === 'ALL' || evt.camera === cameraVal;
            const matchesType = typeVal === 'ALL' || evt.eventType === typeVal;
            const matchesSeverity = severityVal === 'ALL' || evt.severity === severityVal;
            const matchesStatus = statusVal === 'ALL' || evt.status === statusVal;

            return matchesQuery && matchesSector && matchesCamera && matchesType && matchesSeverity && matchesStatus;
        });

        currentPage = 1;
        renderTableRows();
    }

    function renderTableRows() {
        if (!tableBody) return;
        const total = filteredEvents.length;
        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, total);
        const pageRecords = filteredEvents.slice(start, end);

        if (pageRecords.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="p-8 text-center text-outline font-mono text-xs">
                        No security audit events match the specified filter criteria.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = pageRecords.map(evt => {
            let severityBadge = '';
            if (evt.severity === 'CRITICAL') {
                severityBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 dark:bg-red-950 text-critical-red rounded-lg font-mono font-bold text-[11px] border border-red-300">🔴 CRITICAL</span>';
            } else if (evt.severity === 'HIGH') {
                severityBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-orange-100 dark:bg-orange-950 text-amber-700 dark:text-amber-300 rounded-lg font-mono font-bold text-[11px] border border-orange-300">🟠 HIGH</span>';
            } else if (evt.severity === 'MEDIUM') {
                severityBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-yellow-100 dark:bg-yellow-950 text-amber-800 dark:text-amber-300 rounded-lg font-mono font-bold text-[11px] border border-yellow-300">🟡 MEDIUM</span>';
            } else if (evt.severity === 'LOW') {
                severityBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg font-mono font-bold text-[11px] border border-blue-300">🔵 LOW</span>';
            } else {
                severityBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-mono font-bold text-[11px] border border-slate-300">⚪ INFO</span>';
            }

            return `
                <tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer event-row" data-id="${evt.id}">
                    <td class="px-4 py-3.5 font-mono font-bold text-primary">${evt.id}</td>
                    <td class="px-4 py-3.5 font-mono text-[11px] text-on-surface-variant">${evt.timestamp}</td>
                    <td class="px-4 py-3.5 font-mono text-primary font-bold">${evt.camera}</td>
                    <td class="px-4 py-3.5 font-medium text-on-surface">${evt.eventType}</td>
                    <td class="px-4 py-3.5 text-on-surface-variant truncate max-w-xs">${evt.title}</td>
                    <td class="px-4 py-3.5">${severityBadge}</td>
                    <td class="px-4 py-3.5 font-mono font-bold text-security-green">${evt.confidence}</td>
                    <td class="px-4 py-3.5"><span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-container-high border border-outline-variant">${evt.status}</span></td>
                    <td class="px-4 py-3.5 text-right">
                        <button class="btn-inspect-evt text-primary hover:text-blue-700 font-bold font-mono text-xs hover:underline cursor-pointer" data-id="${evt.id}">VIEW DETAILS</button>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach click listeners to rows & inspect buttons
        document.querySelectorAll('.event-row').forEach(row => {
            row.addEventListener('click', (e) => {
                const id = row.getAttribute('data-id');
                const rec = SECURITY_EVENTS_DATA.find(r => r.id === id);
                if (rec) openDrawer(rec);
            });
        });

        // Update Pagination Info
        const paginationInfo = document.getElementById('pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${start + 1}–${end} of ${total} security events`;
        }

        const totalPages = Math.ceil(total / pageSize) || 1;
        const prevBtn = document.getElementById('btn-page-prev');
        const nextBtn = document.getElementById('btn-page-next');

        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; renderTableRows(); } };
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.onclick = () => { if (currentPage < totalPages) { currentPage++; renderTableRows(); } };
        }
    }

    renderTableRows();
}

function exportAuditCsv(data) {
    if (!data || data.length === 0) {
        showToast('No events available to export.', 'warning');
        return;
    }

    const headers = ['Event ID', 'Timestamp', 'Date', 'Camera', 'Sector', 'Event Type', 'Title', 'Description', 'Severity', 'Confidence', 'Status', 'Coordinates'];
    const csvRows = [headers.join(',')];

    data.forEach(item => {
        const row = [
            `"${item.id}"`,
            `"${item.timestamp}"`,
            `"${item.date}"`,
            `"${item.camera}"`,
            `"${item.sector}"`,
            `"${item.eventType}"`,
            `"${item.title.replace(/"/g, '""')}"`,
            `"${item.description.replace(/"/g, '""')}"`,
            `"${item.severity}"`,
            `"${item.confidence}"`,
            `"${item.status}"`,
            `"${item.coordinates || ''}"`
        ];
        csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `IBVAP_Security_Event_Audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${data.length} audit event records to CSV`, 'success');
}
