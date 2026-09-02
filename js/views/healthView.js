/**
 * Infrastructure System Health View Controller
 */
import { IBVAP_DATA } from '../mockData.js';

export function renderHealthView() {
    const health = IBVAP_DATA.systemHealth;

    return `
        <div class="p-6 flex flex-col gap-6">
            <div class="bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm">
                <h2 class="font-bold text-lg text-primary flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">health_and_safety</span>
                    Infrastructure & AI Processing Cluster Health
                </h2>
                <p class="text-xs text-on-surface-variant">Real-time GPU cluster utilization, video stream latency, and storage arrays</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-on-surface-variant">AI INFERENCE ENGINE</span>
                        <span class="text-xs font-bold text-security-green font-mono">${health.aiEngine.status}</span>
                    </div>
                    <div class="text-2xl font-bold text-primary font-mono">${health.aiEngine.load} LOAD</div>
                    <div class="text-[11px] text-on-surface-variant font-mono mt-1">Uptime: ${health.aiEngine.uptime} (NVIDIA H100 Cluster)</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-on-surface-variant">VIDEO ARCHIVE STORAGE</span>
                        <span class="text-xs font-bold text-security-green font-mono">${health.storage.status}</span>
                    </div>
                    <div class="text-2xl font-bold text-primary font-mono">${health.storage.usedGB} / ${health.storage.totalGB} GB</div>
                    <div class="text-[11px] text-on-surface-variant font-mono mt-1">RAID 10 Redundant Storage Array</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-on-surface-variant">COMMAND NETWORK</span>
                        <span class="text-xs font-bold text-security-green font-mono">${health.network.status}</span>
                    </div>
                    <div class="text-2xl font-bold text-primary font-mono">${health.network.latency} LATENCY</div>
                    <div class="text-[11px] text-on-surface-variant font-mono mt-1">Bandwidth: ${health.network.bandwidthMbps} Mbps (Fiber Optic)</div>
                </div>

                <div class="bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-on-surface-variant">CAMERA SENSOR MATRIX</span>
                        <span class="text-xs font-bold text-security-green font-mono">100% ONLINE</span>
                    </div>
                    <div class="text-2xl font-bold text-primary font-mono">${health.cameraNodes.online} ONLINE</div>
                    <div class="text-[11px] text-on-surface-variant font-mono mt-1">0 Offline | 0 Degraded</div>
                </div>
            </div>
        </div>
    `;
}
