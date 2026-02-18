/**
 * ProfileContext – centralised state for the profile feature.
 *
 * Manages:
 *  • user object (avatar, username, email, bio)
 *  • isEditing / isUpdating flags
 *  • twoFactorEnabled / twoFactorMethod
 *
 * Syncs with AuthContext:
 *  • Reads initial user data from auth (localStorage-backed)
 *  • Propagates profile updates back to auth so the header stays in sync
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';

const ProfileContext = createContext(null);

/* ── fallback user seed data (used when not logged in) ── */
const FALLBACK_USER = {
    avatar: '',
    username: 'guest',
    email: '',
    emailVerified: false,
    bio: '',
};

export const ProfileProvider = ({ children }) => {
    const { currentUser: authUser, isLoggedIn, updateCurrentUser } = useAuth();

    const [user, setUser] = useState(() => {
        if (authUser) return { ...FALLBACK_USER, ...authUser };
        return FALLBACK_USER;
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [twoFactorMethod, setTwoFactorMethod] = useState(null); // 'authenticator' | 'email' | null

    /* Sync profile user when auth user changes (login / logout) */
    useEffect(() => {
        if (authUser) {
            setUser((prev) => ({ ...prev, ...authUser }));
        } else {
            setUser(FALLBACK_USER);
        }
    }, [authUser]);

    /* ── helpers that will wrap real API calls ── */
    const updateUser = useCallback(async (patch) => {
        setIsUpdating(true);
        try {
            // Simulate network delay – replace with real API
            await new Promise((r) => setTimeout(r, 600));
            setUser((prev) => ({ ...prev, ...patch }));
            // Propagate to auth so the header picks up the change
            if (isLoggedIn) updateCurrentUser(patch);
        } finally {
            setIsUpdating(false);
            setIsEditing(false);
        }
    }, [isLoggedIn, updateCurrentUser]);

    const updateAvatar = useCallback(async (file) => {
        setIsUpdating(true);
        try {
            // Create local preview – replace with real upload
            const url = URL.createObjectURL(file);
            await new Promise((r) => setTimeout(r, 400));
            setUser((prev) => ({ ...prev, avatar: url }));
            if (isLoggedIn) updateCurrentUser({ avatar: url });
        } finally {
            setIsUpdating(false);
        }
    }, [isLoggedIn, updateCurrentUser]);

    const removeAvatar = useCallback(async () => {
        setIsUpdating(true);
        try {
            await new Promise((r) => setTimeout(r, 300));
            setUser((prev) => ({ ...prev, avatar: '' }));
            if (isLoggedIn) updateCurrentUser({ avatar: '' });
        } finally {
            setIsUpdating(false);
        }
    }, [isLoggedIn, updateCurrentUser]);

    return (
        <ProfileContext.Provider
            value={{
                user,
                setUser,
                isEditing,
                setIsEditing,
                isUpdating,
                setIsUpdating,
                twoFactorEnabled,
                setTwoFactorEnabled,
                twoFactorMethod,
                setTwoFactorMethod,
                updateUser,
                updateAvatar,
                removeAvatar,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>');
    return ctx;
};

export default ProfileContext;

