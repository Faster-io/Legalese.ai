'use client';

import React from 'react';
import { useDev } from '@/context/DevContext';
import { Wrench, Shield, RefreshCw } from 'lucide-react';

const DevToolbar = () => {
    const { isDev, isProOverride, toggleProOverride, resetCredits } = useDev();

    if (!isDev) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-md border border-slate-600 rounded-full px-6 py-3 shadow-2xl z-[100] flex items-center gap-6 animate-slideUp">
            <div className="flex items-center gap-2 text-orange-400 font-bold border-r border-slate-600 pr-4">
                <Wrench className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Dev Tools</span>
            </div>

            <div className="flex items-center gap-4">
                {/* Pro Toggle */}
                <button
                    onClick={toggleProOverride}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isProOverride ? 'text-green-400' : 'text-slate-400'}`}
                >
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isProOverride ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-current transition-all ${isProOverride ? 'left-4.5 bg-green-500' : 'left-0.5 bg-slate-500'}`} style={{ left: isProOverride ? '18px' : '2px' }}></div>
                    </div>
                    <Shield className="w-4 h-4" />
                    {isProOverride ? 'Pro Active' : 'Pro Inactive'}
                </button>

                {/* Reset Credits */}
                <button
                    onClick={resetCredits}
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reset Credits
                </button>
            </div>
        </div>
    );
};

export default DevToolbar;
