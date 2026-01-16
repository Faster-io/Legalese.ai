'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { MessageCircle, X, Send, Bot, User, Activity, AlertTriangle, Info } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { API_ENDPOINTS } from '@/config/api';

interface AnalysisResult {
    text: string;
    risk: 'Red' | 'Yellow' | 'Green';
    explanation: string;
}

interface DocumentData {
    document_id: number;
    filename: string;
    content: string;
    results: AnalysisResult[];
    score?: number;
    summary?: string;
}

const AnalysisView = () => {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [rewritingId, setRewritingId] = useState<number | null>(null);
    const [rewrittenText, setRewrittenText] = useState<{ [key: number]: string }>({});

    // Chat State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    // Chart State
    const [riskMetrics, setRiskMetrics] = useState<{ name: string, score: number }[]>([]);
    const [chartData, setChartData] = useState<{ name: string, value: number }[]>([]);

    const { userId } = useAuth();
    const { user } = useUser();
    // Reverted DevTools: No useDev hook

    useEffect(() => {
        if (!id || !userId) return;
        const fetchData = async () => {
            try {
                // Fetch Document
                const docRes = await fetch(API_ENDPOINTS.document(Number(id)));
                if (docRes.ok) {
                    const json = await docRes.json();
                    setData(json);

                    // Init Metrics
                    if (json.score !== undefined) {
                        setRiskMetrics([{ name: 'Initial', score: json.score }]);

                        // Calc distribution
                        const counts = { Red: 0, Yellow: 0, Green: 0 };
                        json.results.forEach((r: any) => counts[r.risk as keyof typeof counts]++);
                        setChartData([
                            { name: 'Critical', value: counts.Red },
                            { name: 'Review', value: counts.Yellow },
                            { name: 'Safe', value: counts.Green }
                        ]);
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, userId]);

    const handleRewrite = async (index: number, text: string) => {
        setRewritingId(index);
        try {
            const res = await fetch(API_ENDPOINTS.negotiate, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const json = await res.json();
            setRewrittenText(prev => ({ ...prev, [index]: json.rewritten_text }));

            // update trend - Assume improvement to Green (10pts)
            // Only update if not already rewritten (simple check)
            if (!rewrittenText[index] && data) {
                // Recalc score delta
                // Current Item Risk
                const itemRisk = data.results[index].risk;
                const currentPts = itemRisk === 'Green' ? 10 : itemRisk === 'Yellow' ? 5 : 0;
                const newPts = 10; // Assumed Green after AI Rewrite
                const gain = newPts - currentPts;

                if (gain > 0) {
                    const totalClauses = data.results.length;
                    // Approximate new score based on gain
                    // Formula: NewScore = ((OldSum + Gain) / Max) * 100
                    // Need raw sum. Reverse eng: Sum = (Score * Max) / 100
                    const lastScore = riskMetrics[riskMetrics.length - 1].score;
                    const maxPoints = totalClauses * 10;
                    const currentSum = (lastScore * maxPoints) / 100;
                    const newSum = currentSum + gain;
                    const newScore = Math.min(100, Math.round((newSum / maxPoints) * 100));

                    setRiskMetrics(prev => [...prev, { name: 'Optimized', score: newScore }]);
                }
            }
        } catch (e) {
            alert("Failed to generate revision");
        } finally {
            setRewritingId(null);
        }
    };

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const question = chatInput;
        setChatInput('');
        setChatHistory(prev => [...prev, { role: 'user', content: question }]);
        setChatLoading(true);

        try {
            const res = await fetch(API_ENDPOINTS.chat, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    doc_id: Number(id),
                    question: question,
                    email: user?.primaryEmailAddress?.emailAddress
                })
            });

            if (res.ok) {
                const json = await res.json();
                setChatHistory(prev => [...prev, { role: 'assistant', content: json.answer }]);
            } else {
                if (res.status === 402) {
                    setChatHistory(prev => [...prev, { role: 'assistant', content: "🔒 Upgrade to Pro to chat with your documents." }]);
                } else {
                    setChatHistory(prev => [...prev, { role: 'assistant', content: "Error communicating with Assistant." }]);
                }
            }
        } catch (e) {
            setChatHistory(prev => [...prev, { role: 'assistant', content: "Network Error." }]);
        } finally {
            setChatLoading(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen text-slate-400">Loading Analysis...</div>;
    if (!data) return <div className="flex items-center justify-center h-screen text-red-400">Error loading document.</div>;

    return (
        <div className="min-h-screen bg-slate-900 grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-screen">
            {/* Left: Document Text */}
            <div className="p-8 overflow-y-auto border-r border-slate-700 bg-slate-900/50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-200 sticky top-0 bg-slate-900 py-4 border-b border-slate-800 z-10">
                        {data.filename}
                    </h2>
                    <div className="prose prose-invert prose-slate max-w-none whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-300">
                        {data.content}
                    </div>
                </div>
            </div>

            {/* Right: Risk Analysis */}
            <div className="p-8 overflow-y-auto bg-slate-950">
                <div className="sticky top-0 bg-slate-950 py-4 border-b border-slate-800 z-10 mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-white">Risk Analysis</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-normal">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span> High</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> Review</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Safe</span>
                        </div>
                        <button
                            onClick={() => window.open(API_ENDPOINTS.export(data.document_id), '_blank')}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded border border-slate-700 transition-colors flex items-center gap-2"
                        >
                            <span>📥</span> PDF Report
                        </button>
                    </div>
                </div>

                {/* Executive Dashboard */}
                {data.score !== undefined && (
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        {/* Score Card */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Overall Risk Score
                            </h3>
                            <div className="h-48 relative flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.name === 'Critical' ? '#ef4444' : entry.name === 'Review' ? '#eab308' : '#22c55e'} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Score */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className={`text-4xl font-bold ${data.score >= 80 ? 'text-green-400' : data.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {riskMetrics.length > 1 ? riskMetrics[riskMetrics.length - 1].score : data.score}
                                    </span>
                                    <span className="text-xs text-slate-500 font-medium uppercase">/ 100</span>
                                </div>
                            </div>
                        </div>

                        {/* Trend Chart */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-wider">Optimization Impact</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={riskMetrics}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#1e293b' }}
                                            activeDot={{ r: 6, fill: '#60a5fa' }}
                                            animationDuration={1500}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary & Alerts Rows */}
                {data.score !== undefined && (
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                        {/* Summary */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Info className="w-24 h-24 text-blue-500" />
                            </div>
                            <h3 className="text-slate-400 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-500" /> Analysis Summary
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                {data.summary || "Analysis complete. Review the risks below."}
                            </p>
                        </div>

                        {/* Alerts */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-slate-400 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" /> Critical Alerts
                            </h3>
                            <div className="space-y-3">
                                {data.results.filter(r => r.risk === 'Red').slice(0, 3).map((item, i) => (
                                    <div key={i} className="flex items-center justify-between bg-red-900/10 border border-red-500/20 p-3 rounded-lg">
                                        <span className="text-red-300 text-sm font-medium truncate max-w-[70%]">
                                            {item.text.substring(0, 50)}...
                                        </span>
                                        <button
                                            onClick={() => document.getElementById(`clause-${data.results.indexOf(item)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                            className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1 rounded border border-red-500/20 transition-colors"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))}
                                {data.results.filter(r => r.risk === 'Red').length === 0 && (
                                    <div className="text-slate-500 italic text-sm text-center py-4">No critical alerts found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    {data.results.map((item, idx) => (
                        <div key={idx} id={`clause-${idx}`} className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all ${item.risk === 'Red' ? 'bg-red-900/10 border-red-500/30' :
                            item.risk === 'Yellow' ? 'bg-yellow-900/10 border-yellow-500/30' :
                                'bg-green-900/10 border-green-500/30'
                            }`}>

                            <div className="mb-3">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{
                                    color: item.risk === 'Red' ? '#ef4444' :
                                        item.risk === 'Yellow' ? '#eab308' :
                                            '#22c55e'
                                }}>
                                    {item.risk === 'Red' ? 'Critical Risk' : item.risk === 'Yellow' ? 'Needs Review' : 'Standard Term'}
                                </h3>
                                <p className="text-slate-200 font-medium italic">"{item.text.substring(0, 150)}..."</p>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-lg border border-white/5 mb-4">
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    <span className="font-semibold text-slate-300">Analysis: </span>
                                    {item.explanation}
                                </p>
                            </div>

                            {/* Revision Logic - Ungated for testing */}
                            {item.risk !== 'Green' && (
                                <div>
                                    {rewrittenText[idx] ? (
                                        <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 animate-fadeIn">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-blue-400 text-sm font-bold">✨ AI Suggested Revision</h4>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(rewrittenText[idx])}
                                                    className="text-xs text-slate-500 hover:text-white"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            <p className="text-slate-300 text-sm italic border-l-2 border-blue-500 pl-3">
                                                "{rewrittenText[idx]}"
                                            </p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleRewrite(idx, item.text)}
                                            disabled={rewritingId === idx}
                                            className="mt-2 text-sm bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                                        >
                                            {rewritingId === idx ? (
                                                <>
                                                    <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full"></span>
                                                    Drafting...
                                                </>
                                            ) : (
                                                <>
                                                    <span>✨</span> Propose Revision
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
            >
                {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </button>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-2">
                        <Bot className="w-5 h-5 text-blue-400" />
                        <h3 className="font-bold text-white">Document Assistant</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
                        {chatHistory.length === 0 && (
                            <div className="text-center text-slate-500 mt-10">
                                <p className="text-sm">Ask me anything about this contract!</p>
                                <p className="text-xs mt-2">Example: "Is there a termination fee?"</p>
                            </div>
                        )}
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                                        <Bot className="w-4 h-4 text-blue-400" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {chatLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                                    <Bot className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleChatSubmit} className="p-4 bg-slate-800 border-t border-slate-700">
                        <div className="relative">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Type your question..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-full px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                            />
                            <button
                                type="submit"
                                disabled={!chatInput.trim() || chatLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AnalysisView;
