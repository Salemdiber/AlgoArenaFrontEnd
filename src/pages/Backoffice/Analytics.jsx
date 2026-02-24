import React from 'react';
import UserGrowthChart from '../../components/Charts/UserGrowthChart';
import BattleActivityChart from '../../components/Charts/BattleActivityChart';
import DifficultyChart from '../../components/Charts/DifficultyChart';

const Analytics = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">Platform Analytics</h1>
                <p className="text-gray-400">Comprehensive insights and performance metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* User Growth */}
                <div className="glass-panel rounded-xl p-6 shadow-custom border border-gray-700/50 bg-[#1e293b]/60 backdrop-blur-md">
                    <h2 className="font-heading text-xl font-bold text-gray-100 mb-4">User Growth (30 Days)</h2>
                    <div className="h-64">
                        <UserGrowthChart />
                    </div>
                </div>

                {/* Battle Activity */}
                <div className="glass-panel rounded-xl p-6 shadow-custom border border-gray-700/50 bg-[#1e293b]/60 backdrop-blur-md">
                    <h2 className="font-heading text-xl font-bold text-gray-100 mb-4">Battle Activity</h2>
                    <div className="h-64">
                        <BattleActivityChart />
                    </div>
                </div>

                {/* Challenge Difficulty */}
                <div className="glass-panel rounded-xl p-6 shadow-custom border border-gray-700/50 bg-[#1e293b]/60 backdrop-blur-md">
                    <h2 className="font-heading text-xl font-bold text-gray-100 mb-4">Challenge Difficulty Distribution</h2>
                    <div className="h-64">
                        <DifficultyChart />
                    </div>
                </div>

                {/* User Engagement (Custom Bars) */}
                <div className="glass-panel rounded-xl p-6 shadow-custom border border-gray-700/50 bg-[#1e293b]/60 backdrop-blur-md">
                    <h2 className="font-heading text-xl font-bold text-gray-100 mb-4">User Engagement</h2>
                    <div className="space-y-4">
                        <EngagementBar label="Daily Active Users" value="87%" percentage={87} />
                        <EngagementBar label="Weekly Active Users" value="92%" percentage={92} />
                        <EngagementBar label="Monthly Active Users" value="95%" percentage={95} />
                        <EngagementBar label="Avg Session Duration" value="24m 32s" percentage={78} />
                    </div>
                </div>

            </div>
        </div>
    );
};

const EngagementBar = ({ label, value, percentage }) => (
    <div>
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">{label}</span>
            <span className="text-sm font-medium text-cyan-400">{value}</span>
        </div>
        <div className="w-full bg-[#0f172a] rounded-full h-2">
            <div
                className="bg-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
);

export default Analytics;
