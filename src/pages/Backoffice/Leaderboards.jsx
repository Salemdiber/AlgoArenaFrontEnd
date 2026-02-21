import React from 'react';

const Leaderboards = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-gray-100 mb-2">Leaderboard Management</h1>
                <p className="text-gray-400">Manage rankings and competitive standings</p>
            </div>

            {/* Controls */}
            <div className="glass-panel rounded-2xl p-4 mb-6 shadow-custom">
                <div className="flex flex-col md:flex-row gap-4">
                    <select className="form-select bg-[#0f172a] md:w-48">
                        <option>All Leagues</option>
                        <option>Bronze</option>
                        <option>Silver</option>
                        <option>Gold</option>
                        <option>Platinum</option>
                        <option>Diamond</option>
                    </select>
                    <select className="form-select bg-[#0f172a] md:w-48">
                        <option>Current Season</option>
                        <option>Season 1</option>
                        <option>Season 2</option>
                        <option>All Time</option>
                    </select>
                    <div className="flex-1"></div>
                    <button className="btn-danger w-full md:w-auto">Reset Season</button>
                    <button className="btn-primary w-full md:w-auto">Export Rankings</button>
                </div>
            </div>

            {/* Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Rank 1 */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border-yellow-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-[#1e293b]/60 z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] ring-4 ring-yellow-500/20">
                                <span className="font-heading text-4xl font-bold text-white drop-shadow-md">1</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="relative inline-block mb-3">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="User" className="w-20 h-20 rounded-full border-4 border-yellow-400 mx-auto" />
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-[#0f172a] text-xs font-bold px-2 py-0.5 rounded-full">
                                    CHAMPION
                                </div>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-gray-100 mb-1">@algo_ninja</h3>
                            <p className="text-sm text-gray-400 mb-3">Mike Chen</p>
                            <div className="flex items-center justify-center gap-2 mb-2 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20 max-w-[160px] mx-auto">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="font-heading text-xl font-bold text-yellow-400">12,890</span>
                            </div>
                            <p className="text-xs text-yellow-500/80 font-medium mt-2">🔥 47 day streak</p>
                        </div>
                    </div>
                </div>

                {/* Rank 2 */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group mt-4 md:mt-8 border-gray-400/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-[#1e293b]/60 z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(156,163,175,0.3)] ring-4 ring-gray-400/20">
                                <span className="font-heading text-3xl font-bold text-white drop-shadow-md">2</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="User" className="w-16 h-16 rounded-full border-4 border-gray-400 mx-auto mb-3" />
                            <h3 className="font-heading text-xl font-bold text-gray-100 mb-1">@code_queen</h3>
                            <p className="text-sm text-gray-400 mb-3">Emily Davis</p>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="font-heading text-2xl font-bold text-gray-300">11,234</span>
                            </div>
                            <p className="text-xs text-gray-400">🔥 32 day streak</p>
                        </div>
                    </div>
                </div>

                {/* Rank 3 */}
                <div className="glass-panel rounded-2xl p-6 shadow-custom transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group mt-4 md:mt-12 border-orange-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-[#1e293b]/60 z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.3)] ring-4 ring-orange-500/20">
                                <span className="font-heading text-3xl font-bold text-white drop-shadow-md">3</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" className="w-16 h-16 rounded-full border-4 border-orange-400 mx-auto mb-3" />
                            <h3 className="font-heading text-xl font-bold text-gray-100 mb-1">@coder_pro</h3>
                            <p className="text-sm text-gray-400 mb-3">John Smith</p>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="font-heading text-2xl font-bold text-orange-400">8,547</span>
                            </div>
                            <p className="text-xs text-gray-400">🔥 21 day streak</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Table for rest */}
            <div className="glass-panel rounded-2xl shadow-custom overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#0b1220]/50 border-b border-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Challenges</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Streak</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">League</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            <LeaderboardRow
                                rank="#4"
                                user="@dev_master"
                                name="Sarah Johnson"
                                score="6,234"
                                challenges="127"
                                streak="18 days"
                                league="Gold"
                                leagueColor="yellow"
                            />
                            <LeaderboardRow
                                rank="#5"
                                user="@tech_wizard"
                                name="Alex Turner"
                                score="5,892"
                                challenges="98"
                                streak="12 days"
                                league="Silver"
                                leagueColor="gray"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const LeaderboardRow = ({ rank, user, name, score, challenges, streak, league, leagueColor }) => {
    const leagueStyles = {
        yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        gray: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        orange: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    };

    return (
        <tr className="table-row-hover border-b border-gray-800 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-heading text-lg font-bold text-gray-300">{rank}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`} alt={user} className="w-10 h-10 rounded-full border-2 border-cyan-400" />
                    <div>
                        <p className="text-sm font-medium text-gray-200">{user}</p>
                        <p className="text-xs text-gray-400">{name}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-cyan-400">{score}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{challenges}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">🔥 {streak}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${leagueStyles[leagueColor]}`}>
                    {league}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button title="View Profile" className="action-btn action-btn-view">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default Leaderboards;
