import React, { useState } from 'react';

const Settings = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">Platform Settings</h1>
                <p className="text-gray-400">Configure system preferences and platform behavior</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Settings Nav */}
                <div className="lg:col-span-1">
                    <div className="glass-panel rounded-2xl p-6 shadow-custom sticky top-24">
                        <h2 className="font-heading text-xl font-bold text-gray-100 mb-4">Settings Menu</h2>
                        <nav className="space-y-2">
                            <NavButton active icon="general">General</NavButton>
                            <NavButton icon="security">Security</NavButton>
                            <NavButton icon="notifications">Notifications</NavButton>
                            <NavButton icon="billing">Billing</NavButton>
                            <NavButton icon="advanced">Advanced</NavButton>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2">
                    <div className="glass-panel rounded-2xl p-6 shadow-custom">
                        <h2 className="font-heading text-xl font-bold text-gray-100 mb-6">General Settings</h2>

                        <div className="space-y-6">

                            {/* Platform Info */}
                            <div>
                                <h3 className="font-heading text-lg font-semibold text-gray-100 mb-4">Platform Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name</label>
                                        <input type="text" defaultValue="AlgoArena" className="form-input w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
                                        <input type="email" defaultValue="support@algoarena.com" className="form-input w-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="pt-6 border-t border-gray-700/50">
                                <h3 className="font-heading text-lg font-semibold text-gray-100 mb-4">Feature Toggles</h3>
                                <div className="space-y-4">
                                    <ToggleItem title="User Registration" description="Allow new users to create accounts" defaultChecked />
                                    <ToggleItem title="AI Battles" description="Enable AI-powered coding battles" defaultChecked />
                                    <ToggleItem title="Leaderboards" description="Display public leaderboards" defaultChecked />
                                    <ToggleItem title="Maintenance Mode" description="Put platform in maintenance mode" />
                                </div>
                            </div>

                            {/* Rate Limits */}
                            <div className="pt-6 border-t border-gray-700/50">
                                <h3 className="font-heading text-lg font-semibold text-gray-100 mb-4">Rate Limits</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">API Requests per Hour</label>
                                        <input type="number" defaultValue="1000" className="form-input w-full" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Code Executions per Day</label>
                                        <input type="number" defaultValue="100" className="form-input w-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-700/50">
                                <button className="btn-primary">Save Changes</button>
                                <button className="btn-secondary">Reset to Defaults</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const NavButton = ({ active, icon, children }) => {
    const icons = {
        general: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>,
        security: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>,
        notifications: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>,
        billing: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>,
        advanced: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    };

    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all spotlight-hover ${active ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:bg-[#0f172a]'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[icon]}
            </svg>
            <span className="font-medium">{children}</span>
        </a>
    );
};

const ToggleItem = ({ title, description, defaultChecked }) => {
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

export default Settings;
