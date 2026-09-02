/**
 * IBVAP | Tactical AI Command Assistant View Controller
 * Connected to live CCTV, Cameras, Threats, ANPR, Maps & Video Analysis via InsForge BaaS
 */

export function renderAiChatView() {
    return `
        <div class="h-full flex flex-col bg-surface-muted overflow-hidden font-sans select-none">
            <!-- Header & System Telemetry Status Bar -->
            <div class="bg-surface-container-lowest border-b border-outline-variant px-4 lg:px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between shrink-0 shadow-sm gap-2 z-10">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <span class="material-symbols-outlined text-2xl">smart_toy</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h1 class="font-headline-sm text-headline-sm font-bold text-primary">Tactical AI Command Assistant</h1>
                            <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full text-[11px] font-mono font-bold flex items-center gap-1 border border-blue-200">
                                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                InsForge Connected
                            </span>
                        </div>
                        <p class="text-xs text-on-surface-variant font-mono">Live operational interface connected to CCTV streams, ANPR, Border Map & Video Analysis.</p>
                    </div>
                </div>

                <!-- SYSTEM CONTEXT TELEMETRY PANEL -->
                <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 font-mono text-xs">
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-bright border border-outline-variant rounded-lg">
                        <span class="text-outline">CAMERAS:</span>
                        <span class="font-bold text-security-green">42 / 48 ONLINE</span>
                    </div>
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-error-container text-on-error-container border border-critical-red/30 rounded-lg">
                        <span class="material-symbols-outlined text-xs text-critical-red">warning</span>
                        <span class="font-bold">ALERTS: 03 (01 CRITICAL)</span>
                    </div>
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-bright border border-outline-variant rounded-lg hidden sm:flex">
                        <span class="text-outline">SECTOR:</span>
                        <span class="font-bold text-primary">04</span>
                    </div>

                    <button id="btn-new-chat" class="flex items-center gap-1 px-3 py-1 bg-primary text-white hover:bg-blue-900 rounded-lg text-xs font-bold transition-all shadow cursor-pointer uppercase shrink-0">
                        <span class="material-symbols-outlined text-sm">add_comment</span>
                        <span>New Session</span>
                    </button>
                </div>
            </div>

            <!-- Main Content Container -->
            <div class="flex-1 flex flex-col overflow-hidden relative p-3 lg:p-6 max-w-5xl w-full mx-auto">
                
                <!-- OPERATIONAL QUICK ACTION CHIPS -->
                <div class="flex items-center gap-2 overflow-x-auto pb-3 shrink-0 scrollbar-none">
                    <span class="text-xs font-bold text-outline uppercase tracking-wider shrink-0 mr-1 font-mono">Quick Actions:</span>
                    
                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-red-50 hover:text-critical-red hover:border-red-300 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Show active critical alerts and security threats in Sector 04.">
                        <span>🚨 Active Threats</span>
                    </button>

                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Run diagnostic check on camera nodes and report any offline or degraded units.">
                        <span>📹 Camera Health</span>
                    </button>

                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Show recent person detection tracking events in Sector 04.">
                        <span>🚶 Person Detections</span>
                    </button>

                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Show recent vehicle classification activity and speed anomalies.">
                        <span>🚘 Vehicle Activity</span>
                    </button>

                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Show watchlist match alerts and ANPR records.">
                        <span>🪪 ANPR Watchlist</span>
                    </button>

                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Provide complete operational status for Sector 04 Command Checkpoint.">
                        <span>🗺️ Sector Status</span>
                    </button>

                    <button class="ai-prompt-chip text-xs px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-slate-100 hover:text-slate-900 border border-outline-variant text-on-surface-variant font-bold font-mono transition-all shadow-sm shrink-0 cursor-pointer flex items-center gap-1" data-prompt="Generate today's official border intelligence summary report.">
                        <span>📄 Generate Report</span>
                    </button>
                </div>

                <!-- Chat Feed Scroll Box -->
                <div id="ai-chat-feed" class="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 rounded-2xl bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 shadow-inner">
                    <!-- Welcome AI Initial Banner Message -->
                    <div class="flex gap-3 max-w-3xl">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                            AI
                        </div>
                        <div class="space-y-1.5 flex-1">
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-primary">IBVAP Tactical AI Command Assistant</span>
                                <span class="text-[10px] text-security-green font-mono font-bold">● ONLINE</span>
                            </div>
                            <div class="p-4 rounded-2xl rounded-tl-none bg-surface-bright border border-outline-variant/60 text-sm leading-relaxed text-on-surface shadow-sm space-y-2">
                                <p>Welcome, Command Officer Vance. I am ready to process queries on CCTV node telemetry, active threat alerts, ANPR watchlist tracking, or video footage uploads.</p>
                                <div class="p-2.5 bg-surface-container rounded-xl border border-outline-variant/60 text-xs font-mono space-y-1">
                                    <div class="text-primary font-bold">📌 ACTIVE SYSTEM ADVISORY:</div>
                                    <div class="text-critical-red font-bold">🚨 CRITICAL ALERT EV-8847: Virtual Fence Intrusion at Sector 04 (CAM-014-NORTH)</div>
                                    <div class="text-amber-700 dark:text-amber-300">⚠️ WATCHLIST MATCH EV-8846: Cargo Truck RJ 14 CD 5678 (CAM-BOP-033)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Live Typing / Streaming Status Bar -->
                <div id="ai-typing-indicator" class="hidden items-center gap-2 text-xs text-blue-700 font-mono font-semibold mb-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl animate-pulse w-fit">
                    <span class="material-symbols-outlined text-sm animate-spin">sync</span>
                    <span>Processing query & streaming response from InsForge engine...</span>
                </div>

                <!-- Active Attachment Preview Box (Hidden until file selected) -->
                <div id="attachment-preview-box" class="hidden mb-2 p-3 bg-blue-50 border border-blue-300 rounded-2xl flex items-center justify-between shadow-sm">
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="p-2 bg-blue-600 text-white rounded-xl shadow-sm shrink-0">
                            <span id="attachment-type-icon" class="material-symbols-outlined text-lg">attach_file</span>
                        </div>
                        <div class="truncate">
                            <div id="attachment-filename" class="text-xs font-bold text-blue-900 truncate">footage_sector04.mp4</div>
                            <div id="attachment-filesize" class="text-[10px] text-blue-700 font-mono">Private Bucket: chat-attachments</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button id="btn-trigger-analyze" type="button" class="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold font-mono rounded-lg shadow cursor-pointer uppercase">
                            ANALYZE VIDEO
                        </button>
                        <button id="btn-remove-attachment" class="text-blue-700 hover:text-red-600 p-1.5 rounded-full hover:bg-blue-100 transition-colors" title="Remove file">
                            <span class="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                </div>

                <!-- Chat Input Controls -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-2.5 shadow-md flex flex-col gap-2 shrink-0">
                    <form id="ai-chat-form" class="flex items-center gap-2">
                        <!-- File Upload Button & Hidden Input -->
                        <input id="ai-file-input" type="file" accept=".pdf,image/*,.mp4,.webm,.mov,.txt" class="hidden"/>
                        <button id="btn-attach-file" type="button" class="p-2.5 text-on-surface-variant hover:text-blue-700 hover:bg-blue-50 rounded-xl border border-outline-variant transition-all cursor-pointer flex items-center justify-center shadow-sm" title="Upload CCTV Footage, Image or PDF to InsForge Private Bucket">
                            <span class="material-symbols-outlined text-lg">attach_file</span>
                        </button>

                        <input id="ai-chat-input" class="flex-1 bg-transparent px-3 py-2 text-sm text-on-surface focus:outline-none placeholder:text-outline" placeholder="Ask about cameras, threats, Sector 04, ANPR, or attach CCTV footage..." autocomplete="off"/>
                        
                        <button id="ai-chat-send-btn" type="submit" class="px-4 py-2.5 bg-[#0A192F] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow cursor-pointer uppercase tracking-wider">
                            <span id="ai-chat-send-icon" class="material-symbols-outlined text-sm">send</span>
                            <span id="ai-chat-send-text">Send</span>
                        </button>
                    </form>
                    <div class="flex justify-between items-center px-3 text-[11px] text-outline font-mono">
                        <span>Supports MP4, WEBM, PDFs & Snapshots • Bucket: <code class="text-blue-600 font-bold">chat-attachments</code></span>
                        <span>Saved to InsForge <code class="text-blue-600 bg-blue-50 px-1 rounded border border-blue-200">public.messages</code></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
