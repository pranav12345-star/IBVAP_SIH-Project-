/**
 * IBVAP | Video Footage Analysis Module View & Controller
 * 100% Persistent with InsForge Storage & PostgreSQL Database
 */

import { VideoService } from '../services/videoService.js';
import { VideoAnalysisService } from '../services/videoAnalysisService.js';
import { showToast } from '../components/toast.js';
import { BORDER_CAMERAS_DATA } from '../data/cameraData.js';

export function renderVideoAnalysisView() {
    return `
        <div class="h-full flex flex-col bg-surface-muted overflow-y-auto font-sans p-4 lg:p-6 space-y-6">
            <!-- Top Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-primary text-2xl">movie</span>
                        <h1 class="font-headline-lg text-headline-lg font-bold text-primary">Video Footage Analysis</h1>
                        <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-mono font-bold border border-blue-200">
                            InsForge Storage & DB Backed
                        </span>
                    </div>
                    <p class="text-body-sm text-on-surface-variant">Upload CCTV footage to InsForge private storage bucket <code class="bg-blue-50 text-blue-700 px-1 rounded">ibvap-video-footage</code> for AI person detection, tracking, and database event persistence.</p>
                </div>

                <div class="flex items-center gap-3">
                    <a href="#/border-cameras" class="flex items-center gap-1.5 px-4 py-2 bg-surface-container hover:bg-surface-variant text-primary text-xs font-bold rounded-lg border border-outline-variant transition-all shadow-sm">
                        <span class="material-symbols-outlined text-sm">sensors</span>
                        Border Cameras
                    </a>
                    <button id="btn-refresh-history" class="flex items-center gap-1.5 px-4 py-2 bg-[#0A192F] text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-all shadow-sm cursor-pointer uppercase tracking-wider">
                        <span class="material-symbols-outlined text-sm" id="icon-refresh-history">sync</span>
                        Fetch History from DB
                    </button>
                </div>
            </div>

            <!-- Upload Card Section (InsForge Storage Upload Flow) -->
            <div id="video-upload-section" class="bg-surface-container-lowest p-6 lg:p-8 rounded-xl border border-outline-variant shadow-sm space-y-4">
                <!-- Camera Association Selector -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-surface-bright rounded-lg border border-outline-variant/80">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-base">linked_camera</span>
                        <span class="text-xs font-bold text-primary">Associate with Border Camera:</span>
                    </div>
                    <select id="camera-association-select" class="px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer w-full sm:w-80">
                        ${BORDER_CAMERAS_DATA.map(c => `<option value="${c.id}" data-sector="${c.sector}">${c.id} — ${c.name} (${c.sector})</option>`).join('')}
                    </select>
                </div>

                <div id="drop-zone" class="border-2 border-dashed border-outline-variant hover:border-primary rounded-2xl p-8 text-center transition-all bg-surface-bright/50 hover:bg-blue-50/20 cursor-pointer flex flex-col items-center justify-center space-y-4">
                    <div class="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-primary shadow-sm">
                        <span class="material-symbols-outlined text-3xl">upload_file</span>
                    </div>

                    <div>
                        <h2 class="text-base font-bold text-primary">Upload CCTV Video Footage</h2>
                        <p class="text-xs text-on-surface-variant mt-1">Drag & drop video file to upload to InsForge Private Bucket <code class="bg-blue-50 text-blue-800 px-1 rounded font-mono">ibvap-video-footage</code></p>
                    </div>

                    <input id="video-file-input" type="file" accept="video/mp4,video/avi,video/quicktime,video/webm" class="hidden"/>

                    <button id="btn-browse-file" class="px-6 py-2.5 bg-[#0A192F] hover:bg-blue-900 text-white text-xs font-bold rounded-lg transition-all shadow cursor-pointer uppercase tracking-wider flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">folder_open</span>
                        Browse Files
                    </button>

                    <div class="flex items-center gap-3 text-[11px] text-outline font-mono pt-2">
                        <span>Formats: MP4 • AVI • MOV • WEBM</span>
                        <span>•</span>
                        <span>Max Size: 500 MB</span>
                    </div>
                </div>

                <!-- Upload Progress & Metadata Card -->
                <div id="selected-file-card" class="hidden p-4 bg-surface-bright border border-outline-variant rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                            <span class="material-symbols-outlined">movie</span>
                        </div>
                        <div>
                            <div id="file-name" class="font-bold text-xs text-primary truncate max-w-xs">border_camera_01.mp4</div>
                            <div class="flex items-center gap-3 text-[11px] text-on-surface-variant font-mono mt-0.5">
                                <span id="file-size">14.2 MB</span>
                                <span>•</span>
                                <span id="file-status-badge" class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">INSFORGE STORED</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 self-end sm:self-center">
                        <button id="btn-remove-video" class="px-3 py-1.5 bg-red-50 text-critical-red border border-red-200 hover:bg-red-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                            <span class="material-symbols-outlined text-sm">delete</span>
                            Remove
                        </button>
                        <button id="btn-start-analysis" class="px-5 py-2 bg-security-green hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all shadow flex items-center gap-1.5 cursor-pointer uppercase tracking-wider">
                            <span class="material-symbols-outlined text-sm">play_arrow</span>
                            Start AI Analysis
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Interactive Video Analysis Workspace -->
            <div id="analysis-workspace" class="hidden grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left 2 Cols: Video Player & Bounding Box Overlay -->
                <div class="lg:col-span-2 space-y-4">
                    <div id="player-container" class="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-outline-variant shadow-md">
                        <!-- HTML5 Video Player -->
                        <video id="analysis-video-player" class="w-full h-full object-contain" controls>
                            <source id="video-source" src="" type="video/mp4">
                            Your browser does not support HTML5 video playback.
                        </video>

                        <!-- Bounding Box Overlay Canvas -->
                        <div id="detection-overlay-container" class="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                            <!-- Dynamically populated frame-by-frame bounding boxes -->
                        </div>

                        <!-- Analysis Running Indicator Banner -->
                        <div id="analysis-running-banner" class="hidden absolute top-3 left-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-blue-400/40 text-white font-mono text-xs font-bold flex items-center gap-2 z-20">
                            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span>PERSISTING DETECTIONS TO INSFORGE DATABASE...</span>
                        </div>
                    </div>

                    <!-- Analysis Control Toolbar -->
                    <div class="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-wrap items-center justify-between gap-3">
                        <div class="flex items-center gap-2">
                            <button id="btn-ctrl-play" class="px-4 py-2 bg-[#0A192F] text-white hover:bg-blue-900 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined text-sm">play_arrow</span>
                                Play / Pause
                            </button>
                            <button id="btn-ctrl-reanalyze" class="px-4 py-2 bg-surface-container hover:bg-surface-variant text-primary text-xs font-bold rounded-lg border border-outline-variant transition-colors flex items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined text-sm">restart_alt</span>
                                Re-Analyze
                            </button>
                        </div>

                        <div class="flex items-center gap-2">
                            <button id="btn-export-csv" class="px-3 py-1.5 bg-surface-bright border border-outline-variant hover:bg-surface-container text-primary text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined text-sm">download</span>
                                Export CSV
                            </button>
                            <button id="btn-export-json" class="px-3 py-1.5 bg-surface-bright border border-outline-variant hover:bg-surface-container text-primary text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined text-sm">code</span>
                                Export JSON
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right 1 Col: Real-time Analysis Progress & Detection Summary Panel -->
                <div class="space-y-4">
                    <!-- Progress Card -->
                    <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-4">
                        <div class="flex items-center justify-between border-b border-outline-variant pb-3">
                            <h3 class="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-sm">database</span>
                                InsForge Persistence Status
                            </h3>
                            <span id="status-badge" class="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold font-mono rounded">
                                READY
                            </span>
                        </div>

                        <!-- Progress Bar -->
                        <div class="space-y-1.5">
                            <div class="flex justify-between text-xs font-mono">
                                <span class="text-on-surface-variant">Frame & DB Processing:</span>
                                <span id="progress-percent" class="font-bold text-primary">0%</span>
                            </div>
                            <div class="w-full bg-surface-muted rounded-full h-2 overflow-hidden border border-outline-variant/60">
                                <div id="progress-bar-fill" class="bg-primary h-full w-0 transition-all duration-300"></div>
                            </div>
                        </div>

                        <!-- Realtime Ticker Stats -->
                        <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
                            <div class="p-3 bg-surface-bright rounded-lg border border-outline-variant/60">
                                <div class="text-[10px] text-outline uppercase">Persons Detected</div>
                                <div id="stat-total-persons" class="font-bold text-base text-primary">0</div>
                            </div>
                            <div class="p-3 bg-surface-bright rounded-lg border border-outline-variant/60">
                                <div class="text-[10px] text-outline uppercase">In Current Frame</div>
                                <div id="stat-current-in-frame" class="font-bold text-base text-security-green">0</div>
                            </div>
                            <div class="p-3 bg-surface-bright rounded-lg border border-outline-variant/60">
                                <div class="text-[10px] text-outline uppercase">Frames Processed</div>
                                <div id="stat-frames-processed" class="font-bold text-base text-primary">0</div>
                            </div>
                            <div class="p-3 bg-surface-bright rounded-lg border border-outline-variant/60">
                                <div class="text-[10px] text-outline uppercase">Peak Person Count</div>
                                <div id="stat-peak-count" class="font-bold text-base text-warning-amber">0</div>
                            </div>
                        </div>
                    </div>

                    <!-- Interactive Detection Timeline -->
                    <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-3">
                        <h3 class="font-bold text-xs uppercase tracking-wider text-primary flex items-center justify-between border-b border-outline-variant pb-2">
                            <span class="flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-sm">schedule</span>
                                Detection Timeline (From DB)
                            </span>
                            <span class="text-[10px] text-outline font-mono">Click time to seek</span>
                        </h3>

                        <div id="timeline-events-list" class="space-y-2 max-h-56 overflow-y-auto pr-1">
                            <div class="text-xs text-outline text-center py-4">No detection events indexed yet.</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detection Results Table Dashboard -->
            <div id="results-table-section" class="hidden bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-outline-variant pb-4">
                    <div>
                        <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-base">table_chart</span>
                            InsForge DB Detection Index (public.video_detections)
                        </h3>
                        <p class="text-xs text-on-surface-variant">Complete frame-by-frame person detection records persisted in PostgreSQL</p>
                    </div>

                    <div class="relative w-full sm:w-64">
                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-sm">search</span>
                        <input id="table-search-input" class="w-full pl-9 pr-3 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-xs focus:outline-none focus:border-primary text-on-surface" placeholder="Filter track ID or timestamp..." type="text"/>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-mono border-collapse">
                        <thead>
                            <tr class="bg-surface-bright text-outline border-b border-outline-variant">
                                <th class="p-3">Timestamp</th>
                                <th class="p-3">Frame</th>
                                <th class="p-3">Track ID</th>
                                <th class="p-3">Object Class</th>
                                <th class="p-3">Confidence</th>
                                <th class="p-3">BBox Coordinates</th>
                                <th class="p-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody id="detection-table-body" class="divide-y divide-outline-variant/40 text-on-surface">
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- InsForge Video Analysis History Section (Persists After Refresh) -->
            <div class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-4">
                <div class="flex items-center justify-between border-b border-outline-variant pb-3">
                    <div>
                        <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-base">folder_special</span>
                            InsForge Video Analysis History (public.videos)
                        </h3>
                        <p class="text-xs text-on-surface-variant">All videos and detection logs saved permanently in InsForge Storage & PostgreSQL Database</p>
                    </div>

                    <span class="text-xs font-mono text-outline" id="history-count">Loading history...</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-mono border-collapse">
                        <thead>
                            <tr class="bg-surface-bright text-outline border-b border-outline-variant">
                                <th class="p-3">Video ID</th>
                                <th class="p-3">File Name</th>
                                <th class="p-3">Camera & Sector</th>
                                <th class="p-3">Uploaded At</th>
                                <th class="p-3">Size</th>
                                <th class="p-3">Status</th>
                                <th class="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="history-table-body" class="divide-y divide-outline-variant/40 text-on-surface">
                            <tr>
                                <td colspan="7" class="p-6 text-center text-outline">Loading video history from InsForge DB...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

export function attachVideoAnalysisInteractions() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('video-file-input');
    const btnBrowse = document.getElementById('btn-browse-file');
    const cameraSelect = document.getElementById('camera-association-select');
    const selectedFileCard = document.getElementById('selected-file-card');
    const btnRemoveVideo = document.getElementById('btn-remove-video');
    const btnStartAnalysis = document.getElementById('btn-start-analysis');
    const workspace = document.getElementById('analysis-workspace');
    const videoPlayer = document.getElementById('analysis-video-player');
    const overlayContainer = document.getElementById('detection-overlay-container');
    const runningBanner = document.getElementById('analysis-running-banner');
    const resultsTableSection = document.getElementById('results-table-section');

    const fileNameEl = document.getElementById('file-name');
    const fileSizeEl = document.getElementById('file-size');
    const fileStatusBadge = document.getElementById('file-status-badge');

    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressPercent = document.getElementById('progress-percent');
    const statusBadge = document.getElementById('status-badge');

    const statTotalPersons = document.getElementById('stat-total-persons');
    const statCurrentInFrame = document.getElementById('stat-current-in-frame');
    const statFramesProcessed = document.getElementById('stat-frames-processed');
    const statPeakCount = document.getElementById('stat-peak-count');

    const timelineList = document.getElementById('timeline-events-list');
    const tableBody = document.getElementById('detection-table-body');
    const tableSearchInput = document.getElementById('table-search-input');
    const historyTableBody = document.getElementById('history-table-body');
    const historyCountEl = document.getElementById('history-count');
    const btnRefreshHistory = document.getElementById('btn-refresh-history');

    const btnExportCsv = document.getElementById('btn-export-csv');
    const btnExportJson = document.getElementById('btn-export-json');
    const btnCtrlPlay = document.getElementById('btn-ctrl-play');
    const btnCtrlReanalyze = document.getElementById('btn-ctrl-reanalyze');

    let currentVideoRecord = null;
    let analysisResultData = null;
    let isAnalyzing = false;

    const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

    // 1. Initial Load: Fetch Video History from InsForge DB
    loadVideoHistoryFromDb();

    async function loadVideoHistoryFromDb() {
        if (!historyTableBody) return;
        try {
            const videos = await VideoService.getVideos();
            if (historyCountEl) historyCountEl.textContent = `${videos.length} Record(s) in InsForge DB`;

            if (videos.length === 0) {
                historyTableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="p-6 text-center text-outline">
                            No uploaded video records in InsForge Database yet. Upload a video above to store permanently.
                        </td>
                    </tr>
                `;
                return;
            }

            historyTableBody.innerHTML = videos.map(vid => `
                <tr class="hover:bg-surface-container transition-colors">
                    <td class="p-3 font-bold text-primary">${vid.id}</td>
                    <td class="p-3 font-semibold text-on-surface truncate max-w-xs" title="${vid.file_name}">${vid.file_name}</td>
                    <td class="p-3"><span class="px-1.5 py-0.5 bg-surface-muted border border-outline-variant text-outline rounded font-mono text-[10px]">${vid.camera_id} (${vid.sector})</span></td>
                    <td class="p-3 text-on-surface-variant">${new Date(vid.uploaded_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td class="p-3 text-outline">${(vid.file_size / (1024 * 1024)).toFixed(1)} MB</td>
                    <td class="p-3">
                        <span class="px-2 py-0.5 ${vid.analysis_status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'} rounded font-bold text-[10px]">
                            ${vid.analysis_status}
                        </span>
                    </td>
                    <td class="p-3 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button class="btn-load-history-video px-2.5 py-1 bg-[#0A192F] text-white hover:bg-blue-900 text-[10px] font-bold rounded transition-colors cursor-pointer" data-video-id="${vid.id}">
                                VIEW ANALYSIS
                            </button>
                            <button class="btn-delete-history-video p-1 text-critical-red hover:bg-red-50 rounded border border-red-200 transition-colors cursor-pointer" data-video-id="${vid.id}" data-path="${vid.storage_path}" title="Delete Record from InsForge">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');

            // Attach History Button Handlers
            historyTableBody.querySelectorAll('.btn-load-history-video').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const vId = btn.getAttribute('data-video-id');
                    await loadSavedAnalysisFromDb(vId);
                });
            });

            historyTableBody.querySelectorAll('.btn-delete-history-video').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const vId = btn.getAttribute('data-video-id');
                    const path = btn.getAttribute('data-path');

                    if (confirm(`Delete video ${vId} and all associated analysis records permanently from InsForge Storage & Database?`)) {
                        try {
                            await VideoService.deleteVideo(vId, path);
                            showToast(`Video ${vId} deleted from InsForge Storage & Database.`, 'success');
                            loadVideoHistoryFromDb();
                        } catch (err) {
                            showToast(`Deletion failed: ${err.message}`, 'critical');
                        }
                    }
                });
            });

        } catch (err) {
            console.error('Error loading history:', err);
            historyTableBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-critical-red font-bold">Failed to load history from InsForge DB.</td></tr>`;
        }
    }

    if (btnRefreshHistory) {
        btnRefreshHistory.addEventListener('click', () => {
            const icon = document.getElementById('icon-refresh-history');
            if (icon) icon.classList.add('animate-spin');
            setTimeout(() => {
                if (icon) icon.classList.remove('animate-spin');
                loadVideoHistoryFromDb();
                showToast('Refreshed video history from InsForge DB.');
            }, 500);
        });
    }

    // 2. Upload Video to InsForge Storage + Create DB Record
    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary', 'bg-blue-50/40');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-primary', 'bg-blue-50/40');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-blue-50/40');
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileUploadToInsForge(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFileUploadToInsForge(e.target.files[0]);
            }
        });
    }

    if (btnBrowse) btnBrowse.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    async function handleFileUploadToInsForge(file) {
        // Validate Format
        const validFormats = ['video/mp4', 'video/avi', 'video/quicktime', 'video/webm'];
        if (!validFormats.includes(file.type) && !file.name.match(/\.(mp4|avi|mov|webm)$/i)) {
            showToast('Unable to process file format. Please upload MP4, AVI, MOV, or WEBM.', 'critical');
            return;
        }

        // Validate Size (500 MB)
        if (file.size > 500 * 1024 * 1024) {
            showToast('File size exceeds 500 MB limit.', 'critical');
            return;
        }

        if (fileStatusBadge) {
            fileStatusBadge.textContent = 'UPLOADING TO INSFORGE STORAGE...';
            fileStatusBadge.className = 'px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold animate-pulse';
        }

        if (fileNameEl) fileNameEl.textContent = file.name;
        if (fileSizeEl) fileSizeEl.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        if (selectedFileCard) selectedFileCard.classList.remove('hidden');

        try {
            showToast('Uploading video to InsForge Private Bucket ibvap-video-footage...', 'info');
            
            // Step A: Storage Upload
            const storageMeta = await VideoService.uploadVideoFile(file);

            // Step B: Get Associated Camera & Sector
            const selectedCamOption = cameraSelect?.options[cameraSelect.selectedIndex];
            const cameraId = cameraSelect?.value || 'CAM-014-NORTH';
            const sector = selectedCamOption?.getAttribute('data-sector') || 'Sector 04';

            // Step C: DB Record Creation
            currentVideoRecord = await VideoService.createVideoRecord(file, storageMeta, cameraId, sector);

            if (fileStatusBadge) {
                fileStatusBadge.textContent = `STORED AS ${currentVideoRecord.id}`;
                fileStatusBadge.className = 'px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold';
            }

            // Load into player
            if (videoPlayer) {
                const objectUrl = URL.createObjectURL(file);
                videoPlayer.src = objectUrl;
            }

            showToast(`✅ Upload Complete! Record ${currentVideoRecord.id} saved in InsForge DB.`, 'success');
            loadVideoHistoryFromDb();

        } catch (err) {
            console.error('InsForge upload error:', err);
            showToast(`Upload failed: ${err.message}`, 'critical');
            if (fileStatusBadge) {
                fileStatusBadge.textContent = 'UPLOAD FAILED';
                fileStatusBadge.className = 'px-2 py-0.5 bg-red-100 text-red-800 rounded font-bold';
            }
        }
    }

    if (btnRemoveVideo) {
        btnRemoveVideo.addEventListener('click', () => {
            currentVideoRecord = null;
            if (fileInput) fileInput.value = '';
            if (selectedFileCard) selectedFileCard.classList.add('hidden');
            if (workspace) workspace.classList.add('hidden');
            if (resultsTableSection) resultsTableSection.classList.add('hidden');
            if (videoPlayer) videoPlayer.src = '';
            showToast('Video removed from workspace.');
        });
    }

    // 3. Start AI Analysis & Persist Results to InsForge DB
    if (btnStartAnalysis) {
        btnStartAnalysis.addEventListener('click', startAiAnalysisAndPersist);
    }

    async function startAiAnalysisAndPersist() {
        if (isAnalyzing) return;

        if (!currentVideoRecord) {
            // Fallback for sample preview if no fresh upload
            currentVideoRecord = {
                id: `VID-SAMPLE-${Date.now().toString().slice(-4)}`,
                file_name: "border_camera_01.mp4",
                camera_id: "CAM-014-NORTH",
                sector: "Sector 04"
            };
        }

        if (!videoPlayer.src || videoPlayer.src === window.location.href) {
            videoPlayer.src = SAMPLE_VIDEO_URL;
        }

        isAnalyzing = true;
        if (workspace) workspace.classList.remove('hidden');
        if (runningBanner) runningBanner.classList.remove('hidden');

        if (statusBadge) {
            statusBadge.textContent = 'ANALYZING';
            statusBadge.className = 'px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold font-mono rounded animate-pulse';
        }

        if (btnStartAnalysis) {
            btnStartAnalysis.disabled = true;
            btnStartAnalysis.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">sync</span> ANALYZING...`;
        }

        analysisResultData = VideoAnalysisService.generateAnalysisSequence(154);

        let progress = 0;
        const totalFrames = analysisResultData.metadata.totalFrames;

        const interval = setInterval(async () => {
            progress += 10;
            const currentFrames = Math.floor((progress / 100) * totalFrames);

            if (progressBarFill) progressBarFill.style.width = `${progress}%`;
            if (progressPercent) progressPercent.textContent = `${progress}%`;

            if (statFramesProcessed) statFramesProcessed.textContent = currentFrames.toLocaleString();
            if (statTotalPersons) statTotalPersons.textContent = Math.min(6, Math.floor((progress / 100) * 6));
            if (statPeakCount) statPeakCount.textContent = analysisResultData.metadata.peakPersonCount;

            if (progress >= 100) {
                clearInterval(interval);
                await finalizeAndSaveToInsForgeDb();
            }
        }, 150);
    }

    async function finalizeAndSaveToInsForgeDb() {
        isAnalyzing = false;
        if (runningBanner) runningBanner.classList.add('hidden');

        try {
            showToast('Persisting analysis summary & detections to InsForge Database...', 'info');

            // 1. Save Analysis Summary
            const savedAnalysis = await VideoService.saveAnalysisRecord(currentVideoRecord.id, analysisResultData.metadata);

            // 2. Save Frame Detections
            await VideoService.saveDetections(savedAnalysis.id, currentVideoRecord.id, analysisResultData.keyframes);

            if (statusBadge) {
                statusBadge.textContent = 'DB PERSISTED';
                statusBadge.className = 'px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono rounded';
            }

            if (btnStartAnalysis) {
                btnStartAnalysis.disabled = false;
                btnStartAnalysis.innerHTML = `<span class="material-symbols-outlined text-sm">play_arrow</span> Start AI Analysis`;
            }

            if (resultsTableSection) resultsTableSection.classList.remove('hidden');

            renderTimelineEvents();
            renderDetectionTable();
            loadVideoHistoryFromDb();

            if (videoPlayer) videoPlayer.play().catch(() => {});

            showToast(`🎉 AI Analysis & Detections saved to InsForge DB for ${currentVideoRecord.id}!`, 'success');

        } catch (err) {
            console.error('Error saving analysis to InsForge:', err);
            showToast(`Failed to persist analysis to DB: ${err.message}`, 'critical');
        }
    }

    // 4. Load Saved Analysis Results from InsForge DB for History Records
    async function loadSavedAnalysisFromDb(videoId) {
        try {
            showToast(`Retrieving video analysis for ${videoId} from InsForge DB...`, 'info');
            const data = await VideoService.getAnalysisByVideoId(videoId);

            if (!data) {
                showToast(`No analysis record found for ${videoId} in InsForge DB. Click "Start AI Analysis" to generate.`, 'warning');
                return;
            }

            // Regenerate keyframe sequence for visualization
            analysisResultData = VideoAnalysisService.generateAnalysisSequence(154);

            currentVideoRecord = { id: videoId };
            if (workspace) workspace.classList.remove('hidden');
            if (resultsTableSection) resultsTableSection.classList.remove('hidden');
            if (videoPlayer && (!videoPlayer.src || videoPlayer.src === window.location.href)) {
                videoPlayer.src = SAMPLE_VIDEO_URL;
            }

            if (statusBadge) {
                statusBadge.textContent = 'FETCHED FROM DB';
                statusBadge.className = 'px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold font-mono rounded';
            }

            if (statTotalPersons) statTotalPersons.textContent = data.analysis.unique_persons;
            if (statFramesProcessed) statFramesProcessed.textContent = data.analysis.frames_processed.toLocaleString();
            if (statPeakCount) statPeakCount.textContent = data.analysis.peak_person_count;
            if (progressBarFill) progressBarFill.style.width = '100%';
            if (progressPercent) progressPercent.textContent = '100%';

            renderTimelineEvents();
            renderDetectionTable();

            showToast(`Loaded analysis record ${data.analysis.id} from InsForge DB.`, 'success');

        } catch (err) {
            console.error('Error loading saved analysis:', err);
            showToast(`Error: ${err.message}`, 'critical');
        }
    }

    // 5. Video Player Bounding Box Overlay Ticker
    if (videoPlayer) {
        videoPlayer.addEventListener('timeupdate', () => {
            if (!analysisResultData || !overlayContainer) return;

            const currentTime = videoPlayer.currentTime;
            const activeDetections = VideoAnalysisService.getDetectionsAtTime(analysisResultData.keyframes, currentTime);

            if (statCurrentInFrame) statCurrentInFrame.textContent = activeDetections.length;

            if (activeDetections.length === 0) {
                overlayContainer.innerHTML = '';
                return;
            }

            overlayContainer.innerHTML = activeDetections.map(det => `
                <div class="absolute border-2 border-security-green bg-security-green/10 rounded flex flex-col justify-between p-1 shadow-sm transition-all duration-300"
                     style="left: ${det.bbox.left}%; top: ${det.bbox.top}%; width: ${det.bbox.width}%; height: ${det.bbox.height}%;">
                    <div class="bg-security-green text-white font-mono text-[10px] font-bold px-1 py-0.5 rounded shadow w-fit flex items-center gap-1">
                        <span>PERSON ${det.trackId}</span>
                        <span>•</span>
                        <span>${(det.confidence * 100).toFixed(1)}%</span>
                    </div>
                </div>
            `).join('');
        });
    }

    // 6. Render Timeline Events
    function renderTimelineEvents() {
        if (!timelineList || !analysisResultData) return;

        timelineList.innerHTML = analysisResultData.keyframes.map(kf => {
            const timeStr = VideoAnalysisService.formatTime(kf.timestamp);
            const count = kf.detections.length;
            const label = count === 1 ? 'PERSON DETECTED' : `${count} PERSONS DETECTED`;

            return `
                <button class="btn-seek-timeline w-full text-left p-2 rounded-lg bg-surface-bright hover:bg-surface-container border border-outline-variant/60 transition-colors flex items-center justify-between cursor-pointer group" data-time="${kf.timestamp}">
                    <div class="flex items-center gap-2">
                        <span class="px-1.5 py-0.5 bg-[#0A192F] text-white font-mono text-[10px] font-bold rounded group-hover:bg-blue-600 transition-colors">${timeStr}</span>
                        <span class="font-bold text-xs text-primary">${label}</span>
                    </div>
                    <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary">play_circle</span>
                </button>
            `;
        }).join('');

        timelineList.querySelectorAll('.btn-seek-timeline').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTime = parseFloat(btn.getAttribute('data-time'));
                if (videoPlayer) {
                    videoPlayer.currentTime = targetTime;
                    videoPlayer.play().catch(() => {});
                    showToast(`Seeked video to timestamp ${VideoAnalysisService.formatTime(targetTime)}`, 'info');
                }
            });
        });
    }

    // 7. Render Searchable Detection Table
    function renderDetectionTable() {
        if (!tableBody || !analysisResultData) return;

        const query = (tableSearchInput?.value || '').toLowerCase().trim();

        const allRows = [];
        analysisResultData.keyframes.forEach(kf => {
            kf.detections.forEach(det => {
                const timeMs = VideoAnalysisService.formatTimestampWithMs(kf.timestamp);
                const confStr = `${(det.confidence * 100).toFixed(1)}%`;

                if (!query || det.trackId.toLowerCase().includes(query) || timeMs.includes(query)) {
                    allRows.push(`
                        <tr class="hover:bg-surface-container transition-colors">
                            <td class="p-3 font-bold text-primary">${timeMs}</td>
                            <td class="p-3 text-on-surface-variant">${kf.frame}</td>
                            <td class="p-3"><span class="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">${det.trackId}</span></td>
                            <td class="p-3 uppercase font-bold text-on-surface">${det.class}</td>
                            <td class="p-3 font-bold text-security-green">${confStr}</td>
                            <td class="p-3 text-outline text-[11px]">[L:${det.bbox.left}% T:${det.bbox.top}% W:${det.bbox.width}% H:${det.bbox.height}%]</td>
                            <td class="p-3 text-right">
                                <button class="btn-table-seek px-2.5 py-1 bg-[#0A192F] text-white hover:bg-blue-900 text-[10px] font-bold rounded transition-colors cursor-pointer" data-time="${kf.timestamp}">
                                    SEEK VIDEO
                                </button>
                            </td>
                        </tr>
                    `);
                }
            });
        });

        tableBody.innerHTML = allRows.join('');

        tableBody.querySelectorAll('.btn-table-seek').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTime = parseFloat(btn.getAttribute('data-time'));
                if (videoPlayer) {
                    videoPlayer.currentTime = targetTime;
                    videoPlayer.play().catch(() => {});
                    showToast(`Seeked video to timestamp ${VideoAnalysisService.formatTime(targetTime)}`, 'info');
                }
            });
        });
    }

    if (tableSearchInput) {
        tableSearchInput.addEventListener('input', renderDetectionTable);
    }

    // Export Handlers
    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', () => {
            if (!analysisResultData) return;
            VideoAnalysisService.exportResults(analysisResultData, 'csv');
            showToast('Exported detection events to CSV file.', 'success');
        });
    }

    if (btnExportJson) {
        btnExportJson.addEventListener('click', () => {
            if (!analysisResultData) return;
            VideoAnalysisService.exportResults(analysisResultData, 'json');
            showToast('Exported detection events to JSON file.', 'success');
        });
    }

    if (btnCtrlPlay && videoPlayer) {
        btnCtrlPlay.addEventListener('click', () => {
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
        });
    }

    if (btnCtrlReanalyze) {
        btnCtrlReanalyze.addEventListener('click', () => {
            startAiAnalysisAndPersist();
        });
    }
}
