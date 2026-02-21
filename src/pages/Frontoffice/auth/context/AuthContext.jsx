/**
 * AuthContext – front-office authentication via localStorage.
 *
 * Stores:
 *   • currentUser  { username, email, avatar, role }
 *   • isLoggedIn   boolean
 *
 * Persists to localStorage under key "fo_auth".
 * Exposes login / signup / logout helpers.
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'fo_auth';

/* Read persisted auth state (or null) */
const readStorage = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

/* Persist auth state */
const writeStorage = (data) => {
    if (data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Bridge for backoffice ProtectedRoute
        if (data.user?.role === 'ADMIN' || data.user?.role === 'ORGANIZER') {
            localStorage.setItem('isAuthenticated', 'true');
        }
    } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('isAuthenticated');
    }
};

/**
 * redirectBasedOnRole – determines the redirect path based on user role.
 *
 * ADMIN | ORGANIZER → /admin (Backoffice)
 * USER | COMPETITOR → / (Frontoffice Home)
 */
export const redirectBasedOnRole = (user) => {
    if (!user || !user.role) return '/signin';
    const role = user.role.toUpperCase();
    if (role === 'ADMIN' || role === 'ORGANIZER') {
        return '/admin';
    }
    return '/';
};

const DEFAULT_AVATAR =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    /* Rehydrate on mount */
    useEffect(() => {
        const stored = readStorage();
        if (stored?.user) {
            setCurrentUser(stored.user);
        }
    }, []);

    const isLoggedIn = !!currentUser;

    /**
     * login – simulates authentication.
     * In production, replace with a real API call.
     *
     * DEMO LOGIC:
     * If email contains 'admin', role = 'ADMIN'.
     * Else role = 'USER'.
     */
    const login = useCallback((email, _password) => {
        const isMockAdmin = email.toLowerCase().includes('admin');
        const user = {
            username: email.split('@')[0],
            email,
            avatar: DEFAULT_AVATAR,
            emailVerified: true,
            bio: '',
            role: isMockAdmin ? 'ADMIN' : 'USER',
        };
        setCurrentUser(user);
        writeStorage({ user });
        return user;
    }, []);

    /**
     * signup – simulates account creation.
     * Always defaults to 'USER' role for now.
     */
    const signup = useCallback((username, email, _password) => {
        const user = {
            username,
            email,
            avatar: DEFAULT_AVATAR,
            emailVerified: false,
            bio: '',
            role: 'USER',
        };
        setCurrentUser(user);
        writeStorage({ user });
        return user;
    }, []);

    /**
     * logout – clears session.
     */
    const logout = useCallback(() => {
        setCurrentUser(null);
        writeStorage(null);
    }, []);

    /**
     * updateCurrentUser – partial-patch the persisted user.
     * Used by ProfileContext when the user updates their profile.
     */
    const updateCurrentUser = useCallback((patch) => {
        setCurrentUser((prev) => {
            if (!prev) return prev;
            const next = { ...prev, ...patch };
            writeStorage({ user: next });
            return next;
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn,
                login,
                signup,
                logout,
                updateCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};

export default AuthContext;
