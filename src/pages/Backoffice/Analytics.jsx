import React, { useState, useEffect } from 'react';
import UserGrowthChart from '../../components/Charts/UserGrowthChart';
import BattleActivityChart from '../../components/Charts/BattleActivityChart';
import DifficultyChart from '../../components/Charts/DifficultyChart';
import { apiClient } from '../../services/apiClient';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await apiClient('/analytics/insights');
                setAnalyticsData(response);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch analytics", err);
                setError("Failed to load platform insights");
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div className="text-gray-100 p-6">Loading Platform Analytics...</div>;
    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!analyticsData) return null;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">Platform Analytics</h1>
                    <p className="text-gray-400">Comprehensive insights and performance metrics</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-400 text-sm">Total Platform Users</p>
                    <p className="font-heading text-3xl font-bold text-cyan-400">{analyticsData.users.total}</p>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="glass-panel rounded-xl p-4 shadow-custom border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">New Users (30 Days)</p>
                    <p className="text-2xl font-bold text-gray-100">{analyticsData.users.newUsers30Days}</p>
                </div>
                <div className="glass-panel rounded-xl p-4 shadow-custom border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">Daily Active Users</p>
                    <p className="text-2xl font-bold text-gray-100">{analyticsData.users.dailyActiveUsers}</p>
                </div>
                <div className="glass-panel rounded-xl p-4 shadow-custom border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">Avg Session Time</p>
                    <p className="text-2xl font-bold text-gray-100">{analyticsData.engagement.averageTimeSpent}</p>
                </div>
                <div className="glass-panel rounded-xl p-4 shadow-custom border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">Peak Hours</p>
                    <p className="text-2xl font-bold text-gray-100">{analyticsData.engagement.peakUsageTimes[0] || '18:00'}</p>
                </div>
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
                    <h2 className="font-heading text-xl font-bold text-gray-100 mb-4">Most Accessed Sections</h2>
                    <div className="space-y-4">
                        {analyticsData.engagement.mostFrequentlyAccessed.map((item, idx) => {
                            // Calculate a relative percentage to highest accesses for UI purposes
                            const max = analyticsData.engagement.mostFrequentlyAccessed[0]?.accesses || 1;
                            const pct = Math.round((item.accesses / max) * 100);
                            return (
                                <EngagementBar key={idx} label={item.section} value={item.accesses.toString() + ' hits'} percentage={pct} />
                            );
                        })}
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
