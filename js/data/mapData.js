/**
 * IBVAP | Border Operations Map Data Store
 * Centralized operational datasets for map visualization, layers, markers, threats, and events.
 */

export const SECTORS = [
    { id: 'ALL', name: 'ALL SECTORS', code: 'SECTOR-ALL', activeThreats: 3, totalCameras: 48, onlineCameras: 42 },
    { id: 'SECTOR_01', name: 'SECTOR 01 (WEST)', code: 'SECTOR-01', center: { x: 20, y: 35 }, activeThreats: 0, totalCameras: 12, onlineCameras: 11 },
    { id: 'SECTOR_02', name: 'SECTOR 02 (NORTH-WEST)', code: 'SECTOR-02', center: { x: 45, y: 30 }, activeThreats: 1, totalCameras: 12, onlineCameras: 10 },
    { id: 'SECTOR_03', name: 'SECTOR 03 (RIVER GATE)', code: 'SECTOR-03', center: { x: 65, y: 55 }, activeThreats: 0, totalCameras: 12, onlineCameras: 11 },
    { id: 'SECTOR_04', name: 'SECTOR 04 (COMMAND CHECKPOINT)', code: 'SECTOR-04', center: { x: 80, y: 40 }, activeThreats: 2, totalCameras: 12, onlineCameras: 10 }
];

export const MAP_CAMERAS = [
    {
        id: 'CAM-014-NORTH',
        name: 'Sector 04 Perimeter Checkpoint',
        sector: 'SECTOR_04',
        sectorName: 'Sector 04',
        status: 'CRITICAL',
        statusText: 'ACTIVE THREAT',
        type: 'PTZ 4K Thermal IR',
        x: 75,
        y: 32,
        persons: 3,
        vehicles: 1,
        threatLevel: 'CRITICAL',
        coordinates: '28.6139° N, 70.2193° E',
        cctvUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop',
        lastDetection: 'Virtual Fence Intrusion (97.4% Confidence)',
        alertId: 'EV-8847'
    },
    {
        id: 'CAM-022-GATE',
        name: 'Main Transit Checkpoint Gate',
        sector: 'SECTOR_04',
        sectorName: 'Sector 04',
        status: 'ONLINE',
        statusText: 'ONLINE',
        type: 'Fixed Optical + ANPR 4K',
        x: 82,
        y: 48,
        persons: 1,
        vehicles: 2,
        threatLevel: 'MEDIUM',
        coordinates: '28.6182° N, 70.2241° E',
        cctvUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=800&auto=format&fit=crop',
        lastDetection: 'SUV Vehicle Target (93.4% Confidence)',
        alertId: 'EV-8846'
    },
    {
        id: 'CAM-008-NORTH',
        name: 'Ridge Line High Thermal Watch',
        sector: 'SECTOR_02',
        sectorName: 'Sector 02',
        status: 'ONLINE',
        statusText: 'ONLINE',
        type: 'Long-Range Thermal IR',
        x: 42,
        y: 28,
        persons: 1,
        vehicles: 0,
        threatLevel: 'LOW',
        coordinates: '28.6410° N, 70.1852° E',
        cctvUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop',
        lastDetection: 'Human Movement Detected (96.8% Confidence)',
        alertId: 'EV-8844'
    },
    {
        id: 'CAM-003-WEST',
        name: 'West Outpost Outer Perimeter',
        sector: 'SECTOR_01',
        sectorName: 'Sector 01',
        status: 'ONLINE',
        statusText: 'ONLINE',
        type: 'PTZ Dome 360',
        x: 22,
        y: 38,
        persons: 0,
        vehicles: 0,
        threatLevel: 'LOW',
        coordinates: '28.5992° N, 70.1410° E',
        cctvUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop',
        lastDetection: 'Perimeter Normal',
        alertId: null
    },
    {
        id: 'CAM-031-RIVER',
        name: 'River Crossing Delta Monitor',
        sector: 'SECTOR_03',
        sectorName: 'Sector 03',
        status: 'DEGRADED',
        statusText: 'SIGNAL DEGRADED',
        type: 'Submersible Night-Vision',
        x: 62,
        y: 60,
        persons: 0,
        vehicles: 0,
        threatLevel: 'LOW',
        coordinates: '28.6045° N, 70.1980° E',
        cctvUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
        lastDetection: 'Low Bandwidth Stream',
        alertId: null
    },
    {
        id: 'CAM-019-RIDGE',
        name: 'North Ridge Slope Radar Cam',
        sector: 'SECTOR_02',
        sectorName: 'Sector 02',
        status: 'ONLINE',
        statusText: 'ONLINE',
        type: 'Dual-Sensor Optical/Thermal',
        x: 50,
        y: 22,
        persons: 0,
        vehicles: 0,
        threatLevel: 'LOW',
        coordinates: '28.6521° N, 70.1912° E',
        cctvUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        lastDetection: 'Perimeter Safe',
        alertId: null
    }
];

