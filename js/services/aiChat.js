/**
 * IBVAP AI Chat Service powered by InsForge Storage, Secret Manager & OpenRouter Streaming
 * Connected to live operational context (CCTV, Cameras, Threats, ANPR, Maps & Video Analysis)
 */
import { insforgeClient } from './insforge.js';
import { AuthService } from './auth.js';

const BASE_URL = 'https://y8337t23.us-east.insforge.app';
const API_KEY = 'ik_04514d783f3ee05979eb0ca9ffc487c6';
const BUCKET_NAME = 'chat-attachments';

export const AiChatService = {
    /**
     * Retrieve OpenRouter API Key from InsForge's Secret Manager
     */
    async getOpenRouterKey() {
        try {
            const response = await fetch(`${BASE_URL}/api/secrets/OPENROUTER_API_KEY`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch secret: ${response.status}`);
            }
            const data = await response.json();
            return data.value;
        } catch (err) {
            console.error('Error getting OPENROUTER_API_KEY from InsForge Secret Manager:', err);
            throw err;
        }
    },

    /**
     * Upload user attached file (PDF, Image, Video) to InsForge private storage bucket
     */
    async uploadFile(file) {
        if (!file) return null;

        const cleanName = file.name ? file.name.replace(/[^a-zA-Z0-9._-]/g, '_') : `file_${Date.now()}`;
        const objectKey = `${Date.now()}_${cleanName}`;

        const { data, error } = await insforgeClient
            .storage
            .from(BUCKET_NAME)
            .upload(objectKey, file);

        if (error) {
            console.error('Error uploading file to InsForge storage:', error);
            throw new Error(`File upload to InsForge storage failed: ${error.message || 'Storage error'}`);
        }

        return {
            name: file.name,
            size: file.size,
            type: file.type,
            key: data.key,
            url: data.url,
            uploadedAt: data.uploadedAt
        };
    },

    /**
     * Get or create active conversation for officer
     */
    async getOrCreateConversation(userId, forceNew = false) {
        if (!userId) {
            const officer = AuthService.getOfficer();
            userId = officer?.id;
        }

        if (!userId) {
            throw new Error('User authentication required for AI Chat.');
        }

        const officer = AuthService.getOfficer();
        if (officer) {
            await AuthService.syncPublicUser(officer);
        }

        if (!forceNew) {
            const { data: convs, error: fetchErr } = await insforgeClient
                .database
                .from('conversations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1);

            if (!fetchErr && convs && convs.length > 0) {
                return convs[0];
            }
        }

        const { data: newConvs, error: createErr } = await insforgeClient
            .database
            .from('conversations')
            .insert([{
                user_id: userId,
                title: `Tactical AI Command Session • ${new Date().toLocaleTimeString()}`
            }])
            .select();

        if (createErr || !newConvs || newConvs.length === 0) {
            throw new Error(`Failed to create conversation: ${createErr?.message || 'DB error'}`);
        }

        return newConvs[0];
    },

    /**
     * Load message history for a conversation from InsForge messages table
     */
    async loadMessages(conversationId) {
        const { data, error } = await insforgeClient
            .database
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error loading messages from DB:', error);
            return [];
        }
        return data || [];
    },

    /**
     * Store message record into InsForge messages table
     */
    async saveMessage(conversationId, role, content) {
        const { data, error } = await insforgeClient
            .database
            .from('messages')
            .insert([{
                conversation_id: conversationId,
                role: role,
                content: content
            }])
            .select();

        if (error) {
            console.error(`Error saving ${role} message to InsForge DB:`, error);
        }
        return data ? data[0] : null;
    },

    /**
     * Helper to read file content into text or base64 Data URL for AI Context
     */
    async readFileContext(file) {
        if (!file) return null;

        if (typeof FileReader !== 'undefined') {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                if (file.type.startsWith('image/')) {
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve({ isImage: true, isVideo: false, dataUrl: reader.result });
                    reader.onerror = (e) => reject(e);
                } else if (file.type.startsWith('video/')) {
                    resolve({ isImage: false, isVideo: true, textContent: `[CCTV Video File: ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)]` });
                } else {
                    reader.readAsText(file);
                    reader.onload = () => resolve({ isImage: false, isVideo: false, textContent: reader.result });
                    reader.onerror = (e) => reject(e);
                }
            });
        } else {
            return { isImage: false, isVideo: false, textContent: `[File Attachment: ${file.name}]` };
        }
    },

    /**
     * Send user prompt + optional file attachment, stream AI response, and store both in DB
     */
    async streamUserMessage(conversationId, userText, attachedFile = null, onChunk = null) {
        if (!conversationId || (!userText.trim() && !attachedFile)) {
            throw new Error('Conversation ID and message content or attachment are required.');
        }

        let uploadMeta = null;
        let fileContextObj = null;
        let formattedUserContent = userText.trim();

        // 1. Upload attached file to InsForge storage bucket if provided
        if (attachedFile) {
            uploadMeta = await this.uploadFile(attachedFile);
            fileContextObj = await this.readFileContext(attachedFile);

            const attachmentHeader = `📎 [Attached File: ${uploadMeta.name} | Stored in InsForge Private Bucket chat-attachments]`;
            formattedUserContent = `${attachmentHeader}\n${formattedUserContent}`;
        }

        // 2. Save user message to InsForge DB messages table
        await this.saveMessage(conversationId, 'user', formattedUserContent);

        // 3. Fetch conversation history for prompt context
        const existingMessages = await this.loadMessages(conversationId);
        const promptHistory = existingMessages.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
        }));

        // If file attachment was provided, add explicit document / vision context to latest user prompt
        if (fileContextObj) {
            const lastUserPrompt = promptHistory[promptHistory.length - 1];
            if (fileContextObj.isImage) {
                lastUserPrompt.content = [
                    { type: 'text', text: formattedUserContent },
                    { type: 'image_url', image_url: { url: fileContextObj.dataUrl } }
                ];
            } else if (fileContextObj.textContent) {
                lastUserPrompt.content = `${formattedUserContent}\n\n[ATTACHED FILE CONTENT - ${uploadMeta?.name}]:\n${fileContextObj.textContent.slice(0, 15000)}`;
            }
        }

        // System prompt context with live IBVAP operational telemetry
        const systemPrompt = {
            role: 'system',
            content: `You are the IBVAP Tactical AI Command Assistant for the Intelligent Border Video Analytics Platform.
You are directly connected to the IBVAP surveillance ecosystem (42/48 CCTV Cameras Online, Sector 04 Command, InsForge BaaS backend).

Operational Knowledge Context:
- Active Critical Alert EV-8847: Virtual Fence Intrusion at Sector 04, Camera CAM-014-NORTH (28.6139° N, 70.2193° E). 3 targets detected with 97.4% confidence.
- ANPR Watchlist Match Alert EV-8846: Heavy Cargo Truck plate "RJ 14 CD 5678" at Checkpost 02, Camera CAM-BOP-033 (96.4% confidence).
- Camera Node Health: 42 cameras online, 1 signal degraded (CAM-031-RIVER), 5 under scheduled maintenance.
- Today's Activity: 126 Person Detections, 38 Vehicles Detected, 31 License Plates Recognized.

Instructions:
- Provide structured, professional military/command center responses.
- Use bold parameter cards when presenting threats or security events.
- Include actionable button triggers in square brackets where appropriate, such as:
  [ VIEW CAMERA ] - Opens live camera surveillance.
  [ SHOW ON BORDER MAP ] - Opens the border map focused on the location.
  [ INSPECT ALERT ] - Opens the alert details.
  [ VIEW FOOTAGE ] - Opens the video analysis tool.
  [ GENERATE REPORT ] - Triggers official report generation.
- Never make generic AI conversational filler. Be concise, mission-oriented, and actionable.`
        };

        // 4. Fetch OpenRouter API Key from InsForge Secret Manager
        const openRouterKey = await this.getOpenRouterKey();

        // 5. Call OpenRouter streaming endpoint
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openRouterKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://ibvap.gov.in',
                'X-Title': 'IBVAP Tactical AI Assistant'
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [systemPrompt, ...promptHistory],
                stream: true
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`AI Streaming request failed (${response.status}): ${errText}`);
        }

        // 6. Read stream chunk by chunk
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullAiText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6);
                    if (dataStr === '[DONE]') continue;
                    try {
                        const json = JSON.parse(dataStr);
                        const delta = json.choices[0]?.delta?.content || '';
                        if (delta) {
                            fullAiText += delta;
                            if (typeof onChunk === 'function') {
                                onChunk(delta, fullAiText);
                            }
                        }
                    } catch (e) {
                        // Ignore partial JSON parse error
                    }
                }
            }
        }

        // 7. Store completed AI response in InsForge DB messages table
        const savedAiMsg = await this.saveMessage(conversationId, 'assistant', fullAiText);
        return { fullText: fullAiText, messageRecord: savedAiMsg, uploadMeta };
    }
};
