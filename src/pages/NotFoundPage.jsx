import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden font-body">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 text-center px-6">
                <h1 className="text-8xl md:text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 mb-6 drop-shadow-2xl">
                    404
                </h1>

                <div className="glass-panel p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl mb-8 max-w-lg mx-auto shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Sector Not Found
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        The navigation coordinates you provided do not exist on this platform. The page might have been removed, renamed, or temporarily offline.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 font-display rounded-lg hover:-translate-y-0.5 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                    >
                        <svg className="w-5 h-5 mr-2 -ml-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Return to Base
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
