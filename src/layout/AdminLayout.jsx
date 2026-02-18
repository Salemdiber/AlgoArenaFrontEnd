import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import AIAgent from '../components/AIAgent';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen bg-[#0f172a] font-body text-gray-100 overflow-hidden">
            {/* Background decorative gradients like original */}
            {/* Creative Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Deep dark base with subtle mesh */}
                <div className="absolute inset-0 bg-[#0f172a]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(17,24,39,1)_100%)]" />

                {/* Animated Gradient Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] animate-blob" />

                {/* Cyber Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>

            {/* Mobile overlay backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Main Content Wrapper - Fixes sidebar and allows independent scrolling */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10 h-full overflow-hidden">
                <TopNavbar onToggleSidebar={toggleSidebar} />
                <main className="flex-1 p-6 overflow-y-auto custom-scrollbar scroll-smooth">
                    <Outlet />
                </main>
            </div>

            {/* AI Agent - Floating chat */}
            <AIAgent />
        </div>
    );
};

export default AdminLayout;
