/**
 * Virtual Fence & Intrusion Detection View Controller
 */
import { IBVAP_DATA } from '../mockData.js';

export function renderIntrusionView() {
    return `
        <div class="p-6 flex flex-col gap-6">
            <div class="bg-surface-container-lowest p-4 rounded border border-outline-variant shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 class="font-bold text-lg text-primary flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">polyline</span>
                        Virtual Fence & Restricted Perimeter Configuration
                    </h2>
                    <p class="text-xs text-on-surface-variant">Interactive boundary editor, tripwire thresholding, and sensitivity tuning</p>
                </div>
                <div class="flex gap-2">
                    <button class="bg-surface-container-high hover:bg-surface-container text-xs font-bold px-3 py-1.5 rounded border border-outline-variant transition-colors">DRAW POLYGON ZONE</button>
                    <button class="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-primary/90 transition-colors">SAVE BOUNDARY RULES</button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Camera Frame Canvas with Tripwire -->
                <div class="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col gap-4 shadow-sm">
                    <div class="flex justify-between items-center border-b border-outline-variant pb-2">
                        <span class="font-bold text-sm text-primary">Zone Editor Viewport: CAM-BOP-014 (Sector 4)</span>
                        <span class="font-mono text-xs text-critical-red font-bold">VIRTUAL TRIPWIRE ACTIVE</span>
                    </div>

                    <div class="relative bg-black h-80 rounded overflow-hidden flex items-center justify-center">
                        <img src="${IBVAP_DATA.cameras[0].image}" alt="Camera Feed" class="w-full h-full object-cover opacity-75"/>

                        <!-- Virtual Fence Line Graphic -->
                        <svg class="absolute inset-0 w-full h-full stroke-critical-red pointer-events-none" stroke-width="3" fill="none">
                            <line x1="50" y1="200" x2="700" y2="200" stroke="#EF4444" stroke-dasharray="8,4"/>
                            <circle cx="50" cy="200" r="6" fill="#EF4444"/>
                            <circle cx="700" cy="200" r="6" fill="#EF4444"/>
                        </svg>

                        <div class="absolute top-1/2 left-1/3 bg-critical-red text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                            RESTRICTED BOUNDARY LINE (BUFFER 50M)
                        </div>
                    </div>
                </div>

                <!-- Boundary Config Panel -->
                <div class="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col gap-4 shadow-sm">
                    <h3 class="font-bold text-sm text-primary border-b border-outline-variant pb-2">Zone Tripwire Rules</h3>

                    <div class="space-y-4 text-xs">
                        <div>
                            <label class="block font-bold text-on-surface mb-1">Motion Sensitivity</label>
                            <input type="range" class="w-full accent-primary" min="1" max="100" value="85"/>
                            <div class="flex justify-between text-[10px] text-on-surface-variant mt-1 font-mono">
                                <span>Low (Ignore Small)</span>
                                <span class="font-bold text-primary">85% (High Precision)</span>
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-on-surface mb-1">Direction Filter</label>
                            <select class="w-full px-3 py-2 border border-outline-variant rounded bg-surface-muted text-xs focus:outline-none focus:border-primary">
                                <option>Bi-Directional (Both Directions)</option>
                                <option selected>Inbound Breach Only (Outside -> Inside)</option>
                                <option>Outbound Exit Only</option>
                            </select>
                        </div>

                        <div>
                            <label class="block font-bold text-on-surface mb-1">Object Filter</label>
                            <div class="space-y-2 mt-2">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" checked class="rounded text-primary focus:ring-primary"/>
                                    <span>Human / Pedestrian</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" checked class="rounded text-primary focus:ring-primary"/>
                                    <span>Vehicles & Trucks</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" class="rounded text-primary focus:ring-primary"/>
                                    <span>Animals (Ignore Wildlife)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
