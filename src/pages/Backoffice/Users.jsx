import React, { useState, useEffect, useMemo, useRef } from 'react';
import { userService } from '../../services/userService';

// ── Edit Modal ──────────────────────────────────────────────────────────
const EditUserModal = ({ user, onClose, onSave }) => {
    const [form, setForm] = useState({
        username: user.username || '',
        email: user.email || '',
        role: user.role || 'Player',
        bio: user.bio || '',
        status: user.status ?? true,
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(
        user.avatar
            ? user.avatar.startsWith('/uploads/') ? user.avatar : user.avatar.startsWith('uploads/') ? `/${user.avatar}` : user.avatar
            : null
    );
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const fileRef = useRef();

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > 5 * 1024 * 1024) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        e.target.value = '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setForm({ ...form, status: value === 'true' });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            // Update profile fields (username, email, role, bio)
            const { status, ...profileData } = form;
            await userService.updateUserByAdmin(user._id, profileData);
            // Update status via dedicated endpoint
            await userService.updateStatusByAdmin(user._id, status);
            if (avatarFile) {
                const fd = new FormData();
                fd.append('avatar', avatarFile);
                await userService.uploadAvatarByAdmin(user._id, fd);
            }
            onSave();
        } catch (err) {
            setError(err?.message || 'Failed to update user');
        } finally {
            setSaving(false);
        }
    };

    const firstLetter = (user.username || 'U').charAt(0).toUpperCase();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="glass-panel rounded-2xl p-6 w-full max-w-lg shadow-custom animate-fade-in-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-gray-100 mb-4">Edit User</h2>
                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div
                            className="relative w-16 h-16 rounded-full border-2 border-cyan-400 overflow-hidden cursor-pointer group shrink-0"
                            onClick={() => fileRef.current?.click()}
                        >
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold text-2xl">
                                    {firstLetter}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <p className="text-xs text-gray-500">Click avatar to change</p>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Username</label>
                        <input name="username" value={form.username} onChange={handleChange} className="search-input w-full" required />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} className="search-input w-full" required />
                    </div>

                    {/* Role + Status row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Role</label>
                            <select name="role" value={form.role} onChange={handleChange} className="form-select w-full bg-[#0f172a]">
                                <option value="Player">Player</option>
                                <option value="Admin">Admin</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Status</label>
                            <select name="status" value={String(form.status)} onChange={handleChange} className="form-select w-full bg-[#0f172a]">
                                <option value="true">Active</option>
                                <option value="false">Offline</option>
                            </select>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            rows={3}
                            className="search-input w-full resize-none"
                            placeholder="Short bio..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary px-4 py-2 text-sm">Cancel</button>
                        <button type="submit" disabled={saving} className="btn-primary px-4 py-2 text-sm">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ── Confirm Delete Modal ────────────────────────────────────────────────
const ConfirmDeleteModal = ({ user, onClose, onConfirm, deleting }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="glass-panel rounded-2xl p-6 w-full max-w-sm shadow-custom animate-fade-in-up text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-100 mb-2">Delete User</h2>
            <p className="text-gray-400 text-sm mb-5">
                Are you sure you want to delete <span className="text-cyan-400 font-semibold">@{user.username}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
                <button onClick={onClose} className="btn-secondary px-4 py-2 text-sm">Cancel</button>
                <button onClick={onConfirm} disabled={deleting} className="px-4 py-2 text-sm rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors disabled:opacity-50">
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    </div>
);

// ── Rank palette (mirrors Header.jsx) ────────────────────────────────────
const RANK_STYLE = {
    BRONZE: { emoji: '🥉', color: '#cd7f32', bg: 'rgba(205,127,50,0.12)', border: 'rgba(205,127,50,0.3)' },
    SILVER: { emoji: '🥈', color: '#c0c0c0', bg: 'rgba(192,192,192,0.1)', border: 'rgba(192,192,192,0.25)' },
    GOLD: { emoji: '🥇', color: '#facc15', bg: 'rgba(250,204,21,0.1)', border: 'rgba(250,204,21,0.3)' },
    PLATINUM: { emoji: '🔷', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)' },
    DIAMOND: { emoji: '💎', color: '#a855f7', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)' },
};

// ── User Row ────────────────────────────────────────────────────────────
const UserRow = ({ username, email, role, _id, status, avatar, bio, rank, xp, onEdit, onDelete }) => {
    const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';
    const displayStatus = status ? 'Active' : 'Offline';
    const rankKey = String(rank || '').toUpperCase();
    const rankMeta = RANK_STYLE[rankKey];

    return (
        <tr className="table-row-hover border-b border-gray-800 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    {avatar ? (
                        <img
                            src={avatar.startsWith('uploads/') ? `/${avatar}` : avatar}
                            alt={username}
                            className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold text-lg">
                            {firstLetter}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-200">@{username}</p>
                        <p className="text-xs text-gray-400">{username}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{email}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${role === 'Admin' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                    role === 'Premium' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                    {role}
                </span>
            </td>

            {/* ── Rank badge ── */}
            <td className="px-6 py-4 whitespace-nowrap">
                {rankMeta ? (
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 10px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: rankMeta.color,
                            background: rankMeta.bg,
                            border: `1px solid ${rankMeta.border}`,
                        }}
                    >
                        <span style={{ fontSize: '13px' }}>{rankMeta.emoji}</span>
                        {rankKey}
                    </span>
                ) : (
                    <span className="text-gray-600 text-xs font-mono">—</span>
                )}
            </td>

            {/* ── XP ── */}
            <td className="px-6 py-4 whitespace-nowrap">
                {xp != null ? (
                    <span className="text-sm font-mono font-semibold" style={{ color: '#facc15' }}>
                        {xp >= 1000 ? `${(xp / 1000).toFixed(1).replace(/\.0$/, '')}k` : xp}
                        <span className="text-gray-500 font-normal text-xs ml-1">XP</span>
                    </span>
                ) : (
                    <span className="text-gray-600 text-xs font-mono">0 XP</span>
                )}
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${displayStatus === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    displayStatus === 'Offline' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${displayStatus === 'Active' ? 'bg-green-400 animate-pulse' :
                        displayStatus === 'Offline' ? 'bg-gray-400' : 'bg-red-400'
                        }`} />
                    {displayStatus}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center gap-2">
                    <button title="View Profile" className="action-btn action-btn-view">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button title="Edit User" className="action-btn action-btn-edit" onClick={() => onEdit({ _id, username, email, role, bio, avatar, status })}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    {displayStatus === 'Banned' ? (
                        <button title="Unban User" className="action-btn text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    ) : (
                        <button title="Delete User" className="action-btn action-btn-delete" onClick={() => onDelete({ _id, username })}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

// ── Users Page ──────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // ── Filters ─────────────────────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Reset to page 1 when any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, statusFilter]);

    // ── Derived / filtered list ─────────────────────────────────────────
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            // Search
            const q = searchQuery.toLowerCase();
            const matchSearch =
                !q ||
                (u.username || '').toLowerCase().includes(q) ||
                (u.email || '').toLowerCase().includes(q);

            // Role filter
            const matchRole = roleFilter === 'All' || u.role === roleFilter;

            // Status filter
            const matchStatus =
                statusFilter === 'All' ||
                (statusFilter === 'Active' && u.status) ||
                (statusFilter === 'Offline' && !u.status);

            return matchSearch && matchRole && matchStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    // ── Pagination ──────────────────────────────────────────────────────
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length);

    // Page buttons (max 5 visible)
    const pageNumbers = useMemo(() => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);
        if (end - start < 4) start = Math.max(1, end - 4);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [currentPage, totalPages]);

    // ── Delete handler ──────────────────────────────────────────────────
    const handleDeleteConfirm = async () => {
        if (!deletingUser) return;
        setIsDeleting(true);
        try {
            await userService.deleteUserByAdmin(deletingUser._id);
            setDeletingUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Failed to delete user", error);
        } finally {
            setIsDeleting(false);
        }
    };

    // ── Edit save handler ───────────────────────────────────────────────
    const handleEditSave = () => {
        setEditingUser(null);
        fetchUsers();
    };

    // ── CSV Export ──────────────────────────────────────────────────────
    const handleExportCSV = () => {
        const header = ['Username', 'Email', 'Role', 'Rank', 'XP', 'Status', 'Bio'];
        const rows = filteredUsers.map((u) => [
            u.username || '',
            u.email || '',
            u.role || '',
            u.rank || '—',
            u.xp ?? 0,
            u.status ? 'Active' : 'Offline',
            (u.bio || '').replace(/"/g, '""'),
        ]);
        const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">User Management</h1>
                <p className="text-gray-400">Manage platform users and their permissions</p>
            </div>

            {/* Filters */}
            <div className="glass-panel rounded-2xl p-4 shadow-custom">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative search-wrapper w-full">
                        <input
                            type="text"
                            placeholder="Search users by name, email, or username..."
                            className="search-input w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg className="w-5 h-5 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        className="form-select w-full md:w-40 bg-[#0f172a]"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Player">Player</option>
                        <option value="Premium">Premium</option>
                    </select>
                    <select
                        className="form-select w-full md:w-40 bg-[#0f172a]"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Offline">Offline</option>
                    </select>
                    <button className="btn-primary w-full md:w-auto whitespace-nowrap" onClick={handleExportCSV}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-panel rounded-2xl shadow-custom overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#0b1220]/50 border-b border-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user, index) => (
                                    <UserRow
                                        key={user._id || index}
                                        {...user}
                                        onEdit={(u) => setEditingUser(u)}
                                        onDelete={(u) => setDeletingUser(u)}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-gray-700/50 gap-4">
                    <p className="text-sm text-gray-400">
                        {filteredUsers.length === 0
                            ? 'No results'
                            : `Showing ${startIndex} to ${endIndex} of ${filteredUsers.length} users`}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            className="btn-secondary px-3 py-1.5 text-sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        {pageNumbers.map((n) => (
                            <button
                                key={n}
                                className={`${n === currentPage ? 'btn-primary' : 'btn-secondary hover:text-cyan-400'} px-3 py-1.5 text-sm`}
                                onClick={() => setCurrentPage(n)}
                            >
                                {n}
                            </button>
                        ))}
                        <button
                            className="btn-secondary px-3 py-1.5 text-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleEditSave}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deletingUser && (
                <ConfirmDeleteModal
                    user={deletingUser}
                    onClose={() => setDeletingUser(null)}
                    onConfirm={handleDeleteConfirm}
                    deleting={isDeleting}
                />
            )}
        </div>
    );
};

export default Users;
