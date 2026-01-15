'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevContextType {
    isDev: boolean;
    isProOverride: boolean;
    toggleProOverride: () => void;
    mockCreditsUsed: number;
    resetCredits: () => void;
}

const DevContext = createContext<DevContextType>({
    isDev: false,
    isProOverride: false,
    toggleProOverride: () => { },
    mockCreditsUsed: 0,
    resetCredits: () => { },
});

export const useDev = () => useContext(DevContext);

export const DevProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDev, setIsDev] = useState(false);
    const [isProOverride, setIsProOverride] = useState(false);
    const [mockCreditsUsed, setMockCreditsUsed] = useState(0); // 0 means unused, >0 means used

    useEffect(() => {
        // specific check for development environment
        setIsDev(process.env.NODE_ENV === 'development');
    }, []);

    const toggleProOverride = () => setIsProOverride(prev => !prev);
    const resetCredits = () => setMockCreditsUsed(0);

    return (
        <DevContext.Provider value={{
            isDev,
            isProOverride,
            toggleProOverride,
            mockCreditsUsed,
            resetCredits
        }}>
            {children}
        </DevContext.Provider>
    );
};
