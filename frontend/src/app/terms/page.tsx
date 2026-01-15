export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-900 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        Welcome to Legalese.ai. By using our service, you agree to these terms.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Service Description</h2>
                        <p className="text-slate-400">
                            Legalese.ai provides AI-powered analysis of legal documents. We serve as a tool for information purposes only and do not provide legal advice or attorney-client privilege.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Usage Limits</h2>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>Free users are limited to 3 document analyses total.</li>
                            <li>Premium users have unlimited access subject to fair use policies.</li>
                            <li>Automated scraping or abuse of the API is strictly prohibited.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
                        <p className="text-slate-400">
                            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. LEGALESE.AI IS NOT A LAW FIRM AND OUR ANALYSIS SHOULD NOT SUBSTITUTE FOR PROFESSIONAL LEGAL COUNSEL. ALWAYS CONSULT A QUALIFIED ATTORNEY BEFORE SIGNING LEGAL DOCUMENTS.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
