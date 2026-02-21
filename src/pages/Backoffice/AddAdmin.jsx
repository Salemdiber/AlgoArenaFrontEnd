import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to add the admin
        // For now, we'll just navigate back to the users list or dashboard
        navigate('/admin/users');
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">Add New Admin</h1>
                <p className="text-gray-400">Create a new administrator account with specific permissions</p>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="glass-panel rounded-2xl p-8 shadow-custom">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Header/Intro */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-700/50">
                            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-heading text-xl font-bold text-gray-100">Account Details</h3>
                                <p className="text-sm text-gray-400">Enter the credentials for the new admin user</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" className="form-input w-full" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input type="email" placeholder="e.g. john@algoarena.com" className="form-input w-full" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                <input type="text" placeholder="e.g. johndoe" className="form-input w-full" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                                <select className="form-select w-full bg-[#0f172a]">
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="support">Support</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Temporary Password</label>
                                <input type="password" placeholder="••••••••" className="form-input w-full" required />
                                <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters with 1 special character</p>
                            </div>
                        </div>

                        {/* Permissions Review (Visual only) */}
                        <div className="pt-4 mt-2">
                            <label className="block text-sm font-medium text-gray-300 mb-3">Permissions</label>
                            <div className="bg-[#0f172a] rounded-lg p-4 border border-gray-800 space-y-2">
                                <PermissionItem label="Manage Users" />
                                <PermissionItem label="Manage Battles" />
                                <PermissionItem label="View Analytics" />
                                <PermissionItem label="Edit System Settings" isActive={false} />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-700/50">
                            <button type="submit" className="flex-1 btn-primary py-3 justify-center">Create Admin Account</button>
                            <button type="button" onClick={() => navigate(-1)} className="btn-secondary py-3 px-6">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const PermissionItem = ({ label, isActive = true }) => (
    <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${isActive ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-gray-800 border-gray-600 text-gray-500'}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <span className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500 line-through'}`}>{label}</span>
    </div>
);

export default AddAdmin;
