/**
 * Client-Side Router & Route Guard Controller for IBVAP
 */
import { AuthService } from './services/auth.js';
import { renderNavbar } from './components/navbar.js';
import { renderSidebar } from './components/sidebar.js';
import { showToast } from './components/toast.js';

import { renderDashboardView } from './views/dashboardView.js';
import { renderSurveillanceView } from './views/surveillanceView.js';
import { renderAlertView } from './views/alertView.js';
import { renderMapView, attachMapInteractions } from './views/mapView.js';
import { renderAnalyticsView, attachAnalyticsInteractions } from './views/analyticsView.js';
import { renderIntrusionView } from './views/intrusionView.js';
import { renderEventsView, attachEventsInteractions } from './views/eventsView.js';
import { renderHealthView } from './views/healthView.js';
import { renderLoginView } from './views/loginView.js';
import { renderAiChatView } from './views/aiChatView.js';
import { renderBorderCamerasView, attachBorderCamerasInteractions } from './views/borderCamerasView.js';
import { renderVideoAnalysisView, attachVideoAnalysisInteractions } from './views/videoAnalysisView.js';
import { AiChatService } from './services/aiChat.js';
import { ThemeService } from './services/themeService.js';

export function handleRoute() {
    const rawHash = window.location.hash || '#/login';
    const cleanRoute = rawHash.split('?')[0];

    const isAuthed = AuthService.isAuthenticated();

    // MANDATORY ROUTE GUARD: Redirect unauthenticated users to #/login
    if (!isAuthed && cleanRoute !== '#/login') {
        window.location.hash = '#/login';
        showToast('Authentication required. Redirecting to Secure Access Gateway.', 'warning');
        return;
    }

    // Redirect authenticated users away from #/login to #/dashboard
    if (isAuthed && cleanRoute === '#/login') {
        window.location.hash = '#/dashboard';
        return;
    }

    const contentArea = document.getElementById('main-content-area');
    const navbarContainer = document.getElementById('navbar-container');
    const sidebarContainer = document.getElementById('sidebar-container');

    // Handle App Shell Visibility (Hide Navbar & Sidebar on #/login view)
    if (cleanRoute === '#/login') {
        if (navbarContainer) navbarContainer.innerHTML = '';
        if (sidebarContainer) sidebarContainer.innerHTML = '';
        if (contentArea) contentArea.innerHTML = renderLoginView();
    } else {
        // Protected Operational Routes
        if (navbarContainer) navbarContainer.innerHTML = renderNavbar();
        if (sidebarContainer) sidebarContainer.innerHTML = renderSidebar(cleanRoute.substring(1));

        if (contentArea) {
            if (cleanRoute.startsWith('#/alerts')) {
                const parts = cleanRoute.split('/');
                const alertId = parts[2] || 'EV-8847';
                contentArea.innerHTML = renderAlertView(alertId);
            } else {
                switch (cleanRoute) {
                    case '#/border-cameras':
                        contentArea.innerHTML = renderBorderCamerasView();
                        break;
                    case '#/video-analysis':
                        contentArea.innerHTML = renderVideoAnalysisView();
                        break;
                    case '#/surveillance':
                        contentArea.innerHTML = renderSurveillanceView();
                        break;
                    case '#/border-map':
                        contentArea.innerHTML = renderMapView();
                        break;
                    case '#/human-analytics':
                    case '#/vehicle-anpr':
                        contentArea.innerHTML = renderAnalyticsView();
                        break;
                    case '#/intrusion-detection':
                        contentArea.innerHTML = renderIntrusionView();
                        break;
                    case '#/events':
                        contentArea.innerHTML = renderEventsView();
                        break;
                    case '#/system-health':
                        contentArea.innerHTML = renderHealthView();
                        break;
                    case '#/ai-chat':
                        contentArea.innerHTML = renderAiChatView();
                        break;
                    case '#/dashboard':
                    default:
                        contentArea.innerHTML = renderDashboardView();
                        break;
                }
            }
        }
    }

    // Attach Interactivity
    attachViewInteractions(cleanRoute);
}

