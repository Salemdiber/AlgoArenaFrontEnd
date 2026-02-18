import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopNavbar = ({ onToggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsProfileOpen(false);
        navigate('/login');
    };

    return (
        <header className="bg-[#1e293b] border-b border-gray-800 sticky top-0 z-20 shadow-custom">
            <div className="flex items-center justify-between px-6 py-4">

                {/* Mobile Toggle */}
                <button className="lg:hidden text-gray-300 hover:text-cyan-400 p-2 rounded-lg hover:bg-[#0f172a] transition-all spotlight-hover" onClick={onToggleSidebar}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Search Bar - Fixed and Enhanced */}
                <div className="flex-1 max-w-xl mx-4">
                    <div className="relative search-wrapper">
                        <input
                            type="text"
                            placeholder="Search users, battles, challenges..."
                            className="search-input w-full"
                        />
                        <svg
                            className="w-5 h-5 search-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">

                    {/* System Status Indicator */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg glass-panel">
                        <span className="status-dot status-online" />
                        <span className="text-sm text-gray-300">All Systems Operational</span>
                    </div>

                    {/* Notifications Button */}
                    <button className="relative p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-[#0f172a] transition-all spotlight-hover">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1e293b]" />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#0f172a] transition-all spotlight-hover"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                alt="Admin"
                                className="w-9 h-9 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                            />
                            <svg
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`profile-dropdown ${isProfileOpen ? 'active' : ''}`}>
                            {/* Header with Avatar */}
                            <div className="profile-dropdown-header">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                        alt="Admin"
                                        className="w-12 h-12 rounded-full border-2 border-cyan-400"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-100">Admin User</p>
                                        <p className="text-sm text-gray-400">admin@algoarena.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <Link
                                    to="/admin/profile"
                                    className="profile-dropdown-item"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>My Profile</span>
                                </Link>
                                <Link
                                    to="/admin/settings"
                                    className="profile-dropdown-item"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Settings</span>
                                </Link>
                                <Link to="/admin/add-admin" className="profile-dropdown-item" onClick={() => setIsProfileOpen(false)}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    <span>Add New Admin</span>
                                </Link>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-gray-700/50">
                                <button
                                    className="profile-dropdown-item profile-dropdown-danger"
                                    onClick={handleLogout}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
