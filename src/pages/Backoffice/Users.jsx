import React from 'react';

const UserRow = ({ username, name, email, role, rank, score, status, avatar }) => (
    <tr className="table-row-hover border-b border-gray-800 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full border-2 border-cyan-400"
                />
                <div>
                    <p className="text-sm font-medium text-gray-200">@{username}</p>
                    <p className="text-xs text-gray-400">{name}</p>
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
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{rank}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-cyan-400">{score}</td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                status === 'Offline' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-green-400 animate-pulse' :
                    status === 'Offline' ? 'bg-gray-400' : 'bg-red-400'
                    }`} />
                {status}
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
                <button title="Edit User" className="action-btn action-btn-edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                {status === 'Banned' ? (
                    <button title="Unban User" className="action-btn text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                ) : (
                    <button title="Ban User" className="action-btn action-btn-delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </button>
                )}
            </div>
        </td>
    </tr>
);

const Users = () => {
    const users = [
        { username: 'coder_pro', name: 'John Smith', email: 'john.smith@email.com', role: 'Premium', rank: '#42', score: '8,547', status: 'Active', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
        { username: 'dev_master', name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'User', rank: '#127', score: '6,234', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        { username: 'algo_ninja', name: 'Mike Chen', email: 'mike.chen@email.com', role: 'User', rank: '#8', score: '12,890', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
        { username: 'code_queen', name: 'Emily Davis', email: 'emily.d@email.com', role: 'Premium', rank: '#15', score: '11,234', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
        { username: 'tech_wizard', name: 'Alex Turner', email: 'alex.t@email.com', role: 'User', rank: '#234', score: '4,567', status: 'Banned', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ];

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
                        />
                        <svg className="w-5 h-5 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select className="form-select w-full md:w-40 bg-[#0f172a]">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>User</option>
                        <option>Premium</option>
                    </select>
                    <select className="form-select w-full md:w-40 bg-[#0f172a]">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Banned</option>
                    </select>
                    <button className="btn-primary w-full md:w-auto whitespace-nowrap">
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
                            {users.map((user, index) => (
                                <UserRow key={index} {...user} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-gray-700/50 gap-4">
                    <p className="text-sm text-gray-400">Showing 1 to 5 of 24,567 users</p>
                    <div className="flex items-center gap-2">
                        <button className="btn-secondary px-3 py-1.5 text-sm">Previous</button>
                        <button className="btn-primary px-3 py-1.5 text-sm">1</button>
                        <button className="btn-secondary px-3 py-1.5 text-sm hover:text-cyan-400">2</button>
                        <button className="btn-secondary px-3 py-1.5 text-sm hover:text-cyan-400">3</button>
                        <button className="btn-secondary px-3 py-1.5 text-sm hover:text-cyan-400">...</button>
                        <button className="btn-secondary px-3 py-1.5 text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