function attachViewInteractions(cleanRoute) {
    if (cleanRoute === '#/login') {
        attachLoginInteractions();
        return;
    }

    if (cleanRoute === '#/ai-chat') {
        attachAiChatInteractions();
    }

    if (cleanRoute === '#/border-cameras') {
        attachBorderCamerasInteractions();
    }

    if (cleanRoute === '#/video-analysis') {
        attachVideoAnalysisInteractions();
    }

    if (cleanRoute === '#/border-map') {
        attachMapInteractions();
    }

    if (cleanRoute === '#/human-analytics' || cleanRoute === '#/vehicle-anpr' || cleanRoute === '#/analytics') {
        attachAnalyticsInteractions();
    }

    if (cleanRoute === '#/events') {
        attachEventsInteractions();
    }

    // Global Theme Toggle Handler
    const btnThemeToggle = document.getElementById('dark-mode-toggle');
    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const nextTheme = ThemeService.toggleTheme();
            showToast(`Switched to ${nextTheme === 'dark' ? '🌙 Dark' : '☀ Light'} Command Center Theme`, 'info');
        });
    }

    // Logout Button Handler
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            AuthService.logout();
            showToast('Session terminated. User logged out successfully.', 'info');
            window.location.hash = '#/login';
        });
    }

    // Dark Mode Toggle Handler
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            document.documentElement.classList.toggle('light', !isDark);
            const iconEl = document.getElementById('dark-mode-icon');
            if (iconEl) {
                iconEl.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
            showToast(`Switched to ${isDark ? 'Dark Tactical' : 'Light Institutional'} Theme Mode`);
        });
    }

    // PTZ Camera Buttons
    document.querySelectorAll('.ptz-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showToast('PTZ Camera Control Interface Engaged');
        });
    });

    // Alert Response Triggers
    const btnDispatch = document.getElementById('btn-action-dispatch');
    if (btnDispatch) {
        btnDispatch.addEventListener('click', () => {
            showToast('🚨 Tactical Response Unit Alpha Dispatched to Sector 4!', 'critical');
        });
    }

    const btnEscalate = document.getElementById('btn-action-escalate');
    if (btnEscalate) {
        btnEscalate.addEventListener('click', () => {
            showToast('⚠️ Threat Escalated to DEFCON LEVEL 2', 'warning');
        });
    }

    const btnResolve = document.getElementById('btn-action-resolve');
    if (btnResolve) {
        btnResolve.addEventListener('click', () => {
            showToast('✅ Incident EV-8847 Resolved & Saved to Audit Trail', 'success');
        });
    }

    // CSV Export Handler
    const btnExport = document.getElementById('btn-export-csv');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            showToast('📄 Operational Audit Report exported as CSV', 'success');
        });
    }
}

