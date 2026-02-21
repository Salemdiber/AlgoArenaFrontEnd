import React, { useState, useRef, useEffect } from 'react';

const AIAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI assistant. I can help you with:\n• Creating challenges\n• Analyzing user data\n• System monitoring\n• Generating reports", isUser: false, time: 'Just now' }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, isUser: true, time: 'Just now' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI Response
        setTimeout(() => {
            const responses = [
                "I can help you with that! Let me analyze the data...",
                "Based on the current metrics, everything looks good.",
                "I've generated a report for you. Would you like me to send it?",
                "I can create a new challenge for you. What topic would you like?",
                "The system health is optimal. All services are running smoothly."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const aiMsg = { id: Date.now() + 1, text: randomResponse, isUser: false, time: 'Just now' };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] transition-all hover:scale-110 animate-pulse-glow"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-96 h-[500px] flex flex-col glass-panel rounded-2xl border border-gray-700/50 bg-[#1e293b]/95 backdrop-blur-xl shadow-2xl animate-fade-in-up">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-[#1e293b]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-100">AI Assistant</p>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-200 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-[#0f172a]/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.isUser ? 'justify-end' : ''}`}>
                                {!msg.isUser && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                        </svg>
                                    </div>
                                )}
                                <div className={`max-w-[80%] ${msg.isUser ? 'order-1' : 'order-2'}`}>
                                    <div className={`p-3 rounded-2xl ${msg.isUser ? 'bg-cyan-500 rounded-tr-none text-white' : 'bg-[#1e293b] rounded-tl-none border border-gray-700/50 text-gray-300'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    <p className={`text-xs text-gray-500 mt-1 ${msg.isUser ? 'text-right' : ''}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    {/* Input */}
                    <div className="p-4 border-t border-gray-700/50 bg-[#1e293b]">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 h-10 bg-[#0f172a] border border-gray-700 rounded-lg px-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-lg text-white transition-colors shadow-glow-cyan"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAgent;
