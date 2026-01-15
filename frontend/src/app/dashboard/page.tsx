'use client';

import DocumentVault from '@/components/DocumentVault';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect to home if not signed in
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
    }, [isSignedIn, isLoaded, router]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!isSignedIn) {
        return null; // Will redirect
    }

    return <DocumentVault />;
}
