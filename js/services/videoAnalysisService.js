/**
 * IBVAP | AI Video Analysis Service
 * Modular Computer-Vision & Person Detection Engine Interface
 * Returns standardized frame-by-frame detection payloads with bounding box tracking
 */

export const VideoAnalysisService = {
    /**
     * Generate frame-by-frame mock AI detection keyframes for an uploaded video file
     */
    generateAnalysisSequence(durationSeconds = 154) {
        const fps = 30;
        const totalFrames = Math.floor(durationSeconds * fps);
        
        // Keyframe events with timestamps, track IDs, and bounding boxes
        const keyframes = [
            {
                timestamp: 12.42,
                frame: 372,
                detections: [
                    { trackId: "P-001", class: "person", confidence: 0.974, bbox: { left: 35, top: 25, width: 14, height: 42 } }
                ]
            },
            {
                timestamp: 18.87,
                frame: 566,
                detections: [
                    { trackId: "P-001", class: "person", confidence: 0.969, bbox: { left: 38, top: 28, width: 14, height: 40 } },
                    { trackId: "P-002", class: "person", confidence: 0.948, bbox: { left: 62, top: 32, width: 16, height: 45 } }
                ]
            },
            {
                timestamp: 34.15,
                frame: 1024,
                detections: [
                    { trackId: "P-001", class: "person", confidence: 0.982, bbox: { left: 45, top: 30, width: 15, height: 44 } },
                    { trackId: "P-002", class: "person", confidence: 0.935, bbox: { left: 55, top: 35, width: 15, height: 42 } },
                    { trackId: "P-003", class: "person", confidence: 0.912, bbox: { left: 20, top: 40, width: 18, height: 48 } }
                ]
            },
            {
                timestamp: 65.40,
                frame: 1962,
                detections: [
                    { trackId: "P-001", class: "person", confidence: 0.961, bbox: { left: 50, top: 32, width: 14, height: 41 } },
                    { trackId: "P-002", class: "person", confidence: 0.954, bbox: { left: 40, top: 36, width: 16, height: 44 } },
                    { trackId: "P-003", class: "person", confidence: 0.928, bbox: { left: 25, top: 38, width: 17, height: 46 } },
                    { trackId: "P-004", class: "person", confidence: 0.897, bbox: { left: 75, top: 22, width: 13, height: 38 } }
                ]
            },
            {
                timestamp: 108.20,
                frame: 3246,
                detections: [
                    { trackId: "P-001", class: "person", confidence: 0.978, bbox: { left: 58, top: 30, width: 15, height: 43 } },
                    { trackId: "P-004", class: "person", confidence: 0.941, bbox: { left: 72, top: 25, width: 14, height: 39 } },
                    { trackId: "P-005", class: "person", confidence: 0.923, bbox: { left: 15, top: 45, width: 19, height: 50 } }
                ]
            },
            {
                timestamp: 138.90,
                frame: 4167,
                detections: [
                    { trackId: "P-005", class: "person", confidence: 0.955, bbox: { left: 22, top: 42, width: 18, height: 47 } },
                    { trackId: "P-006", class: "person", confidence: 0.931, bbox: { left: 80, top: 35, width: 13, height: 38 } }
                ]
            }
        ];

        return {
            metadata: {
                totalFrames,
                fps,
                durationSeconds,
                totalUniquePersons: 6,
                peakPersonCount: 4,
                totalDetectionsCount: 13,
                processingTimeSeconds: 4.8
            },
            keyframes
        };
    },

    /**
     * Get detections active at a specific timestamp
     */
    getDetectionsAtTime(keyframes, timeInSeconds) {
        if (!keyframes || keyframes.length === 0) return [];

        // Find nearest keyframe within 3.5 seconds
        const match = keyframes.find(kf => Math.abs(kf.timestamp - timeInSeconds) <= 3.5);
        return match ? match.detections : [];
    },

    /**
     * Format duration seconds to MM:SS
     */
    formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Format timestamp with milliseconds (00:00.00)
     */
    formatTimestampWithMs(seconds) {
        if (isNaN(seconds) || seconds < 0) return "00:00.00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 100);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    },

    /**
     * Export analysis results to CSV or JSON format
     */
    exportResults(analysisData, format = 'csv') {
        const { keyframes } = analysisData;

        if (format === 'json') {
            const jsonStr = JSON.stringify(analysisData, null, 2);
            this.downloadFile(jsonStr, 'IBVAP_Video_Analysis_Detections.json', 'application/json');
        } else {
            let csvContent = "Timestamp,Frame,TrackID,Object,Confidence,BBox_Left,BBox_Top,BBox_Width,BBox_Height\n";
            keyframes.forEach(kf => {
                kf.detections.forEach(det => {
                    csvContent += `${kf.timestamp},${kf.frame},${det.trackId},${det.class},${(det.confidence * 100).toFixed(1)}%,${det.bbox.left}%,${det.bbox.top}%,${det.bbox.width}%,${det.bbox.height}%\n`;
                });
            });
            this.downloadFile(csvContent, 'IBVAP_Video_Analysis_Detections.csv', 'text/csv');
        }
    },

    downloadFile(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    }
};
