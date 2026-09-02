/**
 * Alert Investigation & Evidence View Controller
 * 100% Faithful Reproduction of Stitch Project ID: 12963321699944751718 (Screen: c3f8be1bc74f41aca1337d026a110f5e)
 */

export function renderAlertView(alertId = 'EV-8847') {
    const officerImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDpprr4M-2seoes904Q7RLnzum3q7pBlK7pl1adc3KOvoZ1MAExTbQaYl-TgkQ5q0GQ4Ahts5zgDzcOMloSqwDS_Pv0W5D3czZvwkrSrQL5BwlLnvT7mMtYOkhUp7lB7-pJPtNEa2xW3YOiGcZRxpDxj-up_CX9OLuU0FMSk-lHvVnIxh22mY3TDdM2LsMrFtUI_F_Yx2kYzVA0sgpIkg5iTtx5X-GKcKp7akbjHOgVxcGJCEpeUFwJJg";
    const evidenceImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBK5yfqotHulT4B0ogxyF6YiGCtB5UkiMU4v3uYmaHJGYY8-Bgc5gagNeNHpvUtcLKk2aOKyA0RURDpOFqaICkZoY-oZUkF8sgdTqxtrtNshV3wrFdl6wwMgqEvt85jxSbctU6J_Mf-I0fM0ir-hZtp9SwLYyLklqLu1tVCPbZvK2OXBDs5FIvHdkX5iDjIelcDzobxt1D6CJwRA9BMTgLb0r95tu_L_S09BnIyWuknvUCipQtlePn_Vw";

    return `
        <div class="flex-1 flex flex-col h-full overflow-y-auto p-density-standard md:p-gutter gap-gutter bg-surface">
            <!-- Top Critical Alert Header Banner -->
            <div class="bg-error-container border border-critical-red rounded p-density-standard flex items-center justify-between shrink-0 shadow-sm">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-critical-red flex items-center justify-center animate-pulse">
                        <span class="material-symbols-outlined text-white">warning</span>
                    </div>
                    <div>
                        <h1 class="font-headline-sm text-headline-sm text-on-error-container font-bold">CRITICAL ALERT: VIRTUAL FENCE INTRUSION</h1>
                        <p class="font-body-sm text-body-sm text-on-error-container opacity-90">Immediate assessment required. Tracking path active.</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-metadata-mono text-metadata-mono bg-white/50 px-2 py-1 rounded text-on-error-container border border-critical-red/30 font-bold">ID: ${alertId}</span>
                    <span class="font-metadata-mono text-metadata-mono bg-white/50 px-2 py-1 rounded text-on-error-container border border-critical-red/30">TIME: 02:41:32 AM</span>
                </div>
            </div>

            <!-- Action Triggers Row -->
            <div class="flex gap-2 justify-end">
                <button id="btn-action-dispatch" class="bg-critical-red text-white text-xs font-bold px-4 py-2 rounded hover:bg-red-700 transition-colors shadow">
                    DISPATCH PATROL UNIT
                </button>
                <button id="btn-action-escalate" class="bg-warning-amber text-white text-xs font-bold px-3 py-2 rounded hover:bg-amber-600 transition-colors">
                    ESCALATE THREAT
                </button>
                <button id="btn-action-resolve" class="bg-security-green text-white text-xs font-bold px-3 py-2 rounded hover:bg-emerald-600 transition-colors">
                    RESOLVE
                </button>
            </div>

            <!-- Middle Row: Split Layout (Evidence & Details) -->
            <div class="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-gutter min-h-[500px]">
                <!-- CCTV Evidence Canvas (Spans 8 columns) -->
                <div class="lg:col-span-8 bg-surface-container-lowest border border-border-standard rounded flex flex-col relative overflow-hidden group">
                    <!-- CCTV Overlay Header -->
                    <div class="absolute top-0 left-0 w-full p-2 flex justify-between items-start z-10 bg-gradient-to-b from-black/60 to-transparent">
                        <div class="flex gap-2">
                            <span class="bg-critical-red text-white font-label-caps text-label-caps px-2 py-0.5 rounded flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-white animate-ping mr-1 inline-block"></span>LIVE</span>
                            <span class="bg-black/50 text-white font-metadata-mono text-metadata-mono px-2 py-0.5 rounded backdrop-blur-sm">CAM: BOP-014-S04</span>
                        </div>
                        <div class="flex gap-2">
                            <button class="bg-black/50 text-white p-1 rounded hover:bg-black/80 transition-colors backdrop-blur-sm ptz-btn" title="PTZ Controls"><span class="material-symbols-outlined text-[18px]">gamepad</span></button>
                            <button class="bg-black/50 text-white p-1 rounded hover:bg-black/80 transition-colors backdrop-blur-sm" title="Expand View"><span class="material-symbols-outlined text-[18px]">fullscreen</span></button>
                        </div>
                    </div>
                    
                    <!-- Evidence Image Viewport -->
                    <div class="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                        <img src="${evidenceImg}" alt="Evidence Frame" class="w-full h-full object-cover filter brightness-90"/>
                        <div class="cctv-overlay-box" style="top: 30%; left: 40%; width: 20%; height: 45%;">
                            <div class="cctv-overlay-label flex items-center gap-1">
                                <span class="material-symbols-outlined text-[10px]">person</span> INTRUDER 98%
                            </div>
                        </div>
                    </div>

                    <!-- Video Scrubber Controls -->
                    <div class="flex items-center gap-4 bg-surface-container-low p-3 border-t border-outline-variant">
                        <button class="material-symbols-outlined text-primary hover:text-primary/70 text-2xl">play_circle</button>
                        <input type="range" class="flex-1 accent-primary cursor-pointer" min="0" max="100" value="75"/>
                        <span class="font-mono text-xs text-on-surface-variant">00:04:18 / 00:05:00</span>
                    </div>
                </div>

                <!-- Right Side: Details & Target Telemetry -->
                <div class="lg:col-span-4 bg-surface-container-lowest border border-border-standard rounded p-4 flex flex-col gap-4">
                    <h3 class="font-bold text-sm text-primary border-b border-outline-variant pb-2">Target Telemetry Breakdown</h3>
                    
                    <div class="space-y-3 text-xs">
                        <div class="flex justify-between py-1 border-b border-outline-variant">
                            <span class="text-on-surface-variant">Classification:</span>
                            <span class="font-bold text-critical-red">Human / Unidentified</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-outline-variant">
                            <span class="text-on-surface-variant">AI Confidence:</span>
                            <span class="font-bold text-security-green font-mono">98.2%</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-outline-variant">
                            <span class="text-on-surface-variant">Speed / Trajectory:</span>
                            <span class="font-mono font-bold">4.2 km/h (Heading East)</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-outline-variant">
                            <span class="text-on-surface-variant">Thermal Contrast:</span>
                            <span class="font-mono font-bold text-warning-amber">36.8°C High Contrast</span>
                        </div>
                    </div>

                    <h3 class="font-bold text-sm text-primary border-b border-outline-variant pb-2 mt-2">Incident Event Timeline</h3>
                    <div class="space-y-3 text-xs">
                        <div class="flex items-start gap-2">
                            <span class="w-2 h-2 rounded-full bg-security-green mt-1"></span>
                            <div>
                                <span class="font-mono text-on-surface-variant font-bold">12:24:10 AM</span>
                                <p class="font-medium text-on-surface">Motion Detected at Zone 4B</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="w-2 h-2 rounded-full bg-warning-amber mt-1"></span>
                            <div>
                                <span class="font-mono text-on-surface-variant font-bold">12:24:14 AM</span>
                                <p class="font-medium text-on-surface">Target Class: Human (98.2%)</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="w-2 h-2 rounded-full bg-critical-red animate-ping mt-1"></span>
                            <div>
                                <span class="font-mono text-on-surface-variant font-bold">12:24:18 AM</span>
                                <p class="font-medium text-on-surface">Virtual Boundary Crossed - Alert Issued</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
