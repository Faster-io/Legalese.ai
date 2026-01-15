'use client';

import { ThemeProvider } from 'next-themes';
import { DevProvider } from '@/context/DevContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <DevProvider>
                {children}
            </DevProvider>
        </ThemeProvider>
    );
}