function attachLoginInteractions() {
    const tabSignIn = document.getElementById('tab-signin');
    const tabSignUp = document.getElementById('tab-signup');
    const loginForm = document.getElementById('form-signin');
    const signupForm = document.getElementById('form-signup');
    const errorAlert = document.getElementById('login-error-alert');
    const errorText = document.getElementById('login-error-text');

    // Tab Switching Logic
    if (tabSignIn && tabSignUp && loginForm && signupForm) {
        tabSignIn.addEventListener('click', () => {
            tabSignIn.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-surface-container-lowest text-primary shadow-sm cursor-pointer';
            tabSignUp.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary cursor-pointer';
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            if (errorAlert) errorAlert.classList.add('hidden');
        });

        tabSignUp.addEventListener('click', () => {
            tabSignUp.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-surface-container-lowest text-primary shadow-sm cursor-pointer';
            tabSignIn.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary cursor-pointer';
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            if (errorAlert) errorAlert.classList.add('hidden');
        });
    }

    // Password Visibility Toggles
    const togglePassBtn = document.getElementById('btn-toggle-password');
    const passInput = document.getElementById('input-signin-password');
    const togglePassIcon = document.getElementById('password-toggle-icon');
    if (togglePassBtn && passInput && togglePassIcon) {
        togglePassBtn.addEventListener('click', () => {
            const isPass = passInput.type === 'password';
            passInput.type = isPass ? 'text' : 'password';
            togglePassIcon.textContent = isPass ? 'visibility' : 'visibility_off';
        });
    }

    const toggleSignUpPassBtn = document.getElementById('btn-toggle-signup-password');
    const signUpPassInput = document.getElementById('input-signup-password');
    const signUpPassIcon = document.getElementById('signup-password-toggle-icon');
    if (toggleSignUpPassBtn && signUpPassInput && signUpPassIcon) {
        toggleSignUpPassBtn.addEventListener('click', () => {
            const isPass = signUpPassInput.type === 'password';
            signUpPassInput.type = isPass ? 'text' : 'password';
            signUpPassIcon.textContent = isPass ? 'visibility' : 'visibility_off';
        });
    }

    // Sign In Form Submission
    if (loginForm) {
        const officerInput = document.getElementById('input-signin-email');
        const submitBtn = document.getElementById('btn-submit-signin');
        const submitText = document.getElementById('text-signin-btn');
        const submitIcon = document.getElementById('icon-signin-btn');
        const rememberMe = document.getElementById('remember-me');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailOrBadge = officerInput?.value || '';
            const password = passInput?.value || '';

            if (errorAlert) errorAlert.classList.add('hidden');

            if (!emailOrBadge.trim() || !password.trim()) {
                if (errorAlert && errorText) {
                    errorText.textContent = 'Officer ID / Email and Security Passcode are required.';
                    errorAlert.classList.remove('hidden');
                }
                return;
            }

            if (submitBtn && submitIcon) {
                submitBtn.disabled = true;
                if (submitText) submitText.textContent = 'AUTHENTICATING...';
                if (submitIcon) {
                    submitIcon.textContent = 'sync';
                    submitIcon.classList.add('animate-spin');
                }
            }

            try {
                const session = await AuthService.login(emailOrBadge, password, rememberMe?.checked);
                showToast(`AUTHENTICATION SUCCESS: Welcome ${session.name} (${session.badgeId})`, 'success');
                window.location.hash = '#/dashboard';
            } catch (err) {
                if (errorAlert && errorText) {
                    errorText.textContent = err.message || 'Authentication failed. Verify your Officer ID and Security Passcode.';
                    errorAlert.classList.remove('hidden');
                }
                showToast('Authentication Failed. Verify credentials.', 'critical');
            } finally {
                if (submitBtn && submitIcon) {
                    submitBtn.disabled = false;
                    if (submitText) submitText.textContent = 'Authenticate Session';
                    if (submitIcon) {
                        submitIcon.textContent = 'lock_open';
                        submitIcon.classList.remove('animate-spin');
                    }
                }
            }
        });
    }

    // Sign Up Form Submission
    if (signupForm) {
        const nameInput = document.getElementById('input-signup-name');
        const emailInput = document.getElementById('input-signup-email');
        const signupSubmitBtn = document.getElementById('btn-submit-signup');
        const signupSubmitText = document.getElementById('text-signup-btn');
        const signupSubmitIcon = document.getElementById('icon-signup-btn');

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = nameInput?.value || '';
            const email = emailInput?.value || '';
            const password = signUpPassInput?.value || '';

            if (errorAlert) errorAlert.classList.add('hidden');

            if (!email.trim() || !password.trim()) {
                if (errorAlert && errorText) {
                    errorText.textContent = 'Email address and passcode are required.';
                    errorAlert.classList.remove('hidden');
                }
                return;
            }

            if (signupSubmitBtn && signupSubmitIcon) {
                signupSubmitBtn.disabled = true;
                if (signupSubmitText) signupSubmitText.textContent = 'CREATING ACCOUNT...';
                if (signupSubmitIcon) {
                    signupSubmitIcon.textContent = 'sync';
                    signupSubmitIcon.classList.add('animate-spin');
                }
            }

            try {
                const session = await AuthService.signUp(email, password, name);
                showToast(`REGISTRATION SUCCESS: Welcome ${session.name}! Account registered.`, 'success');
                window.location.hash = '#/dashboard';
            } catch (err) {
                if (errorAlert && errorText) {
                    errorText.textContent = err.message || 'Registration failed. Please try again.';
                    errorAlert.classList.remove('hidden');
                }
                showToast('Registration Failed.', 'critical');
            } finally {
                if (signupSubmitBtn && signupSubmitIcon) {
                    signupSubmitBtn.disabled = false;
                    if (signupSubmitText) signupSubmitText.textContent = 'Register Credentials';
                    if (signupSubmitIcon) {
                        signupSubmitIcon.textContent = 'how_to_reg';
                        signupSubmitIcon.classList.remove('animate-spin');
                    }
                }
            }
        });
    }
}

