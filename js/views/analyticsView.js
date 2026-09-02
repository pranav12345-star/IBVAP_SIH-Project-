/**
 * IBVAP | AI Border Intelligence Analytics Center Controller
 * Unified View: ANPR, Vehicle Classification, Person Detection, Face Detection,
 * Watchlist Matching, AI Confidence Indicators, Detail Drawer, and Event Timeline.
 */
import { IBVAP_DATA } from '../mockData.js';
import { ThemeService } from '../services/themeService.js';
import { VideoService } from '../services/videoService.js';

let activeTab = 'overview'; // 'overview', 'anpr', 'person', 'vehicle', 'face'
let selectedRecord = null;
let searchQuery = '';
let filterCamera = 'ALL';
let filterStatus = 'ALL';
let filterVehicle = 'ALL';

const ANPR_EXPANDED_RECORDS = [
    { plate: "MH 15 AB 1234", vehicle: "White SUV (Scorpio)", status: "REGISTERED", confidence: 98.9, camera: "CAM-BOP-033", sector: "Sector 02", time: "12:20:15 AM", location: "Checkpost 02 Gate", firstSeen: "2026-08-30 08:14:10", lastSeen: "2026-08-31 12:20:15", obsCount: 14, watchlist: "NONE", alertId: null },
    { plate: "RJ 14 CD 5678", vehicle: "Heavy Cargo Truck", status: "WATCHLIST", confidence: 96.4, camera: "CAM-BOP-033", sector: "Sector 02", time: "12:18:02 AM", location: "Checkpost 02 Gate", firstSeen: "2026-08-28 14:02:11", lastSeen: "2026-08-31 12:18:02", obsCount: 8, watchlist: "HIGH PRIORITY - SUSPICIOUS STAGING", alertId: "EV-8846" },
    { plate: "WB 02 XY 9087", vehicle: "Dark Sedan (Civic)", status: "UNKNOWN", confidence: 91.2, camera: "CAM-BOP-014", sector: "Sector 04", time: "12:10:44 AM", location: "Border Road 07", firstSeen: "2026-08-31 12:10:44", lastSeen: "2026-08-31 12:10:44", obsCount: 1, watchlist: "NONE", alertId: null },
    { plate: "PB 08 EF 4321", vehicle: "Light Pickup Truck", status: "REGISTERED", confidence: 97.8, camera: "CAM-022-GATE", sector: "Sector 04", time: "11:55:12 PM", location: "Sector 04 Main Gate", firstSeen: "2026-08-25 10:00:00", lastSeen: "2026-08-30 23:55:12", obsCount: 42, watchlist: "NONE", alertId: null },
    { plate: "DL 01 AX 9941", vehicle: "Armored Patrol Vehicle", status: "REGISTERED", confidence: 99.4, camera: "CAM-008-NORTH", sector: "Sector 01", time: "11:42:09 PM", location: "North Ridge Post", firstSeen: "2026-08-01 00:00:00", lastSeen: "2026-08-30 23:42:09", obsCount: 128, watchlist: "NONE", alertId: null },
    { plate: "HR 26 ZQ 7710", vehicle: "Black SUV (Endeavour)", status: "FLAGGED", confidence: 94.1, camera: "CAM-031-RIVER", sector: "Sector 03", time: "11:30:18 PM", location: "River Crossing Delta", firstSeen: "2026-08-30 19:22:04", lastSeen: "2026-08-30 23:30:18", obsCount: 3, watchlist: "FLAGGED ANOMALY", alertId: "EV-8847" }
];

const PERSON_DETECTION_RECORDS = [
    { id: "DET-P-101", trackId: "P-001", camera: "CAM-014-NORTH", sector: "Sector 04", time: "12:42:18 AM", confidence: 96.8, status: "CRITICAL BREACH", location: "Virtual Fence Wall B" },
    { id: "DET-P-102", trackId: "P-002", camera: "CAM-008-NORTH", sector: "Sector 01", time: "12:41:05 AM", confidence: 95.4, status: "WARNING ANOMALY", location: "North Ridge Slope" },
    { id: "DET-P-103", trackId: "P-003", camera: "CAM-003-WEST", sector: "Sector 01", time: "12:35:22 AM", confidence: 98.1, status: "PATROL OFFICER", location: "West Outpost Gate" },
    { id: "DET-P-104", trackId: "P-004", camera: "CAM-031-RIVER", sector: "Sector 03", time: "12:22:50 AM", confidence: 92.6, status: "UNIDENTIFIED", location: "River Embankment" }
];

