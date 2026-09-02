/**
 * IBVAP Authentication & Session Service powered by InsForge
 */
import { insforgeClient } from './insforge.js';

const SESSION_KEY = 'ibvap_session';

function getStorageItem(key) {
    try {
        if (typeof sessionStorage !== 'undefined') {
            const item = sessionStorage.getItem(key);
            if (item) return item;
        }
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem(key);
            if (item) return item;
        }
    } catch (e) {}
    return null;
}

function setStorageItem(key, value, rememberMe = false) {
    try {
        if (typeof sessionStorage !== 'undefined') {
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem(key, value);
        }
    } catch (e) {}
}

function removeStorageItem(key) {
    try {
        if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(key);
        if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    } catch (e) {}
}

export const AuthService = {
    isAuthenticated() {
        return !!getStorageItem(SESSION_KEY);
    },

    getOfficer() {
        const sessionStr = getStorageItem(SESSION_KEY);
        if (!sessionStr) return null;
        try {
            return JSON.parse(sessionStr);
        } catch (e) {
            return null;
        }
    },

    async syncPublicUser(sessionData) {
        if (!sessionData?.id) return;
        try {
            await insforgeClient.database.from('users').upsert([{
                id: sessionData.id,
                email: sessionData.email || `${sessionData.badgeId?.toLowerCase() || 'officer'}@ibvap.gov.in`,
                name: sessionData.name || 'Officer'
            }]);
        } catch (e) {
            console.warn('User table sync warning:', e);
        }
    },

    /**
     * InsForge Email & Password Sign Up (with fallback)
     */
    async signUp(email, password, name = '', rememberMe = false) {
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanPassword = (password || '').trim();
        const cleanName = (name || '').trim();

        if (!cleanEmail || !cleanPassword) {
            throw new Error('Email address and password are required.');
        }

        if (cleanPassword.length < 6) {
            throw new Error('Security passcode must be at least 6 characters in length.');
        }

        let sessionData = null;

        try {
            const { data, error } = await insforgeClient.auth.signUp({
                email: cleanEmail,
                password: cleanPassword,
                name: cleanName || 'Border Security Officer'
            });

            if (error) {
                console.warn('InsForge Auth SignUp Note:', error.message);
            }

            const user = data?.user;
            sessionData = {
                id: user?.id || `usr-${Date.now()}`,
                badgeId: `OFF-${(user?.id || '8472').substring(0, 4).toUpperCase()}`,
                email: cleanEmail,
                name: cleanName || user?.profile?.name || 'Cmdr. A. Vance',
                rank: 'Tactical Officer',
                status: 'AUTHORIZED',
                location: 'Command Center Alpha',
                accessToken: data?.accessToken || null,
                loginTime: new Date().toISOString()
            };
        } catch (err) {
            sessionData = {
                id: `usr-${Date.now()}`,
                badgeId: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
                email: cleanEmail,
                name: cleanName || 'Cmdr. A. Vance',
                rank: 'Tactical Officer',
                status: 'AUTHORIZED',
                location: 'Command Center Alpha',
                accessToken: null,
                loginTime: new Date().toISOString()
            };
        }

        setStorageItem(SESSION_KEY, JSON.stringify(sessionData), rememberMe);
        await this.syncPublicUser(sessionData);

        return sessionData;
    },

    /**
     * InsForge Email & Password Sign In + DEMO Authentication Fallback
     */
    async login(emailOrBadge, password, rememberMe = false) {
        let rawInput = (emailOrBadge || '').trim();
        const cleanPass = (password || '').trim();

        if (!rawInput || !cleanPass) {
            throw new Error('Officer ID / Email and Security Passcode are required.');
        }

        let cleanEmail = rawInput;
        if (!cleanEmail.includes('@')) {
            cleanEmail = `${cleanEmail.toLowerCase()}@ibvap.gov.in`;
        }

        // 1. Try InsForge Authentication First
        try {
            const { data, error } = await insforgeClient.auth.signInWithPassword({
                email: cleanEmail,
                password: cleanPass
            });

            if (!error && data?.user) {
                const user = data.user;
                const sessionData = {
                    id: user.id,
                    badgeId: `OFF-${user.id.substring(0, 4).toUpperCase()}`,
                    email: user.email || cleanEmail,
                    name: user.profile?.name || user.email?.split('@')[0] || 'Cmdr. A. Vance',
                    rank: 'Sector Commander',
                    status: 'AUTHORIZED',
                    location: 'Command Center Alpha',
                    accessToken: data.accessToken || null,
                    loginTime: new Date().toISOString()
                };

                setStorageItem(SESSION_KEY, JSON.stringify(sessionData), rememberMe);
                await this.syncPublicUser(sessionData);
                return sessionData;
            }
        } catch (err) {
            console.warn('InsForge auth signIn error, checking fallback...', err.message);
        }

        // 2. DEMO Authentication Fallback Check
        // Demo credentials: Officer ID: OFF-8472 | Passcode: IBVAP@2026
        const isDemoOfficer = (
            rawInput.toUpperCase() === 'OFF-8472' ||
            cleanEmail.toLowerCase() === 'off-8472@ibvap.gov.in' ||
            cleanEmail.toLowerCase() === 'officer@ibvap.gov.in'
        );

        const isDemoPasscode = (
            cleanPass === 'IBVAP@2026' ||
            cleanPass === 'SecurePassword2026'
        );

        if (isDemoOfficer && isDemoPasscode) {
            const demoSessionData = {
                id: '0ebed8ee-d3ea-4c08-8e72-210c56a8e855',
                badgeId: 'OFF-8472',
                email: 'off-8472@ibvap.gov.in',
                name: 'Cmdr. A. Vance',
                rank: 'Sector Commander',
                status: 'AUTHORIZED',
                location: 'Command Center Alpha',
                accessToken: null,
                loginTime: new Date().toISOString()
            };

            setStorageItem(SESSION_KEY, JSON.stringify(demoSessionData), rememberMe);
            await this.syncPublicUser(demoSessionData);
            return demoSessionData;
        }

        // 3. Otherwise throw clean authentication error
        throw new Error('Authentication failed. Verify your Officer ID and Security Passcode.');
    },

    async logout() {
        try {
            await insforgeClient.auth.signOut();
        } catch (e) {
            console.warn('Sign out warning:', e);
        }
        removeStorageItem(SESSION_KEY);
    }
};
