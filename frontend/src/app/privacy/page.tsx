export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-900 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        Your privacy and document security are our top priorities. This policy outlines how we handle your data.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Document Security</h2>
                        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl mb-6">
                            <h3 className="text-xl font-bold text-blue-300 mb-2">Our Core Commitment</h3>
                            <p className="text-slate-300 font-medium">
                                Your documents are encrypted, stored securely, and NEVER used for AI training or shared with third parties.
                            </p>
                        </div>
                        <p className="text-slate-400">
                            We use industry-standard encryption for data in transit and at rest. Documents are processed ephemerally by our AI engine and content is strictly isolated.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Data Collection</h2>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>We collect account information (email) for authentication.</li>
                            <li>We store document metadata and analysis results to display in your dashboard.</li>
                            <li>Payment information is handled securely by our payment processor (Dodo Payments); we do not store credit card details.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Data Deletion</h2>
                        <p className="text-slate-400">
                            You may request full deletion of your account and all associated data at any time by contacting support.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