const VEHICLE_DETECTION_RECORDS = [
    { id: "DET-V-201", trackId: "V-101", type: "SUV (Black)", plate: "MH 15 AB 1234", camera: "CAM-022-GATE", sector: "Sector 04", time: "12:41:52 AM", confidence: 93.4, direction: "Northbound" },
    { id: "DET-V-202", trackId: "V-102", type: "Heavy Cargo Truck", plate: "RJ 14 CD 5678", camera: "CAM-BOP-033", sector: "Sector 02", time: "12:18:02 AM", confidence: 96.4, direction: "Eastbound" },
    { id: "DET-V-203", trackId: "V-103", type: "Commercial Bus", plate: "UNREGISTERED", camera: "CAM-008-NORTH", sector: "Sector 01", time: "12:05:14 AM", confidence: 94.8, direction: "Southbound" },
    { id: "DET-V-204", trackId: "V-104", type: "Motorcycle", plate: "PB 08 EF 4321", camera: "CAM-031-RIVER", sector: "Sector 03", time: "11:50:30 PM", confidence: 91.5, direction: "Westbound" }
];

const FACE_DETECTION_RECORDS = [
    { id: "FACE-001", camera: "CAM-022-GATE", sector: "Sector 04", time: "12:40:12 AM", confidence: 94.8, status: "FACE DETECTED (NO MATCH)", notes: "DEMO / ANALYTICS READY" },
    { id: "FACE-002", camera: "CAM-BOP-033", sector: "Sector 02", time: "12:20:15 AM", confidence: 96.2, status: "AUTHORIZED OFFICER MATCH", notes: "DEMO / ANALYTICS READY" }
];

