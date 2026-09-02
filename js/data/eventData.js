/**
 * IBVAP | Centralized Security Event Audit Dataset
 * High-density operational border security incident records
 */

export const SECURITY_EVENTS_DATA = [
    {
        id: "EV-8847",
        timestamp: "12:24:18 AM",
        date: "2026-08-31",
        camera: "CAM-014-NORTH",
        sector: "Sector 04",
        eventType: "Intrusion",
        title: "Virtual Fence Intrusion Detected",
        description: "Unidentified subject crossed restricted 50m virtual perimeter buffer zone at high speed.",
        severity: "CRITICAL",
        confidence: "96.8%",
        status: "UNDER INVESTIGATION",
        coordinates: "28.6139° N, 70.2193° E",
        evidenceFrame: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=80",
        timeline: [
            { time: "12:20:31 AM", event: "Person target detected by thermal sensor" },
            { time: "12:22:04 AM", event: "Virtual fence boundary crossed" },
            { time: "12:24:18 AM", event: "Critical alert EV-8847 generated" },
            { time: "12:25:02 AM", event: "Command Officer notified via InsForge events" },
            { time: "12:27:41 AM", event: "Investigation started by Cmdr. Vance" }
        ]
    },
    {
        id: "EV-8846",
        timestamp: "12:21:04 AM",
        date: "2026-08-31",
        camera: "CAM-BOP-033",
        sector: "Sector 02",
        eventType: "ANPR",
        title: "ANPR Watchlist Match - Heavy Cargo Truck",
        description: "Vehicle plate RJ 14 CD 5678 matched national intelligence watchlist DB at Checkpost 02.",
        severity: "HIGH",
        confidence: "96.4%",
        status: "ACTIVE",
        coordinates: "28.6210° N, 70.2280° E",
        evidenceFrame: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop&q=80",
        timeline: [
            { time: "12:18:02 AM", event: "Vehicle entered ANPR capture lane" },
            { time: "12:19:15 AM", event: "License plate recognized: RJ 14 CD 5678" },
            { time: "12:21:04 AM", event: "Watchlist match confirmed - Security Alert issued" }
        ]
    },
    {
        id: "EV-8845",
        timestamp: "12:15:00 AM",
        date: "2026-08-31",
        camera: "CAM-031-RIVER",
        sector: "Sector 07",
        eventType: "Thermal Anomaly",
        title: "IR Heat Signature Anomaly at Embankment",
        description: "Thermal vision detected elevated heat signature (+4.2°C ambient) in river bed sector.",
        severity: "MEDIUM",
        confidence: "87.5%",
        status: "MONITORING",
        coordinates: "28.6012° N, 70.2011° E",
        evidenceFrame: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
        timeline: [
            { time: "12:15:00 AM", event: "IR sensor temperature spike detected" },
            { time: "12:16:22 AM", event: "Automated PTZ pan initiated to lock coordinates" }
        ]
    },
    {
        id: "EV-8844",
        timestamp: "12:08:33 AM",
        date: "2026-08-31",
        camera: "CAM-022-GATE",
        sector: "Sector 03",
        eventType: "Vehicle Detection",
        title: "Speed Anomaly - Unidentified Convoy",
        description: "SUV traveling at 84 km/h approaching border entry gate 03.",
        severity: "HIGH",
        confidence: "93.1%",
        status: "ACKNOWLEDGED",
        coordinates: "28.6300° N, 70.2400° E",
        evidenceFrame: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80",
        timeline: [
            { time: "12:07:10 AM", event: "Radar speed tracker locked target at 84 km/h" },
            { time: "12:08:33 AM", event: "Checkpost automated barrier deployed" }
        ]
    },
    {
        id: "EV-8843",
        timestamp: "11:58:12 PM",
        date: "2026-08-30",
        camera: "CAM-008-NORTH",
        sector: "Sector 01",
        eventType: "Person Detection",
        title: "Night Vision Target Tracking",
        description: "Person target P-008 tracked moving parallel to border perimeter wire.",
        severity: "LOW",
        confidence: "91.8%",
        status: "RESOLVED",
        coordinates: "28.6412° N, 70.2510° E",
        evidenceFrame: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=80",
        timeline: [
            { time: "11:55:00 PM", event: "Target identified near perimeter wire" },
            { time: "11:58:12 PM", event: "Verified as authorized BSF patrol foot unit" }
        ]
    },
    {
        id: "EV-8842",
        timestamp: "11:45:00 PM",
        date: "2026-08-30",
        camera: "CAM-031-RIVER",
        sector: "Sector 07",
        eventType: "Camera Health",
        title: "Video Stream Signal Retraining Event",
        description: "Camera CAM-031-RIVER experienced 3% packet drop. Auto-switched to redundant optical link.",
        severity: "INFO",
        confidence: "99.9%",
        status: "RESOLVED",
        coordinates: "28.6012° N, 70.2011° E",
        evidenceFrame: null,
        timeline: [
            { time: "11:45:00 PM", event: "Network heartbeat latency 140ms" },
            { time: "11:45:02 PM", event: "Auto failover to fiber optic secondary channel" }
        ]
    },
    {
        id: "EV-8841",
        timestamp: "11:30:15 PM",
        date: "2026-08-30",
        camera: "CAM-014-NORTH",
        sector: "Sector 04",
        eventType: "Patrol Event",
        title: "Patrol Unit Bravo Checkpoint Verification",
        description: "RFID badge sync & optical face verification completed for Officer M. Sharma.",
        severity: "INFO",
        confidence: "99.4%",
        status: "RESOLVED",
        coordinates: "28.6139° N, 70.2193° E",
        evidenceFrame: null,
        timeline: [
            { time: "11:30:15 PM", event: "Patrol unit RFID scan success" }
        ]
    },
    {
        id: "EV-8840",
        timestamp: "11:12:00 PM",
        date: "2026-08-30",
        camera: "CAM-005-WEST",
        sector: "Sector 01",
        eventType: "Intrusion",
        title: "Fence Vibration Sensor Alert",
        description: "Piezoelectric sensor S-14 detected perimeter fence physical movement.",
        severity: "MEDIUM",
        confidence: "88.2%",
        status: "RESOLVED",
        coordinates: "28.6380° N, 70.2480° E",
        evidenceFrame: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&auto=format&fit=crop&q=80",
        timeline: [
            { time: "11:12:00 PM", event: "Fence sensor vibration trigger" },
            { time: "11:14:00 PM", event: "Camera verified wildlife activity (Nilgai)" }
        ]
    },
    {
        id: "EV-8839",
        timestamp: "10:54:20 PM",
        date: "2026-08-30",
        camera: "CAM-BOP-033",
        sector: "Sector 02",
        eventType: "ANPR",
        title: "ANPR Plate Capture - MH 15 AB 1234",
        description: "Registered white Scorpio SUV verified at Checkpost 02.",
        severity: "INFO",
        confidence: "98.9%",
        status: "RESOLVED",
        coordinates: "28.6210° N, 70.2280° E",
        evidenceFrame: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&auto=format&fit=crop&q=80",
        timeline: [
            { time: "10:54:20 PM", event: "ANPR verification passed" }
        ]
    },
    {
        id: "EV-8838",
        timestamp: "10:35:10 PM",
        date: "2026-08-30",
        camera: "CAM-019-SOUTH",
        sector: "Sector 03",
        eventType: "System Event",
        title: "InsForge Database Sync Benchmark",
        description: "Synced 420 AI detection frames to InsForge PostgreSQL database.",
        severity: "INFO",
        confidence: "100.0%",
        status: "RESOLVED",
        coordinates: "28.6250° N, 70.2350° E",
        evidenceFrame: null,
        timeline: [
            { time: "10:35:10 PM", event: "InsForge BaaS backup cycle completed" }
        ]
    }
];
