import React from 'react';

const SystemHealth = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">System Health Monitor</h1>
                <p className="text-gray-400">Real-time infrastructure and service monitoring</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                {/* CPU Usage */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-lg font-semibold text-gray-100">CPU Usage</h3>
                        <StatusBadge status="Healthy" color="green" />
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <CircularProgress percentage={25} color="#22d3ee" />
                    </div>
                    <p className="text-sm text-gray-400 text-center">4 cores available</p>
                </div>

                {/* Memory Usage */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-lg font-semibold text-gray-100">Memory Usage</h3>
                        <StatusBadge status="Warning" color="yellow" />
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <CircularProgress percentage={70} color="#facc15" />
                    </div>
                    <p className="text-sm text-gray-400 text-center">11.2 GB / 16 GB</p>
                </div>

                {/* Disk Usage */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-lg font-semibold text-gray-100">Disk Usage</h3>
                        <StatusBadge status="Healthy" color="green" />
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <CircularProgress percentage={55} color="#22d3ee" />
                    </div>
                    <p className="text-sm text-gray-400 text-center">275 GB / 500 GB</p>
                </div>

                {/* API Latency */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-lg font-semibold text-gray-100">API Latency</h3>
                        <StatusBadge status="Optimal" color="green" />
                    </div>
                    <div className="text-center mb-4">
                        <p className="font-heading text-4xl font-bold text-cyan-400 mb-2">47ms</p>
                        <p className="text-sm text-gray-400">Average response time</p>
                    </div>
                    <div className="h-16 w-full flex items-end justify-center space-x-1">
                        {/* Simple visualizer bars instead of complex SVG path for now */}
                        {[40, 60, 45, 70, 55, 30, 40, 50, 45, 60, 40, 35].map((h, i) => (
                            <div key={i} className="w-2 bg-cyan-500/50 rounded-t" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>

                {/* Docker Containers */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-lg font-semibold text-gray-100">Docker Containers</h3>
                        <StatusBadge status="Running" color="green" />
                    </div>
                    <div className="space-y-3">
                        <ServiceRow name="Web Server" status="online" />
                        <ServiceRow name="Database" status="online" />
                        <ServiceRow name="Redis Cache" status="online" />
                    </div>
                </div>

                {/* Service Status */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-lg font-semibold text-gray-100">Service Status</h3>
                        <StatusBadge status="All Online" color="green" />
                    </div>
                    <div className="space-y-3">
                        <ServiceMetrix name="Authentication" uptime="99.9%" />
                        <ServiceMetrix name="Code Execution" uptime="99.7%" />
                        <ServiceMetrix name="AI Evaluation" uptime="99.8%" />
                    </div>
                </div>

            </div>
        </div>
    );
};

const StatusBadge = ({ status, color }) => {
    const colors = {
        green: "bg-green-500/20 text-green-400 border-green-500/30",
        yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        red: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>
            {status}
        </span>
    );
};

// SVG Circle with percentage
const CircularProgress = ({ percentage, color }) => {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    // const offset = circumference - (percentage / 100) * circumference;
    const offset = circumference * ((100 - percentage) / 100);

    return (
        <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r={radius} stroke="#1e293b" strokeWidth="8" fill="none" />
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke={color}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-2xl font-bold" style={{ color }}>{percentage}%</span>
            </div>
        </div>
    );
};

const ServiceRow = ({ name, status }) => (
    <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
        <span className="text-sm text-gray-300">{name}</span>
        <span className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></span>
    </div>
);

const ServiceMetrix = ({ name, uptime }) => (
    <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-xs text-green-400">{uptime}</span>
    </div>
);

export default SystemHealth;