export function renderAnalyticsView() {
    const currentTheme = ThemeService.getTheme();
    const isDark = currentTheme === 'dark';

    // Filtered ANPR List
    const filteredAnpr = ANPR_EXPANDED_RECORDS.filter(rec => {
        const matchesQuery = !searchQuery || rec.plate.toLowerCase().includes(searchQuery.toLowerCase()) || rec.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCamera = filterCamera === 'ALL' || rec.camera === filterCamera;
        const matchesStatus = filterStatus === 'ALL' || rec.status === filterStatus;
        return matchesQuery && matchesCamera && matchesStatus;
    });

    return `
        <div class="p-4 lg:p-edge-margin-desktop flex flex-col gap-6 font-sans text-on-surface bg-surface-muted min-h-full">
            
            <!-- Top Sub-Header & Module Title -->
            <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-primary text-2xl">analytics</span>
                        <h1 class="font-headline-md text-headline-md font-bold text-primary tracking-tight">AI BORDER INTELLIGENCE CENTER</h1>
                        <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold rounded-full">v4.2 PRO</span>
                    </div>
                    <p class="text-xs text-on-surface-variant">Unified multi-sensor AI analytics: ANPR, Vehicle Classification, Person Tracking & Watchlist Match Engine</p>
                </div>
                
                <div class="flex items-center gap-3">
                    <a href="#/video-analysis" class="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow cursor-pointer">
                        <span class="material-symbols-outlined text-sm">video_file</span>
                        <span>RUN FOOTAGE ANALYSIS</span>
                    </a>
                </div>
            </div>

            <!-- TOP KPI STATS CARDS -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div class="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-1">
                    <span class="text-[11px] font-mono text-outline uppercase">VEHICLES DETECTED</span>
                    <div class="flex items-baseline justify-between">
                        <span class="text-2xl font-bold font-mono text-primary">38</span>
                        <span class="material-symbols-outlined text-blue-500 text-lg">directions_car</span>
                    </div>
                    <span class="text-[10px] text-security-green font-bold">↑ 12% vs last shift</span>
                </div>

                <div class="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-1">
                    <span class="text-[11px] font-mono text-outline uppercase">PLATES RECOGNIZED</span>
                    <div class="flex items-baseline justify-between">
                        <span class="text-2xl font-bold font-mono text-primary">31</span>
                        <span class="material-symbols-outlined text-emerald-500 text-lg">pin</span>
                    </div>
                    <span class="text-[10px] text-outline font-mono">81.5% Match Rate</span>
                </div>

                <div class="bg-error-container text-on-error-container p-3.5 rounded-2xl border border-critical-red/40 shadow-sm flex flex-col gap-1">
                    <span class="text-[11px] font-mono text-critical-red font-bold uppercase">WATCHLIST MATCHES</span>
                    <div class="flex items-baseline justify-between">
                        <span class="text-2xl font-bold font-mono text-critical-red">02</span>
                        <span class="material-symbols-outlined text-critical-red text-lg">warning</span>
                    </div>
                    <span class="text-[10px] font-bold text-critical-red">🚨 HIGH PRIORITY ALERT</span>
                </div>

                <div class="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-1">
                    <span class="text-[11px] font-mono text-outline uppercase">PERSONS DETECTED</span>
                    <div class="flex items-baseline justify-between">
                        <span class="text-2xl font-bold font-mono text-primary">126</span>
                        <span class="material-symbols-outlined text-amber-500 text-lg">person</span>
                    </div>
                    <span class="text-[10px] text-outline font-mono">4 Sector Nodes</span>
                </div>

                <div class="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-1">
                    <span class="text-[11px] font-mono text-outline uppercase">AVG AI CONFIDENCE</span>
                    <div class="flex items-baseline justify-between">
                        <span class="text-2xl font-bold font-mono text-security-green">94.7%</span>
                        <span class="material-symbols-outlined text-security-green text-lg">verified</span>
                    </div>
                    <div class="w-full bg-surface-muted rounded-full h-1.5 mt-1 overflow-hidden">
                        <div class="bg-security-green h-full rounded-full" style="width: 94.7%;"></div>
                    </div>
                </div>

                <div class="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-1">
                    <span class="text-[11px] font-mono text-outline uppercase">CAMERA SOURCES</span>
                    <div class="flex items-baseline justify-between">
                        <span class="text-2xl font-bold font-mono text-primary">42</span>
                        <span class="material-symbols-outlined text-primary text-lg">videocam</span>
                    </div>
                    <span class="text-[10px] text-security-green font-bold">100% Operational</span>
                </div>
            </div>

            <!-- WATCHLIST MATCH SECURITY EVENT BANNER -->
            <div class="bg-error-container/80 backdrop-blur border-2 border-critical-red rounded-2xl p-4 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="flex items-start gap-3">
                    <div class="p-2.5 bg-critical-red text-white rounded-xl shadow-md shrink-0">
                        <span class="material-symbols-outlined text-2xl">error</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 bg-critical-red text-white font-mono text-[10px] font-bold rounded uppercase">WATCHLIST MATCH DETECTED</span>
                            <span class="font-mono text-xs text-critical-red font-bold">RJ 14 CD 5678</span>
                        </div>
                        <h3 class="font-bold text-base text-on-error-container mt-0.5">Heavy Cargo Truck Staging near Checkpost 02</h3>
                        <p class="text-xs text-on-error-container/80 font-mono mt-0.5">Camera: CAM-BOP-033 (Checkpost 02 Gate) • AI Confidence: 96.4% • Time: 12:18:02 AM</p>
                    </div>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto">
                    <a href="#/alerts/EV-8846" class="flex-1 md:flex-none px-3.5 py-2 bg-critical-red hover:bg-red-600 text-white font-bold text-xs rounded-xl uppercase tracking-wider text-center transition-all shadow">
                        INSPECT ALERT
                    </a>
                    <a href="#/border-cameras" class="flex-1 md:flex-none px-3 py-2 bg-white/20 hover:bg-white/30 text-on-error-container font-bold text-xs rounded-xl uppercase tracking-wider border border-critical-red/30 text-center transition-all">
                        VIEW CAMERA
                    </a>
                    <a href="#/border-map" class="flex-1 md:flex-none px-3 py-2 bg-white/20 hover:bg-white/30 text-on-error-container font-bold text-xs rounded-xl uppercase tracking-wider border border-critical-red/30 text-center transition-all">
                        VIEW ON MAP
                    </a>
                </div>
            </div>

            <!-- NAVIGATION ANALYTICS TABS -->
            <div class="flex border-b border-outline-variant gap-2 overflow-x-auto">
                <button class="analytics-tab-btn px-4 py-2.5 text-xs font-bold font-mono transition-all cursor-pointer border-b-2 ${activeTab === 'overview' ? 'border-primary text-primary bg-surface-container-lowest rounded-t-xl' : 'border-transparent text-on-surface-variant hover:text-primary'}" data-tab="overview">
                    📊 OVERVIEW
                </button>
                <button class="analytics-tab-btn px-4 py-2.5 text-xs font-bold font-mono transition-all cursor-pointer border-b-2 ${activeTab === 'anpr' ? 'border-primary text-primary bg-surface-container-lowest rounded-t-xl' : 'border-transparent text-on-surface-variant hover:text-primary'}" data-tab="anpr">
                    🚘 ANPR RECOGNITION (${ANPR_EXPANDED_RECORDS.length})
                </button>
                <button class="analytics-tab-btn px-4 py-2.5 text-xs font-bold font-mono transition-all cursor-pointer border-b-2 ${activeTab === 'person' ? 'border-primary text-primary bg-surface-container-lowest rounded-t-xl' : 'border-transparent text-on-surface-variant hover:text-primary'}" data-tab="person">
                    🚶 PERSON DETECTION (${PERSON_DETECTION_RECORDS.length})
                </button>
                <button class="analytics-tab-btn px-4 py-2.5 text-xs font-bold font-mono transition-all cursor-pointer border-b-2 ${activeTab === 'vehicle' ? 'border-primary text-primary bg-surface-container-lowest rounded-t-xl' : 'border-transparent text-on-surface-variant hover:text-primary'}" data-tab="vehicle">
                    🚛 VEHICLE CLASSIFICATION (${VEHICLE_DETECTION_RECORDS.length})
                </button>
                <button class="analytics-tab-btn px-4 py-2.5 text-xs font-bold font-mono transition-all cursor-pointer border-b-2 ${activeTab === 'face' ? 'border-primary text-primary bg-surface-container-lowest rounded-t-xl' : 'border-transparent text-on-surface-variant hover:text-primary'}" data-tab="face">
                    👤 FACE DETECTION (DEMO)
                </button>
            </div>

            <!-- DYNAMIC TAB CONTENT AREA -->
            <div class="flex-1 flex flex-col gap-6" id="analytics-tab-content">
                ${renderTabContent(filteredAnpr)}
            </div>

            <!-- DYNAMIC RIGHT-SIDE ANPR DETAIL DRAWER MODAL -->
            <div id="anpr-detail-drawer" class="${selectedRecord ? '' : 'hidden'} fixed inset-y-0 right-0 w-full sm:w-96 bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-50 flex flex-col">
                ${renderDrawerContent()}
            </div>
        </div>
    `;
}

