import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/session-provider";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ai Project Planner",
  description: "Make your project plan with Ai",
  icons: {
    icon: "/brain.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionWrapper>
          <ThemeProvider defaultTheme="dark" attribute="class">
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
