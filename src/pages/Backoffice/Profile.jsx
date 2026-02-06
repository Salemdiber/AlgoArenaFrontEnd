import React, { useState } from 'react';

const Profile = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">Admin Profile</h1>
                <p className="text-gray-400">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="glass-panel rounded-2xl p-6 shadow-custom">
                        <div className="text-center">
                            <div className="relative inline-block mb-4">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" alt="Admin" className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
                                <button className="absolute bottom-0 right-0 p-2 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white shadow-lg transition-colors border border-white/10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </button>
                            </div>
                            <h2 className="font-heading text-2xl font-bold text-gray-100 mb-1">Admin User</h2>
                            <p className="text-sm text-gray-400 mb-2">admin@algoarena.com</p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Super Admin</span>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg border border-gray-800">
                                <span className="text-sm text-gray-400">Member Since</span>
                                <span className="text-sm font-medium text-gray-200">Jan 2024</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg border border-gray-800">
                                <span className="text-sm text-gray-400">Last Login</span>
                                <span className="text-sm font-medium text-gray-200">2 hours ago</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg border border-gray-800">
                                <span className="text-sm text-gray-400">Status</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></span>
                                    <span className="text-sm font-medium text-green-400">Active</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="lg:col-span-2">
                    <div className="glass-panel rounded-2xl p-6 shadow-custom">
                        <h2 className="font-heading text-xl font-bold text-gray-100 mb-6">Account Settings</h2>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                            {/* Personal Info */}
                            <div>
                                <h3 className="font-heading text-lg font-semibold text-gray-100 mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                        <input type="text" defaultValue="Admin" className="form-input w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                        <input type="text" defaultValue="User" className="form-input w-full" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                        <input type="email" defaultValue="admin@algoarena.com" className="form-input w-full" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" className="form-input w-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="pt-6 border-t border-gray-700/50">
                                <h3 className="font-heading text-lg font-semibold text-gray-100 mb-4">Security</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                        <input type="password" placeholder="••••••••" className="form-input w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                        <input type="password" placeholder="••••••••" className="form-input w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                                        <input type="password" placeholder="••••••••" className="form-input w-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="pt-6 border-t border-gray-700/50">
                                <h3 className="font-heading text-lg font-semibold text-gray-100 mb-4">Preferences</h3>
                                <div className="space-y-4">
                                    <ToggleOption
                                        title="Email Notifications"
                                        description="Receive email updates about platform activity"
                                        defaultChecked={true}
                                    />
                                    <ToggleOption
                                        title="Two-Factor Authentication"
                                        description="Add an extra layer of security to your account"
                                        defaultChecked={false}
                                    />
                                    <ToggleOption
                                        title="Activity Alerts"
                                        description="Get notified about suspicious activity"
                                        defaultChecked={true}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-700/50">
                                <button type="submit" className="btn-primary">Save Changes</button>
                                <button type="button" className="btn-secondary">Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ToggleOption = ({ title, description, defaultChecked }) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
        <div
            className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg cursor-pointer hover:bg-[#152033] transition-colors border border-gray-800 hover:border-gray-700 group"
            onClick={() => setIsChecked(!isChecked)}
        >
            <div>
                <p className="font-medium text-gray-200 group-hover:text-cyan-400 transition-colors">{title}</p>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <div className={`toggle-switch ${isChecked ? 'active' : ''}`} />
        </div>
    );
};

export default Profile;
