import type { Metadata } from "next";
import { Great_Vibes, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import PixelCursor from "../components/PixelCursor";
import { ThemeProvider } from "../components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Pratik Jadhav — Software Engineer",
  description:
    "Building intelligent systems that understand humans. Software Engineer, AI Engineer, ML Systems, Full-Stack Development.",
  icons: {
    icon: "/icon-p.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <PixelCursor />
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
