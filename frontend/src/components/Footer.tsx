'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-4">
                            Legalese<span className="text-blue-500">.ai</span>
                        </h3>
                        <p className="text-slate-400 max-w-sm mb-4">
                            AI-powered contract analysis ensuring you never sign a bad deal again.
                            Fast, secure, and accurate legal risk assessment.
                        </p>
                        <p className="text-xs text-slate-500 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            🔒 <span className="font-semibold text-slate-400">Security Commitment:</span> Your documents are encrypted, lowest-latency processing, stored securely, and NEVER used for AI training or shared with third parties.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link></li>
                            <li><Link href="/subscribe" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Legalese.ai. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Built with ❤️ for better contracts.</p>
                </div>
            </div>
        </footer>
    );
}
