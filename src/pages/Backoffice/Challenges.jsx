import React, { useState, useEffect } from 'react';

const Challenges = () => {
    const [view, setView] = useState('list'); // 'list', 'manual', 'ai'
    const [aiGenerating, setAiGenerating] = useState(false);
    const [aiResult, setAiResult] = useState(null);

    const handleGenerateAI = () => {
        setAiGenerating(true);
        setAiResult(null);

        // Simulate API call
        setTimeout(() => {
            setAiGenerating(false);
            setAiResult({
                title: "Longest Palindromic Substring",
                description: "Given a string s, return the longest palindromic substring in s. A palindrome is a string that reads the same forward and backward.",
                code: `function longestPalindrome(s) {\n  // Your code here\n  \n  return "";\n}`,
                testCases: [
                    { input: ' "babad"', output: ' "bab" or "aba"' },
                    { input: ' "cbbd"', output: ' "bb"' }
                ]
            });
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h1 style={{ color: 'var(--color-text-heading)' }} className="font-heading text-3xl font-bold  mb-2">Challenge Management</h1>
                <p style={{ color: 'var(--color-text-muted)' }} className="">Create and manage coding challenges with AI assistance</p>
            </div>

            {/* Control Bar */}
            <div className="glass-panel rounded-2xl p-4 mb-6 shadow-custom">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative search-wrapper w-full">
                        <input type="text" placeholder="Search challenges..." className="search-input w-full" />
                        <svg className="w-5 h-5 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select className="form-select w-full md:w-40 bg-(--color-bg-input)">
                        <option>All Difficulties</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <button
                        onClick={() => setView(view === 'manual' ? 'list' : 'manual')}
                        className={`px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap ${view === 'manual' ? 'bg-gray-700 text-white' : 'btn-secondary'}`}
                    >
                        {view === 'manual' ? 'Cancel' : 'Create Manually'}
                    </button>
                    <button
                        onClick={() => setView(view === 'ai' ? 'list' : 'ai')}
                        className={`btn-primary flex items-center gap-2 whitespace-nowrap ${view === 'ai' ? 'ring-2 ring-cyan-300' : ''}`}
                    >
                        {view === 'ai' ? (
                            <>Close AI</>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                                Create with AI
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Manual Editor */}
            {view === 'manual' && (
                <div className="glass-panel rounded-2xl p-6 shadow-custom mb-6 animate-fade-in-up">
                    <h2 style={{ color: 'var(--color-text-heading)' }} className="font-heading text-xl font-bold  mb-6">Create New Challenge Manually</h2>
                    <div className="space-y-6">
                        <div>
                            <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Challenge Title</label>
                            <input type="text" placeholder="e.g., Two Sum Problem" className="form-input w-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Difficulty</label>
                                <select className="form-select w-full">
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Points</label>
                                <input type="number" placeholder="100" className="form-input w-full" />
                            </div>
                        </div>

                        <div>
                            <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Description</label>
                            <textarea rows="4" placeholder="Describe the challenge..." className="form-textarea w-full"></textarea>
                        </div>

                        <div>
                            <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Code Template</label>
                            <div className="bg-(--color-bg-input) border  rounded-lg p-4 font-mono text-sm">
                                <pre style={{ color: 'var(--color-text-secondary)' }} className="">
                                    {`function twoSum(nums, target) {
  // Your code here
  
  return [];
}`}
                                </pre>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t ">
                            <button className="flex-1 btn-primary">Save & Publish</button>
                            <button onClick={() => setView('list')} className="btn-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Generator */}
            {view === 'ai' && (
                <div className="glass-panel rounded-2xl p-6 shadow-custom mb-6 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                        <h2 style={{ color: 'var(--color-text-heading)' }} className="font-heading text-xl font-bold ">AI Challenge Generator</h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                            AI Powered
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Describe the challenge you want to create</label>
                            <textarea rows="4" placeholder="Example: Create a medium difficulty challenge about finding the longest palindromic substring in a string. Include edge cases and optimize for time complexity." className="form-textarea w-full"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Difficulty</label>
                                <select className="form-select w-full">
                                    <option>Easy</option>
                                    <option defaultValue>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Topic</label>
                                <select className="form-select w-full">
                                    <option>Arrays</option>
                                    <option>Strings</option>
                                    <option>Trees</option>
                                    <option>Graphs</option>
                                    <option>Dynamic Programming</option>
                                    <option>Sorting</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ color: 'var(--color-text-secondary)' }} className="block text-sm font-medium  mb-2">Test Cases</label>
                                <input type="number" defaultValue="5" min="3" max="10" className="form-input w-full" />
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateAI}
                            disabled={aiGenerating}
                            className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {aiGenerating ? (
                                    <>
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                        </div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                        Generate Challenge with AI
                                    </>
                                )}
                            </span>
                        </button>

                        {aiResult && (
                            <div className="mt-6 p-6 bg-(--color-bg-input)/50 border border-cyan-400/30 rounded-xl animate-fade-in-up">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-heading text-lg font-bold text-cyan-400">AI Generated Challenge</h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">Generated Successfully</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p style={{ color: 'var(--color-text-muted)' }} className="text-sm font-medium  mb-1">Title</p>
                                        <p style={{ color: 'var(--color-text-secondary)' }} className=" font-medium">{aiResult.title}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--color-text-muted)' }} className="text-sm font-medium  mb-1">Description</p>
                                        <p style={{ color: 'var(--color-text-secondary)' }} className=" text-sm">{aiResult.description}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--color-text-muted)' }} className="text-sm font-medium  mb-1">Code Template</p>
                                        <div className="bg-(--color-bg-sidebar) rounded-lg p-4 font-mono text-sm max-h-40 overflow-y-auto custom-scrollbar border ">
                                            <pre style={{ color: 'var(--color-text-secondary)' }} className=" whitespace-pre-wrap">{aiResult.code}</pre>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--color-text-muted)' }} className="text-sm font-medium  mb-2">Test Cases (2 preview)</p>
                                        <div className="space-y-2">
                                            {aiResult.testCases.map((tc, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-(--color-bg-sidebar) rounded-lg border /50">
                                                    <span style={{ color: 'var(--color-text-secondary)' }} className="text-sm ">Input: {tc.input}</span>
                                                    <span className="text-sm text-cyan-400">Output: {tc.output}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-6 pt-4 border-t ">
                                    <button className="flex-1 btn-primary">Save & Publish</button>
                                    <button onClick={handleGenerateAI} className="btn-secondary">Regenerate</button>
                                    <button onClick={() => setAiResult(null)} className="btn-secondary hover:text-red-400 hover:border-red-400/30">Discard</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Existing Challenges List */}
            <div className="glass-panel rounded-2xl p-6 shadow-custom">
                <h2 style={{ color: 'var(--color-text-heading)' }} className="font-heading text-xl font-bold  mb-6">Existing Challenges</h2>
                <div className="space-y-3">

                    <ChallengeItem
                        title="Two Sum"
                        subtitle="Array Manipulation • 100 points"
                        difficulty="Easy"
                        color="green"
                    />
                    <ChallengeItem
                        title="Longest Palindromic Substring"
                        subtitle="String Algorithms • 250 points"
                        difficulty="Medium"
                        color="yellow"
                        aiGenerated={true}
                    />
                    <ChallengeItem
                        title="Binary Search Tree Traversal"
                        subtitle="Tree Algorithms • 300 points"
                        difficulty="Medium"
                        color="yellow"
                    />
                    <ChallengeItem
                        title="Graph Shortest Path"
                        subtitle="Graph Algorithms • 500 points"
                        difficulty="Hard"
                        color="red"
                    />

                </div>
            </div>
        </div>
    );
};

const ChallengeItem = ({ title, subtitle, difficulty, color, aiGenerated }) => {
    const colorClasses = {
        green: "bg-green-500/10 text-green-400 border-green-500/20",
        yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20"
    };

    return (
        <div className="flex items-center justify-between p-4 bg-(--color-bg-input) rounded-lg border  hover:border-cyan-400/30 transition-all group spotlight-hover table-row-hover">
            <div className="flex items-center gap-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]}`}>
                    {difficulty}
                </span>
                <div>
                    <div className="flex items-center gap-2">
                        <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm font-medium  group-hover:text-cyan-400 transition-colors">{title}</p>
                        {aiGenerated && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wide">AI Generated</span>
                        )}
                    </div>
                    <p style={{ color: 'var(--color-text-muted)' }} className="text-xs ">{subtitle}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button title="Edit" className="action-btn action-btn-edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                </button>
                <button title="Delete" className="action-btn action-btn-delete">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Challenges;
