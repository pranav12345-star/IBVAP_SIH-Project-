/**
 * IBVAP | Secure Access Gateway & InsForge Auth View Controller
 */
import { ThemeService } from '../services/themeService.js';

export function renderLoginView() {
    const logoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCetUk3APgxNv7TTnz5MV5UoC5v0-1x8al2DFdJ74dQ2Jr_VvHVJKkIrZiKd6Yfde8aQ4FUzcI_plsGY7duLDCoiaQO2h_NZAKD1n7NnJ08yTSyzpGKuIoOnpVYwR8nFkqg7YXReq2aecpLHDIpwHAJUjU4_Z8GVmUjhryawyBFK6m25B7Szs3qrUFiBKyJHRY8sqNGN_WhD4p1oY2RFDGnSmszT8iZU-P-Lk6OkVRZhPoaDT9ymV-ODA";

    const currentTheme = ThemeService.getTheme();
    const isDark = currentTheme === 'dark';

    return `
        <div class="h-screen w-full flex flex-col md:flex-row overflow-hidden font-sans text-on-surface bg-surface-container-lowest selection:bg-primary-fixed selection:text-on-primary-fixed relative">
            <!-- Top Right Theme Toggle -->
            <div class="absolute top-4 right-4 z-50">
                <button id="dark-mode-toggle" class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-bright hover:bg-surface-container border border-outline-variant text-on-surface transition-all rounded-lg text-xs font-bold cursor-pointer shadow-sm">
                    <span class="material-symbols-outlined text-sm" id="dark-mode-icon">${isDark ? 'light_mode' : 'dark_mode'}</span>
                    <span id="dark-mode-text">${isDark ? '☀ Light' : '🌙 Dark'}</span>
                </button>
            </div>

            <!-- Left Side: Branding & Operational Intelligence Panel -->
            <div class="hidden md:flex md:w-1/2 lg:w-7/12 bg-navy-gradient flex-col justify-between p-edge-margin-desktop text-white relative overflow-hidden shrink-0">
                <!-- Abstract Grid/Dot Pattern Overlay -->
                <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;"></div>
                
                <div class="z-10 mt-12 max-w-xl">
                    <img alt="IBVAP Official Logo" class="h-24 w-24 mb-8 rounded-lg object-contain bg-white p-2 shadow-sm" src="${logoUrl}"/>
                    <h1 class="font-headline-lg text-headline-lg text-white mb-6 font-bold leading-tight">
                        Intelligent Border Video Analytics Platform
                    </h1>
                    <p class="font-body-lg text-body-lg text-slate-300 leading-relaxed">
                        Transforming CCTV infrastructure with cloud-scale AI & InsForge Authentication. 
                        Providing real-time surveillance processing, threat detection, and encrypted session management.
                    </p>
                </div>

                <div class="z-10 mb-8 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-security-green text-2xl">shield</span>
                        <span class="font-mono text-xs text-white opacity-80 uppercase tracking-wider">InsForge Auth Active • V4.2.0-PRO</span>
                    </div>
                    <div class="px-3 py-1 bg-white/10 backdrop-blur rounded border border-white/20 text-xs font-mono text-white/90">
                        ⚡ InsForge BaaS Connected
                    </div>
                </div>
            </div>

            <!-- Right Side: InsForge Auth Access Gateway -->
            <div class="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center items-center p-edge-margin-mobile md:p-edge-margin-desktop bg-surface-container-lowest relative overflow-y-auto">
                <div class="w-full max-w-md space-y-6 z-10 py-6">
                    <!-- Mobile Header -->
                    <div class="md:hidden flex flex-col items-center mb-4 text-center">
                        <img alt="IBVAP Official Logo" class="h-16 w-16 mb-2 rounded-lg object-contain bg-surface-container-highest p-2" src="${logoUrl}"/>
                        <h1 class="font-headline-sm text-headline-sm font-bold text-primary">IBVAP Command Console</h1>
                    </div>

                    <div class="text-center md:text-left">
                        <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3 border border-blue-200">
                            <span class="material-symbols-outlined text-sm">lock_person</span> InsForge Security Gateway
                        </div>
                        <h2 class="font-bold text-2xl text-primary mb-1">Access Authentication</h2>
                        <p class="text-xs text-on-surface-variant">Sign in with authorized officer credentials or register a new account.</p>
                    </div>

                    <!-- Auth Mode Tabs -->
                    <div class="flex bg-surface-muted p-1 rounded-xl border border-outline-variant">
                        <button id="tab-signin" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-surface-container-lowest text-primary shadow-sm cursor-pointer">
                            Sign In
                        </button>
                        <button id="tab-signup" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all text-on-surface-variant hover:text-primary cursor-pointer">
                            Create Account
                        </button>
                    </div>

                    <!-- Error Alert Box -->
                    <div id="login-error-alert" class="hidden p-3 bg-red-50 border border-red-200 rounded-xl text-critical-red font-bold text-xs flex items-start gap-2">
                        <span class="material-symbols-outlined text-base text-critical-red shrink-0">error</span>
                        <span id="login-error-text">Authentication failed. Verify your Officer ID and Security Passcode.</span>
                    </div>

                    <!-- SIGN IN FORM -->
                    <form id="form-signin" class="space-y-4">
                        <div class="space-y-1">
                            <label class="font-label-caps text-label-caps text-on-surface-variant font-medium">Officer ID / Email Address</label>
                            <input id="input-signin-email" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="OFF-8472 or officer@ibvap.gov.in" required type="text"/>
                        </div>

                        <div class="space-y-1">
                            <label class="font-label-caps text-label-caps text-on-surface-variant font-medium">Security Passcode</label>
                            <div class="relative flex items-center">
                                <input id="input-signin-password" class="w-full px-3.5 py-2.5 pr-10 bg-surface-bright border border-outline-variant rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="••••••••••••" required type="password"/>
                                <button id="btn-toggle-password" type="button" class="absolute right-3 text-outline hover:text-primary cursor-pointer">
                                    <span class="material-symbols-outlined text-sm" id="password-toggle-icon">visibility_off</span>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between text-xs">
                            <label class="flex items-center gap-2 cursor-pointer text-on-surface-variant font-medium">
                                <input type="checkbox" id="remember-me" class="rounded border-outline-variant text-primary focus:ring-primary"/>
                                Remember Officer Session
                            </label>
                            <span class="text-[11px] text-outline font-mono">Demo: OFF-8472 / IBVAP@2026</span>
                        </div>

                        <button id="btn-submit-signin" class="w-full py-3 bg-[#0A192F] hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow cursor-pointer flex items-center justify-center gap-2" type="submit">
                            <span class="material-symbols-outlined text-sm" id="icon-signin-btn">lock_open</span>
                            <span id="text-signin-btn">Authenticate Session</span>
                        </button>
                    </form>

                    <!-- SIGN UP FORM -->
                    <form id="form-signup" class="space-y-4 hidden">
                        <div class="space-y-1">
                            <label class="font-label-caps text-label-caps text-on-surface-variant font-medium font-bold">Full Name & Rank</label>
                            <input id="input-signup-name" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="Cmdr. A. Vance" required type="text"/>
                        </div>

                        <div class="space-y-1">
                            <label class="font-label-caps text-label-caps text-on-surface-variant font-medium">Officer Official Email</label>
                            <input id="input-signup-email" class="w-full px-3.5 py-2.5 bg-surface-bright border border-outline-variant rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="officer.vance@ibvap.gov.in" required type="email"/>
                        </div>

                        <div class="space-y-1">
                            <label class="font-label-caps text-label-caps text-on-surface-variant font-medium">Create Security Passcode</label>
                            <div class="relative flex items-center">
                                <input id="input-signup-password" class="w-full px-3.5 py-2.5 pr-10 bg-surface-bright border border-outline-variant rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary" placeholder="••••••••••••" required type="password"/>
                                <button id="btn-toggle-signup-password" type="button" class="absolute right-3 text-outline hover:text-primary cursor-pointer">
                                    <span class="material-symbols-outlined text-sm" id="signup-password-toggle-icon">visibility_off</span>
                                </button>
                            </div>
                        </div>

                        <button id="btn-submit-signup" class="w-full py-3 bg-security-green hover:bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow cursor-pointer flex items-center justify-center gap-2" type="submit">
                            <span class="material-symbols-outlined text-sm" id="icon-signup-btn">how_to_reg</span>
                            <span id="text-signup-btn">Register Credentials</span>
                        </button>
                    </form>

                    <!-- Footer Warning Note -->
                    <div class="pt-4 border-t border-outline-variant/60 flex items-center justify-between text-center md:text-left">
                        <div class="flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-critical-red text-base">warning</span>
                            <span class="text-xs font-bold uppercase tracking-wide text-critical-red">Authorized Personnel Only</span>
                        </div>
                        <p class="font-mono text-[11px] text-outline">
                            InsForge BaaS Protected
                        </p>
                    </div>
                </div>

                <div class="absolute bottom-4 left-4 hidden md:block">
                    <span class="font-mono text-[11px] text-outline-variant">IBVAP v4.2.0 • InsForge Auth System</span>
                </div>
            </div>
        </div>
    `;
}