function renderTabContent(filteredAnpr) {
    if (activeTab === 'overview') {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left 2 Cols: Charts & Distribution -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Chart 1: Detection Activity Over Time -->
                    <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm space-y-3">
                        <div class="flex justify-between items-center">
                            <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                                <span class="material-symbols-outlined text-sm">show_chart</span>
                                24-Hour AI Detection Activity Stream
                            </h3>
                            <span class="font-mono text-[11px] text-outline">Hourly Volume</span>
                        </div>
                        
                        <!-- CSS Bar Graph -->
                        <div class="h-40 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-outline-variant px-2 font-mono text-[10px]">
                            <div class="flex-1 bg-blue-100 dark:bg-blue-950 rounded-t hover:bg-blue-500 transition-all relative group flex flex-col justify-end items-center" style="height: 35%;">
                                <span class="mb-1 opacity-0 group-hover:opacity-100 font-bold">14</span>
                            </div>
                            <div class="flex-1 bg-blue-100 dark:bg-blue-950 rounded-t hover:bg-blue-500 transition-all relative group flex flex-col justify-end items-center" style="height: 25%;">
                                <span class="mb-1 opacity-0 group-hover:opacity-100 font-bold">10</span>
                            </div>
                            <div class="flex-1 bg-blue-100 dark:bg-blue-950 rounded-t hover:bg-blue-500 transition-all relative group flex flex-col justify-end items-center" style="height: 45%;">
                                <span class="mb-1 opacity-0 group-hover:opacity-100 font-bold">18</span>
                            </div>
                            <div class="flex-1 bg-blue-100 dark:bg-blue-950 rounded-t hover:bg-blue-500 transition-all relative group flex flex-col justify-end items-center" style="height: 70%;">
                                <span class="mb-1 opacity-0 group-hover:opacity-100 font-bold">28</span>
                            </div>
                            <div class="flex-1 bg-critical-red/80 rounded-t hover:bg-critical-red transition-all relative group flex flex-col justify-end items-center" style="height: 100%;">
                                <span class="mb-1 text-critical-red font-bold">42</span>
                            </div>
                            <div class="flex-1 bg-blue-100 dark:bg-blue-950 rounded-t hover:bg-blue-500 transition-all relative group flex flex-col justify-end items-center" style="height: 60%;">
                                <span class="mb-1 opacity-0 group-hover:opacity-100 font-bold">24</span>
                            </div>
                            <div class="flex-1 bg-blue-100 dark:bg-blue-950 rounded-t hover:bg-blue-500 transition-all relative group flex flex-col justify-end items-center" style="height: 40%;">
                                <span class="mb-1 opacity-0 group-hover:opacity-100 font-bold">16</span>
                            </div>
                        </div>
                        <div class="flex justify-between font-mono text-[10px] text-outline px-1">
                            <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00 (PEAK BREACH)</span><span>20:00</span><span>NOW</span>
                        </div>
                    </div>

                    <!-- Vehicle Classification & Camera Activity -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Vehicle Classification -->
                        <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm space-y-3">
                            <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                                <span class="material-symbols-outlined text-sm">pie_chart</span>
                                Vehicle Classification Breakdown
                            </h3>
                            <div class="space-y-2 font-mono text-xs">
                                <div>
                                    <div class="flex justify-between mb-1"><span>Car / Sedan (45%)</span><span class="font-bold">17</span></div>
                                    <div class="w-full bg-surface-bright rounded-full h-2 overflow-hidden"><div class="bg-blue-500 h-full rounded-full" style="width: 45%;"></div></div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1"><span>SUV (30%)</span><span class="font-bold">11</span></div>
                                    <div class="w-full bg-surface-bright rounded-full h-2 overflow-hidden"><div class="bg-emerald-500 h-full rounded-full" style="width: 30%;"></div></div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1"><span>Heavy Cargo Truck (15%)</span><span class="font-bold">6</span></div>
                                    <div class="w-full bg-surface-bright rounded-full h-2 overflow-hidden"><div class="bg-amber-500 h-full rounded-full" style="width: 15%;"></div></div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1"><span>Bus / Transport (10%)</span><span class="font-bold">4</span></div>
                                    <div class="w-full bg-surface-bright rounded-full h-2 overflow-hidden"><div class="bg-purple-500 h-full rounded-full" style="width: 10%;"></div></div>
                                </div>
                            </div>
                        </div>

                        <!-- Top Active Camera Nodes -->
                        <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm space-y-3">
                            <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                                <span class="material-symbols-outlined text-sm">videocam</span>
                                Active Camera Node Detection Volume
                            </h3>
                            <div class="space-y-2 font-mono text-xs">
                                <div class="flex justify-between items-center p-2 bg-surface-bright rounded-lg">
                                    <span>CAM-014-NORTH</span><span class="font-bold text-critical-red">14 Detections</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-surface-bright rounded-lg">
                                    <span>CAM-BOP-033</span><span class="font-bold text-primary">12 Detections</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-surface-bright rounded-lg">
                                    <span>CAM-008-NORTH</span><span class="font-bold text-primary">8 Detections</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-surface-bright rounded-lg">
                                    <span>CAM-022-GATE</span><span class="font-bold text-primary">4 Detections</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Col: AI Event Activity Feed Stream -->
                <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-3">
                    <div class="flex items-center justify-between border-b border-outline-variant pb-2">
                        <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-security-green animate-ping"></span>
                            AI Event Activity Timeline
                        </h3>
                        <span class="font-mono text-[10px] text-outline">REALTIME STREAM</span>
                    </div>

                    <div class="space-y-3 font-mono text-xs overflow-y-auto max-h-[420px] pr-1">
                        <div class="p-2.5 bg-surface-bright border border-outline-variant rounded-xl space-y-1 hover:border-primary transition-all">
                            <div class="flex justify-between text-[10px] text-outline">
                                <span>12:42:18 AM</span>
                                <span class="text-warning-amber font-bold">PERSON DETECTED</span>
                            </div>
                            <p class="text-primary font-bold">CAM-014-NORTH • Target P-001 (96.8%)</p>
                        </div>

                        <div class="p-2.5 bg-error-container text-on-error-container border border-critical-red/40 rounded-xl space-y-1">
                            <div class="flex justify-between text-[10px]">
                                <span>12:18:02 AM</span>
                                <span class="text-critical-red font-bold">WATCHLIST MATCH</span>
                            </div>
                            <p class="font-bold">RJ 14 CD 5678 • Heavy Cargo Truck</p>
                            <p class="text-[10px] opacity-90">CAM-BOP-033 Checkpost 02</p>
                        </div>

                        <div class="p-2.5 bg-surface-bright border border-outline-variant rounded-xl space-y-1 hover:border-primary transition-all">
                            <div class="flex justify-between text-[10px] text-outline">
                                <span>12:20:15 AM</span>
                                <span class="text-security-green font-bold">ANPR DETECTED</span>
                            </div>
                            <p class="text-primary font-bold">MH 15 AB 1234 • White SUV (98.9%)</p>
                        </div>

                        <div class="p-2.5 bg-surface-bright border border-outline-variant rounded-xl space-y-1 hover:border-primary transition-all">
                            <div class="flex justify-between text-[10px] text-outline">
                                <span>12:10:44 AM</span>
                                <span class="text-primary font-bold">VEHICLE UNKNOWN</span>
                            </div>
                            <p class="text-primary font-bold">WB 02 XY 9087 • Dark Sedan (91.2%)</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if (activeTab === 'anpr') {
        return `
            <!-- ANPR SEARCH & MULTI-FILTERS BAR -->
            <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
                <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <input type="text" id="input-anpr-search" value="${searchQuery}" placeholder="Search Plate Number or Vehicle..." class="px-3.5 py-2 bg-surface-bright border border-outline-variant rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary w-full sm:w-64"/>
                    
                    <select id="select-filter-camera" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-xl text-xs font-bold text-primary">
                        <option value="ALL">All Camera Nodes</option>
                        <option value="CAM-BOP-033">CAM-BOP-033 (Checkpost 02)</option>
                        <option value="CAM-BOP-014">CAM-BOP-014 (Sector 04)</option>
                        <option value="CAM-022-GATE">CAM-022-GATE</option>
                        <option value="CAM-008-NORTH">CAM-008-NORTH</option>
                    </select>

                    <select id="select-filter-status" class="px-3 py-2 bg-surface-bright border border-outline-variant rounded-xl text-xs font-bold text-primary">
                        <option value="ALL">All Statuses</option>
                        <option value="REGISTERED">REGISTERED</option>
                        <option value="WATCHLIST">WATCHLIST</option>
                        <option value="UNKNOWN">UNKNOWN</option>
                        <option value="FLAGGED">FLAGGED</option>
                    </select>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto justify-end">
                    <button id="btn-clear-filters" class="px-3 py-2 bg-surface-bright hover:bg-surface-container border border-outline-variant text-on-surface font-bold text-xs rounded-xl cursor-pointer">
                        CLEAR FILTERS
                    </button>
                </div>
            </div>

            <!-- ANPR RECORDS TABLE -->
            <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-sans">
                        <thead class="bg-surface-bright text-on-surface font-bold font-mono border-b border-outline-variant">
                            <tr>
                                <th class="px-4 py-3">LICENSE PLATE</th>
                                <th class="px-4 py-3">VEHICLE CLASSIFICATION</th>
                                <th class="px-4 py-3">CAMERA / LOCATION</th>
                                <th class="px-4 py-3">TIMESTAMP</th>
                                <th class="px-4 py-3">AI CONFIDENCE</th>
                                <th class="px-4 py-3">REGISTRATION STATUS</th>
                                <th class="px-4 py-3 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant/60">
                            ${filteredAnpr.map(rec => {
                                const isWatch = rec.status === 'WATCHLIST';
                                const isFlag = rec.status === 'FLAGGED';
                                const statusClass = isWatch ? 'bg-error-container text-critical-red border-critical-red/40' : isFlag ? 'bg-amber-100 text-amber-800' : rec.status === 'UNKNOWN' ? 'bg-gray-100 text-gray-800' : 'bg-emerald-100 text-emerald-800';
                                const bars = Math.round(rec.confidence / 10);
                                
                                return `
                                    <tr class="hover:bg-surface-bright transition-colors cursor-pointer anpr-row-item" data-plate="${rec.plate}">
                                        <td class="px-4 py-3 font-mono font-bold text-primary flex items-center gap-2">
                                            <span>${rec.plate}</span>
                                            ${isWatch ? '<span class="material-symbols-outlined text-critical-red text-sm" title="Watchlist Match">warning</span>' : ''}
                                        </td>
                                        <td class="px-4 py-3 font-medium">${rec.vehicle}</td>
                                        <td class="px-4 py-3 font-mono text-[11px]">${rec.location} (${rec.camera})</td>
                                        <td class="px-4 py-3 font-mono text-[11px]">${rec.time}</td>
                                        <td class="px-4 py-3 font-mono">
                                            <div class="flex items-center gap-2">
                                                <span class="font-bold text-security-green">${rec.confidence}%</span>
                                                <span class="text-[9px] text-security-green font-bold">${'█'.repeat(bars)}</span>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3">
                                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${statusClass}">${rec.status}</span>
                                        </td>
                                        <td class="px-4 py-3 text-right">
                                            <button class="px-2.5 py-1 bg-surface-bright hover:bg-surface-container border border-outline-variant rounded-lg text-primary font-bold text-[11px] cursor-pointer">
                                                DETAILS →
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (activeTab === 'person') {
        return `
            <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                <div class="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                    <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                        <span class="material-symbols-outlined text-amber-500">person</span>
                        AI Person Detection & Target Tracking Index
                    </h3>
                    <span class="font-mono text-xs text-outline">${PERSON_DETECTION_RECORDS.length} Active Targets</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-sans">
                        <thead class="bg-surface-bright text-on-surface font-bold font-mono border-b border-outline-variant">
                            <tr>
                                <th class="px-4 py-3">TRACK ID</th>
                                <th class="px-4 py-3">CAMERA / LOCATION</th>
                                <th class="px-4 py-3">SECTOR</th>
                                <th class="px-4 py-3">TIMESTAMP</th>
                                <th class="px-4 py-3">AI CONFIDENCE</th>
                                <th class="px-4 py-3">TARGET STATUS</th>
                                <th class="px-4 py-3 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant/60 font-mono">
                            ${PERSON_DETECTION_RECORDS.map(p => `
                                <tr class="hover:bg-surface-bright transition-colors">
                                    <td class="px-4 py-3 font-bold text-primary">${p.trackId}</td>
                                    <td class="px-4 py-3">${p.camera} (${p.location})</td>
                                    <td class="px-4 py-3">${p.sector}</td>
                                    <td class="px-4 py-3 text-outline">${p.time}</td>
                                    <td class="px-4 py-3 font-bold text-security-green">${p.confidence}%</td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${p.status.includes('CRITICAL') ? 'bg-error-container text-critical-red' : 'bg-amber-100 text-amber-800'}">${p.status}</span>
                                    </td>
                                    <td class="px-4 py-3 text-right space-x-1">
                                        <a href="#/border-cameras" class="px-2 py-1 bg-surface-bright border border-outline-variant rounded text-[10px] font-bold text-primary hover:bg-surface-container">VIEW CAMERA</a>
                                        <a href="#/border-map" class="px-2 py-1 bg-surface-bright border border-outline-variant rounded text-[10px] font-bold text-primary hover:bg-surface-container">ON MAP</a>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (activeTab === 'vehicle') {
        return `
            <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                <div class="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                    <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                        <span class="material-symbols-outlined text-blue-500">directions_car</span>
                        Vehicle Classification & Movement Analytics
                    </h3>
                    <span class="font-mono text-xs text-outline">${VEHICLE_DETECTION_RECORDS.length} Active Targets</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-sans">
                        <thead class="bg-surface-bright text-on-surface font-bold font-mono border-b border-outline-variant">
                            <tr>
                                <th class="px-4 py-3">TRACK ID</th>
                                <th class="px-4 py-3">VEHICLE CLASS</th>
                                <th class="px-4 py-3">LICENSE PLATE</th>
                                <th class="px-4 py-3">CAMERA</th>
                                <th class="px-4 py-3">DIRECTION</th>
                                <th class="px-4 py-3">AI CONFIDENCE</th>
                                <th class="px-4 py-3 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant/60 font-mono">
                            ${VEHICLE_DETECTION_RECORDS.map(v => `
                                <tr class="hover:bg-surface-bright transition-colors">
                                    <td class="px-4 py-3 font-bold text-primary">${v.trackId}</td>
                                    <td class="px-4 py-3 font-bold font-sans">${v.type}</td>
                                    <td class="px-4 py-3 font-bold text-blue-600">${v.plate}</td>
                                    <td class="px-4 py-3">${v.camera} (${v.sector})</td>
                                    <td class="px-4 py-3">${v.direction}</td>
                                    <td class="px-4 py-3 font-bold text-security-green">${v.confidence}%</td>
                                    <td class="px-4 py-3 text-right">
                                        <a href="#/border-cameras" class="px-2.5 py-1 bg-surface-bright border border-outline-variant rounded text-[10px] font-bold text-primary hover:bg-surface-container">VIEW CAMERA</a>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (activeTab === 'face') {
        return `
            <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 space-y-4 text-center">
                <div class="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-full mb-2">
                    <span class="material-symbols-outlined text-3xl">face_5</span>
                </div>
                <h3 class="font-bold text-lg text-primary">Facial Analytics & Feature Matching Module</h3>
                <p class="text-xs text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                    Facial bounding box analytics ready for deployment. This prototype evaluates detection confidence and visual metadata while respecting privacy policies.
                </p>
                <div class="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-mono text-xs font-bold">
                    ⚡ DEMO / ANALYTICS READY (Feature Prototype)
                </div>

                <div class="pt-4 max-w-2xl mx-auto">
                    <table class="w-full text-left text-xs font-mono border border-outline-variant rounded-xl overflow-hidden">
                        <thead class="bg-surface-bright border-b border-outline-variant">
                            <tr>
                                <th class="p-3">DETECTION ID</th>
                                <th class="p-3">CAMERA</th>
                                <th class="p-3">CONFIDENCE</th>
                                <th class="p-3">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${FACE_DETECTION_RECORDS.map(f => `
                                <tr class="border-b border-outline-variant/60">
                                    <td class="p-3 font-bold">${f.id}</td>
                                    <td class="p-3">${f.camera}</td>
                                    <td class="p-3 font-bold text-security-green">${f.confidence}%</td>
                                    <td class="p-3"><span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">${f.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

function renderDrawerContent() {
    if (!selectedRecord) return '';

    const rec = selectedRecord;
    const isWatch = rec.status === 'WATCHLIST';

    return `
        <!-- Drawer Header -->
        <div class="p-4 border-b border-outline-variant flex justify-between items-center ${isWatch ? 'bg-error-container text-on-error-container' : 'bg-surface-bright'}">
            <div>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-base font-mono">${rec.plate}</span>
                    <span class="px-2 py-0.5 bg-primary text-white font-mono text-[10px] rounded">${rec.status}</span>
                </div>
                <p class="text-xs opacity-90">${rec.vehicle}</p>
            </div>
            <button id="btn-close-drawer" class="p-1 hover:bg-surface-muted rounded-full cursor-pointer">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>
        </div>

        <!-- Drawer Content -->
        <div class="p-4 space-y-4 font-mono text-xs overflow-y-auto flex-1 bg-surface-container-lowest">
            <div class="space-y-2 border-b border-outline-variant pb-3">
                <div class="flex justify-between"><span class="text-outline">LOCATION:</span><span class="font-bold text-primary">${rec.location}</span></div>
                <div class="flex justify-between"><span class="text-outline">CAMERA ID:</span><span class="font-bold text-primary">${rec.camera}</span></div>
                <div class="flex justify-between"><span class="text-outline">SECTOR:</span><span class="font-bold text-primary">${rec.sector}</span></div>
                <div class="flex justify-between"><span class="text-outline">TIMESTAMP:</span><span class="font-bold text-primary">${rec.time}</span></div>
                <div class="flex justify-between"><span class="text-outline">AI CONFIDENCE:</span><span class="font-bold text-security-green">${rec.confidence}%</span></div>
            </div>

            <div class="space-y-2 border-b border-outline-variant pb-3">
                <div class="flex justify-between"><span class="text-outline">FIRST SEEN:</span><span class="font-bold text-primary">${rec.firstSeen}</span></div>
                <div class="flex justify-between"><span class="text-outline">LAST SEEN:</span><span class="font-bold text-primary">${rec.lastSeen}</span></div>
                <div class="flex justify-between"><span class="text-outline">OBSERVATIONS:</span><span class="font-bold text-primary">${rec.obsCount} PASSES</span></div>
                <div class="flex justify-between"><span class="text-outline">WATCHLIST:</span><span class="font-bold ${isWatch ? 'text-critical-red' : 'text-security-green'}">${rec.watchlist}</span></div>
            </div>

            ${isWatch ? `
                <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-critical-red space-y-1">
                    <div class="flex items-center gap-1 font-bold">
                        <span class="material-symbols-outlined text-sm">warning</span>
                        <span>SECURITY ALERT EV-8846</span>
                    </div>
                    <p class="text-[11px] font-sans">Vehicle flagged for suspicious staging along border checkpoint.</p>
                </div>
            ` : ''}
        </div>

        <!-- Drawer Actions -->
        <div class="p-4 border-t border-outline-variant bg-surface-bright flex flex-col gap-2">
            <a href="#/border-cameras" class="w-full py-2.5 bg-primary hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow transition-all">
                VIEW CAMERA
            </a>
            <div class="flex items-center gap-2">
                <a href="#/border-map" class="flex-1 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[11px] uppercase tracking-wider rounded-xl border border-outline-variant text-center transition-all">
                    VIEW ON MAP
                </a>
                <a href="#/video-analysis" class="flex-1 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[11px] uppercase tracking-wider rounded-xl border border-outline-variant text-center transition-all">
                    VIEW FOOTAGE
                </a>
            </div>
            <button id="btn-add-watchlist" class="w-full py-2 bg-surface-bright hover:bg-surface-container border border-outline-variant text-on-surface font-bold text-[11px] uppercase tracking-wider rounded-xl cursor-pointer">
                + ADD TO WATCHLIST
            </button>
        </div>
    `;
}

export function attachAnalyticsInteractions() {
    // 1. Tab Switching
    document.querySelectorAll('.analytics-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeTab = e.currentTarget.getAttribute('data-tab');
            selectedRecord = null;
            refreshView();
        });
    });

    // 2. ANPR Search & Filters
    const searchInput = document.getElementById('input-anpr-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            refreshView();
        });
    }

    const cameraSelect = document.getElementById('select-filter-camera');
    if (cameraSelect) {
        cameraSelect.addEventListener('change', (e) => {
            filterCamera = e.target.value;
            refreshView();
        });
    }

    const statusSelect = document.getElementById('select-filter-status');
    if (statusSelect) {
        statusSelect.addEventListener('change', (e) => {
            filterStatus = e.target.value;
            refreshView();
        });
    }

    const btnClear = document.getElementById('btn-clear-filters');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            searchQuery = '';
            filterCamera = 'ALL';
            filterStatus = 'ALL';
            refreshView();
        });
    }

    // 3. ANPR Row Click -> Open Drawer
    document.querySelectorAll('.anpr-row-item').forEach(row => {
        row.addEventListener('click', (e) => {
            const plate = row.getAttribute('data-plate');
            selectedRecord = ANPR_EXPANDED_RECORDS.find(r => r.plate === plate) || null;
            refreshView();
        });
    });

    // 4. Close Drawer Button
    document.getElementById('btn-close-drawer')?.addEventListener('click', () => {
        selectedRecord = null;
        refreshView();
    });

    // 5. Add to Watchlist Button
    document.getElementById('btn-add-watchlist')?.addEventListener('click', () => {
        if (selectedRecord) {
            alert(`Vehicle ${selectedRecord.plate} added to active Security Watchlist.`);
        }
    });
}

function refreshView() {
    const app = document.getElementById('main-content-area');
    if (app) {
        app.innerHTML = renderAnalyticsView();
        attachAnalyticsInteractions();
    }
}