export const MAP_BOPS = [
    { id: 'BOP-014', name: 'BOP-014 Command Checkpoint', sector: 'SECTOR_04', x: 78, y: 35, status: 'ALERT', personnel: 24, commander: 'Capt. R. Sharma' },
    { id: 'BOP-012', name: 'BOP-012 North Base', sector: 'SECTOR_02', x: 40, y: 32, status: 'NORMAL', personnel: 18, commander: 'Lt. K. Verma' },
    { id: 'BOP-008', name: 'BOP-008 West Post', sector: 'SECTOR_01', x: 20, y: 42, status: 'NORMAL', personnel: 16, commander: 'Sub. P. Singh' },
    { id: 'BOP-003', name: 'BOP-003 River Watch Base', sector: 'SECTOR_03', x: 60, y: 64, status: 'NORMAL', personnel: 20, commander: 'Capt. M. Rao' }
];

export const MAP_THREATS = [
    {
        id: 'THREAT-101',
        title: 'Virtual Fence Breach Intrusion',
        severity: 'CRITICAL',
        sector: 'SECTOR_04',
        cameraId: 'CAM-014-NORTH',
        coordinates: '28.6139° N, 70.2193° E',
        timestamp: '23:41:02 UTC',
        confidence: 97.4,
        x: 75,
        y: 32,
        status: 'ACTIVE',
        details: '3 Unidentified individuals crossed secondary virtual fence vector at Sector 04.',
        alertId: 'EV-8847'
    },
    {
        id: 'THREAT-102',
        title: 'Unauthorized Vehicle Staging',
        severity: 'HIGH',
        sector: 'SECTOR_04',
        cameraId: 'CAM-022-GATE',
        coordinates: '28.6182° N, 70.2241° E',
        timestamp: '23:38:15 UTC',
        confidence: 93.4,
        x: 82,
        y: 48,
        status: 'ACTIVE',
        details: 'High speed SUV approaching restricted perimeter buffer zone without valid transponder.',
        alertId: 'EV-8846'
    },
    {
        id: 'THREAT-103',
        title: 'Thermal Heat Anomaly',
        severity: 'MEDIUM',
        sector: 'SECTOR_02',
        cameraId: 'CAM-008-NORTH',
        coordinates: '28.6410° N, 70.1852° E',
        timestamp: '23:30:40 UTC',
        confidence: 96.8,
        x: 42,
        y: 28,
        status: 'MONITORING',
        details: 'Single person movement detected along high ridge line.',
        alertId: 'EV-8844'
    }
];

export const PERSON_DETECTIONS = [
    { id: 'DET-P1', trackId: 'P-001', confidence: 97.4, cameraId: 'CAM-014-NORTH', sector: 'SECTOR_04', x: 74, y: 31, timestamp: '12:42:18' },
    { id: 'DET-P2', trackId: 'P-002', confidence: 96.8, cameraId: 'CAM-008-NORTH', sector: 'SECTOR_02', x: 43, y: 29, timestamp: '12:41:05' }
];

export const VEHICLE_DETECTIONS = [
    { id: 'DET-V1', type: 'SUV (Black)', plate: 'DL-01-AX-9941', confidence: 93.4, cameraId: 'CAM-022-GATE', sector: 'SECTOR_04', x: 83, y: 49, timestamp: '12:41:52' }
];

export const RECENT_MAP_EVENTS = [
    { id: 1, time: '12:42:18', type: 'PERSON DETECTED', detail: 'CAM-014-NORTH • Confidence: 97.4%', severity: 'HIGH' },
    { id: 2, time: '12:41:52', type: 'VEHICLE DETECTED', detail: 'CAM-022-GATE • SUV Target (93.4%)', severity: 'MEDIUM' },
    { id: 3, time: '12:40:31', type: 'VIRTUAL FENCE BREACH', detail: 'SECTOR 04 Checkpoint Vector', severity: 'CRITICAL' },
    { id: 4, time: '12:39:18', type: 'CAMERA DEGRADED', detail: 'CAM-031-RIVER • Signal Loss Warning', severity: 'LOW' },
    { id: 5, time: '12:35:04', type: 'BOP SYNCHRONIZED', detail: 'BOP-014 Sector 04 Command Online', severity: 'INFO' }
];
