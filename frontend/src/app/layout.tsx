import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Legalese.ai | AI Contract Risk Analysis",
  description: "Analyze legal contracts for risk using advanced AI.",
};

import { Providers } from "./providers";
import DevToolbar from "@/components/DevToolbar";

// ... (imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-[var(--background)] flex flex-col`}>
          <Providers>
            <Navbar />
            <main className="pt-16 flex-grow">
              {children}
            </main>
            <Footer />
            <DevToolbar />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
