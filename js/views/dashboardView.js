/**
 * Border Security Overview (Dashboard) View Controller
 * 100% Faithful Reproduction of Stitch Project ID: 12963321699944751718 (Screen: a43b9fdafd374701a4c3e1a299a980f1)
 */

export function renderDashboardView() {
    const cam1Img = "https://lh3.googleusercontent.com/aida-public/AB6AXuBK5yfqotHulT4B0ogxyF6YiGCtB5UkiMU4v3uYmaHJGYY8-Bgc5gagNeNHpvUtcLKk2aOKyA0RURDpOFqaICkZoY-oZUkF8sgdTqxtrtNshV3wrFdl6wwMgqEvt85jxSbctU6J_Mf-I0fM0ir-hZtp9SwLYyLklqLu1tVCPbZvK2OXBDs5FIvHdkX5iDjIelcDzobxt1D6CJwRA9BMTgLb0r95tu_L_S09BnIyWuknvUCipQtlePn_Vw";
    const cam2Img = "https://lh3.googleusercontent.com/aida-public/AB6AXuC8VV1YT_u3sMn2bGmAfVApY9ipRBr1zA4apNaaMery98YEDwj0I6dO94v1Sz6C_LTbv1ViJELRKsXL2lD7nfYAJr44bK5oh06LmeHv-B13UDMi_iS7zSFGv8nubKVxOCvInY8UZhmlLHyRA8UfVaPGxOjSxQNO2DPduby5j_WksT_ClFBkUUCjSGsqKLA5ozBljZa8AU3zr6AF1tXZHusBIHVtqvbVlns0A-OgwTvMYp2TIVx6Hg3HMQ";
    const cam3Img = "https://lh3.googleusercontent.com/aida-public/AB6AXuCtIK9Cvq5fQguMxcKsJEWPuQ4OQtIKb4rRuFLMJqmSGe4HX3n31mLGvDARkSYEp1neOf42w2Zgh7QKOt8Zmqr-Z2a8LmdEDjsy16mZlLH_vD83jRlwxXfo0f7LSOChBe9EfXinyTO7VbaWo3828QS8TyuHDr-z75pVOyHBuVTFTpowuv4Kp0xLSWfsTmKM2mpPPz6n1El47EvC_QFlFFl9nnPvz5j1yXkKiVMEuFSi9aJqze1WQ6DtQg";
    const cam4Img = "https://lh3.googleusercontent.com/aida-public/AB6AXuBpJsW5bQPodaeLfbiQDADx1LZYDIjMyhKvqhnCNgaJZ3UmhdDn0lh88YwT1cmZCuzJqIkS1y_KDZqP4YNH55Wjw4yMtHXEzq2yg2PQH4W82vysTrSIksHBEHjhhzVBNLIqH1tyklUmEyZkw7Z_JDjtWXL6NGiWp5sL380nFrFiRxdronC5KAAygd8QHySEXbRqnlMQ3BPZjdDsh4TwRFWwpZLCaYn3Udv5aQMEqJZnqvt3sUa7lJVa3w";

    return `
        <div class="p-6 bento-grid bg-surface-muted min-h-full">
            <!-- Page Header -->
            <div class="col-span-12 flex justify-between items-end mb-2">
                <div>
                    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-1 font-bold">Border Security Overview</h1>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">Real-time situational awareness and threat detection for Northern Sector.</p>
                </div>
                <div class="flex gap-2">
                    <button class="bg-surface-container-lowest border border-outline-variant text-on-surface font-label-caps text-label-caps px-4 py-2 rounded-DEFAULT hover:bg-surface-container transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-[16px]">download</span> Export Data
                    </button>
                    <button id="btn-force-sync" class="bg-primary text-white font-label-caps text-label-caps px-4 py-2 rounded-DEFAULT hover:opacity-90 transition-opacity flex items-center gap-2">
                        <span class="material-symbols-outlined text-[16px]">sync</span> Force Sync
                    </button>
                </div>
            </div>

            <!-- KPI Row (Spans full width) -->
            <div class="col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <!-- KPI 1 -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-4 flex flex-col justify-between h-24 shadow-sm">
                    <div class="flex justify-between items-start">
                        <span class="font-label-caps text-label-caps text-on-surface-variant">Total Cameras</span>
                        <span class="material-symbols-outlined text-outline text-[18px]">linked_camera</span>
                    </div>
                    <div class="font-display-kpi text-display-kpi text-on-surface leading-none mt-2 font-bold">48</div>
                </div>

                <!-- KPI 2 -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-4 flex flex-col justify-between h-24 shadow-sm border-l-4 border-l-security-green">
                    <div class="flex justify-between items-start">
                        <span class="font-label-caps text-label-caps text-on-surface-variant">Online</span>
                        <span class="material-symbols-outlined text-security-green text-[18px]">check_circle</span>
                    </div>
                    <div class="flex items-baseline gap-2 mt-2">
                        <div class="font-display-kpi text-display-kpi text-on-surface leading-none font-bold">42</div>
                        <div class="font-metadata-mono text-metadata-mono text-security-green bg-security-green/10 px-1 rounded-sm">87.5%</div>
                    </div>
                </div>

                <!-- KPI 3 -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-4 flex flex-col justify-between h-24 shadow-sm border-l-4 border-l-warning-amber">
                    <div class="flex justify-between items-start">
                        <span class="font-label-caps text-label-caps text-on-surface-variant">Active Alerts</span>
                        <span class="material-symbols-outlined text-warning-amber text-[18px]">warning</span>
                    </div>
                    <div class="font-display-kpi text-display-kpi text-on-surface leading-none mt-2 font-bold">03</div>
                </div>

                <!-- KPI 4 -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-4 flex flex-col justify-between h-24 shadow-sm bg-error-container/20 border-l-4 border-l-critical-red">
                    <div class="flex justify-between items-start">
                        <span class="font-label-caps text-label-caps text-critical-red font-bold">Critical Threats</span>
                        <span class="material-symbols-outlined text-critical-red text-[18px] animate-pulse">error</span>
                    </div>
                    <div class="font-display-kpi text-display-kpi text-critical-red leading-none mt-2 font-bold">01</div>
                </div>

                <!-- KPI 5 -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-4 flex flex-col justify-between h-24 shadow-sm">
                    <div class="flex justify-between items-start">
                        <span class="font-label-caps text-label-caps text-on-surface-variant">Persons Detected</span>
                        <span class="material-symbols-outlined text-outline text-[18px]">directions_walk</span>
                    </div>
                    <div class="font-display-kpi text-display-kpi text-on-surface leading-none mt-2 font-bold">126</div>
                </div>

                <!-- KPI 6 -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-4 flex flex-col justify-between h-24 shadow-sm">
                    <div class="flex justify-between items-start">
                        <span class="font-label-caps text-label-caps text-on-surface-variant">Vehicles Detected</span>
                        <span class="material-symbols-outlined text-outline text-[18px]">directions_car</span>
                    </div>
                    <div class="font-display-kpi text-display-kpi text-on-surface leading-none mt-2 font-bold">38</div>
                </div>
            </div>

            <!-- Main Content Area: Video Grid (Left) & Alert Panel (Right) -->
            <div class="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
                <!-- Section Header -->
                <div class="flex justify-between items-center bg-surface-container-lowest border border-outline-variant p-3 rounded-DEFAULT shadow-sm">
                    <h2 class="font-label-caps text-label-caps text-on-surface flex items-center gap-2 font-bold">
                        <span class="material-symbols-outlined text-[18px]">grid_view</span>
                        Live Surveillance Matrix
                    </h2>
                    <div class="flex gap-1">
                        <button class="p-1 bg-surface-container border border-outline-variant rounded-sm text-primary hover:bg-surface-variant"><span class="material-symbols-outlined text-[16px]">grid_4x4</span></button>
                        <button class="p-1 bg-surface-container-lowest border border-outline-variant rounded-sm text-on-surface-variant hover:bg-surface-variant"><span class="material-symbols-outlined text-[16px]">grid_3x3</span></button>
                        <button class="p-1 bg-surface-container-lowest border border-outline-variant rounded-sm text-on-surface-variant hover:bg-surface-variant"><span class="material-symbols-outlined text-[16px]">crop_square</span></button>
                    </div>
                </div>

                <!-- Video Grid Matrix -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
                    <!-- Cam 1 (Critical) -->
                    <div class="relative bg-inverse-surface border-2 border-critical-red rounded-DEFAULT overflow-hidden group shadow-md flex flex-col">
                        <div class="absolute top-2 left-2 z-10 flex gap-2">
                            <span class="bg-black/70 text-white font-metadata-mono text-metadata-mono px-2 py-1 rounded-sm border border-outline-variant">CAM-014-NORTH</span>
                            <span class="bg-critical-red text-white font-metadata-mono text-[10px] px-2 py-1 rounded-sm font-bold animate-pulse flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE - BREACH</span>
                        </div>
                        <div class="relative flex-1 bg-black overflow-hidden">
                            <img class="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="CCTV Feed Cam 1" src="${cam1Img}"/>
                            <!-- AI Bounding Box Overlay -->
                            <div class="cctv-overlay-box" style="top: 40%; left: 35%; width: 15%; height: 45%;">
                                <div class="cctv-overlay-label flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[10px]">person</span> INTRUDER 98%
                                </div>
                                <svg class="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" style="transform: translate(-50%, -50%);">
                                    <path class="opacity-70" d="M-50,150 L20,80 L50,0" fill="none" stroke="#EF4444" stroke-dasharray="4 4" stroke-width="2"></path>
                                </svg>
                            </div>
                        </div>
                        <!-- Telemetry Bar -->
                        <div class="bg-black border-t border-outline-variant/30 p-2 flex justify-between items-center text-white/70 font-metadata-mono text-[10px]">
                            <div class="flex gap-4">
                                <span>PTZ: 145.2° / -12.4°</span>
                                <span>Z: 4.2x</span>
                            </div>
                            <div class="flex gap-4">
                                <span>28.6139° N, 70.2193° E (Sector 04)</span>
                                <span class="text-white">2023-10-27 23:41:02</span>
                            </div>
                        </div>
                    </div>

                    <!-- Cam 2 (Warning) -->
                    <div class="relative bg-inverse-surface border border-outline-variant rounded-DEFAULT overflow-hidden group shadow-sm flex flex-col">
                        <div class="absolute top-2 left-2 z-10 flex gap-2">
                            <span class="bg-black/70 text-white font-metadata-mono text-metadata-mono px-2 py-1 rounded-sm border border-outline-variant">CAM-015-PERIMETER</span>
                            <span class="bg-warning-amber text-black font-metadata-mono text-[10px] px-2 py-1 rounded-sm font-bold flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-black"></span> LIVE</span>
                        </div>
                        <div class="relative flex-1 bg-black overflow-hidden">
                            <img class="w-full h-full object-cover opacity-70" alt="CCTV Feed Cam 2" src="${cam2Img}"/>
                            <div class="cctv-overlay-box cctv-overlay-box-person" style="top: 55%; left: 60%; width: 25%; height: 20%;">
                                <div class="cctv-overlay-label cctv-overlay-label-person text-black flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[10px]">directions_car</span> VEHICLE_UNKN 82%
                                </div>
                            </div>
                        </div>
                        <div class="bg-black border-t border-outline-variant/30 p-2 flex justify-between items-center text-white/70 font-metadata-mono text-[10px]">
                            <div class="flex gap-4">
                                <span>PTZ: AUTO PATROL</span>
                                <span>Z: 1.0x</span>
                            </div>
                            <div class="flex gap-4">
                                <span>28.6145° N, 70.2210° E (BOP-014)</span>
                                <span class="text-white">2023-10-27 23:41:02</span>
                            </div>
                        </div>
                    </div>

                    <!-- Cam 3 (Normal) -->
                    <div class="relative bg-inverse-surface border border-outline-variant rounded-DEFAULT overflow-hidden group shadow-sm flex flex-col">
                        <div class="absolute top-2 left-2 z-10 flex gap-2">
                            <span class="bg-black/70 text-white font-metadata-mono text-metadata-mono px-2 py-1 rounded-sm border border-outline-variant">CAM-022-GATE</span>
                            <span class="bg-white/20 text-white font-metadata-mono text-[10px] px-2 py-1 rounded-sm backdrop-blur-sm border border-white/10 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-security-green"></span> LIVE</span>
                        </div>
                        <div class="relative flex-1 bg-black overflow-hidden">
                            <img class="w-full h-full object-cover opacity-60" alt="CCTV Feed Cam 3" src="${cam3Img}"/>
                        </div>
                        <div class="bg-black border-t border-outline-variant/30 p-2 flex justify-between items-center text-white/70 font-metadata-mono text-[10px]">
                            <div class="flex gap-4">
                                <span>PTZ: LOCKED</span>
                                <span>Z: 2.5x</span>
                            </div>
                            <div class="flex gap-4">
                                <span>28.6100° N, 70.2100° E (Main Checkpoint)</span>
                                <span class="text-white">2023-10-27 23:41:02</span>
                            </div>
                        </div>
                    </div>

                    <!-- Cam 4 (Thermal) -->
                    <div class="relative bg-inverse-surface border border-outline-variant rounded-DEFAULT overflow-hidden group shadow-sm flex flex-col">
                        <div class="absolute top-2 left-2 z-10 flex gap-2">
                            <span class="bg-black/70 text-white font-metadata-mono text-metadata-mono px-2 py-1 rounded-sm border border-outline-variant">THERM-004-RIDGE</span>
                            <span class="bg-white/20 text-white font-metadata-mono text-[10px] px-2 py-1 rounded-sm backdrop-blur-sm border border-white/10 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-security-green"></span> LIVE</span>
                        </div>
                        <div class="relative flex-1 bg-black overflow-hidden">
                            <img class="w-full h-full object-cover opacity-90 saturate-50" alt="Thermal Feed Cam 4" src="${cam4Img}"/>
                        </div>
                        <div class="bg-black border-t border-outline-variant/30 p-2 flex justify-between items-center text-white/70 font-metadata-mono text-[10px]">
                            <div class="flex gap-4">
                                <span>PTZ: SWEEPING</span>
                                <span>Z: 1.0x</span>
                            </div>
                            <div class="flex gap-4">
                                <span>28.6250° N, 70.2300° E (East Ridge)</span>
                                <span class="text-white">2023-10-27 23:41:02</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Real-Time Alert Action Queue Panel (Right Side) -->
            <div class="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
                <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT flex flex-col h-[650px] shadow-sm">
                    <!-- Header -->
                    <div class="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright rounded-t-DEFAULT">
                        <h2 class="font-label-caps text-label-caps text-on-surface flex items-center gap-2 font-bold">
                            <span class="material-symbols-outlined text-[18px]">local_police</span>
                            Action Queue
                        </h2>
                        <span class="bg-surface-container border border-outline-variant text-on-surface-variant text-[10px] px-2 py-1 rounded-full font-bold">4 PENDING</span>
                    </div>

                    <!-- Alerts List -->
                    <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
                        <!-- Critical Alert Card -->
                        <div class="bg-error-container/10 border border-critical-red rounded-DEFAULT p-3 relative overflow-hidden group cursor-pointer hover:bg-error-container/20 transition-colors">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-critical-red"></div>
                            <div class="flex justify-between items-start mb-2 pl-2">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-critical-red text-[16px] animate-pulse">security</span>
                                    <span class="font-label-caps text-[10px] text-critical-red bg-critical-red/10 px-1.5 py-0.5 rounded-sm font-bold">CRITICAL</span>
                                </div>
                                <span class="font-metadata-mono text-[10px] text-on-surface-variant">00:00:14 ago</span>
                            </div>
                            <div class="pl-2">
                                <h3 class="font-body-sm font-bold text-on-surface leading-tight mb-1">Virtual Fence Intrusion</h3>
                                <div class="font-metadata-mono text-[11px] text-on-surface-variant flex flex-col gap-0.5 mb-3">
                                    <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">location_on</span> Sector 04, Zone B</div>
                                    <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">videocam</span> Source: CAM-014-NORTH</div>
                                </div>
                                <div class="flex gap-2">
                                    <a href="#/alerts/EV-8847" class="flex-1 bg-critical-red text-white text-center font-label-caps text-[10px] py-1.5 rounded-sm hover:bg-red-600 transition-colors font-bold">DISPATCH QRT</a>
                                    <button class="flex-1 bg-surface-container border border-outline-variant text-on-surface font-label-caps text-[10px] py-1.5 rounded-sm hover:bg-surface-variant transition-colors font-bold">ACKNOWLEDGE</button>
                                </div>
                            </div>
                        </div>

                        <!-- High Alert Card -->
                        <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-3 relative group cursor-pointer hover:bg-surface-container transition-colors">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-warning-amber"></div>
                            <div class="flex justify-between items-start mb-2 pl-2">
                                <div class="flex items-center gap-2">
                                    <span class="font-label-caps text-[10px] text-warning-amber bg-warning-amber/10 border border-warning-amber/20 px-1.5 py-0.5 rounded-sm font-bold">HIGH</span>
                                </div>
                                <span class="font-metadata-mono text-[10px] text-on-surface-variant">00:12:45 ago</span>
                            </div>
                            <div class="pl-2">
                                <h3 class="font-body-sm font-bold text-on-surface leading-tight mb-1">Unidentified Vehicle Approach</h3>
                                <div class="font-metadata-mono text-[11px] text-on-surface-variant flex flex-col gap-0.5 mb-2">
                                    <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">location_on</span> Near BOP-014 Perimeter</div>
                                </div>
                            </div>
                        </div>

                        <!-- Medium Alert Card 1 -->
                        <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-3 relative group cursor-pointer hover:bg-surface-container transition-colors">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                            <div class="flex justify-between items-start mb-2 pl-2">
                                <div class="flex items-center gap-2">
                                    <span class="font-label-caps text-[10px] text-secondary bg-secondary/10 border border-secondary/20 px-1.5 py-0.5 rounded-sm font-bold">MEDIUM</span>
                                </div>
                                <span class="font-metadata-mono text-[10px] text-on-surface-variant">01:45:10 ago</span>
                            </div>
                            <div class="pl-2">
                                <h3 class="font-body-sm font-bold text-on-surface leading-tight mb-1">Seismic Sensor Trigger</h3>
                                <div class="font-metadata-mono text-[11px] text-on-surface-variant flex flex-col gap-0.5 mb-2">
                                    <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">sensors</span> Node 84, East Valley</div>
                                    <span class="text-[10px] text-outline italic">Likely wildlife (Confidence: 68%)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Medium Alert Card 2 -->
                        <div class="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-3 relative group cursor-pointer hover:bg-surface-container transition-colors">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                            <div class="flex justify-between items-start mb-2 pl-2">
                                <div class="flex items-center gap-2">
                                    <span class="font-label-caps text-[10px] text-secondary bg-secondary/10 border border-secondary/20 px-1.5 py-0.5 rounded-sm font-bold">MEDIUM</span>
                                </div>
                                <span class="font-metadata-mono text-[10px] text-on-surface-variant">03:10:05 ago</span>
                            </div>
                            <div class="pl-2">
                                <h3 class="font-body-sm font-bold text-on-surface leading-tight mb-1">Comms Degradation</h3>
                                <div class="font-metadata-mono text-[11px] text-on-surface-variant flex flex-col gap-0.5 mb-2">
                                    <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">router</span> Relay Tower Alpha</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="p-3 border-t border-outline-variant bg-surface-container-lowest rounded-b-DEFAULT text-center">
                        <a href="#/events" class="font-label-caps text-label-caps text-primary hover:underline font-bold">VIEW ALL LOGS (142)</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}
