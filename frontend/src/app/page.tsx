'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import { Wand2, FileDown, Shield, CheckCircle2, AlertTriangle, ArrowRight, FileUp, BrainCircuit, FileCheck, X, FileText, PieChart } from 'lucide-react';

export default function HomePage() {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { openSignIn } = useClerk();
    const [activeFeature, setActiveFeature] = useState<'rewrite' | 'report' | null>(null);

    const handleGetStarted = () => {
        if (isSignedIn) {
            router.push('/dashboard');
        } else {
            openSignIn({
                redirectUrl: '/dashboard',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-50 selection:bg-blue-500/30">

            {/* Feature Modal Overlay */}
            {activeFeature && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fadeIn"
                    onClick={() => setActiveFeature(null)}
                >
                    <div
                        className="relative w-full max-w-5xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                {activeFeature === 'rewrite' ? (
                                    <>
                                        <Wand2 className="w-5 h-5 text-blue-400" />
                                        AI Negotiation Assistant Preview
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-5 h-5 text-purple-400" />
                                        Executive Risk Report Preview
                                    </>
                                )}
                            </h3>
                            <button
                                onClick={() => setActiveFeature(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">

                            {/* REWRITE PREVIEW */}
                            {activeFeature === 'rewrite' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Original Clause */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Original Text</span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                                                <AlertTriangle className="w-3 h-3" /> HIGH RISK
                                            </span>
                                        </div>
                                        <div className="p-5 rounded-xl bg-red-900/5 border border-red-500/20 text-slate-300 leading-relaxed text-sm md:text-base h-full font-mono relative group">
                                            <div className="absolute top-0 right-0 p-2 opacity-50 text-[10px] text-red-400">Clause 9.1</div>
                                            "User agrees to indemnify, defend, and hold harmless Provider and its affiliates, officers, and employees from and against any and all claims, liabilities, damages, losses, costs, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from User's use of the Service, violation of these Terms, or violation of any rights of another. This obligation shall be unlimited in scope and survive the termination of this Agreement indefinitely."
                                        </div>
                                    </div>

                                    {/* Hidden Arrow for Mobile, Visible Center Arrow for Desktop */}
                                    <div className="md:hidden flex justify-center py-2">
                                        <ArrowRight className="w-6 h-6 text-slate-600 rotate-90" />
                                    </div>

                                    {/* AI Rewrite */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                                <Wand2 className="w-4 h-4" /> Legaleze Balanced Rewrite
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                                                <CheckCircle2 className="w-3 h-3" /> BALANCED
                                            </span>
                                        </div>
                                        <div className="p-5 rounded-xl bg-blue-900/5 border border-blue-500/30 text-white leading-relaxed text-sm md:text-base h-full shadow-[0_0_30px_rgba(59,130,246,0.05)]">
                                            <p className="mb-4">
                                                <strong className="text-blue-300">Mutual Indemnification:</strong> Each Party shall indemnify, defend, and hold the other harmless against legitimate third-party claims alleging that the authorized use of the Service infringes intellectual property rights, or resulting from the Indemnifying Party's gross negligence.
                                            </p>
                                            <p>
                                                <strong className="text-blue-300">Limitations:</strong> This obligation is subject to the following conditions: (a) prompt written notice of the claim; (b) sole control over the defense and settlement; and (c) the liability cap set forth in Section 9. In no event shall this indemnity cover indirect or consequential damages.
                                            </p>

                                            <div className="mt-6 flex gap-3">
                                                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors shadow-lg">
                                                    Accept Replacement
                                                </button>
                                                <button className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold rounded-lg transition-colors">
                                                    Copy Text
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* REPORT PREVIEW */}
                            {activeFeature === 'report' && (
                                <div className="bg-slate-100 rounded-xl text-slate-900 p-8 md:p-12 max-w-3xl mx-auto shadow-2xl relative min-h-[500px]">
                                    {/* Paper Texture Effect */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none rounded-xl"></div>

                                    <div className="flex justify-between items-start mb-10 border-b-2 border-slate-200 pb-6 relative z-10">
                                        <div>
                                            <h2 className="text-3xl font-extrabold text-slate-900">Risk Assessment Report</h2>
                                            <p className="text-slate-500 mt-1">Generated by Legaleze.ai • January 15, 2026</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-4xl font-bold text-green-600">85/100</div>
                                            <div className="text-sm font-bold text-green-700 uppercase tracking-wide bg-green-100 px-2 py-1 rounded inline-block mt-1">Low Risk</div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                                        <div className="md:col-span-2 space-y-6">
                                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                                    <BrainCircuit className="w-5 h-5 text-blue-600" /> Executive Summary
                                                </h4>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    This "SaaS Service Agreement" is generally favorable but requires two minor amendments regarding Data Privacy and Renewal Window before signing.
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1">Critical Alerts</h4>

                                                <div className="flex gap-3 items-start p-3 bg-red-50 rounded-lg border border-red-100">
                                                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <h5 className="font-bold text-red-700 text-sm">Data Privacy Gap</h5>
                                                        <p className="text-red-900/70 text-sm">GDPR compliance clause is missing data processing addendum.</p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                                    <div className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">!</div>
                                                    <div>
                                                        <h5 className="font-bold text-yellow-800 text-sm">Termination Window</h5>
                                                        <p className="text-yellow-900/70 text-sm">Auto-renewal requires 90 days notice (Standard is 30).</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 h-full flex flex-col items-center justify-center text-center">
                                                <h5 className="font-bold text-slate-700 mb-4 text-sm uppercase">Category Breakdown</h5>
                                                {/* CSS Donut Chart */}
                                                <div className="relative w-32 h-32 rounded-full mb-4" style={{
                                                    background: `conic-gradient(
                                                        #22c55e 0% 80%, 
                                                        #eab308 80% 95%, 
                                                        #ef4444 95% 100%
                                                    )`
                                                }}>
                                                    <div className="absolute inset-4 bg-slate-50 rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-bold text-slate-400">DISTRIBUTION</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-left w-full space-y-2 px-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Safe</span>
                                                        <span className="font-bold text-slate-700">80%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Review</span>
                                                        <span className="font-bold text-slate-700">15%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Risk</span>
                                                        <span className="font-bold text-slate-700">5%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                                        <div className="text-xs text-slate-400">Legaleze.ai Proprietary Analysis Model v2.4</div>
                                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 animate-fadeIn">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            v2.0 Now Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                            Legaleze<span className="text-blue-500">.ai</span>
                        </h1>
                        <p className="text-2xl text-slate-300 mb-6 font-light">
                            AI-Powered Contract Analysis
                        </p>
                        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Upload your legal documents and get instant risk analysis powered by advanced AI.
                            Identify problematic clauses before you sign.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleGetStarted}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => router.push('/subscribe')}
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all hover:border-slate-600"
                            >
                                View Pricing
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Showcase (Bento Grid) */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                    {/* Feature 1: AI Negotiation Assistant */}
                    <div
                        onClick={() => setActiveFeature('rewrite')}
                        className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden cursor-pointer"
                        title="Click to try interactive preview"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 text-xs font-bold px-2 py-1 rounded border border-yellow-500/30 z-20">
                            PRO FEATURE
                        </div>
                        <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30">
                            <span>🔍 Try Interactive Preview</span>
                        </div>

                        <div className="p-8 md:p-10 relative z-10">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Wand2 className="w-6 h-6 text-blue-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">Turn Risks into Relationships.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Don't just find problems—fix them. Our AI Negotiation Assistant uses specialized legal models to rewrite high-risk clauses into balanced, market-standard language instantly.
                            </p>

                            {/* UI Mockup: Before/After (Static Background) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                                {/* Before Card */}
                                <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 transform group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        <span className="text-xs font-bold text-red-400 uppercase tracking-wide">High Risk</span>
                                    </div>
                                    <div className="h-2 w-3/4 bg-red-500/20 rounded mb-2"></div>
                                    <div className="h-2 w-1/2 bg-red-500/20 rounded"></div>
                                </div>

                                {/* After Card */}
                                <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-4 transform group-hover:-translate-y-1 transition-transform duration-500 delay-150">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Balanced</span>
                                    </div>
                                    <div className="h-2 w-3/4 bg-green-500/20 rounded mb-2"></div>
                                    <div className="h-2 w-5/6 bg-green-500/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: PDF Export */}
                    <div
                        onClick={() => setActiveFeature('report')}
                        className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
                        title="Click to view sample report"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 text-xs font-bold px-2 py-1 rounded border border-yellow-500/30 z-20">
                            PRO FEATURE
                        </div>
                        <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30">
                            <span>📄 View Sample Report</span>
                        </div>

                        <div className="p-8 md:p-10 relative z-10 flex-grow">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <FileDown className="w-6 h-6 text-purple-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">Executive-Ready Reports.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Take your analysis offline. Generate beautifully branded, professional PDF risk summaries at the click of a button. Perfect for sharing with legal teams.
                            </p>
                        </div>

                        {/* UI Mockup: PDF Slide-out */}
                        <div className="relative h-48 mt-auto overflow-hidden pointer-events-none">
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-slate-900 rounded-t-2xl border border-slate-700 shadow-2xl transform group-hover:-translate-y-4 transition-transform duration-700 ease-out p-4">
                                {/* Fake Header */}
                                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                                    <div className="w-20 h-2 bg-slate-700 rounded"></div>
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full"></div>
                                </div>
                                {/* Fake Content Lines */}
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-slate-800 rounded"></div>
                                    <div className="h-2 w-5/6 bg-slate-800 rounded"></div>
                                    <div className="h-2 w-4/6 bg-slate-800 rounded"></div>
                                </div>
                                {/* Paper Effect */}
                                <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Security Trust Banner, How It Works, CTA - Unchanged... */}
            {/* Security Trust Banner */}
            <div className="border-y border-slate-800 bg-slate-900/50">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto">
                        <div className="flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
                            <Shield className="w-24 h-24 text-slate-200 relative z-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Security First Guarantee</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Your data is your own. We utilize <span className="text-blue-400 font-semibold">stateless processing</span> for all exports and re-writes.
                                Legaleze.ai <span className="text-white font-medium">never stores your documents</span> on our servers and never uses your private data to train AI models.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works (Premium) */}
            <div className="py-24 container mx-auto px-4 relative">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-blue-900/5 skew-y-3 transform -skew-y-3 z-0 pointer-events-none"></div>

                <h2 className="text-4xl font-bold text-white text-center mb-20 relative z-10">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">

                    {/* Step 1 */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 hover:border-blue-500/30 transition-all duration-300 text-center height-full">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                                <FileUp className="w-10 h-10 text-blue-400" />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-bold text-slate-800/50 pointer-events-none select-none">01</div>
                            <h3 className="text-xl font-bold text-white mb-3">Upload Contract</h3>
                            <p className="text-slate-400 leading-relaxed">Securely upload your PDF or DOCX file to our encrypted vault.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 hover:border-purple-500/30 transition-all duration-300 text-center height-full">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500/20 to-purple-600/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                                <BrainCircuit className="w-10 h-10 text-purple-400" />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-bold text-slate-800/50 pointer-events-none select-none">02</div>
                            <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
                            <p className="text-slate-400 leading-relaxed">Our advanced engine scans for risks, loopholes, and non-standard clauses instantly.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 hover:border-green-500/30 transition-all duration-300 text-center height-full">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 to-green-600/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                                <FileCheck className="w-10 h-10 text-green-400" />
                            </div>
                            <div className="absolute top-6 right-6 text-5xl font-bold text-slate-800/50 pointer-events-none select-none">03</div>
                            <h3 className="text-xl font-bold text-white mb-3">Review & Actions</h3>
                            <p className="text-slate-400 leading-relaxed">Get a summary report, rewrite risky clauses, or export for your legal team.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Final CTA Section */}
            <div className="pb-24 pt-10 container mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 opacity-90"></div>

                    <div className="relative px-6 py-16 md:py-20 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
                            No Credit Card Required
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Ready to analyze your first contract?
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of smart professionals who use Legaleze.ai to sign with confidence.
                            <span className="text-white font-medium block mt-2">Get your first 3 risk reports completely free.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => router.push('/subscribe')}
                                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/20 hover:scale-105 flex items-center gap-2"
                            >
                                Start For Free
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => router.push('/subscribe')}
                                className="px-8 py-4 bg-transparent border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
                            >
                                View All Plans
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
