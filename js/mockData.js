/**
 * IBVAP - Centralized Operational Mock Data
 * Realistic Indian Border Surveillance Datasets
 */

export const IBVAP_DATA = {
    systemInfo: {
        platformName: "IBVAP - Intelligent Border Video Analytics Platform",
        version: "v2.4 SECURE",
        commandCenter: "Command Center Alpha (BOP Punjab / Jammu Sector)",
        activeUser: {
            name: "Cmdr. A. Vance",
            rank: "Sector Commander",
            badgeId: "OFFICER-7749",
            clearance: "LEVEL 5 TOP SECRET",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        },
        kpis: {
            activeStreams: 48,
            totalStreams: 48,
            signalRetention: "100%",
            threatLevel: "HIGH (DEFCON LEVEL 3)",
            aiDetections24h: 1482,
            patrolUnitsActive: 4,
            modelAccuracy: "99.4%"
        }
    },

    cameras: [
        {
            id: "CAM-BOP-014",
            name: "Perimeter Wall B - Sector 4",
            sector: "Sector 4 - Wall B",
            status: "LIVE",
            threat: "CRITICAL",
            type: "Thermal + Optical Hybrid Sensor",
            fps: 30,
            latency: "42ms",
            coordinates: "31.5204° N, 74.3587° E",
            image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=80",
            detections: [
                { id: "T-01", type: "UNIDENTIFIED HUMAN", confidence: 94.2, box: { top: "32%", left: "42%", width: "90px", height: "160px" }, status: "CRITICAL" },
                { id: "T-02", type: "SUSPICIOUS VEHICLE", confidence: 91.8, box: { top: "50%", left: "70%", width: "140px", height: "90px" }, status: "WARNING" }
            ]
        },
        {
            id: "CAM-BOP-008",
            name: "North Guard Post - Sector 1",
            sector: "Sector 1 - Northern Post",
            status: "LIVE",
            threat: "SECURE",
            type: "Long-Range Optical PTZ",
            fps: 30,
            latency: "38ms",
            coordinates: "31.5312° N, 74.3641° E",
            image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80",
            detections: [
                { id: "T-03", type: "PATROL UNIT ALPHA", confidence: 98.6, box: { top: "40%", left: "30%", width: "60px", height: "60px" }, status: "SAFE" }
            ]
        },
        {
            id: "CAM-BOP-021",
            name: "River Bed Watch - Sector 7",
            sector: "Sector 7 - River Bed",
            status: "LIVE",
            threat: "WARNING",
            type: "IR Night Vision",
            fps: 30,
            latency: "45ms",
            coordinates: "31.5120° N, 74.3412° E",
            image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
            detections: [
                { id: "T-04", type: "THERMAL ANOMALY", confidence: 87.5, box: { top: "35%", left: "55%", width: "80px", height: "80px" }, status: "WARNING" }
            ]
        },
        {
            id: "CAM-BOP-033",
            name: "Checkpost 02 - Border Road",
            sector: "Sector 2 - Checkpost",
            status: "LIVE",
            threat: "SECURE",
            type: "ANPR Dual HD Lens",
            fps: 60,
            latency: "28ms",
            coordinates: "31.5450° N, 74.3800° E",
            image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop&q=80",
            detections: [
                { id: "T-05", type: "ANPR MATCH: MH 15 AB 1234", confidence: 98.9, box: { top: "45%", left: "20%", width: "150px", height: "100px" }, status: "SAFE" }
            ]
        }
    ],

    alerts: [
        {
            id: "EV-8847",
            severity: "CRITICAL",
            title: "Virtual Fence Intrusion Detected",
            location: "Sector 4 Perimeter Wall B",
            cameraId: "CAM-BOP-014",
            timestamp: "12:24:18 AM",
            confidence: "94.2%",
            status: "ACTIVE_INVESTIGATION",
            description: "Unidentified subject crossed restricted 50m virtual perimeter buffer zone at high speed.",
            evidenceFrame: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=80",
            timeline: [
                { time: "12:24:10 AM", event: "Motion Detected at Virtual Fence Zone 4B" },
                { time: "12:24:14 AM", event: "AI Target Classification: Human (94.2% Confidence)" },
                { time: "12:24:18 AM", event: "Boundary Breach Triggered - Automated Alert EV-8847 Issued" },
                { time: "12:24:25 AM", event: "Command Center Acknowledged Alert" }
            ]
        },
        {
            id: "EV-8846",
            severity: "WARNING",
            title: "Thermal Anomaly Detected",
            location: "Sector 7 River Bed",
            cameraId: "CAM-BOP-021",
            timestamp: "12:21:04 AM",
            confidence: "87.5%",
            status: "MONITORING",
            description: "Unexplained heat signature detected near riverbank embankment.",
            evidenceFrame: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
            timeline: [
                { time: "12:21:04 AM", event: "IR Sensor Temperature Spike (+4.2°C ambient)" }
            ]
        },
        {
            id: "EV-8845",
            severity: "INFO",
            title: "Patrol Unit Alpha Check-In",
            location: "Sector 1 Northern Post",
            cameraId: "CAM-BOP-008",
            timestamp: "12:15:00 AM",
            confidence: "98.6%",
            status: "RESOLVED",
            description: "Scheduled automated GPS and optical recognition check-in confirmed.",
            evidenceFrame: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80",
            timeline: [
                { time: "12:15:00 AM", event: "Unit Alpha RFID & Visual Verification Passed" }
            ]
        }
    ],

    anprRecords: [
        { plate: "MH 15 AB 1234", vehicle: "White SUV (Scorpio)", status: "REGISTERED", confidence: "98.9%", camera: "CAM-BOP-033", time: "12:20:15 AM", location: "Checkpost 02" },
        { plate: "RJ 14 CD 5678", vehicle: "Heavy Cargo Truck", status: "WATCHLIST", confidence: "96.4%", camera: "CAM-BOP-033", time: "12:18:02 AM", location: "Checkpost 02" },
        { plate: "WB 02 XY 9087", vehicle: "Dark Sedan", status: "UNKNOWN", confidence: "91.2%", camera: "CAM-BOP-014", time: "12:10:44 AM", location: "Border Road 07" }
    ],

    sectors: [
        { id: "S-1", name: "Sector 1 - Northern Post", status: "SECURE", activeCameras: 12, threatCount: 0 },
        { id: "S-2", name: "Sector 2 - Border Checkpost", status: "SECURE", activeCameras: 8, threatCount: 0 },
        { id: "S-4", name: "Sector 4 - Wall B Perimeter", status: "BREACH DETECTED", activeCameras: 14, threatCount: 1 },
        { id: "S-7", name: "Sector 7 - River Bed", status: "MONITORING", activeCameras: 14, threatCount: 1 }
    ],

    systemHealth: {
        aiEngine: { status: "OPERATIONAL", load: "42%", uptime: "99.98%" },
        storage: { status: "OPERATIONAL", usedGB: 8420, totalGB: 12000 },
        network: { status: "OPERATIONAL", latency: "14ms", bandwidthMbps: 450 },
        cameraNodes: { online: 48, offline: 0, degraded: 0 }
    }
};