let currentConversationId = null;

async function attachAiChatInteractions() {
    const chatFeed = document.getElementById('ai-chat-feed');
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send-btn');
    const sendIcon = document.getElementById('ai-chat-send-icon');
    const typingIndicator = document.getElementById('ai-typing-indicator');
    const btnNewChat = document.getElementById('btn-new-chat');

    // File Attachment Controls
    const btnAttachFile = document.getElementById('btn-attach-file');
    const fileInput = document.getElementById('ai-file-input');
    const previewBox = document.getElementById('attachment-preview-box');
    const previewFilename = document.getElementById('attachment-filename');
    const previewFilesize = document.getElementById('attachment-filesize');
    const previewTypeIcon = document.getElementById('attachment-type-icon');
    const btnRemoveAttachment = document.getElementById('btn-remove-attachment');

    let selectedFile = null;

    if (btnAttachFile && fileInput) {
        btnAttachFile.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                selectedFile = e.target.files[0];
                if (previewFilename) previewFilename.textContent = selectedFile.name;
                if (previewFilesize) previewFilesize.textContent = `${(selectedFile.size / 1024).toFixed(1)} KB • InsForge Private Bucket chat-attachments`;
                if (previewTypeIcon) {
                    previewTypeIcon.textContent = selectedFile.type.startsWith('image/') ? 'image' : 'picture_as_pdf';
                }
                if (previewBox) previewBox.classList.remove('hidden');
            }
        });
    }

    if (btnRemoveAttachment) {
        btnRemoveAttachment.addEventListener('click', () => {
            clearAttachment();
        });
    }

    function clearAttachment() {
        selectedFile = null;
        if (fileInput) fileInput.value = '';
        if (previewBox) previewBox.classList.add('hidden');
    }

    const officer = AuthService.getOfficer();
    const userId = officer?.id || 'usr-demo';

    // 1. Get or create active conversation from InsForge DB
    try {
        const conv = await AiChatService.getOrCreateConversation(userId);
        currentConversationId = conv.id;

        const messages = await AiChatService.loadMessages(currentConversationId);
        if (messages && messages.length > 0) {
            renderMessageHistory(messages);
        }
    } catch (err) {
        console.error('Error initializing AI Chat session:', err);
        showToast('Failed to initialize AI Chat session from InsForge DB', 'critical');
    }

    function renderMessageHistory(messages) {
        if (!chatFeed) return;
        const historyHtml = messages.map(msg => createMessageBubbleHtml(msg.role, msg.content, msg.created_at)).join('');
        chatFeed.innerHTML = historyHtml;
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }

    function createMessageBubbleHtml(role, content, timestamp) {
        const isUser = role === 'user';
        const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (isUser) {
            return `
                <div class="flex gap-3 justify-end max-w-3xl ml-auto mb-4">
                    <div class="space-y-1 text-right flex-1">
                        <div class="flex items-center gap-2 justify-end">
                            <span class="text-[10px] text-outline font-mono">${formattedTime}</span>
                            <span class="text-xs font-bold text-primary">${officer?.name || 'Officer'}</span>
                        </div>
                        <div class="p-3.5 rounded-2xl rounded-tr-none bg-[#0A192F] text-white text-sm leading-relaxed shadow-sm text-left inline-block max-w-xl">
                            ${escapeHtml(content)}
                        </div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                        OFF
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="flex gap-3 max-w-3xl mb-4">
                    <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                        AI
                    </div>
                    <div class="space-y-1 flex-1">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-primary">IBVAP Tactical AI</span>
                            <span class="text-[10px] text-outline font-mono">${formattedTime}</span>
                        </div>
                        <div class="p-4 rounded-2xl rounded-tl-none bg-surface-bright border border-outline-variant/60 text-sm leading-relaxed text-on-surface shadow-sm ai-msg-content">
                            ${formatMarkdown(content)}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function formatMarkdown(text) {
        if (!text) return '';
        let formatted = escapeHtml(text);
        formatted = formatted.replace(/📎 \[Attached File: (.*?) \| (.*?)\]/g, '<div class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-900/60 border border-blue-400/40 rounded text-xs font-mono text-blue-200 mb-2">📎 <strong>$1</strong></div>');
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-800 px-1 rounded text-xs border border-blue-200 font-mono">$1</code>');
        
        // Interactive Action Button Tags Conversion
        formatted = formatted.replace(/\[\s*VIEW CAMERA\s*\]/gi, '<a href="#/border-cameras" class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0A192F] hover:bg-blue-900 text-white font-mono text-xs font-bold rounded-xl shadow uppercase transition-all my-1 mr-1"><span>📹</span> VIEW CAMERA</a>');
        formatted = formatted.replace(/\[\s*(?:SHOW ON BORDER MAP|VIEW ON MAP)\s*\]/gi, '<a href="#/border-map" class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0A192F] hover:bg-blue-900 text-white font-mono text-xs font-bold rounded-xl shadow uppercase transition-all my-1 mr-1"><span>🗺️</span> SHOW ON BORDER MAP</a>');
        formatted = formatted.replace(/\[\s*INSPECT ALERT\s*\]/gi, '<a href="#/alerts/EV-8847" class="inline-flex items-center gap-1 px-3 py-1.5 bg-critical-red hover:bg-red-600 text-white font-mono text-xs font-bold rounded-xl shadow uppercase transition-all my-1 mr-1"><span>🚨</span> INSPECT ALERT</a>');
        formatted = formatted.replace(/\[\s*(?:VIEW FOOTAGE|VIEW RESULTS)\s*\]/gi, '<a href="#/video-analysis" class="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs font-bold rounded-xl border border-outline-variant uppercase transition-all my-1 mr-1"><span>🎬</span> VIEW FOOTAGE</a>');
        formatted = formatted.replace(/\[\s*GENERATE REPORT\s*\]/gi, '<a href="#/reports" class="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-bright hover:bg-surface-container text-primary font-mono text-xs font-bold rounded-xl border border-outline-variant uppercase transition-all my-1 mr-1"><span>📄</span> GENERATE REPORT</a>');

        formatted = formatted.replace(/\n\n/g, '<br/><br/>');
        formatted = formatted.replace(/\n/g, '<br/>');
        return formatted;
    }

    // 2. Handle Message Submission & File Upload & Streaming Response
    async function handleSend(promptText) {
        const text = (promptText || chatInput?.value || '').trim();
        const attachedFileToSend = selectedFile;

        if (!text && !attachedFileToSend) return;
        if (!currentConversationId) return;

        if (chatInput) chatInput.value = '';
        clearAttachment();

        // UI User Bubble display
        let userBubbleContent = text;
        if (attachedFileToSend) {
            userBubbleContent = `📎 [Attached File: ${attachedFileToSend.name} | Stored in InsForge Private Bucket chat-attachments]\n${userBubbleContent}`;
        }

        if (chatFeed) {
            chatFeed.innerHTML += createMessageBubbleHtml('user', userBubbleContent);
            chatFeed.scrollTop = chatFeed.scrollHeight;
        }

        // Add empty AI bubble placeholder for streaming
        const aiBubbleId = `ai-msg-${Date.now()}`;
        const aiBubbleHtml = `
            <div class="flex gap-3 max-w-3xl mb-4" id="${aiBubbleId}">
                <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    AI
                </div>
                <div class="space-y-1 flex-1">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-primary">IBVAP Tactical AI</span>
                        <span class="text-[10px] text-outline font-mono">STREAMING...</span>
                    </div>
                    <div class="p-4 rounded-2xl rounded-tl-none bg-surface-bright border border-outline-variant/60 text-sm leading-relaxed text-on-surface shadow-sm ai-content-area">
                        <span class="inline-block w-2 h-4 bg-blue-600 animate-pulse"></span>
                    </div>
                </div>
            </div>
        `;
        if (chatFeed) {
            chatFeed.innerHTML += aiBubbleHtml;
            chatFeed.scrollTop = chatFeed.scrollHeight;
        }

        if (typingIndicator) typingIndicator.classList.remove('hidden');
        if (sendBtn) {
            sendBtn.disabled = true;
            if (sendIcon) {
                sendIcon.textContent = 'sync';
                sendIcon.classList.add('animate-spin');
            }
        }

        try {
            const aiMsgEl = document.querySelector(`#${aiBubbleId} .ai-content-area`);
            let accumulatedText = '';

            const { uploadMeta } = await AiChatService.streamUserMessage(
                currentConversationId,
                text || `Analyze the attached file ${attachedFileToSend?.name}`,
                attachedFileToSend,
                (delta, fullText) => {
                    accumulatedText = fullText;
                    if (aiMsgEl) {
                        aiMsgEl.innerHTML = formatMarkdown(fullText) + '<span class="inline-block w-1.5 h-3.5 bg-blue-600 animate-pulse ml-0.5"></span>';
                    }
                    if (chatFeed) chatFeed.scrollTop = chatFeed.scrollHeight;
                }
            );

            if (aiMsgEl) {
                aiMsgEl.innerHTML = formatMarkdown(accumulatedText);
            }

            if (uploadMeta) {
                showToast(`File "${uploadMeta.name}" uploaded to InsForge private storage bucket chat-attachments & analyzed by AI engine`, 'success');
            } else {
                showToast('AI response generated & stored in InsForge DB', 'success');
            }

        } catch (err) {
            console.error('Error during AI Streaming / File Upload:', err);
            const aiMsgEl = document.querySelector(`#${aiBubbleId} .ai-content-area`);
            if (aiMsgEl) {
                aiMsgEl.innerHTML = `<span class="text-critical-red font-semibold">⚠️ Error: ${escapeHtml(err.message)}</span>`;
            }
            showToast('AI Streaming / File Upload Failed.', 'critical');
        } finally {
            if (typingIndicator) typingIndicator.classList.add('hidden');
            if (sendBtn) {
                sendBtn.disabled = false;
                if (sendIcon) {
                    sendIcon.textContent = 'send';
                    sendIcon.classList.remove('animate-spin');
                }
            }
            if (chatInput) chatInput.focus();
        }
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSend();
        });
    }

    // Trigger Analyze Video Button in Attachment Card
    document.getElementById('btn-trigger-analyze')?.addEventListener('click', () => {
        handleSend('Analyze uploaded CCTV video footage for person detections, vehicle targets, ANPR plates, and perimeter breaches.');
    });

    // Preset Prompt Chips Click Handlers
    document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) handleSend(prompt);
        });
    });

    // New Session Button Handler
    if (btnNewChat) {
        btnNewChat.addEventListener('click', async () => {
            try {
                const conv = await AiChatService.getOrCreateConversation(userId, true);
                currentConversationId = conv.id;
                if (chatFeed) {
                    chatFeed.innerHTML = `
                        <div class="flex gap-3 max-w-3xl">
                            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">AI</div>
                            <div class="space-y-1.5 flex-1">
                                <div class="flex items-center gap-2">
                                    <span class="text-xs font-bold text-primary">IBVAP Tactical AI Command Assistant</span>
                                    <span class="text-[10px] text-security-green font-mono font-bold">● ONLINE</span>
                                </div>
                                <div class="p-4 rounded-2xl rounded-tl-none bg-surface-bright border border-outline-variant/60 text-sm leading-relaxed text-on-surface shadow-sm">
                                    New Tactical Command Session started. Send a query or upload CCTV footage to begin.
                                </div>
                            </div>
                        </div>
                    `;
                }
                showToast('New AI Command Session created in InsForge DB', 'info');
            } catch (e) {
                console.error('Error creating new session:', e);
            }
        });
    }
}
