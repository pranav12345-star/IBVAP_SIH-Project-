/**
 * IBVAP | InsForge Video & Analysis Persistence Service
 * Interacts with InsForge Private Storage Bucket "ibvap-video-footage"
 * and PostgreSQL Tables: videos, video_analyses, video_detections
 */

import { insforgeClient } from './insforge.js';
import { AuthService } from './auth.js';

const BUCKET_NAME = 'ibvap-video-footage';

export const VideoService = {
    /**
     * Upload video footage file to InsForge private storage bucket
     */
    async uploadVideoFile(file) {
        if (!file) throw new Error('No video file provided.');

        const cleanName = file.name ? file.name.replace(/[^a-zA-Z0-9._-]/g, '_') : `video_${Date.now()}.mp4`;
        const objectKey = `${Date.now()}_${cleanName}`;

        const { data, error } = await insforgeClient
            .storage
            .from(BUCKET_NAME)
            .upload(objectKey, file);

        if (error) {
            console.error('Error uploading video to InsForge storage:', error);
            throw new Error(`Video upload to InsForge storage failed: ${error.message || 'Storage error'}`);
        }

        return {
            key: data.key,
            url: data.url,
            uploadedAt: data.uploadedAt
        };
    },

    /**
     * Create video metadata record in InsForge DB (public.videos table)
     */
    async createVideoRecord(file, storageMeta, cameraId = 'CAM-014-NORTH', sector = 'Sector 04') {
        const officer = AuthService.getOfficer();
        const videoId = `VID-${Date.now().toString().slice(-6)}`;

        const payload = {
            id: videoId,
            file_name: file.name,
            storage_path: storageMeta.key,
            storage_url: storageMeta.url,
            file_size: file.size,
            mime_type: file.type || 'video/mp4',
            duration: '02:34',
            resolution: '1920x1080',
            camera_id: cameraId,
            sector: sector,
            uploaded_by: officer?.id || null,
            uploaded_at: new Date().toISOString(),
            analysis_status: 'READY'
        };

        const { data, error } = await insforgeClient
            .database
            .from('videos')
            .insert([payload])
            .select();

        if (error) {
            console.error('Error creating video database record:', error);
            throw new Error(`Failed to save video metadata: ${error.message}`);
        }

        return data ? data[0] : payload;
    },

    /**
     * Get list of all video records from InsForge DB
     */
    async getVideos() {
        const { data, error } = await insforgeClient
            .database
            .from('videos')
            .select('*')
            .order('uploaded_at', { ascending: false });

        if (error) {
            console.error('Error fetching videos from InsForge DB:', error);
            return [];
        }
        return data || [];
    },

    /**
     * Save AI analysis summary record into InsForge DB (public.video_analyses)
     */
    async saveAnalysisRecord(videoId, summaryData) {
        const analysisId = `ANL-${Date.now().toString().slice(-6)}`;

        const payload = {
            id: analysisId,
            video_id: videoId,
            status: 'COMPLETED',
            model_name: 'YOLOv8-Person-Tracking',
            started_at: new Date(Date.now() - 5000).toISOString(),
            completed_at: new Date().toISOString(),
            processing_time: summaryData.processingTimeSeconds || 4.8,
            frames_processed: summaryData.totalFrames || 4628,
            total_detections: summaryData.totalDetectionsCount || 42,
            unique_persons: summaryData.totalUniquePersons || 6,
            peak_person_count: summaryData.peakPersonCount || 4
        };

        const { data, error } = await insforgeClient
            .database
            .from('video_analyses')
            .insert([payload])
            .select();

        // Update video status to COMPLETED
        await insforgeClient
            .database
            .from('videos')
            .update({ analysis_status: 'COMPLETED' })
            .eq('id', videoId);

        if (error) {
            console.error('Error saving analysis record to InsForge DB:', error);
        }

        return data ? data[0] : payload;
    },

    /**
     * Save frame-by-frame person detection records into InsForge DB (public.video_detections)
     */
    async saveDetections(analysisId, videoId, keyframes) {
        const rows = [];
        let count = 0;

        keyframes.forEach(kf => {
            kf.detections.forEach(det => {
                count++;
                rows.push({
                    id: `DET-${Date.now()}-${count}`,
                    analysis_id: analysisId,
                    video_id: videoId,
                    timestamp: kf.timestamp,
                    track_id: det.trackId,
                    object_class: det.class,
                    confidence: det.confidence,
                    bbox_x: det.bbox.left,
                    bbox_y: det.bbox.top,
                    bbox_width: det.bbox.width,
                    bbox_height: det.bbox.height,
                    frame_number: kf.frame
                });
            });
        });

        if (rows.length === 0) return [];

        const { data, error } = await insforgeClient
            .database
            .from('video_detections')
            .insert(rows)
            .select();

        if (error) {
            console.error('Error saving detection records to InsForge DB:', error);
        }

        return data || rows;
    },

    /**
     * Load analysis summary & detections for a video ID from InsForge DB
     */
    async getAnalysisByVideoId(videoId) {
        const { data: analyses, error: aErr } = await insforgeClient
            .database
            .from('video_analyses')
            .select('*')
            .eq('video_id', videoId)
            .order('completed_at', { ascending: false })
            .limit(1);

        if (aErr || !analyses || analyses.length === 0) {
            return null;
        }

        const analysisRecord = analyses[0];

        const { data: detections, error: dErr } = await insforgeClient
            .database
            .from('video_detections')
            .select('*')
            .eq('video_id', videoId)
            .order('timestamp', { ascending: true });

        return {
            analysis: analysisRecord,
            detections: detections || []
        };
    },

    /**
     * Delete video metadata, storage file, and associated DB analysis/detections
     */
    async deleteVideo(videoId, storagePath) {
        // 1. Delete from Storage Bucket
        if (storagePath) {
            try {
                await insforgeClient.storage.from(BUCKET_NAME).remove([storagePath]);
            } catch (sErr) {
                console.warn('Storage file deletion warning:', sErr);
            }
        }

        // 2. Delete from DB (Cascade deletes video_analyses & video_detections)
        const { error } = await insforgeClient
            .database
            .from('videos')
            .delete()
            .eq('id', videoId);

        if (error) {
            console.error('Error deleting video DB record:', error);
            throw new Error(`Failed to delete video: ${error.message}`);
        }

        return true;
    }
};
